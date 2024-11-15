import { getSpesificTodo } from "../model/getdata.js";


async function checkDataTodo(req,res,next){
    let {idUser,idTodo} = req.params
    try{
        const [results,_] = await getSpesificTodo(idUser,idTodo)
        // check jika todo tidak ditemukan
        if(results.length === 0 ){
            res.status(404).json({
                success:false,
                message:'todo tidak ditemukan'
            })
            return
        }
        // jika ditemukan maka lanjut ket router todo berikutnya atau get data todo
        next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'gagal mengambil data'
        })
    }
}

export default checkDataTodo;