import { pool } from './../index'
import { loggerError, loggerInfo } from './../utils/logger'
import { decrypt } from './../utils/encDecPass'

export const getData = (username) => {
    return new Promise((resolve, reject) => {
        const GET_MEMBER_DATA = `SELECT * FROM members WHERE (username = '${username}')`
        pool.query(GET_MEMBER_DATA, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to check login in db. ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    resolve(result[0])
                } else {
                    resolve('failed')
                }
            }
        })
        //connection.release();
    })
}

export const login = (username) => {
    return new Promise((resolve, reject) => {
        const GET_MEMBER = `SELECT password FROM members WHERE (username = '${username}')`
        pool.query(GET_MEMBER, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to check login in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    const decryptPass = decrypt(result[0].password)
                    resolve(decryptPass)
                } else {
                    resolve(false)
                }
            }
        })
        //connection.release();
    })
}

export const register = (username, password, phone, email): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const ADD_MEMBER = `INSERT INTO members (username, password, phone, email) VALUES ('${username}', '${password}', '${phone}', '${email}')`
        pool.query(ADD_MEMBER, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to register in db. ${err}`)
                resolve(false)
            }
            else {
                if (result) {
                    loggerInfo.info(`${username} success to register`)
                    resolve(true)
                }
                else {
                    loggerInfo.info(`${username} failed to register`)
                    resolve(false)
                }
            }
        })
        //connection.release();

    })
}

export const addPin = (username, pincode) => {
    return new Promise((resolve, reject) => {
        const ADD_PIN = `UPDATE members SET pincode = '${pincode}' WHERE (username = '${username}')`
        pool.query(ADD_PIN, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to add pin code in db. ${err}`)
                reject(err)
            }
            else {
                if (result.affectedRows === 1) {
                    loggerInfo.info(`success to save a new pin code ${pincode} of ${username}`)
                    resolve(true)
                }
                else {
                    loggerInfo.info(`failed to save a new pin code ${pincode} of ${username}`)
                    resolve(false)
                }
            }
        })
        //connection.release();
    })
}

export const getPin = (username) => {
    return new Promise((resolve, reject) => {
        const GET_PIN = `SELECT pincode FROM members WHERE (username = '${username}')`
        pool.query(GET_PIN, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to get pin code in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    loggerInfo.info(`success to get pin code of ${username}`)
                    resolve(result[0].pincode)
                }
                else {
                    loggerInfo.info(`failed to get pin code of ${username}`)
                    resolve('') // '' represent failed pin code 
                }
            }
        })
        //connection.release();
    })
}

