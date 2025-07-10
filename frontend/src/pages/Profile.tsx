import { useForm, type SubmitHandler } from "react-hook-form"
import { Camera } from "lucide-react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../lib/axios"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { toBase64 } from "../lib/tobase64"
import { useNavigate } from "react-router"

type Inputs = {
  name: string
  email: string
  avatar: FileList
}
type authuser = {
  name: string
  email: string
  avatar:string
}

const profile = () => {
  const navigate=useNavigate()
  const [selectedfile, setselectedfile] = useState<string | null>(null)
  const [loggedinuser, setLoggedinuser] = useState<authuser | null>()

  const checkauth = async () => {
    try {
      const res = await axiosInstance.get("/auth/checkauth")
      setLoggedinuser(res.data)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "something went wrong")
      } else {
        toast.error("Something went wrong!")
      }
    }
  }
  useEffect(() => {
    checkauth()
  }, [loggedinuser])
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()



  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    try {
      let base64img = "";
      const file = data.avatar?.[0];
      if (file) {
        base64img = await toBase64(file);

      }
      const res = await axiosInstance.post("/auth/updateprofile", { avatar: base64img })
      toast.success(res.data.msg)
      navigate('/chats')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg)
      } else {
        toast.error("Unexpected error!")
      }
    }
  }
  
  return (
    <section className="flex h-screen w-full justify-center items-center bg-midnight-blue-100">
      <form className='bg-white  px-[10%] md:px-[5%] py-[6%] md:py-[3%]  rounded-md ' onSubmit={handleSubmit(onSubmit)}>
        <div className=' w-full grid gap-2 md:gap-4'>
          <h1 className='font-bold text-xl md:text-3xl mb-2'>Update your profile</h1>
          <div className="mx-auto relative" >
            <img src={selectedfile || loggedinuser && loggedinuser.avatar || "/avatar.png"} className="size-32 rounded-full object-cover border-4 border-gray-400" alt="" />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 rounded-full bg-gray-200 cursor-pointer hover:scale-110">
              <Camera className="w-5 h-5 text-base-200" />
              <input id="avatar-upload" type="file" className="hidden bg-red-500" {...register("avatar", {
                onChange: (e) => {
                  
                  const file = e.target.files?.[0];
                  
                  if (file) {
                    const objectUrl = URL.createObjectURL(file);
                    setselectedfile(objectUrl);
                  }
                }
              })} />
            </label>
          </div>
          <div className='grid'>
            <label htmlFor="" className='text-xs md:text-sm '>Name</label>
            <input type='email' value={loggedinuser ? loggedinuser.name : ""} disabled className='outline-blue-400 border-2 border-gray-300 p-1 md:p-2 text-xs md:text-sm rounded-sm md:rounded-md' placeholder='Enter your email' />

          </div>
          <div className='grid'>
            <label htmlFor="" className='text-xs md:text-sm '>Email</label>
            <input type='email' value={loggedinuser ? loggedinuser.email : ""} disabled className='outline-blue-400 border-2 border-gray-300 p-1 md:p-2 text-xs md:text-sm rounded-sm md:rounded-md' placeholder='Enter your password' />

          </div>

          <button disabled={isSubmitting} className='flex justify-center items-center bg-[rgb(21,112,239)] rounded-md cursor-pointer font-bold text-xs md:text-lg text-white p-2 mt-4 ' type="submit">
            {isSubmitting && <div className="md:w-5 w-4 h-4 md:h-5 border-3 border-t-white border-gray-300 rounded-full animate-spin"></div>}Update profile
          </button>
          <button onClick={()=>navigate('/chats')} disabled={isSubmitting} className='flex justify-center items-center bg-[rgb(229,240,255)] rounded-md cursor-pointer font-bold text-xs md:text-lg text-black p-2 mt-4 '>
            Take me Back
          </button>

        </div>
      </form>
      <Toaster />
    </section >
  )
}

export default profile


