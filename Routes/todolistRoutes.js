
import express from 'express'
// import utils
import { getAllData,getSpesificTodo,getUser } from '../model/getdata.js'
import { postTodo,deleteTodo } from '../model/mutation.js'
import { responseJSON } from '../utils/response.js'
import checkUser from '../utils/checkUser.js'

const RouterTodo = express.Router();

//! GET ALL TODO
RouterTodo.get('/:idUser',checkUser,async (req,res)=>{
    let {idUser} = req.params
    try{
        const [results,_] = await getAllData(idUser)
        console.log(results)
        responseJSON(req,res,400,true,results,'berhasil mengambil data')
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
            return responseJSON(req,res,400,true,results,'data tidak ditemukan')
        }
        responseJSON(req,res,400,true,results,'berhasil mengambil data')
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
            throw new Error('wajib mengirim field todolist dan userId')
        }
        // post data
        let data = await  postTodo(req.body.userId,req.body.todolist)
        responseJSON(req,res,400,true,[],'berhasil mengirim data')
    }
    catch(err){
        responseJSON(req,res,500,false,[],err.message)
    }
})

//! query delete data
RouterTodo.delete('/:idUser/:id',checkUser, async (req,res)=>{
    try{
        // check jika tidka mengirim field todolist di http body
        if(req.params.id === undefined) {
            throw new Error('wajib mengirim parameter id')
        }
        let [result,_] = await  getSpesificTodo(req.params.id)
        // check jika data tidak ada
        if(result?.length === 0){
            responseJSON(req,res,404,true,[],'data tidak ditemukan')
            return 
        }
        // delete data
        let data = await deleteTodo(req.params.id)
        responseJSON(req,res,400,true,[],'berhasil menghapus data')
    }
    catch(err){
        responseJSON(req,res,500,false,[],err.message)
    }
})

export default RouterTodo;