export const checkPin = (pincode, username) => {
    return new Promise((resolve, reject) => {
        const CHECK_PIN = `SELECT username FROM members WHERE (pincode = '${pincode}')`
        pool.query(CHECK_PIN, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to check pin code in db. ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    loggerInfo.info(`success to check pin code of ${pincode}`)
                    const ADD_NEW_PIN = `UPDATE members SET pincode = '${pincode}' WHERE (username = '${username}')`
                    pool.query(ADD_NEW_PIN, (err, result) => {
                        if (err) {
                            loggerError.error(`${Date.now()}: failed to add new pin code in db. ${err}`)
                            resolve(false)
                        }
                        else {
                            resolve(true)
                        }
                    })
                    resolve(true)
                }
                else {
                    loggerInfo.info(`failed to check pin code of ${pincode}`)
                    resolve(false)
                }
            }
        })
        //connection.release();

    })
}
// BLOG
// BLOG
// BLOG
// BLOG 
export const addPost = (username, title, description, date, files) => {
    return new Promise((resolve, reject) => {
        const ADD_POST = `INSERT INTO blog_posts (name, title, description, date) VALUES ('${username}', N'${title}', N'${description}', '${date}'); SELECT LAST_INSERT_ID(); `
        pool.query(ADD_POST, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to add blog post in db. ${err}`)
                resolve(false)
            }
            else {
                if (result) {
                    const postId = result[1][0]['LAST_INSERT_ID()']
                    const files_to_send = files
                    if (files_to_send) {
                        const ADD_FILES_BLOG_POSTS = `INSERT INTO blog_files (path, post_file_id) VALUES ('${files_to_send}', '${postId}')`
                        pool.query(ADD_FILES_BLOG_POSTS, (err, result) => {
                            if (err) {
                                loggerError.error(`${Date.now()}: failed to add file of blog post in db. ${err}`)
                                resolve(false)
                            }
                            else {
                                if (result) {
                                    loggerInfo.info(`success add to blog post`)
                                    resolve(true)
                                }
                                else {
                                    loggerInfo.info(`failed add to blog post`)
                                    resolve(false)
                                }
                            }
                        })
                    }
                    loggerInfo.info(`${username} success to add blog post`)
                    resolve(true)
                }
                else {
                    loggerInfo.info(`${username} failed to add blog post`)
                    resolve(false)
                }
            }
        })
        //connection.release();
    })
}

export const addComment = (username, description, date, postid, files) => {
    return new Promise((resolve, reject) => {
        const ADD_COMMENT = `INSERT INTO blog_comments (name, description, date, postid) VALUES ('${username}', '${description}', '${date}', '${postid}'); SELECT LAST_INSERT_ID(); `
        pool.query(ADD_COMMENT, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to add comment blog in db. ${err}`)
                resolve(false)
            }
            else {
                if (result) {
                    const commentId = result[1][0]['LAST_INSERT_ID()']
                    const files_to_send = files
                    const ADD_FILES_BLOG_COMMENTS = `INSERT INTO blog_comments_files (path, post_id, comment_id) VALUES ('${files_to_send}', '${postid}', '${commentId}')`
                    pool.query(ADD_FILES_BLOG_COMMENTS, (err, result) => {
                        if (err) {
                            loggerError.error(`${Date.now()}: failed to add file of comment blog in db. ${err}`)
                            resolve(false)
                        }
                        else {
                            if (result) {
                                loggerInfo.info(`success add to add comment blog post`)
                                resolve(true)
                            }
                            else {
                                loggerInfo.info(`failed add to add comment blog post`)
                                resolve(false)
                            }
                        }
                    })
                    loggerInfo.info(`${username} success to add blog comment`)
                    resolve(true)
                }
                else {
                    loggerInfo.info(`${username} failed to add blog comment`)
                    resolve(false)
                }
            }
        })
        //connection.release();
    })
}

export const getAllPosts = () => {
    return new Promise((resolve, reject) => {
        const GET_POSTS = `SELECT blog_posts.name, blog_posts.title, blog_posts.description, blog_posts.date, blog_posts.postid, blog_files.path
        FROM blog_posts LEFT JOIN blog_files
        ON blog_posts.postid = blog_files.post_file_id;`
        pool.query(GET_POSTS, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to get all posts in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    const posts = []
                    result.map(post => {
                        const obj = {
                            'postid': post.postid,
                            'name': post.name,
                            'title': post.title,
                            'content': post.description,
                            'date': post.date,
                            'files': post.path
                        }
                        posts.push(obj)
                    })
                    resolve(posts)
                }
                else {
                    loggerInfo.info('failed to load all posts')
                    resolve([])
                }
            }
        })
        //connection.release();
    })
}

export const getAllComments = () => {
    return new Promise((resolve, reject) => {
        const GET_COMMENTS = `SELECT blog_comments.name, blog_comments.description, blog_comments.date, blog_comments.postid, blog_comments.commentid, blog_comments_files.path
        FROM blog_comments LEFT JOIN blog_comments_files
        ON blog_comments.postid = blog_comments_files.post_id and blog_comments.commentid = blog_comments_files.comment_id;`
        pool.query(GET_COMMENTS, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to get all comments in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    const comments = []
                    result.map(comment => {
                        const obj = {
                            'postid': comment.postid,
                            'commentid': comment.commentid,
                            'name': comment.name,
                            'description': comment.description,
                            'date': comment.date,
                            'files': comment.path
                        }
                        comments.push(obj)
                    })
                    resolve(comments)
                }
                else {
                    resolve(false)
                }
            }
        })
        //connection.release();
    })
}

