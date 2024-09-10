const asyncHandler = (requrdtHandler) => {
    return (err,req,res,next) => {
        Promise.resolve(requrdtHandler(req,res,next)).
        catch((err) => next(err))
    }
}


export {asyncHandler}
/*  // try - catch method 
const asyncHandler = {fn} => async (req,res,next) => {
    try {
        
    } catch (error) {
        res.status(err.code || 500).json({
            status : false,
            message : err.message
        })
    }
}

*/