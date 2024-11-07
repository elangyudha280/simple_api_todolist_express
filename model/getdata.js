import connection from '../config/db.js'



 function getAllData(){
    return connection.query(`SELECT * FROM daftar_todolist`)
}

export {getAllData}