
import express from 'express'
// import utils
import { getAllData,getSpesificTodo } from '../model/getdata.js'
import { postTodo,editTodo,deleteTodo } from '../model/mutation.js'
import { responseJSON } from '../utils/response.js'
import checkUser from '../utils/checkUser.js'

const RouterTodo = express.Router();

//! check user
RouterTodo.use('/:idUser',checkUser)

//! GET ALL TODO
RouterTodo.get('/:idUser',async (req,res)=>{
    let {idUser} = req.params
    try{
        const [results,_] = await getAllData(idUser)
        responseJSON(req,res,200,true,results,'berhasil mengambil data')
    }
    catch(err){
        responseJSON(req,res,500,false,[],err.message)
    }
})

//! get todo by id 
RouterTodo.get('/:idUser/:idTodo',checkUser,async (req,res)=>{
    let {idUser,idTodo} = req.params
    try{
        const [results,_] = await getSpesificTodo(idUser,idTodo)
        // chek jika resulst tidak ada
        if(results.length === 0) {
            return responseJSON(req,res,200,true,results,'data tidak ditemukan')
        }
        responseJSON(req,res,200,true,results,'berhasil mengambil data')
    }
    catch(err){
        responseJSON(req,res,500,false,[],err.message)
    }
})

//! query post data todo
RouterTodo.post('/:idUser',checkUser, async (req,res)=>{
    try{
        // check jika tidka mengirim field todolist di http body
        if(req.body.todolist === undefined || req.body.userId === undefined) {
            responseJSON(req,res,400,false,[],'wajib mengirim field todolist dan userId')
            return
        }
        // post data
        let data = await  postTodo(req.body.userId,req.body.todolist)
        responseJSON(req,res,200,true,[],'berhasil mengirim data')
    }
    catch(err){
        responseJSON(req,res,500,false,[],err.message)
    }
})


//! query edit data todo
RouterTodo.patch('/:idUser/:idTodo',checkUser, async (req,res)=>{
    try{
        // check jika tidka mengirim field todolist di http body
        if(req.body.todolist === undefined || req.body.userId === undefined) {
            responseJSON(req,res,400,false,[],'wajib mengirim field todolist dan userId')
            return
        }
        // post data
        let data = await  editTodo(req.params?.idTodo,req.body?.todolist)
        responseJSON(req,res,200,true,[],'berhasil mengubah data')
    }
    catch(err){
        responseJSON(req,res,500,false,[],err.message)
    }
})

//! query delete data
RouterTodo.delete('/:idUser/:idTodo',checkUser, async (req,res)=>{
    try{
        // check jika tidka mengirim field todolist di http body
        if(req.params.idTodo === undefined) {
            throw new Error('wajib mengirim parameter id')
        }
        let [result,_] = await  getSpesificTodo(req.params.idUser,req.params.idTodo)
        // check jika data tidak ada
        if(result?.length === 0){
            responseJSON(req,res,404,true,[],'data tidak ditemukan')
            return 
        }
        // delete data
        let data = await deleteTodo(req.params.idTodo)
        responseJSON(req,res,200,true,[],'berhasil menghapus data')
    }
    catch(err){
        responseJSON(req,res,500,false,[],err.message)
    }
})

export default RouterTodo;