//this is asyncHandler code with promises and then catch

const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}



export {asyncHandler}

//this is asyncHandler code with the try catch 
/*const asyncHandler=(fn)=>async(req,res,next)=>{ // asyncHandler is the higher order function 
    try{
        await fn(req,res,next)
    }
    catch(error){
        res.status(err.code || 500).json(
            {
                success:false,
                message:err.message
            }
        )
    }
}*/