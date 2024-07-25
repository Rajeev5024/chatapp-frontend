import {
	Close as CloseIcon,
	Dashboard as DashboardIcon,
	ExitToApp as ExitToAppIcon,
	Group as GroupIcon,
	ManageAccounts as ManageAccountsIcon,
	Menu as MenuIcon, Message as MessageIcon
} from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkComponent, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { matblack } from '../../constants/color';
import { adminLogout } from '../../redux/thunk/admin';

const Link = styled(LinkComponent)`
	text-decoration:none;
	border-radius:2rem;
	padding:1rem 2rem;
	color:black;
	&:hover{
	color:rgba(0,0,0,0.54);
	}`;


export const adminTabs = [
	{
		name: "Dashboard",
		path: "/admin/dashboard",
		icon: <DashboardIcon />,
	},
	{
		name: "Users",
		path: "/admin/users",
		icon: <ManageAccountsIcon />,
	},
	{
		name: "Chat",
		path: "/admin/chat",
		icon: <GroupIcon />,
	},
	{
		name: "Messages",
		path: "/admin/messages",
		icon: <MessageIcon />,
	},
]
const Sidebar = ({ w = "100%" }) => {
	const location = useLocation();
	const navigate=useNavigate();
	const dispatch=useDispatch()

	const logoutHandler = () => {
		dispatch(adminLogout())
        .unwrap()
        .then(() => {
            navigate('/admin');
        })
        .catch((error) => {
            console.error('Logout failed:', error);
        });
	}
	return (
		<Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}  >
			<Typography variant="h5" textTransform={"uppercase"} >
				Chat app
			</Typography>

			<Stack spacing={"1rem"} >
				{
					adminTabs.map((tab) => (
						<Link key={tab.path} to={tab.path}
							sx={location.pathname === tab.path && {
								bgcolor: matblack,
								color: "white",
								":hover": { color: "white" },

							}}
						>
							<Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
								{tab.icon}
								<Typography>{tab.name}</Typography>
							</Stack>

						</Link>
					))
				}
				<Link onClick={logoutHandler}>
					<Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
						<ExitToAppIcon />
						<Typography>Logout</Typography>
					</Stack>

				</Link>
			</Stack>
		</Stack>
	)
};


const AdminLayout = ({ children }) => {

	const {isAdmin}=useSelector((state)=>state.auth)
	const [isMobile, setIsMobile] = useState(false);

	const handleMobile = () => {
		setIsMobile(!isMobile);
	}

	const handleClose = () => {
		setIsMobile(false);
	}
	if(!isAdmin)<Navigate to="/admin" />
	return (
		<Grid container minHeight={"100vh"} >
			<Box sx={{
				display: { xs: "block", md: "none" },
				position: "fixed",
				right: "1rem",
				top: "1rem",
			}}>
				<IconButton onClick={handleMobile}>
					{
						isMobile ? <CloseIcon /> : <MenuIcon />
					}
				</IconButton>
			</Box>
			<Grid item md={4} lg={3}
					sx={{
					display: {
					xs: "none", md: "block",}
				}}>
				<Sidebar />
			</Grid>

			<Grid
				item
				xs={12} md={8} lg={9} sx={{ bgcolor: "gray", }}
			>
				{children}
			</Grid>
			<Drawer open={isMobile} onClose={handleClose}>
				<Sidebar w="50vw" />

			</Drawer>
		</Grid>
	)
}

export default AdminLayout