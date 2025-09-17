import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'FunctionalFormWebPartStrings';
import FunctionalForm from './components/FunctionalForm';
import { IFunctionalFormProps } from './components/IFunctionalFormProps';

export interface IFunctionalFormWebPartProps {
  ListName: string;
  cityOptions:any;
}
export default class FunctionalFormWebPart extends BaseClientSideWebPart<IFunctionalFormWebPartProps> {
  public async render(): Promise<void> {
    const cityopt=await this.getLookupValue();
    const element: React.ReactElement<IFunctionalFormProps> = React.createElement(
      FunctionalForm,
      {
       ListName: this.properties.ListName,
        context:this.context,
        siteurl:this.context.pageContext.web.absoluteUrl,
        departmentOptions:await this.getChoiceFields(this.context.pageContext.web.absoluteUrl,this.properties.ListName,'Department'),
        genderOptions:await this.getChoiceFields(this.context.pageContext.web.absoluteUrl,this.properties.ListName,'Gender'),
        skillsOptions:await this.getChoiceFields(this.context.pageContext.web.absoluteUrl,this.properties.ListName,'Skills'),
        cityOptions:cityopt
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  //get choice
  private async getChoiceFields(siteurl:string,ListName:string,fieldName:string):Promise<any>{
    try{
      const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListName}')/fields?$filter=EntityPropertyName eq '${fieldName}'`,{

        method:'GET',
        headers:{
          'Accept':'application/json;odata=nometadata'
        }
      });
      if(!response.ok){
        throw new Error(`Error while fetching the ch choice fields :${response.status}`);
      }
      const data=await response.json();
      const choices=data.value[0].Choices;
      return choices.map((choice:any)=>({
        key:choice,
        text:choice
      }))
    }
    catch(err){
      console.error(err);
      return [];
    }
  }

  //get lookup value
  private async getLookupValue():Promise<any[]>{
    try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Cities')/items?$select=Title,ID`,{
  method:'GET',
  headers:{

    'Accept':'application/json;odata=nometadata'
  }
});
 if(!response.ok){
        throw new Error(`Error while fetching the ch choice fields :${response.status}`);
      }
      const data=await response.json();
      return data.value.map((city:{ID:string,Title:string})=>({
        key:city.ID,
        title:city.Title
      }));
    }
    catch(err){
console.error(err);
return []
    }
  }
}
