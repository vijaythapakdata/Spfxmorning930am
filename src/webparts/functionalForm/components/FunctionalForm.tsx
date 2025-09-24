import * as React from 'react';
// import styles from './FunctionalForm.module.scss';
import type { IFunctionalFormProps } from './IFunctionalFormProps';
import { IFunctionalFormState } from './IFunctionalFormState';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import {Dialog} from "@microsoft/sp-dialog";
import { ChoiceGroup, DatePicker, Dropdown, IDatePickerStrings, IDropdownOption, PrimaryButton, Slider, TextField } from '@fluentui/react';
// import { set } from '@microsoft/sp-lodash-subset';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
const FunctionalForm:React.FC<IFunctionalFormProps>=(props)=>{
  const [formData,setFormData]=React.useState<IFunctionalFormState>({
    Name:"",
    Email:"",
    Age:"",
    Salary:"",
    Score:1,
    FullAddress:"",
    Admin:"",
    AdminId:"",
    Manager:[],
    ManagerId:[],
    Department:"",
    Skills:[],
    City:"",
    Gender:"",
    DOB:null
  });

  //create form 
  const createform=async()=>{
    try{
const web=Web(props.siteurl);//it will store the siteurl
const list=web.lists.getByTitle(props.ListName);//it will store the list name;
const items=await list.items.add({
  Title:formData.Name,
  EmailAddress:formData.Email,
  Age:parseInt(formData.Age),
  Score:formData.Score,
  Salary:parseFloat(formData.Salary),
  Address:formData.FullAddress,
  AdminId:formData.AdminId,
  ManagerId:{results:formData.ManagerId},
  Department:formData.Department,
  Gender:formData.Gender,
  CityId:formData.City,
  Skills:{results:formData.Skills},
  DOB:new Date(formData.DOB)
});
Dialog.alert(`Item created successfully with Id : ${items.data.Id}`);
console.log(items);
//reset form
setFormData({
   Name:"",
    Email:"",
    Age:"",
    Salary:"",
    Score:1,
    FullAddress:"",
    Admin:"",
    AdminId:"",
    Manager:[],
    ManagerId:[],
      Department:"",
    Skills:[],
    City:"",
    Gender:"",
    DOB:null
})
    }
    catch(err){
console.error(err);
    }
   
  }
  //form event 
  const handleFormChange=(fieldValue:keyof IFunctionalFormState,value:boolean|string|number)=>{
    setFormData(prev=>({...prev,[fieldValue]:value}))
  }

  //get Admins
  const getAdmin=(items:any[])=>{
    if(items.length>0){
      setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}))
    }
    else{
      setFormData(prev=>({...prev,Admin:"",AdminId:""}))
    }
  }
  //get Managers
  const getManagers=(items:any)=>{
    const managersName=items.map((i:any)=>i.text);
    const managersNameId=items.map((i:any)=>i.id);
    setFormData(prev=>({...prev,Manager:managersName,ManagerId:managersNameId}))
  }
  //Skills event
  const onSkillslsChange=(event:React.FormEvent<HTMLInputElement>,options:IDropdownOption):void=>{
    const selectedKey=options.selected?[...formData.Skills,options.key as string]:formData.Skills.filter((key)=>key!==options.key);
    setFormData(prev=>({...prev,Skills:selectedKey}));

  }
  return(
    <>
    <TextField
    label='Name'
    value={formData.Name}
    onChange={(_,value)=>handleFormChange("Name",value||"")}
    placeholder='Enter your name'
    iconProps={{iconName:'people'}}
    />
      <TextField
    label='Email'
    value={formData.Email}
    onChange={(_,value)=>handleFormChange("Email",value||"")}
    placeholder='Enter your email'
    iconProps={{iconName:'mail'}}
    />
      <TextField
    label='Age'
    value={formData.Age}
    onChange={(_,value)=>handleFormChange("Age",value||0)}
  
    
    />
       <TextField
    label='Salary'
    value={formData.Salary}
    onChange={(_,value)=>handleFormChange("Salary",value||0)}
  
    prefix='$'
    suffix='USD'
    />
    <Slider
    value={formData.Score}
    onChange={(value)=>handleFormChange("Score",value
    )}
    min={1}
    max={100}
    step={1}
    />
    <PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true} // when you hover on the textbox it will show tooltip
    onChange={getAdmin}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    ensureUser={true} 
    defaultSelectedUsers={[formData.Admin?formData.Admin:""]}
    webAbsoluteUrl={props.siteurl}
    />
    <PeoplePicker
    context={props.context as any}
    titleText="Managers"
    personSelectionLimit={3}
    showtooltip={true} // when you hover on the textbox it will show tooltip
    onChange={getManagers}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    ensureUser={true} 
    defaultSelectedUsers={formData.Manager}
    webAbsoluteUrl={props.siteurl}
    />
    {/* Dropdwon */}
    <Dropdown
    options={props.departmentOptions}
    placeholder='--select--'
    selectedKey={formData.Department}
    label="Department"
    onChange={(_,val)=>handleFormChange("Department",val?.key as string)}
    />
    {/* Lookup */}
     <Dropdown
    options={props.cityOptions}
    placeholder='--select--'
    selectedKey={formData.City}
    label="City"
    onChange={(_,val)=>handleFormChange("City",val?.key as string)}
    />
    {/* Radio button */}
     <ChoiceGroup
    options={props.genderOptions}
   
    selectedKey={formData.Gender}
    label="Gender"
    onChange={(_,val)=>handleFormChange("Gender",val?.key as string)}
    />
    {/* Multi select dropdown */}
     <Dropdown
    options={props.skillsOptions}
    placeholder='--select--'
    // selectedKey={formData.City}
    defaultSelectedKeys={formData.Skills}
    label="Skills"
    // onChange={(_,val)=>handleFormChange("City",val?.key as string)}
    onChange={onSkillslsChange}
    multiSelect
    />
    {/* Date Picker */}
<DatePicker
label='Date of Birth'

strings={DatePickerStrings}
formatDate={FormateDate}
onSelectDate={(date)=>setFormData(prev=>({...prev,DOB:date}))}
/>
     <TextField
    label='Full Address'
    value={formData.FullAddress}
    onChange={(_,value)=>handleFormChange("FullAddress",value||"")}
    placeholder='Enter your full adress'
    iconProps={{iconName:'home'}}
    multiline
    rows={5}
    />
    <br/>
    <PrimaryButton
    text='Save' onClick={createform} iconProps={{iconName:'save'}}
    />
    </>
  )
}
export default FunctionalForm;


export const DatePickerStrings:IDatePickerStrings={
  months:["January","February","March","April","May","June","July","August","September","October","November","December"],
  shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  goToToday:"Go to today",
  prevMonthAriaLabel:"Previous month",
  nextMonthAriaLabel:"Next month",
  prevYearAriaLabel:"Previous year",
  nextYearAriaLabel:"Next year",

}

export const FormateDate=(date:any):string=>{
  var date1=new Date(date);
  //get year
  var year=date1.getFullYear();
  //get month
  var month=(1+date1.getMonth()).toString();
  month=month.length>1?month:'0'+month;
  //get day
  var day=date1.getDate().toString();
  day=day.length>1?day:'0'+day;
 return month+"-"+day+"-"+year;
}

