import connection from '../config/db.js'


// utils get all data todo
async function getAllData(){
    let [results,fields] = await  connection.query(`SELECT * FROM daftar_todolist`)
    return [results,fields]
}

// utils get spesifik data by id
async function getSpesificTodo(id) {
    let [result,fields] = await  connection.query(`SELECT * FROM daftar_todolist where id = ?`,[id])
    return [result,fields]
}

export {getAllData,getSpesificTodo}