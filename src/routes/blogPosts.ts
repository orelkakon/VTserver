import { addPost, addComment, getAllPosts, getAllComments } from './../db/mysqlAPI'
import { mergePostsComment } from './../utils/util'

export const addBlogPost = async (username, title, description, date, files) => {
    return await addPost(username, title, description, date, files)
}


export const addBlogComment = async (username, description, date, postid, files) => {
    return await addComment(username, description, date, postid, files);
}


export const getAllBlogPosts = async () => {
    const posts = await getAllPosts()
    const comments = await getAllComments()
    const mergedData = mergePostsComment(posts, comments)
    return mergedData;
}