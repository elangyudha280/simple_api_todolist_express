import express from 'express'
import cors from 'cors'

// import utils
import { getAllData } from './model/getdata.js'
import { responseJSON } from './utils/response.js'


const app = express()
const port = 3000

// cors
app.use(cors({
    origin:'*',
    methods:['GET,POST,PATCH','DELETE']
}))

app.use(express.json())

// GET TODO
app.get('/todo',async (req,res)=>{
    try{
        const [results,_] = await getAllData()
        responseJSON(req,res,400,true,results,'berhasil mengambil data')
    }
    catch(err){
        responseJSON(req,res,500,false,[],err.message)
    }
})



// NOT FOUND API
app.use((req,res)=>{
    return res.status(404).json({status:404,message:'data tidak di temukan'})
})

app.listen(port,()=>{
    console.log(`server port ${port} is running`)
})