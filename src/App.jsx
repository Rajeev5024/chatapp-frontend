// App.jsx
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/styles/auth/ProtectRoute.jsx';
import {LayoutLoader}  from './components/layout/Loaders.jsx';
import axios from 'axios'
import {server} from "./constants/config.js"
import {useDispatch, useSelector} from "react-redux"
import { userExists, userNotExists } from './redux/reducers/auth';
import {Toaster} from "react-hot-toast"
import { SocketProvider } from './socket.jsx';
// import Home from './pages/Home.jsx';

const Home=lazy(()=>import("./pages/Home.jsx"))
const Login=lazy(()=>import("./pages/Login.jsx"))
const Chat=lazy(()=>import("./pages/Chat.jsx"))
const Group=lazy(()=>import("./pages/Group.jsx"))
const NotFound=lazy(()=>import("./pages/NotFound.jsx"))
const AdminLogin=lazy(()=>import("./pages/admin/AdminLogin.jsx"))
const Dashboard=lazy(()=>import("./pages/admin/Dashboard.jsx"))
const UsersMangement=lazy(()=>import("./pages/admin/UsersMangement.jsx"))
const ChatManagement=lazy(()=>import("./pages/admin/ChatManagement.jsx"))
const MessagesManagement=lazy(()=>import("./pages/admin/MessagesManagement.jsx"))


const App = () => {
//username-shushu,password-12345
  const { user, loader }=useSelector((state)=>state.auth)
 
  const dispatch=useDispatch()

  useEffect(()=>{
    axios
    .get(`${server}/api/v1/user/me`,{withCredentials:true})
    .then(({data})=>dispatch(userExists(data.user)))
    .catch((err)=>dispatch(userNotExists())) 
  },[dispatch])

  

  return loader?(<LayoutLoader/>):
  (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
      <Routes>

        <Route  
        element={
        <SocketProvider>
          <ProtectRoute user={user}/>
        </SocketProvider>} >

        <Route path='/' element={<Home/>}/>
        <Route path="/chat/:chatId" element={<Chat/>} />
        <Route path="/group" element={<Group/>} />
        </Route>

        <Route path="/login" element={<ProtectRoute user={!user} redirect='/'><Login/></ProtectRoute>} />
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='admin/dashboard' element={<Dashboard/>}/>
        <Route path='admin/users' element={<UsersMangement/>}/>

        <Route path='admin/chat' element={<ChatManagement/>}/>
        <Route path='admin/messages' element={<MessagesManagement/>}/>



        <Route path='*' element={<NotFound/>}/>

      </Routes>
      </Suspense>
      <Toaster position='bottom-center'/>
    </BrowserRouter>
  );
}

export default App;
