import { getUser } from "../model/getdata.js"

async function checkUser(req,res,next){
    let {idUser} = req.params
    try{
        const [results,_] = await getUser(idUser)
        console.log(results)
        // check jika user tidak ditemukan
        if(results.length === 0 ){
            res.status(404).json({
                success:false,
                message:'user tidak ditemukan'
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

export default checkUser