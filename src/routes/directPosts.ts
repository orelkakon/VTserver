import { addDirectPost, addDirectComment, getAllDirectComments, getAllDirectPosts, getAdminDirectPosts, delPost, delComment } from './../db/mysqlAPI'
import { mergePostsComment } from './../utils/util'


export const addirectPost = async (username, title, description, date, files) => {
    return await addDirectPost(username, title, description, date, files)
}


export const addirectComment = async (username, description, date, postid, files) => {
    return await addDirectComment(username, description, date, postid, files);
}

export const deletePostD = async (postid) => {
    return await delPost(postid, 'direct');
}

export const deleteCommentD = async (commentid) => {
    return await delComment(commentid, 'direct');
}

export const getAlldirectPosts = async (username) => {
    const posts = await getAllDirectPosts(username)
    const comments = await getAllDirectComments()
    const mergedData = mergePostsComment(posts, comments)
    return mergedData;
}

export const getAdmindirectPosts = async () => {
    const posts = await getAdminDirectPosts()
    const comments = await getAllDirectComments()
    const mergedData = mergePostsComment(posts, comments)
    return mergedData;
}