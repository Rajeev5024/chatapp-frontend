import { Avatar, Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';

import { useFetchData } from '6pp';
import AvatarCard from "../../components/shared/AvatarCard";
import { server } from '../../constants/config';
import { useErrors } from '../../hooks/Hook';
import { transformImage } from '../../lib/features';
const columns=[


	{
	field:"id",
	headerName:"ID",
	headerClassName:"table-header",
	width:200,
},
{
	field:"avatar",
	headerName:"Avatar",
	headerClassName:"table-header",
	width:150,
	renderCell:(params)=><AvatarCard avatar={params.row.avatar} />,
},
{
	field:"name",
	headerName:"Name",
	headerClassName:"table-header",
	width:200,
},
{
	field:"groupChat",
	headerName:"Group",
	headerClassName:"table-header",
	width:300,
},
{
	field:"totalMembers",
	headerName:"Total Members",
	headerClassName:"table-header",
	width:200,
},
{
	field:"members",
	headerName:"Members",
	headerClassName:"table-header",
	width:200,
	renderCell:(params)=>(<AvatarCard max={100} avatar={params.row.members}/>)
},
{
	field:"totalMessages",
	headerName:"Total Messages",
	headerClassName:"table-header",
	width:200,
},
{
	field:"creator",
	headerName:"Created By",
	headerClassName:"table-header",
	width:250,
	renderCell:(params)=>(
		<Stack direction="row" alignItems="center" spacing={"1rem"} >
			<Avatar alt={params.row.creator.name} src={params.row.creator.avatar}/>
			<span>{params.row.creator.name}</span>
		</Stack>
	)
},
];

const ChatManagement = () => {
	const {loading,data,error}=useFetchData(`${server}/api/v1/admin/chats`,"dashboard-chats")
	const [rows,setRows]=useState([]);
	useEffect(()=>{
		if(data){setRows(
			data.chats.map((i)=>({
				...i,
				id:i._id,
				avatar:i.avatar.map((i)=>transformImage(i,50)),
				members:i.members.map((i)=> transformImage(i.avatar,50)),
			}))
		)}
	},[data])

	useErrors([{isError:error,error:error}])
  return (
	<AdminLayout>
		{loading?(<Skeleton height={"100vh"}/>):(<Table heading={"All Chats"} columns={columns} rows={rows}/>)}
	</AdminLayout>
  )
}

export default ChatManagement