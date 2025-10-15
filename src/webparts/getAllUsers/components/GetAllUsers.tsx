import * as React from 'react';
// import styles from './GetAllUsers.module.scss';
import type { IGetAllUsersProps } from './IGetAllUsersProps';
import {MSGraphClientV3} from "@microsoft/sp-http";
import { DetailsList, PrimaryButton } from '@fluentui/react';

interface IUser{
  displayName:string;
  mail:string;
}

const  GetAllUsers:React.FC<IGetAllUsersProps>=(props)=>{
  const [userState,setUserState]=React.useState<IUser[]>([]);
  const getUsers=React.useCallback(()=>{
    props.graphClient.getClient('3')
    .then((msGraphClient:MSGraphClientV3)=>{
      msGraphClient.api('users').version('v1.0')
      .select('displayName,mail')
      .get((err,response)=>{
        if(err){
          console.error(`Error occurred while fetching users`,err);
          return;
        }
        const allUsers:IUser[]=response.value.map((result:any)=>({
          displayName:result.displayName,
          mail:result.mail
        }));
        setUserState(allUsers);
      });
    });
  },[props.graphClient]);
  return(
    <>
    <PrimaryButton text="Search Users" onClick={getUsers} iconProps={{iconName:'search'}}/>
    <br/>
    <DetailsList
    items={userState}
    />
    </>
  )
}
export default  GetAllUsers;