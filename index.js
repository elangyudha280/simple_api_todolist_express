import express from 'express'
import cors from 'cors'

// import Routes
import RouterTodo from './Routes/todolistRoutes.js'

const app = express()
const port = 3000

// cors
app.use(cors({
    origin:'*',
    methods:['GET,POST,PATCH','DELETE']
}))

app.use(express.json())


// GET TODO
app.use('/todo',RouterTodo)

// app.get('/todo',async (req,res)=>{
//     try{
//         const [results,_] = await getAllData()
//         responseJSON(req,res,400,true,results,'berhasil mengambil data')
//     }
//     catch(err){
//         responseJSON(req,res,500,false,[],err.message)
//     }
// })

// //! get todo by id 
// app.get('/todo/:id',async (req,res)=>{
//     let {id} = req.params
//     try{
//         const [results,_] = await getSpesificTodo(id)
//         // chek jika resulst tidak ada
//         if(results.length === 0) {
//             return responseJSON(req,res,400,true,results,'data tidak ditemukan')
//         }
//         responseJSON(req,res,400,true,results,'berhasil mengambil data')
//     }
//     catch(err){
//         responseJSON(req,res,500,false,[],err.message)
//     }
// })

// //! query post data todo
// app.post('/todo', async (req,res)=>{
//     try{
//         // check jika tidka mengirim field todolist di http body
//         if(req.body.todolist === undefined) {
//             throw new Error('wajib mengirim field todolist')
//         }
//         // post data
//         let data = await  postTodo(req.body.todolist)
//         responseJSON(req,res,400,true,[],'berhasil mengirim data')
//     }
//     catch(err){
//         console.log('error bro')
//         responseJSON(req,res,500,false,[],err.message)
//     }
// })

// //! query delete data
// app.delete('/todo/:id', async (req,res)=>{
//     try{
//         // check jika tidka mengirim field todolist di http body
//         if(req.params.id === undefined) {
//             throw new Error('wajib mengirim parameter id')
//         }
//         let [result,_] = await  getSpesificTodo(req.params.id)
//         // check jika data tidak ada
//         if(result?.length === 0){
//             responseJSON(req,res,404,true,[],'data tidak ditemukan')
//             return 
//         }
//         // delete data
//         let data = await deleteTodo(req.params.id)
//         responseJSON(req,res,400,true,[],'berhasil menghapus data')
//     }
//     catch(err){
//         responseJSON(req,res,500,false,[],err.message)
//     }
// })

// NOT FOUND API
app.use((req,res)=>{
    return res.status(404).json({status:404,message:'data tidak di temukan'})
})

app.listen(port,()=>{
    console.log(`server port ${port} is running`)
})