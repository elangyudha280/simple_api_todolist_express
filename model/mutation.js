import connection from '../config/db.js'


async function postTodo(todolist) {
    let post = connection.query(`INSERT INTO daftar_todolist(todolist) values(?)`,[todolist])
    return post
}


export {postTodo}