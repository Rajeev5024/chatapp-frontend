import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Title from "../shared/Title"
import { Drawer, Grid, Skeleton } from "@mui/material";
import  ChatList  from "../specific/ChatList"
import { useNavigate, useParams } from "react-router";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu, setIsMobileMenu, setSelectDeleteChat } from "../../redux/reducers/misc";
import { useErrors, useSocketEvents } from "../../hooks/Hook";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/event";
import { increamentNotification, setNewMessageAlert } from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import { bgGradient } from "../../constants/color";

const AppLayout = () => (WrappedComponent) => {

	return (props)=>{

		const dispatch=useDispatch();

		const params=useParams();
		const chatId=params.chatId;

		const [onlineUsers,setOnlineUsers]=useState([]);

		const navigate=useNavigate()
		const socket=getSocket();
		const deleteMenuAnchor=useRef(null)

		const {user}=useSelector((state)=>state.auth);

		const {isMobileMenu}=useSelector((state)=>state.misc);

		const {newMessageAlert}=useSelector((state)=>state.chat);

		const {isLoading,data,isError,error,refetch} =useMyChatsQuery("")



		useErrors([{isError,error}]);

		const handleDeleteChat=( e ,chatId,groupChat)=>{
			dispatch(setIsDeleteMenu(true))
			dispatch(setSelectDeleteChat({chatId,groupChat}))
			deleteMenuAnchor.current=e.currentTarget;
		}

		useEffect(()=>{
			getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessageAlert})
		}, [newMessageAlert])

		

		const handleMobileClose=()=>dispatch(setIsMobileMenu(false));

		const newMessageAlertListener=useCallback((data)=>{
			if(data.chatId===chatId)return ;
			dispatch(setNewMessageAlert(data));
		},[chatId])

		const newRequestListener=useCallback(()=>{
			dispatch(increamentNotification());
		},[dispatch])

		const refetchListener=useCallback(()=>{
			refetch();
			navigate("/")
		},[refetch,navigate])

		const onlineUsersListeners=useCallback((data)=>{
			setOnlineUsers(data);
		},[onlineUsers])

		const eventHandlers = {
			[REFETCH_CHATS]:refetchListener,
			[NEW_MESSAGE_ALERT]:newMessageAlertListener,
			[NEW_REQUEST]:newRequestListener,
			[ONLINE_USERS]:onlineUsersListeners,
		}

  		useSocketEvents(socket,eventHandlers)

		return(
		  <>
		  	<Title />
			<Header/>
			<DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
			{	isLoading?(<Skeleton/>):
				(
					<Drawer open={isMobileMenu} onClose={handleMobileClose}>
					<ChatList 
					w="70vw"
					chats={data?.chats} 
					chatId={chatId}
					handleDeleteChat={handleDeleteChat}
					newMessagesAlert={newMessageAlert}
					onlineUsers={onlineUsers}
					 />
					</Drawer>
				)
				}
			<Grid container height={"calc(100vh - 4rem)"} >
				<Grid 
				item 
				sm={4}
				md={3}
				sx={{
					display:{xs:"none",sm:"block"},
				}}
				height={"100%"}>

				{	isLoading?(<Skeleton/>):
				(
					<ChatList 
					chats={data?.chats} 
					chatId={chatId}
					handleDeleteChat={handleDeleteChat}
					newMessagesAlert={newMessageAlert}
					onlineUsers={onlineUsers}
					 />
				)

				}
					
				</Grid>

				<Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
					<WrappedComponent {...props} chatId={chatId} user={user}/>
				</Grid>

				<Grid 
				item 
				md={4} 
				lg={3} 
				height={"100%"} 
				sx={{
					display:{xs:"none",md:"block"},
					padding:"2rem",
					backgroundImage:bgGradient,
				}}>

				<Profile user={user}/>

				</Grid>


			</Grid>
			
			
		  </>
		)
	  }
}

export default AppLayout;
	