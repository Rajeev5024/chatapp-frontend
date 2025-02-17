import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from '../styles/StyledComponents'
import { memo } from 'react'
import AvatarCard from './AvatarCard'
import {motion} from "framer-motion"
const Chatitem = ({
	avatar=[],
	name,
	_id,
	groupChat=false,
	sameSender,
	isOnline,
	newMessageAlert,
	index=0,
	handleDeleteChat,
}) => {
  return (
	<Link 
	sx={{padding:"0"}}
	to={`/chat/${_id}`}
		onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}
	>
		<motion.div 
		initial={{opacity:0,y:"-100%"}}
		whileInView={{opacity:1,y:0}}
		transition={{delay:index*0.1}}
		style={{
			display:"flex",
			gap:"1rem",
			alignItems:"center",
			padding:"1rem",
			backgroundColor:sameSender?"black":"unset",
			color:sameSender?"white":"unset",
			position:"relative",
		}}
		>
			<AvatarCard avatar={avatar} />

			<Stack>
				<Typography sx={{color:"whitesmoke"}}>{name}</Typography>
				{
				newMessageAlert&&(
					<Typography sx={{color:"rgba(144,238,144,1)"}}>{newMessageAlert.count} New Messages</Typography>
				)
				}
			</Stack>
			{isOnline && (
				<Box
				sx={{
					width:"10px",
					height:"10px",
					borderRadius:"50%",
					backgroundColor:"green",
					position:"absolute",
					top:"50%",
					right:"1rem",
					transform:"translateY(-50%)",

				}}
				/>
			)}

		</motion.div>
	</Link>
  )
}

export default memo(Chatitem)