import * as React from 'react';
// import styles from './Pagination.module.scss';
import type { IPaginationProps } from './IPaginationProps';
import {sp} from "@pnp/sp/presets/all";
import { Table,Input } from 'antd';
const  Pagination:React.FC<IPaginationProps>=(props)=>{
  const [items,setItems]=React.useState<any[]>([]);
  const[searchText,setSearchText]=React.useState<string>('');

React.useEffect(()=>{
  sp.setup({
    spfxContext:props.context as any
  });

  sp.web.lists.getByTitle(props.ListName).items.select("Id","Title","EmailAddress","Age","Admin/Title","City/Title").expand("Admin","City").get().then((data)=>{
    const _readItems=data.map((e)=>({
      key:e.Id,
      Title:e.Title,
      EmailAddress:e.EmailAddress,
      Age:e.Age,
      Admin:e.Admin?.Title,
      City:e.City?.Title
    }));
    setItems(_readItems)
  })
  .catch((err)=>{
    console.error("Errro while reading the items",err)
  })
},[props.context]);

const columns=[
  {
    title:"Name",
    dataIndex:"Title",
    key:"Title",
    sorter:(a:any,b:any)=>a.Title?.localeCompare(b.Title)
  },
    {
    title:"Email Address",
    dataIndex:"EmailAddress",
    key:"EmailAddress",
    sorter:(a:any,b:any)=>a.EmailAddress?.localeCompare(b.EmailAddress)
  },
  {
    title:"Age",
    dataIndex:"Age",
    key:"Age"
  },
  {
    title:"Admin",
    dataIndex:"Admin",
    key:"Admin"
  },
  {
    title:"City",
    dataIndex:"City",
    key:"City"
  }
]
//Search box
const handleSearch=(event:React.ChangeEvent<HTMLInputElement>)=>{
  setSearchText(event.target.value)
}

//hanling searching
const _filteredSearch=items.filter((item)=>(item?.Title?.toLowerCase()||'').includes(searchText.toLowerCase())||
(item?.EmailAddress?.toLowerCase()||'').includes(searchText.toLowerCase())||(item?.Admin?.toLowerCase()||'')
.includes(searchText.toLowerCase())||
(item?.City?.toLowerCase()||'').includes(searchText.toLowerCase())
)
  return(
    <>
    <Input
    placeholder='search here...'
    value={searchText}
    onChange={handleSearch}
    />
    <Table
    dataSource={_filteredSearch}
    columns={columns}
    pagination={{pageSize:5}}
    />
    </>
  )
}
export default  Pagination;
