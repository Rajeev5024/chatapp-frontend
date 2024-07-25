import { ListItem, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc'
import { AudioFile as AudioFileIcon, Image as ImageIcon, UploadFile as UploadFileIcon, VideoFile as VideoFileIcon} from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/api/api'

const FileMenu = ({anchorE1,chatId}) => {

	const {isFileMenu}=useSelector((state)=>state.misc)

	const dispatch=useDispatch()
	const [sendAttachments]=useSendAttachmentsMutation()
	
	const audioRef=useRef(null);
	const imageRef=useRef(null);
	const videoRef=useRef(null);
	const fileRef=useRef(null);
	
	const selectImage=()=>imageRef.current?.click();
	const selectAudio=()=>audioRef.current?.click();
	const selectVideo=()=>videoRef.current?.click();
	const selectFile=()=>fileRef.current?.click();
	
	const closeFileMenu=()=>{
		dispatch(setIsFileMenu(false))
	}
	
	const fileChangeHandler= async(e,key)=>{
		const files=Array.from(e.target.files);
		if(files.length<=0)return 0;
		if(files.length>5)return toast.error(`You can only send 5${key} at a time`)

		dispatch(setUploadingLoader(true));
		const toastId=toast.loading(`Sending${key}...`)
		closeFileMenu();

		try {
			//fetching here
			const myForm =new FormData();

			myForm.append("chatId",chatId);
			files.forEach((file)=>myForm.append("files",file))

			const res= await sendAttachments(myForm);

			if(res.data) toast.success(`${key} sent succesfully`,{id:toastId})
			else toast.error(`Failed to send ${key}`, {id:toastId})
			
		} catch (error) {
			toast.error(error,{id:toastId});
		}
		finally{
			dispatch(setUploadingLoader(false))
		}
		
	}

  return (
	<Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu}>
		<div style={{width:"10rem"}}>
		<MenuList>
			<MenuItem onClick={selectImage}>
			<Tooltip title="image">
				<ImageIcon/>
			</Tooltip>
			<ListItem style={{marginLeft:"0.5rem"}}>
				Image
			</ListItem>
			<input 
			type='file'
			multiple 
			accept='image/png, image/jpeg, image/gif'
			style={{display:"none"}}
			onChange={(e)=>fileChangeHandler(e,"Images")}
			ref={imageRef}
			/>
			</MenuItem>

			<MenuItem onClick={selectAudio}>
			<Tooltip title="audio">
				<AudioFileIcon/>
			</Tooltip>
			<ListItem style={{marginLeft:"0.5rem"}}>
				Audio
			</ListItem>
			<input 
			type='file'
			multiple 
			accept='audio/mpeg, audio/wav'
			style={{display:"none"}}
			onChange={(e)=>fileChangeHandler(e,"Audios")}
			ref={audioRef}
			/>
			</MenuItem>

			<MenuItem onClick={selectVideo}>
			<Tooltip title="video">
				<VideoFileIcon/>
			</Tooltip>
			<ListItem style={{marginLeft:"0.5rem"}}>
				Video
			</ListItem>
			<input 
			type='file'
			multiple 
			accept='video/mp4, video/webm, image/ogg'
			style={{display:"none"}}
			onChange={(e)=>fileChangeHandler(e,"Videos")}
			ref={videoRef}
			/>
			</MenuItem>
		
			<MenuItem onClick={selectFile}>
			<Tooltip title="file">
				<UploadFileIcon/>
			</Tooltip>
			<ListItem style={{marginLeft:"0.5rem"}}>
				File
			</ListItem>
			<input 
			type='file'
			multiple 
			accept='*'
			style={{display:"none"}}
			onChange={(e)=>fileChangeHandler(e,"Files")}
			ref={fileRef}
			/>
			</MenuItem>

		</MenuList>
		</div>
	</Menu>
  )
}

export default FileMenu