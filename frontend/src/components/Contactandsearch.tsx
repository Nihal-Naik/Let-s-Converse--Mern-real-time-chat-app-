import { IoIosSearch } from "react-icons/io"
import Contectskeleton from "./skeletons/contectskeleton"

type authuser = {
  name: string
  email: string
  avatar: string
  _id: string
}
interface CS{
    contacts:authuser[] | null | undefined,
    handleuserchatdisplay:(user:authuser)=>void
}

const Contactandsearch = ({contacts,handleuserchatdisplay}:CS) => {
    // console.log(contacts);
    
    return (
        <div className='w-[82%] lg:w-[35%] h-screen relative bg-white overflow-auto box-border p-[1%]'>
            <nav className='grid lg:h-[10%] h-[5%] mb-[2%] relative items-center'>
                <div className=' relative w-[100%] h-[70%] md:h-[80%] bg-gray-200 flex rounded-full box-border p-[3%] items-center'>
                    <IoIosSearch className='w-[10%] size-8 ' />
                    <input className=' w-[85%] pl-1 rounded-full border-none outline-none ' placeholder='Search' type="text" name="" id="" />
                </div>
            </nav>
            {contacts ? (contacts.map((item: authuser) => (
                <div key={item._id} onClick={() => handleuserchatdisplay(item)} className='relative flex h-[12%] items-center box-border p-[5%] rounded-md hover:bg-gray-300 transition duration-100 ease-in-out active:bg-gray-300'>
                    <div className='w-[18%] '>
                        <img src={item.avatar && item.avatar || "/avatar.png"} className='rounded-full size-13 md:size-14 object-cover' alt="" />
                    </div>
                    <div className='w-[82%]'>
                        <p className='ml-5 '>{item.name}</p>
                    </div>
                </div>
            ))):(
                <Contectskeleton/>
            )}
        </div>
    )
}

export default Contactandsearch
