import { loginRequired, register, login } from '../Controllers/authControllers.js';
import { getUsers, postUser, putUser, deleteUser, getUser, getPost, postPost, putPost, deletePost, getPosts, getComments, getComment, postComment, putComment, deleteComment  } from '../Controllers/userControllers.js';

const endpoints = (app) => {
    app.route('/v1/register')
        .post(register);
    app.route('/v1/login')
        .post(login);
    app.route('/v1/users')
        .get(loginRequired, getUsers);
    app.route('/v1/users/:id')
        .get(loginRequired, getUser)
        .post(loginRequired, postUser)
        .put(loginRequired, putUser)
        .delete(loginRequired, deleteUser);
    app.route('/v1/posts')
        .get(loginRequired, getPosts)      
    app.route('/v1/posts/:id')
        .get(loginRequired, getPost)
        .post(loginRequired, postPost)
        .put(loginRequired, putPost)
        .delete(loginRequired, deletePost);
    app.route('/v1/comments')
        .get(loginRequired, getComments)
    app.route('/v1/comments/:id')
        .get(loginRequired, getComment)
        .post(loginRequired, postComment)
        .put(loginRequired, putComment)
        .delete(loginRequired, deleteComment);
};

export default endpoints;