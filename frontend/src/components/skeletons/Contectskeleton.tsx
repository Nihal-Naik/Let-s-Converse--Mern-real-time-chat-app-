const list = [1, 2, 3, 4, 5]

const Contectskeleton = () => {
    return (
        <div className="">
            {list && list.map((item)=>(
                <div key={item} className=' h-[12%] p-[5%] rounded-md flex gap-3 items-center'>
                    <p className='rounded-full size-13 md:size-14 object-cover animate-pulse bg-gray-300'></p>
                    <div>
                        <p className='w-60 h-3 bg-gray-300 rounded-xs animate-pulse mb-2'></p>
                        <p className='w-60 h-3 bg-gray-300 rounded-xs animate-pulse'></p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Contectskeleton
