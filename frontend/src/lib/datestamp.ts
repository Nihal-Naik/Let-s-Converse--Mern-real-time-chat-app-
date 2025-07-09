export const datestamp=(dbdate:string)=>{
    const converteddate=new Date(dbdate).toLocaleDateString('en-IN',{
        day:'2-digit',
        month:'short',
        year:'2-digit'
    })
    return converteddate
}