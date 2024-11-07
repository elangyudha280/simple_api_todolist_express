import connection from '../config/db.js'



async function getAllData(){
    let [results,fields] = await  connection.query(`SELECT * FROM daftar_todolist`)
    return [results,fields]
}

export {getAllData}