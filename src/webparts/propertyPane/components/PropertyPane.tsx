import * as React from 'react';
// import styles from './PropertyPane.module.scss';
import type { IPropertyPaneProps } from './IPropertyPaneProps';
import { escape } from '@microsoft/sp-lodash-subset';

const PropertyPane:React.FC<IPropertyPaneProps>=(props)=>{
  return(
    <>
    <div>
      <strong>ListName: </strong> {escape(props.ListName)}
    </div>
    <div>
      <strong>Department: </strong> {escape(props.DropdownOption)}
    </div>
    <div>
      <strong>Gender: </strong> {escape(props.ChoiceGroupOption)}
    </div>
    <div> 
      <strong>Toggle: </strong> {props.ToggleOption? 'ON':'OFF'}
    </div>
     <div>
      <strong>Gender: </strong> {escape(props.SliderOption)}
    </div>
    </>
  )
}
export default PropertyPane;
