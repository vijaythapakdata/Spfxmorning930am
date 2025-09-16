import * as React from 'react';
// import styles from './FunctionalForm.module.scss';
import type { IFunctionalFormProps } from './IFunctionalFormProps';
import { IFunctionalFormState } from './IFunctionalFormState';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import {Dialog} from "@microsoft/sp-dialog";
import { PrimaryButton, Slider, TextField } from '@fluentui/react';
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
    ManagerId:[]
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
  ManagerId:{results:formData.ManagerId}
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
    ManagerId:[]
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