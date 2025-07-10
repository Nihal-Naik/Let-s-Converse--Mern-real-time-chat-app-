import type { Dispatch, SetStateAction } from "react"
import { IoIosArrowBack } from "react-icons/io"
type authuser = {
  name: string
  email: string
  avatar: string
  _id: string
}


interface Chatheader{
    screenwidth:number
    usertochatwith:authuser|null
    setcontactscontainer:Dispatch<SetStateAction<boolean>>
    setChatcontainer:Dispatch<SetStateAction<boolean>>
    isOnline:string[]|null|undefined
    setUsertochatwith:Dispatch<SetStateAction<authuser | null | undefined>>
}

const Chatheader = ({setUsertochatwith,screenwidth,usertochatwith,setChatcontainer,setcontactscontainer,isOnline}:Chatheader) => {
    return (
        <div className='flex w-[100%] h-[8%] items-center'>
            {screenwidth < 1024 &&
                <div className='w-[10%] flex justify-center items-center'>
                    <IoIosArrowBack onClick={() => { setcontactscontainer(true), setChatcontainer(false),setUsertochatwith(null) }} className='text-white size-10 active:bg-blue-200 rounded-sm transition ease-in-out' />
                </div>
            }
            <div className='w-[10%] ml-1 flex justify-center items-center'>
                <img className='rounded-full size-10' src={usertochatwith?.avatar && usertochatwith?.avatar || "./avatar.png"} alt="" />
            </div>
            <div className='grid w-[80%] items-center text-white ml-1'>
                <p className='font-bold'>{usertochatwith?.name} </p>
                {usertochatwith&& isOnline?.includes(usertochatwith?._id)?
                    <p className='text-xs animate-pulse'>Online</p>:
                    <p className='text-xs'>Offline</p>
                }
            </div>
        </div>
    )
}

export default Chatheader
