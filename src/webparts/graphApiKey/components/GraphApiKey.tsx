import * as React from 'react';
// import styles from './GraphApiKey.module.scss';
import type { IGraphApiKeyProps } from './IGraphApiKeyProps';


const GraphApiKey:React.FC<IGraphApiKeyProps>=(props)=>{
  return(
    <>
    <div>
      <img src={props.apolloMissionImage.links[0].href} alt={props.apolloMissionImage.data[0].title} width="300px"/>
    </div>
    <div>
      <strong>Title:{props.apolloMissionImage.data[0].title}</strong>
    </div>
    <div>
     <ul>
      {props.apolloMissionImage&&props.apolloMissionImage.data[0].keywords.map((keyword:string)=>
        <li key={keyword}>{keyword}</li>
      )}
      </ul> 
    </div>
    </>
  )
}
export default GraphApiKey;
