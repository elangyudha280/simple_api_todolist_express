import connection from '../config/db.js'


// get user
async function getUser(idUser){
    let [results,fields] = await  connection.query(`SELECT * FROM users where id = ?`,[idUser])
    return [results,fields]
}

// utils get all data todo
async function getAllData(idUser){
    let [results,fields] = await  connection.query(`SELECT * FROM daftar_todolist where userId = ?`,[idUser])
    return [results,fields]
}

// utils get spesifik data by id
async function getSpesificTodo(idUser,idTodo) {
    let [results,fields] = await  connection.query(`SELECT * FROM daftar_todolist where userId = ? and id = ?`,[idUser,idTodo])
    return [results,fields]
}

export {getUser,getAllData,getSpesificTodo}