import { useForm, type SubmitHandler } from "react-hook-form"
import { NavLink, useNavigate } from 'react-router-dom'
import { axiosInstance } from "../lib/axios"
import toast, { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import axios from "axios"

type Inputs = {
  name: string
  email: string
  password: string
}

const SignupHome = () => {
  const navigate = useNavigate()
  useEffect(() => {
    checkauth()
  }, [])


  const checkauth = async () => {
    try {
      await axiosInstance.get("/auth/checkauth")
      // navigate('/chats')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      } else {
        toast.error("unexpected error occured")
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()


  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault()
    try {
      const res = await axiosInstance.post("/auth/signup", data)

      toast.success(res.data.msg)
      navigate('/login')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "Something went wrong");
      } else {
        toast.error("Unexpected error occurred");
      }

    }
  }


  return (
    <section className='w-full h-screen bg-midnight-blue-100 flex items-center'>
      <div className="flex box-border p-[10%] justify-center items-center w-[50%] h-screen">
        <p className="text-9xl animate-pulse font-bold text-white">Let's Converse</p>
      </div>
      <div className="flex justify-center items-center w-[50%] bg-white h-screen">
        <form className='px-[10%] md:px-[5%] py-[6%] md:py-[3%] rounded-md ' onSubmit={handleSubmit(onSubmit)}>
          <div className=' w-full grid gap-2 md:gap-4'>
            <h1 className='font-bold text-xl md:text-3xl mb-2'>Create an account</h1>
            <div className='grid'>
              <label htmlFor="" className='text-xs md:text-sm '>Name</label>
              <input className='outline-blue-400 border-2 border-gray-300 p-1 md:p-2 text-xs md:text-sm rounded-sm md:rounded-md' placeholder='Enter your full name' {...register("name", { required: true })} />
              {errors.name && <span className='text-xs text-red-600'>This field is required</span>}
            </div>
            <div className='grid'>
              <label htmlFor="" className='text-xs md:text-sm '>Email</label>
              <input type='email' className='outline-blue-400 border-2 border-gray-300 p-1 md:p-2 text-xs md:text-sm rounded-sm md:rounded-md' placeholder='Enter your email' {...register("email", { required: true })} />
              {errors.email && <span className='text-xs text-red-600'>This field is required</span>}
            </div>
            <div className='grid'>
              <label htmlFor="" className='text-xs md:text-sm '>Password</label>
              <input type='password' className='outline-blue-400 border-2 border-gray-300 p-1 md:p-2 text-xs md:text-sm rounded-sm md:rounded-md' placeholder='Enter your password' {...register("password", { required: true })} />
              {errors.password && <span className='text-xs text-red-600'>This field is required</span>}
            </div>

            <button disabled={isSubmitting} className='flex justify-center gap-4 items-center bg-light-blue-light rounded-md cursor-pointer font-bold text-xs md:text-lg text-white p-2 mt-4 ' type="submit">
              {isSubmitting && <div className="md:w-5 w-4 h-4 md:h-5 border-3 border-t-white border-gray-300 rounded-full animate-spin"></div>}Create an account
            </button>
            <p className='md:text-lg text-xs'>Already have an account? <NavLink className="cursor-pointer text-[rgb(21,112,239)]" to="/login">
              Login
            </NavLink> </p>

          </div>
        </form>
      </div>

      <Toaster />
    </section>
  )
}

export default SignupHome
