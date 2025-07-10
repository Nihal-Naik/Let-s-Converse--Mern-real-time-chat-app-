import { IoIosSearch } from "react-icons/io"
import Contectskeleton from "./skeletons/Contectskeleton"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { IoCloseOutline } from "react-icons/io5";
import { Divide } from "lucide-react";

type authuser = {
    name: string
    email: string
    avatar: string
    _id: string
}
interface CS {
    contacts: authuser[] | null | undefined,
    handleuserchatdisplay: (user: authuser) => void
}

const Contactandsearch = ({ contacts, handleuserchatdisplay }: CS) => {
    // console.log(contacts);
    const [searchinputs, setsearchinputs] = useState('')
    const [gotContact, setGotContact] = useState<authuser | null>(null)
    const [contactsvisible, setContactsvisible] = useState(true)
    const [toggleClearInputs, setToggleClearInputs] = useState(false)

    const handlesearchInput = (e: any) => {
        setsearchinputs(e.target.value)
        setToggleClearInputs(true)
    }

    const handlesearch = () => {
        if (searchinputs) {
            const result = contacts?.find(item => item.email == searchinputs)
            if (result) {
                setGotContact(result)
                return
            }
            toast('No contact found!', {
                icon: '🥺',
            });
        }else{
            toast('Enter a email!', {
                icon: '😊',
            });
        }
    }
    useEffect(() => {
        if (gotContact) {
            setContactsvisible(false)
        }
    }, [gotContact?._id])

    return (
        <div className='w-[82%] lg:w-[35%] h-screen relative bg-white overflow-auto box-border p-[1%] mt-3 lg:mt-0'>
            <nav className='grid lg:h-[10%] h-[5%] mb-[2%] relative items-center'>
                <div className=' relative w-[100%] h-[70%] md:h-[80%] bg-gray-200 flex justify-evenly rounded-full box-border p-[3%] items-center'>
                    <IoIosSearch className='w-[10%] size-8' onClick={handlesearch} />
                    <input onChange={handlesearchInput} className=' w-[80%] pl-1 rounded-full border-none outline-none ' value={searchinputs} placeholder='Search' type="text" name="" id="" />
                    {toggleClearInputs && <div className='w-[10%] flex items-center'>
                        <IoCloseOutline onClick={()=>(setsearchinputs(''),setToggleClearInputs(false))} className="bg-gray-300 rounded-full size-6 cursor-pointer" />
                    </div> }
                </div>
            </nav>
            {contacts && contactsvisible ? (contacts.map((item: authuser) => (
                <div key={item._id} onClick={() => handleuserchatdisplay(item)} className='relative flex h-[12%] items-center box-border p-[5%] rounded-md hover:bg-gray-300 transition duration-100 ease-in-out active:bg-gray-300'>
                    <div className='w-[18%] '>
                        <img src={item.avatar && item.avatar || "/avatar.png"} className='rounded-full size-13 md:size-14 object-cover' alt="" />
                    </div>
                    <div className='w-[82%]'>
                        <p className='ml-5 '>{item.name}</p>
                    </div>
                </div>
            ))) : (
                <div>
                    {!gotContact && <Contectskeleton />}
                </div>
            )}
            {!contactsvisible && gotContact &&
                <div onClick={() => handleuserchatdisplay(gotContact)} className='relative flex h-[12%] items-center box-border p-[5%] rounded-md hover:bg-gray-300 transition duration-100 ease-in-out active:bg-gray-300'>
                    <div className='w-[18%] '>
                        <img src={gotContact.avatar && gotContact.avatar || "/avatar.png"} className='rounded-full size-13 md:size-14 object-cover' alt="" />
                    </div>
                    <div className='w-[82%]'>
                        <p className='ml-5 '>{gotContact.name}</p>
                    </div>
                </div>
            }
            <Toaster />
        </div>
    )
}

export default Contactandsearch
