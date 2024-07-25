import React from 'react'
import AppLayout from '../components/layout/AppLayout';
import { Box, Typography } from '@mui/material';
import { bgGradient, gray } from '../constants/color';
const Home = () => {
  return (
    <Box sx={{backgroundImage:bgGradient}} height={"100%"} >
	<Typography p={"2rem"} variant="h5" textAlign={"center"} color="white">Select a friend to a chat</Typography>
    </Box>
  )
}

export default AppLayout()(Home);
 