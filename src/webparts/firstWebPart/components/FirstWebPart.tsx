import * as React from 'react';
// import styles from './FirstWebPart.module.scss';
import type { IFirstWebPartProps } from './IFirstWebPartProps';


const FirstWebPart:React.FC<IFirstWebPartProps>=(props)=>{
  return(
    <>
    
    hello
    {props.description}
    </>
  )
}
export default FirstWebPart;