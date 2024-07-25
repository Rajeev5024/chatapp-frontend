import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery,useNewGroupMutation } from '../../redux/api/api'
import { useErrors, useAsyncMutation } from '../../hooks/Hook'
import { setIsNewGroup } from '../../redux/reducers/misc'
import toast from "react-hot-toast";
const NewGroup = () => {

  const dispatch=useDispatch();
  const {isNewGroup}=useSelector(state=>state.misc)

  const {isError,isLoading,error,data}=useAvailableFriendsQuery();

  const [NewGroup,isLoadingNewGroup]=useAsyncMutation(useNewGroupMutation)

  const [selectedMembers,setSelectedMembers]=useState([]);


  const errors=[{
    isError,
    error,
  }]
  useErrors(errors);
   
  const selectMemberHandler=(id)=>{
    setSelectedMembers((prev)=>prev.includes(id)?prev.filter((currElement)=>currElement!==id):[...prev,id])
  }
  
  const groupName=useInputValidation("")

  const submitHandler=()=>{
    if(!groupName.value)return toast.error("Group name is required");
    if(selectedMembers.length<2)return toast.error("Please select atleast 3 members");

    NewGroup("Creating a new group",{name:groupName.value,members:selectedMembers});
  
    CloseHandler()
   }

  const CloseHandler=()=>{
    dispatch(setIsNewGroup(false));
  }

  return (
    <Dialog open={isNewGroup} onClose={CloseHandler} >

      <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"} spacing={"2rem"}>
      <DialogTitle textAlign={"center"} variant='h4' >New Group</DialogTitle>
      <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
      <Typography>members</Typography>
      <Stack>
      {isLoading?(<Skeleton/>):(
            data?.friends?.map((i)=>(
              <UserItem 
              user={i} 
              key={i._id} 
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
      </Stack>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Button variant='text' color='error' size='large' onClick={CloseHandler} >Cancel</Button>
        <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingNewGroup} >Create</Button>
      </Stack>
    </Stack>

  </Dialog>
  )
}

export default NewGroup