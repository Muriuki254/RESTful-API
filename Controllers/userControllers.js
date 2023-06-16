import sql from 'mssql';
import config from '../ModelDB/config.js';

// // Get all users
export const getUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Users");
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(404).json({ error: 'An error occured when retrieving users' });
    } finally {
        sql.close(); 
    }
};

// // Get a single user
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM Users where id = @id");
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while retrieving the user' });
    } finally {
        sql.close();
    }
};

// // Create a new user
export const postUser  = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let pool = await sql.connect(config.sql);
        let newUser = await pool.request()
            .input("username", sql.VarChar, username)
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, password)
            .query("INSERT INTO Users (username, email, password) values (@username, @email, @password)");
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while creating the user' });
    } finally {
        sql.close();   
    }
};
// // Update a user
export const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("id", sql.Int, id)
            .input("email", sql.VarChar, email)
            .query("UPDATE Users SET email = @email WHERE id = @id");
        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while updating the Email' });
    } finally {
        sql.close();
    }
};
// // Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Users WHERE id = ${id}`;
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    } finally {
        sql.close();
    }
};
// // Get all posts
export const getPosts = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Posts");
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(404).json({ error: 'An error occurred when retrieving posts' });
    } finally {
        sql.close(); 
    }
};

// // Get a single post
export const getPost = async (req, res) => {
    try {
        const { post_id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("post_id", sql.Int, post_id)
            .query("SELECT * FROM Posts where post_id = @post_id");
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while retrieving the post' });
    } finally {
        sql.close();
    }
};

// // Create a new post
export const postPost  = async (req, res) => {
    try {
        const { title , content , user_id} = req.body;
        let pool = await sql.connect(config.sql);
        let newPost = await pool.request()
            .input("title", sql.VarChar, title )
            .input("content", sql.VarChar, content)
            .input("user_id", sql.Int, user_id)
            .query("INSERT INTO Posts (title, content, user_id) values (@title, @content, @user_id)");
        res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while creating the post' });
    } finally {
        sql.close();   
    }
};
// // Update a post
export const putPost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const { title } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("post_id", sql.Int, post_id)
            .input("title", sql.VarChar, title)
            .query("UPDATE Posts SET title = @title WHERE post_id = @post_id");
        res.status(200).json({ message: 'Post title updated successfully' });
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while updating the Post title' });
    } finally {
        sql.close();
    }
};
// // Delete a post
export const deletePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Posts WHERE post_id = ${post_id}`; 
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while deleting the post' });
    } finally {
        sql.close();
    }
};
// // Get all comments
export const getComments = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Comments");
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(404).json({ error: 'An error occurred when retrieving comments' });
    } finally {
        sql.close(); 
    }
};

// // Get a single comment
export const getComment  = async (req, res) => {
    try {
        const { comment_id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("comment_id", sql.Int, comment_id)
            .query("SELECT * FROM Comments WHERE comment_id = @comment_id");
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while retrieving the comment' });
    } finally {
        sql.close();
    }
};

// // Create a new comment
export const postComment = async (req, res) => {
    try {
        const { content } = req.body;
        let pool = await sql.connect(config.sql);
        let newComment = await pool.request()
            .input("content", sql.VarChar, content)
            .query("INSERT INTO Comments (content ) values ( @content)");
        res.status(200).json({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while creating the comment' });
    } finally {
        sql.close();  
    }
};
// // Update a comment
export const putComment = async (req, res) => {
    try {
        const { content_id } = req.params;
        const { content } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("content_id", sql.Int, content_id)
            .input("content", sql.VarChar, content)
            .query("UPDATE Comments SET content = @content WHERE id = @content_id");
        res.status(200).json({ message: 'Comment content updated successfully' });
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while updating the comment content' });
    } finally {
        sql.close();
    }
};
// // Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { content_id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Comments WHERE content_id = ${content_id}`;
        res.status(200).json({ message: 'A comment was deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: 'An error occurred while deleting the comment' });
    } finally {
        sql.close();
    }
};