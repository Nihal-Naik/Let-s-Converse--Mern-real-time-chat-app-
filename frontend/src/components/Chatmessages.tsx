import React, { useEffect, useRef, useState } from 'react'
import { timestamp } from '../lib/timestamp'
import { datestamp } from '../lib/datestamp'
import MessageSkeletons from './skeletons/MessageSkeletons'


type messagesauth = {
  _id: string
  senderId: string
  receiverId: string
  text: string
  image: string
  createdAt: string
}

type authuser = {
  name: string
  email: string
  avatar: string
  _id: string
}


interface Chatmessage {
  messages: messagesauth[] | null | undefined
  loggedinuser: authuser | null | undefined
  autoscroll: React.RefObject<HTMLDivElement | null>
  usertochatwith: authuser
  ifMessagepresent: boolean
  isSubmitting: boolean
}



const Chatmessages = ({ messages, loggedinuser, autoscroll,usertochatwith,ifMessagepresent,isSubmitting }: Chatmessage) => {
  const [meslen, setMeslen] = useState(0)
  const date = useRef<string>('')
  useEffect(() => {

    if (autoscroll.current && messages && meslen <= messages.length) {
      autoscroll.current.scrollIntoView({ behavior: 'instant' })
      setMeslen(messages.length)
    }
  }, [messages?.length])

  useEffect(()=>{
    if(isSubmitting){
      autoscroll.current?.scrollIntoView({ behavior: 'instant' })
      
    }
  },[isSubmitting])

  useEffect(()=>{
    setMeslen(0)
  },[usertochatwith._id])
  // console.log(messages)
  return (

    <div id='chat-scroll-container' className='w-[100%] h-[82%] overflow-auto box-border p-[2%]'>
      {messages && messages.length>0 ?( messages.map((item: messagesauth) => (
        <div key={item._id} className=''>
          {date.current != datestamp(item.createdAt)&& (date.current=datestamp(item.createdAt)) && <><p className='left-1/2 -translate-x-1/2 relative p-2 text-center bg-gray-600 mb-4 inline-block rounded-sm text-white'>{datestamp(item.createdAt)}</p></>}
          {loggedinuser?._id == item.senderId ?
            (
              <div className='grid mb-[2%] justify-end '>
                {item.image && <><img className='size-45 object-contain' src={item.image} alt="" /> <p className='text-xs text-white opacity-45'>{timestamp(item.createdAt)}</p></>}
                {item.text && <><p className='text-white bg-blue-400 px-4 py-2 box-content rounded-sm'>{item.text}</p> <p className='text-xs text-white opacity-45'>{timestamp(item.createdAt)}</p></>} 
              </div>
            ) : (
              <div className='grid mb-[2%] justify-start '>
                {item.image && <><img className='size-45 object-contain' src={item.image} alt="" /> <p className='text-xs text-white opacity-45'>{timestamp(item.createdAt)}</p></>}
                {item.text && <><p className='text-white bg-gray-800 px-4 py-2 box-content rounded-sm'>{item.text}</p> <p className='text-xs text-white opacity-45'>{timestamp(item.createdAt)}</p></>}
                
              </div>
            )
          }
        </div>
      )
      )):(
        <>
          {!ifMessagepresent && <MessageSkeletons />}
        </>
      )}
      {isSubmitting && 
        <div className='flex justify-end'>
          <div className='size-35 rounded-md animate-pulse bg-gray-800 flex justify-center items-center'>
            <div className="md:w-5 w-5 h-5 md:h-5 border-3 border-t-white border-gray-300 rounded-full animate-spin"></div>
          </div>
        </div>
      }
      <div ref={autoscroll}></div>
    </div>

  )
}

export default Chatmessages
