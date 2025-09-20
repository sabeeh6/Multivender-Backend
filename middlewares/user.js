
export const role =(req , res , next)=>{
    try {()=>{
        const per = req.user
        console.log(per);
        
    }} catch (error) {
        console.error("Error (Md)" , error );
    }
}
