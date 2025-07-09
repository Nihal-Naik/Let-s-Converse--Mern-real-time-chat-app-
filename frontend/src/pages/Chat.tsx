import { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../lib/axios';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from "react-hook-form"
import { toBase64 } from '../lib/tobase64';
import Sidebar from '../components/Sidebar';
import Contactandsearch from '../components/Contactandsearch';
import Chatheader from '../components/Chatheader';
import Chatmessageinput from '../components/Chatmessageinput';
import Chatmessages from '../components/Chatmessages';
import { URL } from '../lib/socket-client';
import { io, Socket } from "socket.io-client";

type Inputs = {
  text: string
  image: FileList
}

type authuser = {
  name: string
  email: string
  avatar: string
  _id: string
}
type messagesauth = {
  _id: string
  senderId: string
  receiverId: string
  text: string
  image: string
  createdAt:string
}

const Chat = () => {
  const navigate = useNavigate()
  const [screenwidth, setscreenwidth] = useState(window.innerWidth)
  const [loggedinuser, setLoggedinuser] = useState<authuser | null>()
  const [contacts, setcontacts] = useState<authuser[] | null>()
  const [usertochatwith, setUsertochatwith] = useState<authuser | null>()
  const [chatcontainer, setChatcontainer] = useState(false)//for responsiveness
  const [chatcontainerformobile, setChatcontainerformobile] = useState(false)//for responsiveness
  const [messages, setmessages] = useState<messagesauth[]>([])
  const [isOnline, setIsOnline] = useState<string[] | null>()
  const [imgPreview, setImgPreview] = useState<string>('')
  const socketRef = useRef<Socket | null>(null);
  const autoscroll = useRef<HTMLDivElement | null>(null);
  const [ifMessagepresent, setIfMessagepresent] = useState(false)//to optimise loading atate
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {  },
  } = useForm<Inputs>()



  useEffect(() => {

    if (loggedinuser) {
      connecttosocket()
      getusers()
    } else {
      checkauth()
    }
    const detectscreenwidth = () => {
      setscreenwidth(window.innerWidth)
    }
    window.addEventListener('resize', detectscreenwidth)
    if (screenwidth < 1024) {
      setChatcontainerformobile(true)
      setChatcontainer(false)
    } else {
      setChatcontainer(true)
      setChatcontainerformobile(true)
    }


    return () => {
      window.removeEventListener('resize', detectscreenwidth)
    }

  }, [loggedinuser]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !usertochatwith?._id) return;

    

    getmessage()
    Subscribetomessage()

    return () => unsubscribefrommessages()
  }, [usertochatwith?._id]);


  const Subscribetomessage = () => {
    if (!usertochatwith?._id) return;
    socketRef.current?.on("newMessage", (newmessage) => {
      const messagesentfromselecteduser = newmessage.senderId === usertochatwith._id
      if (!messagesentfromselecteduser) return;
      setmessages((prev) => [...prev,newmessage])
    })
  }
  const unsubscribefrommessages = () => {
    socketRef.current?.off("newMessage")
  }

  const connecttosocket = () => {
    if (loggedinuser && !socketRef.current) {
      const socket = io(URL, { query: { userId: loggedinuser?._id } })
      socket.connect()
      socketRef.current = socket;

      socket.on("get_online_users", (userIDs) => {
        setIsOnline(userIDs)
      })

    }
  }

  const disconnectsocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect()
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsSubmitting(true)
      setImgPreview('')
      let base64img = "";
      const file = data.image?.[0];
      if (file) {
        base64img = await toBase64(file);
      }
      const res = await axiosInstance.post(`/message/sendmessage/${usertochatwith?._id}`, { text: data.text, image: base64img })
      setIsSubmitting(false)
      reset();
      setmessages((prev) => [
        ...prev,res.data
      ]);


    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg)
      } else {
        toast.error("Something went wrong!")
      }
    }
  }



  const checkauth = async () => {
    try {
      const res = await axiosInstance.get("/auth/checkauth")
      setLoggedinuser(res.data)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg)
        navigate('/login')
      } else {
        toast.error("unexpected error occured")
      }
    }
  }
  const getusers = async () => {
    try {
      const res = await axiosInstance.get("/message/getusers")
      setcontacts(res.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg)
      } else {
        toast.error("Unexpected error")
      }
    }
  }
  const getmessage = async () => {
    try {
      // setIsLoadingchats((prev)=>!prev)
      const res = await axiosInstance.get(`/message/getmessage/${usertochatwith?._id}`)
      // setIsLoadingchats((prev)=>!prev)
      if(!res.data){
        setIfMessagepresent(false)
        return
      }
      setIfMessagepresent(true)
      setmessages(res.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg)
      } else {
        toast.error("Unexpected error")
      }
    }
  }


  const handleuserchatdisplay = (user: authuser) => {
    if(user._id!=usertochatwith?._id){
      setmessages([])
    }
    setUsertochatwith(user)
    if (screenwidth < 1024) {
      setChatcontainer(true)
      setChatcontainerformobile(false)
    } else {
      setChatcontainer(true)
      setChatcontainerformobile(true)
    }
  }

  const handlelogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout")
      toast.success(res.data.msg)
      disconnectsocket()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg)
      } else {
        toast.error("Unexpected error")
      }
    }
  }

  return (
    <section className='h-screen w-full flex relative'>
      {chatcontainerformobile &&
        <>
          <Sidebar loggedinuser={loggedinuser} handlelogout={handlelogout} />
          <Contactandsearch contacts={contacts} handleuserchatdisplay={handleuserchatdisplay} />
        </>
      }

      {chatcontainer && usertochatwith ?
        (
          <div className='lg:w-[60%] w-[100%] relative bg-midnight-blue-100 '>
            <Chatheader setUsertochatwith={setUsertochatwith} usertochatwith={usertochatwith} screenwidth={screenwidth} setChatcontainerformobile={setChatcontainerformobile} setChatcontainer={setChatcontainer} isOnline={isOnline} />

            <Chatmessages isSubmitting={isSubmitting} ifMessagepresent={ifMessagepresent} usertochatwith={usertochatwith} messages={messages} loggedinuser={loggedinuser} autoscroll={autoscroll} />

            <Chatmessageinput  setValue={setValue} watch={watch} imgPreview={imgPreview} setimgPreview={setImgPreview} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />

          </div>
        ) : (
          <div className=' hidden w-[60%] relative bg-midnight-blue-100  lg:flex justify-center items-center'>
            <p className='text-4xl text-white'>Send messages... have fun!</p>
          </div>
        )


      }
      <Toaster />
    </section>
  )
}

export default Chat
