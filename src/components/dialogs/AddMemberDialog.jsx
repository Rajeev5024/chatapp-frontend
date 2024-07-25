import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/Hook'
import { useAddGroupMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { setIsAddMember } from '../../redux/reducers/misc'
import UserItem from "../shared/UserItem"

const AddMemberDialog = ({chatId}) => {
	const dispatch=useDispatch()
	const {isAddMember}=useSelector((state)=>state.misc)
	const {isLoading,data,isError,error}=useAvailableFriendsQuery(chatId)
	const [selectedMembers,setSelectedMembers]=useState([]);

	const [addMember,isLoadingAddMember]=useAsyncMutation(useAddGroupMemberMutation)

	 
	const selectMemberHandler=(id)=>{
	  setSelectedMembers((prev)=>prev.includes(id)?prev.filter((currElement)=>currElement!==id):[...prev,id])
	}
	
	const addMemberSubmitHandler=()=>{
		addMember("Adding members...",{members:selectedMembers,chatId})
		closeHandler();
	}

	const closeHandler=()=>{
		dispatch(setIsAddMember(false))
	}

	useErrors([{isError,error}])

  return (
	<Dialog open={isAddMember} onClose={closeHandler}>
		<Stack spacing={"2rem"} width={"20rem"} p={"2rem"} >
			<DialogTitle textAlign={"center"}>Add Member</DialogTitle>
			<Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
			<Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
			<Button color='error' onClick={closeHandler} >Cancel</Button>
			<Button variant='contained' disabled={isLoadingAddMember} onClick={addMemberSubmitHandler} >Add</Button>
			</Stack>

		</Stack>
	</Dialog>
)
}

export default AddMemberDialog