// DIRECT
// DIRECT
// DIRECT
// DIRECT
export const addDirectPost = (username, title, description, date, files) => {
    return new Promise((resolve, reject) => {
        const ADD_POST = `INSERT INTO direct_posts (name, title, description, date) VALUES ('${username}', '${title}', '${description}', '${date}'); SELECT LAST_INSERT_ID(); `
        pool.query(ADD_POST, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to add direct post in db. ${err}`)
                resolve(false)
            }
            else {
                if (result) {
                    const postId = result[1][0]['LAST_INSERT_ID()']
                    const files_to_send = files
                    const ADD_FILES_BLOG_POSTS = `INSERT INTO direct_files (path, post_file_id) VALUES ('${files_to_send}', '${postId}')`
                    pool.query(ADD_FILES_BLOG_POSTS, (err, result) => {
                        if (err) {
                            loggerError.error(`${Date.now()}: failed to add file of direct post in db. ${err}`)
                            resolve(false)
                        }
                        else {
                            if (result) {
                                loggerInfo.info(`success add to direct post`)
                                resolve(true)
                            }
                            else {
                                loggerInfo.info(`failed add to direct post`)
                                resolve(false)
                            }
                        }
                    })
                    loggerInfo.info(`${username} success to add direct post`)
                    resolve(true)
                }
                else {
                    loggerInfo.info(`${username} failed to add direct post`)
                    resolve(false)
                }
            }
        })
        //connection.release();
    })
}

export const addDirectComment = (username, description, date, postid, files) => {
    return new Promise((resolve, reject) => {
        const ADD_COMMENT = `INSERT INTO direct_comments (name, description, date, postid) VALUES ('${username}', '${description}', '${date}', '${postid}'); SELECT LAST_INSERT_ID(); `
        pool.query(ADD_COMMENT, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to add comment direct in db. ${err}`)
                resolve(false)
            }
            else {
                if (result) {
                    const commentId = result[1][0]['LAST_INSERT_ID()']
                    const files_to_send = files;
                    const ADD_FILES_BLOG_COMMENTS = `INSERT INTO direct_comments_files (path, post_id, comment_id) VALUES ('${files_to_send}', '${postid}', '${commentId}')`
                    pool.query(ADD_FILES_BLOG_COMMENTS, (err, result) => {
                        if (err) {
                            loggerError.error(`${Date.now()}: failed to add file of comment direct in db. ${err}`)
                            resolve(false)
                        }
                        else {
                            if (result) {
                                loggerInfo.info(`success add to add comment direct post`)
                                resolve(true)
                            }
                            else {
                                loggerInfo.info(`failed add to add comment direct post`)
                                resolve(false)
                            }
                        }
                    })
                    loggerInfo.info(`${username} success to add direct comment`)
                    resolve(true)
                }
                else {
                    loggerInfo.info(`${username} failed to add direct comment`)
                    resolve(false)
                }
            }
        })
        //connection.release();

    })
}

export const getAllDirectPosts = (username) => {
    return new Promise((resolve, reject) => {
        const GET_POSTS = `SELECT direct_posts.name, direct_posts.title, direct_posts.description, direct_posts.date, direct_posts.postid, direct_files.path 
        FROM direct_posts LEFT JOIN direct_files 
        ON direct_posts.postid = direct_files.post_file_id
        WHERE direct_posts.name = '${username}'`
        pool.query(GET_POSTS, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to get all direct posts in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    const posts = []
                    result.map(post => {
                        const obj = {
                            'postid': post.postid,
                            'name': post.name,
                            'title': post.title,
                            'content': post.description,
                            'date': post.date,
                            'files': post.path
                        }
                        posts.push(obj)
                    })
                    resolve(posts)
                }
                else {
                    resolve([])
                }
            }
        })
        //connection.release();
    })
}

export const getAllDirectComments = () => {
    return new Promise((resolve, reject) => {
        const GET_COMMENTS = `SELECT direct_comments.name, direct_comments.description, direct_comments.date, direct_comments.postid, direct_comments.commentid, direct_comments_files.path
        FROM direct_comments LEFT JOIN direct_comments_files
        ON direct_comments.postid = direct_comments_files.post_id and
        direct_comments.commentid = direct_comments_files.comment_id;`
        pool.query(GET_COMMENTS, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to get all comments in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    const comments = []
                    result.map(comment => {
                        const obj = {
                            'postid': comment.postid,
                            'commentid': comment.commentid,
                            'name': comment.name,
                            'description': comment.description,
                            'date': comment.date,
                            'files': comment.path
                        }
                        comments.push(obj)
                    })
                    resolve(comments)
                }
                else {
                    loggerInfo.info('failed to load all comments')
                    resolve(false)
                }
            }
        })
        //connection.release();

    })
}

