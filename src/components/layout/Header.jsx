import { AppBar,Typography, Box,Toolbar, IconButton, Tooltip, Backdrop, Badge} from "@mui/material"
import { orange } from "../../constants/color"
import {
	Add as AddIcon,
	Menu as MenuIcon,
	Search as SearchIcon,
	Group as GroupIcon,
	Logout as LogoutIcon, 
	Notifications as NotificationsIcon} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import React, { Suspense, useState } from 'react'

import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { userNotExists } from "../../redux/reducers/auth"
import { server } from "../../constants/config"
import { setIsMobileMenu, setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/misc"
import { resetCountNotification } from "../../redux/reducers/chat"


const SearchDialog=React.lazy(()=>import("../specific/Search"))
const NotificationDialog=React.lazy(()=>import("../specific/Notifications"))
const NewGroupDialog=React.lazy(()=>import("../specific/NewGroup"))

const Header = () => {
	
	const dispatch=useDispatch();

	const{isSearch,isNotification,isNewGroup}=useSelector(state=>state.misc)
	const {countNotifications} = useSelector(state=>state.chat)

	


	const navigate=useNavigate();

	const handleMobile=()=>{
		dispatch(setIsMobileMenu(true))
	}
	const openSearch=()=>{
		dispatch(setIsSearch(true));
	}
	const openNewGroup=()=>{
		dispatch(setIsNewGroup(true))
	}
	const openNotification=()=>{
		dispatch(setIsNotification(true))
		dispatch(resetCountNotification());
	}
	const navigateToGroup=()=>{
		navigate("/group")
	}

	const logoutHandler=async()=>{
		
		try {
			const {data}= await axios.get(`${server}/api/v1/user/logout`,{withCredentials:true});
			dispatch(userNotExists());
			toast.success(data.message)
		} catch (error) {
			console.log(error)
			toast.error(error?.response?.data?.message||"something went wrong")
		}
	}


  return (
	<>
	<Box
	sx={{flexGrow:1,}}
	height={"4rem"}>

	<AppBar
	position="static" sx={{bgcolor:orange,}}>
	<Toolbar>

		<Typography 
		variant="h6"
		sx={{display:{xs:"none",sm:"block"}}}>
			Chat App
		</Typography>

		<Box sx={{display:{xs:"block", sm:"none"}}} >
			<IconButton color="inherit" onClick={handleMobile} >
			<MenuIcon/>
			</IconButton>
		</Box>

		<Box sx={{flexGrow:1,}}></Box>

		<Box>

		<IconBtn title={"Search"} icon={<SearchIcon/>} onClick={openSearch} />

		<IconBtn title={"New Group"} icon={<AddIcon/>} onClick={openNewGroup} />

		<IconBtn title={"Manage Groups"} icon={<GroupIcon/>} onClick={navigateToGroup} />

		<IconBtn 
		title={"Notificaitons"} 
		icon={<NotificationsIcon/>} 
		onClick={openNotification} 
		value={countNotifications}
		/>


		<IconBtn title={"LogOut"} icon={<LogoutIcon/>} onClick={logoutHandler} />
		
		</Box>

	</Toolbar>
	</AppBar>

	</Box>
	{
	isSearch&&(
		<Suspense fallback={<Backdrop open/>}> <SearchDialog/> </Suspense>
	)
	}
	{
	isNotification&&(
		<Suspense fallback={<Backdrop open/>}> <NotificationDialog/> </Suspense>
	)
	}
	{
	isNewGroup&&(
		<Suspense fallback={<Backdrop open/>}> <NewGroupDialog/> </Suspense>
	)
	}

	</>
  )
}

const IconBtn=({title,icon,onClick,value})=>{
	return (
		<Tooltip title={title}>
		<IconButton color="inherit" size="large" onClick={onClick} >
			{value?<Badge badgeContent={value}>{icon}</Badge>:icon}
		</IconButton>
		</Tooltip>
	)
}

export default Header