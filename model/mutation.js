import connection from '../config/db.js'


// query post data
async function postTodo(todolist) {
    let post = connection.query(`INSERT INTO daftar_todolist(todolist) values(?)`,[todolist])
    return post
}

//! query delete data
async function deleteTodo(id) {
    console.log(id)
    let results = connection.query(`DELETE FROM daftar_todolist where id = ?`,[id])
    return results
}


export {postTodo,deleteTodo}