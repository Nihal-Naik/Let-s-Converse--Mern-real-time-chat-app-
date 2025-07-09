export const timestamp=(dbtime:string)=>{
    const convertedTime=new Date(dbtime).toLocaleString([],{
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })
    return convertedTime
}