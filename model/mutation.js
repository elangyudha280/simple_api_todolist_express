import connection from '../config/db.js'


//! query post data
async function postTodo(userId,todolist) {
    let post = connection.query(`INSERT INTO daftar_todolist(userId,todolist) values(?,?)`,[userId,todolist])
    return post
}

//! query edit data
async function editTodo(idTodo,newTodo){
    let results = connection.query('UPDATE daftar_todolist set todolist = ? where id = ?',[newTodo,idTodo])
    return results
}

//! query delete data
async function deleteTodo(id) {
    let results = connection.query(`DELETE FROM daftar_todolist where id = ?`,[id])
    return results
}


export {postTodo,deleteTodo,editTodo}