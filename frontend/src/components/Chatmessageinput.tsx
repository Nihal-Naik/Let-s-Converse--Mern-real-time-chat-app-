import { useRef, type Dispatch, type SetStateAction } from 'react'
import type { SubmitHandler, UseFormRegister,UseFormHandleSubmit, UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { IoIosSend } from 'react-icons/io'
import { LiaUploadSolid } from 'react-icons/lia'
import { RxCross2 } from "react-icons/rx";


type Inputs = {
  text: string
  image: FileList
}

interface ChatInput{
    onSubmit: SubmitHandler<Inputs>
    register:UseFormRegister<Inputs>
    handleSubmit:UseFormHandleSubmit<Inputs, Inputs>
    setimgPreview:Dispatch<SetStateAction<string>>
    imgPreview:string
    watch: UseFormWatch<Inputs>
    setValue: UseFormSetValue<Inputs>
}

const Chatmessageinput = ({onSubmit,register,handleSubmit,setimgPreview,setValue,imgPreview,watch}:ChatInput) => {
    const imagefile = useRef(null)
    const text=watch("text")
    let image=watch("image")
    const nullinput=(text?.length==0 &&!imgPreview)
    console.log(nullinput);

   
    
    return (
        <div className='w-[100%] lg:h-[10%] h-[8%] relative flex items-center'>
            {imgPreview.length>0 && 
                <div className=''>
                    <img className='size-30 object-contain bottom-16 left-2 absolute grid justify-start border-2 border-white' src={imgPreview} alt="Preview" />
                    <RxCross2 onClick={()=>(setimgPreview(''))} className='bg-white rounded-full text-black absolute bottom-44.5 cursor-pointer left-30' />
                </div>
            }
            <form className='w-[100%] h-[100%] p-2 flex items-center justify-around' onSubmit={handleSubmit(onSubmit)}>
                <input className='bg-blue-200 w-[70%] p-2 rounded-sm h-[100%] outline-none border-none' placeholder='Type a message...' {...register("text")} />
                <label htmlFor="send-image" className='w-[10%] flex justify-center cursor-pointer'>
                    <LiaUploadSolid className='text-white size-10 transition duration-50 ease-in rounded-sm hover:bg-blue-200' />
                    <input id='send-image' className='hidden' type='file' {...register("image",{
                        onChange: (e) => {
                        const file = e.target.files?.[0];
                  
                        if (file) {
                            const objectUrl = URL.createObjectURL(file);
                            setimgPreview(objectUrl);
                        }
                    }
                    })} />
                </label>
                <label htmlFor="send-message" className='w-[10%] flex justify-center cursor-pointer'>
                    <IoIosSend className='text-white size-10 transition duration-50 ease-in rounded-sm opacity-40 hover:opacity-100' />
                    <input disabled={nullinput} id='send-message' className='hidden' type="submit" />
                </label>
            </form>
        </div>
    )
}

export default Chatmessageinput
