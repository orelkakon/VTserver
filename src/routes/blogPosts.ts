import { addPost, addComment, getAllPosts, getAllComments, delPost, delComment } from './../db/mysqlAPI'
import { mergePostsComment } from './../utils/util'

export const addBlogPost = async (username, title, description, date, files) => {
    return await addPost(username, title, description, date, files)
}


export const addBlogComment = async (username, description, date, postid, files) => {
    return await addComment(username, description, date, postid, files);
}

export const deletePost = async (postid) => {
    return await delPost(postid, 'blog');
}

export const deleteCommentD = async (commentid) => {
    return await delComment(commentid, 'blog');
}


export const getAllBlogPosts = async () => {
    const posts = await getAllPosts()
    const comments = await getAllComments()
    const mergedData = mergePostsComment(posts, comments)
    return mergedData;
}