import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { setIsDeleteMenu } from '../../redux/reducers/misc'
import { useSelector } from 'react-redux'
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import { useAsyncMutation } from '../../hooks/Hook'
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api'
import { useNavigate } from 'react-router'

const DeleteChatMenu = ({dispatch,deleteMenuAnchor}) => {

	const navigate=useNavigate()
	const {isDeleteMenu,selectDeleteChat}=useSelector((state)=>state.misc)

	const [deleteChat,_,deleteChatData]=useAsyncMutation(useDeleteChatMutation)

	const [leaveGroup,__,leaveGroupData]=useAsyncMutation(useLeaveGroupMutation)
	
	const isGroup=selectDeleteChat.groupChat;

	const closeHandler=()=>{
		dispatch(setIsDeleteMenu(false));
		deleteMenuAnchor.current=null;
	}

	const leaveGroupHandler=()=>{
		closeHandler();
		leaveGroup("leaving group...",selectDeleteChat.chatId);
	}
	const unfriendDeleteChatHandler=()=>{
		closeHandler();
		deleteChat("Deleting Chat...",selectDeleteChat.chatId);
	}

	useEffect(()=>{
		if(deleteChatData||leaveGroupData)navigate("/")
	},[deleteChatData,leaveGroupData])

  return (
	<Menu 
	open={isDeleteMenu} 
	onClose={closeHandler} 
	anchorEl={deleteMenuAnchor.current}
	anchorOrigin={{
		vertical:"bottom",
		horizontal:"right",
	}}
	transformOrigin={{
		vertical:"center",
		horizontal:"center",
	}}
	>
		<Stack
		sx={{
			width:"10rem",
			padding:"0.5rem",
			cursor:"pointer",
		}}
		direction={"row"}
		alignItems={"center"}
		spacing={"0.5rem"}
		onClick={isGroup?leaveGroupHandler:unfriendDeleteChatHandler}
		>
		{isGroup?(<><ExitToAppIcon/><Typography>Leave Group</Typography></>):
		(<><DeleteIcon/><Typography>Delete Chat</Typography></>)}
		</Stack>
	</Menu>
  )
}

export default DeleteChatMenu;