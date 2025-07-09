import { IoIosLogOut } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { NavLink } from 'react-router-dom'

type authuser = {
  name: string
  email: string
  avatar: string
  _id: string
}

interface SidebarComponent{
    loggedinuser:authuser|null|undefined
    handlelogout:()=>void
}

const Sidebar = ({loggedinuser,handlelogout}:SidebarComponent) => {
    return (
        <div className='lg:w-[5%] w-[15%] md:w-[10%] bg-midnight-blue-100 grid justify-center relative grid-rows-10 '>
            <img className='row-span-2 ml-1 lg:ml-0 size-11 lg:size-10 rounded-full mt-5 object-cover' src={loggedinuser && loggedinuser.avatar || "/avatar.png"} alt="" />
            <div className='row-span-6'></div>
            <NavLink to="/profile">
                <abbr title="update profile"><RxUpdate className='row-span-1 text-gray-300 lg:size-9 size-12 ml- 0.5 cursor-pointer hover:text-white' /></abbr>
            </NavLink>
            <abbr title="Logout"><IoIosLogOut onClick={handlelogout} className='row-span-1 text-gray-300 lg:size-10 size-14 ml-0.5 cursor-pointer hover:text-white' /></abbr>
        </div>
    )
}

export default Sidebar
