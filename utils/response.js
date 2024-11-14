
function responseJSON(req,res,codeStatus,status,data,message){
    return res.status(codeStatus).json({
        success:status,
        data,
        message
    })
}

export {responseJSON}