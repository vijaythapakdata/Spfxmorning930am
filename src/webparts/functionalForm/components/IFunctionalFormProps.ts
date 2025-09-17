import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFunctionalFormProps {
 ListName:string;
 siteurl:string;
 context:WebPartContext;
 departmentOptions:any; //single selected 
 genderOptions:any; //radio button
 skillsOptions:any;//multiselect
 cityOptions:any;//lookup
}
