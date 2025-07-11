import { type Dispatch, type SetStateAction } from 'react'
import type { SubmitHandler, UseFormRegister, UseFormHandleSubmit, UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { IoIosSend } from 'react-icons/io'
import { RxCross2 } from "react-icons/rx";
import { IoMdAttach } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';


type Inputs = {
    text: string
    image: FileList
}

interface ChatInput {
    onSubmit: SubmitHandler<Inputs>
    register: UseFormRegister<Inputs>
    handleSubmit: UseFormHandleSubmit<Inputs, Inputs>
    setimgPreview: Dispatch<SetStateAction<string>>
    imgPreview: string
    watch: UseFormWatch<Inputs>
    setValue: UseFormSetValue<Inputs>

}

const Chatmessageinput = ({ onSubmit, register, handleSubmit, setimgPreview, imgPreview, watch }: ChatInput) => {
    const text = watch("text")
    const nullinput = (text?.length == 0 && !imgPreview)

    return (
        <div className='w-[100%] lg:h-[10%] h-[8%] relative flex items-center'>
            {imgPreview.length > 0 &&
                <div className=''>
                    <img className='size-30 object-contain bottom-16 left-2 absolute grid justify-start border-2 border-white' src={imgPreview} alt="Preview" />
                    <RxCross2 onClick={() => (setimgPreview(''))} className='bg-white rounded-full text-black absolute bottom-44.5 cursor-pointer left-30' />
                </div>
            }
            <form className='w-[100%] h-[100%] p-2 flex items-center justify-around' onSubmit={handleSubmit(onSubmit)}>
                <input className='bg-blue-200 w-[70%] p-2 rounded-sm h-[100%] outline-none border-none' placeholder='Type a message...' {...register("text")} />
                <label htmlFor="send-image" className='w-[10%] flex justify-center cursor-pointer'>
                    <IoMdAttach className='text-white size-8 rotate-45 transition duration-50 ease-in rounded-sm hover:scale-110' />
                    <input id='send-image' accept='image/*' className='hidden' type='file' {...register("image", {
                        onChange: (e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                                if (!file.type.startsWith("image/")) {
                                    toast.error("Only image files are allowed!");
                                    e.target.value = ""; 
                                    setimgPreview('');
                                    return;
                                }

                                const maxSize = 10 * 1024 * 1024; // for checking if the img is greater than 10mb

                                if (file.size > maxSize) {
                                    toast.error("Image size exceeds 10MB. Please choose a smaller file.");
                                    e.target.value = "";
                                    setimgPreview('');
                                    return;
                                }

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
            <Toaster />
        </div>
    )
}

export default Chatmessageinput
