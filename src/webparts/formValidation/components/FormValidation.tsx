import * as React from 'react';
import styles from './FormValidation.module.scss';
import type { IFormValidationProps } from './IFormValidationProps';
import { FormikServiceClass } from '../../../UtilityFormikService/service';
import {sp} from "@pnp/sp/presets/all";
 import * as Yup from 'yup';
 import { Dialog } from '@microsoft/sp-dialog';
  import { Formik, FormikProps } from 'formik';
import { DatePicker, Dropdown, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
  const stackTokens={childrenGap:20}
const FormValidation:React.FC<IFormValidationProps>=(props)=>{
  const [service,SetService]=React.useState<FormikServiceClass|null>(null);
  React.useEffect(()=>{
sp.setup({
  spfxContext:props.context as any
});
SetService(new FormikServiceClass(props.siteurl));
  },[props.context,props.siteurl]);

  const validationForm=Yup.object().shape({
   name:Yup.string().required("Task name is required"),
   details:Yup.string().min(15,"Minimum 15 character must be required ").required("Task details are required"),
   startDate:Yup.date().required("Start Date is required"),
   endDate:Yup.date().required("End date is required"),
   projectName:Yup.string().required("Project name  is required"),
   emailAddress:Yup.string().email('Invalid email').required('Required'),
   phoneNumber:Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/,"Phone number must be 10 digit") 
  });

  const getFieldProps=(formik:FormikProps<any>,field:string)=>({
    ...formik.getFieldProps(field),errorMessage:formik.errors[field] as string
  });

  const createRecord=async(record:any)=>{
    try{
const item=await service?.createItems(props.ListName,{
  Title:record.name,
  StartDate:record.startDate,
  EndDate:record.endDate,
  ProjectName:record.projectName,
  PhoneNumber:record.phoneNumber,
  EmailAddress:record.emailAddress,
  TaskDetails:record.details
});
console.log(item);
Dialog.alert("Saved successfully");
    }
    catch(err){
console.error("err",err);
    }
  }
  return(
    <>
     <Formik
       initialValues={{
       name:"",
       projectName:"",
       emailAddress:"",
       phoneNumber:"",
       details:"",
       startDate:null,
       endDate:null
       }}
       validationSchema={validationForm}
       onSubmit={(values,helpers)=> {
         createRecord(values).then(()=>helpers.resetForm())
        
       }}
     >

      {(formik:FormikProps<any>)=>(
        <form onSubmit={formik.handleSubmit}>
<div className={styles.formValidation}>
  <Stack
  tokens={stackTokens}
  >
    <Label className={styles.lbl}>User Name</Label>

<PeoplePicker
    context={props.context as any}
  
    personSelectionLimit={1}
    showtooltip={true} // when you hover on the textbox it will show tooltip
 
    principalTypes={[PrincipalType.User]}
   disabled={true}
    ensureUser={true} 
    defaultSelectedUsers={[props.context.pageContext.user.displayName as any]}
    webAbsoluteUrl={props.siteurl}
    />
  <Label className={styles.lbl}>Task Name</Label>
  <TextField
  {...getFieldProps(formik,"name")}
  />
   <Label className={styles.lbl}>Email Address</Label>
  <TextField
  {...getFieldProps(formik,"emailAddress")}
  />
   <Label className={styles.lbl}>Phone Number</Label>
  <TextField
  {...getFieldProps(formik,"phoneNumber")}
  />
   <Label className={styles.lbl}>Project Name</Label>
  <Dropdown

options={[
  {key:'HR',text:'HR'},
  {key:'IT',text:'IT'},
  {key:'Finance',text:'Finance'},
]}
selectedKey={formik.values.projectName}
onChange={(_,val)=>formik.setFieldValue("projectName",val?.key as string)}
errorMessage={formik.errors.projectName as string}
/>
 <Label className={styles.lbl}>Start Date</Label>
 <DatePicker
 id="startDate"
 value={formik.values.startDate}
 textField={{...getFieldProps(formik,"startDate")}}
 onSelectDate={(date)=>formik.setFieldValue("startDate",date)}
 />
  <Label className={styles.lbl}>End Date</Label>
 <DatePicker
 id="endDate"
 value={formik.values.endDate}
 textField={{...getFieldProps(formik,"endDate")}}
 onSelectDate={(date)=>formik.setFieldValue("endDate",date)}
 />
  <Label className={styles.lbl}>Task Details</Label>
  <TextField
  {...getFieldProps(formik,"details")}
  multiline
  rows={5}
  />
  </Stack>
  <PrimaryButton
  className={styles.btn}
  text='Submit'
  type='submit'
  iconProps={{iconName:'save'}}
  />
  <PrimaryButton
  className={styles.btn}
  text='Cancel'
  iconProps={{iconName:'cancel'}}
  onClick={formik.handleReset as any}
  />
</div>
        </form>
      )}
     </Formik>
    </>
  )
}
export default FormValidation;
