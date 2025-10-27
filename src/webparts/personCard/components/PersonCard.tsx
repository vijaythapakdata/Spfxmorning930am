import * as React from 'react';
// import styles from './PersonCard.module.scss';
import type { IPersonCardProps } from './IPersonCardProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {GraphError,ResponseType} from "@microsoft/microsoft-graph-client";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Link, Persona, PersonaSize } from '@fluentui/react';

const PersonCard:React.FC<IPersonCardProps>=(props)=>{
  const [name,setName]=React.useState<string|any>("");
  const [email,setEmail]=React.useState<string|any>("");
  const [phone,setPhone]=React.useState<string|any>("");
  const [image,setImage]=React.useState<string|any>("");

  React.useEffect(()=>{
    props.graphClient.api('me')
    .get((err:GraphError,user:MicrosoftGraph.User)=>{
      if(!err&&user){
        setName(user.displayName||'');
        setEmail(user.mail||'');
        setPhone(user.businessPhones?.[0]||'');
      }
    });
    props.graphClient.api('me/photo/$value')
    .responseType(ResponseType.BLOB)
    .get((err:GraphError,photoResponse:Blob)=>{
      const bloburl=URL.createObjectURL(photoResponse);
      setImage(bloburl);
    })
  },[props.graphClient]);

  //render email
  const renderEmail=():React.ReactNode=>{
    return email?<Link href={`mailto:${email}`}>{email}</Link>:<div/>
  }
  const renderPhone=():React.ReactNode=>{
    return phone?<Link href={`tel:${phone}`}>{phone}</Link>:<div/>
  }
  return(
    <>
    <Persona
    text={name}
    secondaryText={email}
    onRenderSecondaryText={renderEmail}
    tertiaryText={phone}
    onRenderTertiaryText={renderPhone}
    imageUrl={image}
    size={PersonaSize.size100}
    />
    </>
  )
}
export default PersonCard;
