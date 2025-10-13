import * as React from 'react';
// import styles from './LargeList.module.scss';
import type { ILargeListProps } from './ILargeListProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { ServiceClassList } from '../../../UtilityLargeList/LargeListService';
import { DetailsList } from '@fluentui/react';
import { ILargeListState } from './ILargeListState';
const LargeList:React.FC<ILargeListProps>=(props)=>{
  const [ListResult,setListResult]=React.useState<ILargeListState[]>([]);
  const _service=new ServiceClassList(props.context);

  React.useEffect(()=>{
    const fetchData=async()=>{
      try{
        const result=await _service.getLargeListItems(props.ListName);
        setListResult(result);
      }
      catch(err){
        console.log("Eror while fetching data... ",err);
        throw err;
      }
    }
    fetchData();
  },[props.ListName,_service]);
  return(
    <>
    <DetailsList
    items={ListResult}
    />
    </>
  )
}
export default LargeList;
