import * as React from 'react';
// import styles from './FunctionalForm.module.scss';
import type { IFunctionalFormProps } from './IFunctionalFormProps';
import { IFunctionalFormState } from './IFunctionalFormState';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import {Dialog} from "@microsoft/sp-dialog";
const FunctionalForm:React.FC<IFunctionalFormProps>=(props)=>{
  const [formData,setFormData]=React.useState<IFunctionalFormState>({
    Name:"",
    Email:"",
    Age:"",
    Salary:"",
    Score:1,
    FullAddress:""
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
  Address:formData.FullAddress
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
    FullAddress:""
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
  return(
    <>
    </>
  )
}
export default FunctionalForm;