export const getAdminDirectPosts = () => {
    return new Promise((resolve, reject) => {
        const GET_POSTS = `SELECT direct_posts.name, direct_posts.title, direct_posts.description, direct_posts.date, direct_posts.postid, direct_files.path 
        FROM direct_posts LEFT JOIN direct_files 
        ON direct_posts.postid = direct_files.post_file_id`
        pool.query(GET_POSTS, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to get all direct posts in db. ${err}`)
                reject(err)
            }
            else {
                if (result[0]) {
                    const posts = []
                    result.map(post => {
                        const obj = {
                            'postid': post.postid,
                            'name': post.name,
                            'title': post.title,
                            'content': post.description,
                            'date': post.date,
                            'files': post.path
                        }
                        posts.push(obj)
                    })
                    resolve(posts)
                }
                else {
                    loggerInfo.info('failed to load all direct posts')
                    resolve([])
                }
            }
        })
        //connection.release();

    })
}


export const delPost = (postid, kind) => {
    return new Promise((resolve, reject) => {
        let DELETE_COMMENT_FILES, DELETE_COMMENTS, DELETE_POST_FILES, DELETE_POST;
        if (kind == 'blog') {
            DELETE_COMMENT_FILES = `DELETE FROM blog_comments_files WHERE post_id = '${postid}';`
            DELETE_COMMENTS = `DELETE FROM blog_comments WHERE postid = '${postid}';`
            DELETE_POST_FILES = `DELETE FROM blog_files WHERE post_file_id = '${postid}';`
            DELETE_POST = `DELETE FROM blog_posts WHERE postid = '${postid}';`
        } else {
            DELETE_COMMENT_FILES = `DELETE FROM direct_comments_files WHERE post_id = '${postid}';`
            DELETE_COMMENTS = `DELETE FROM direct_comments WHERE postid = '${postid}';`
            DELETE_POST_FILES = `DELETE FROM direct_files WHERE post_file_id = '${postid}';`
            DELETE_POST = `DELETE FROM direct_posts WHERE postid = '${postid}';`
        }
        pool.query(DELETE_COMMENT_FILES, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to delete post in db. ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    pool.query(DELETE_COMMENTS, (err, result) => {
                        if (err) {
                            loggerError.error(`${Date.now()}: failed to delete post in db. ${err}`)
                            reject(err)
                        }
                        else {
                            if (result) {
                                pool.query(DELETE_POST_FILES, (err, result) => {
                                    if (err) {
                                        loggerError.error(`${Date.now()}: failed to delete post in db. ${err}`)
                                        reject(err)
                                    }
                                    else {
                                        if (result) {
                                            pool.query(DELETE_POST, (err, result) => {
                                                if (err) {
                                                    loggerError.error(`${Date.now()}: failed to delete post in db. ${err}`)
                                                    reject(err)
                                                }
                                                else {
                                                    if (result) {
                                                        resolve(true)
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
        //connection.release();

    })
}

export const delComment = (commentid, kind) => {
    return new Promise((resolve, reject) => {
        let DELETE_COMMENT_FILES, DELETE_COMMENTS;
        if (kind == 'blog') {
            DELETE_COMMENT_FILES = `DELETE FROM blog_comments_files WHERE comment_id = '${commentid}';`
            DELETE_COMMENTS = `DELETE FROM blog_comments WHERE commentid = '${commentid}';`
        } else {
            DELETE_COMMENT_FILES = `DELETE FROM direct_comments_files WHERE comment_id = '${commentid}';`
            DELETE_COMMENTS = `DELETE FROM direct_comments WHERE commentid = '${commentid}';`
        }
        pool.query(DELETE_COMMENT_FILES, (err, result) => {
            if (err) {
                loggerError.error(`${Date.now()}: failed to delete comment in db. ${err}`)
                reject(err)
            }
            else {
                if (result) {
                    pool.query(DELETE_COMMENTS, (err, result) => {
                        if (err) {
                            loggerError.error(`${Date.now()}: failed to delete comment in db. ${err}`)
                            reject(err)
                        }
                        else {
                            if (result) {
                                loggerInfo.info('success to delete comment')
                                resolve(true)
                            }
                        }
                    })
                }
            }
        })
        //connection.release();

    })
}