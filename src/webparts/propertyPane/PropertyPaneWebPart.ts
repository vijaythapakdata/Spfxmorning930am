import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,PropertyPaneDropdown,PropertyPaneChoiceGroup,PropertyPaneToggle,PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'PropertyPaneWebPartStrings';
import PropertyPane from './components/PropertyPane';
import { IPropertyPaneProps } from './components/IPropertyPaneProps';

export interface IPropertyPaneWebPartProps {
  ListName:string; //textfield
 DropdownOption:string;
 ChoiceGroupOption:string;
 ToggleOption:boolean;
 SliderOption:any
}

export default class PropertyPaneWebPart extends BaseClientSideWebPart<IPropertyPaneWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IPropertyPaneProps> = React.createElement(
      PropertyPane,
      {
       ListName:this.properties.ListName,
       DropdownOption:this.properties.DropdownOption,
       ChoiceGroupOption:this.properties.ChoiceGroupOption,
       ToggleOption:this.properties.ToggleOption,
       SliderOption:this.properties.SliderOption
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
// protected get disableReactivePropertyChanges():boolean{
//   return true;
// }
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
                }),
                PropertyPaneDropdown('DropdownOption',{
                  label:'Department',
                  options:[
                    {key:'IT',text:'IT'},
                    {key:'HR',text:'HR'}
                  ],
                  
                }),
                PropertyPaneChoiceGroup('ChoiceGroupOption',{
                  label:"Gender",
                  options:[
                    {key:"Male",text:"Male"},
                    {key:"Female",text:"Female"}
                  ]
                }),
                PropertyPaneToggle('ToggleOption',{
                  label:'Toggle',
                  onText:'ON',
                  offText:'OFF',
                  
                }),
                PropertyPaneSlider('SliderOption',{
                  label:'Score',
                  min:1,
                  max:100,
                  step:1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
