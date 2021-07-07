"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminDirectPosts = exports.getAllDirectComments = exports.getAllDirectPosts = exports.addDirectComment = exports.addDirectPost = exports.getAllComments = exports.getAllPosts = exports.addComment = exports.addPost = exports.getPin = exports.addPin = exports.register = exports.login = void 0;
const index_1 = require("./../index");
const logger_1 = require("./../utils/logger");
const encDecPass_1 = require("./../utils/encDecPass");
const login = (username) => {
    return new Promise((resolve, reject) => {
        const GET_MEMBER = `SELECT password FROM members WHERE (username = '${username}')`;
        index_1.connection.query(GET_MEMBER, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to check login in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    const decryptPass = encDecPass_1.decrypt(result[0].password);
                    resolve(decryptPass);
                }
                else {
                    resolve(false);
                }
            }
        });
    });
};
exports.login = login;
const register = (username, password, phone, email) => {
    return new Promise((resolve, reject) => {
        const ADD_MEMBER = `INSERT INTO members (username, password, phone, email) VALUES ('${username}', '${password}', '${phone}', '${email}')`;
        index_1.connection.query(ADD_MEMBER, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to register in db. ${err}`);
                resolve(false);
            }
            else {
                if (result) {
                    logger_1.loggerInfo.info(`${username} success to register`);
                    resolve(true);
                }
                else {
                    logger_1.loggerInfo.info(`${username} failed to register`);
                    resolve(false);
                }
            }
        });
    });
};
exports.register = register;
const addPin = (username, pincode) => {
    return new Promise((resolve, reject) => {
        const ADD_PIN = `UPDATE members SET pincode = '${pincode}' WHERE (username = '${username}')`;
        index_1.connection.query(ADD_PIN, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to add pin code in db. ${err}`);
                reject(err);
            }
            else {
                if (result.affectedRows === 1) {
                    logger_1.loggerInfo.info(`success to save a new pin code ${pincode} of ${username}`);
                    resolve(true);
                }
                else {
                    logger_1.loggerInfo.info(`failed to save a new pin code ${pincode} of ${username}`);
                    resolve(false);
                }
            }
        });
    });
};
exports.addPin = addPin;
const getPin = (username) => {
    return new Promise((resolve, reject) => {
        const GET_PIN = `SELECT pincode FROM members WHERE (username = '${username}')`;
        index_1.connection.query(GET_PIN, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to get pin code in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    logger_1.loggerInfo.info(`success to get pin code of ${username}`);
                    resolve(result[0].pincode);
                }
                else {
                    logger_1.loggerInfo.info(`failed to get pin code of ${username}`);
                    resolve(''); // '' represent failed pin code 
                }
            }
        });
    });
};
exports.getPin = getPin;
// BLOG
// BLOG
// BLOG
// BLOG 
const addPost = (username, title, description, date, files) => {
    return new Promise((resolve, reject) => {
        const ADD_POST = `INSERT INTO blog_posts (name, title, description, date) VALUES ('${username}', '${title}', '${description}', '${date}'); SELECT LAST_INSERT_ID(); `;
        index_1.connection.query(ADD_POST, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to add blog post in db. ${err}`);
                resolve(false);
            }
            else {
                if (result) {
                    const postId = result[1][0]['LAST_INSERT_ID()'];
                    const files_to_send = files;
                    if (files_to_send) {
                        const ADD_FILES_BLOG_POSTS = `INSERT INTO blog_files (path, post_file_id) VALUES ('${files_to_send}', '${postId}')`;
                        index_1.connection.query(ADD_FILES_BLOG_POSTS, (err, result) => {
                            if (err) {
                                logger_1.loggerError.error(`failed to add file of blog post in db. ${err}`);
                                resolve(false);
                            }
                            else {
                                if (result) {
                                    logger_1.loggerInfo.info(`${files_to_send} success add to blog post`);
                                    resolve(true);
                                }
                                else {
                                    logger_1.loggerInfo.info(`${files_to_send} failed add to blog post`);
                                    resolve(false);
                                }
                            }
                        });
                    }
                    logger_1.loggerInfo.info(`${username} success to add blog post`);
                    resolve(true);
                }
                else {
                    logger_1.loggerInfo.info(`${username} failed to add blog post`);
                    resolve(false);
                }
            }
        });
    });
};
exports.addPost = addPost;
const addComment = (username, description, date, postid, files) => {
    return new Promise((resolve, reject) => {
        const ADD_COMMENT = `INSERT INTO blog_comments (name, description, date, postid) VALUES ('${username}', '${description}', '${date}', '${postid}'); SELECT LAST_INSERT_ID(); `;
        index_1.connection.query(ADD_COMMENT, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to add comment blog in db. ${err}`);
                resolve(false);
            }
            else {
                if (result) {
                    const commentId = result[1][0]['LAST_INSERT_ID()'];
                    const files_to_send = files;
                    const ADD_FILES_BLOG_COMMENTS = `INSERT INTO blog_comments_files (path, post_id, comment_id) VALUES ('${files_to_send}', '${postid}', '${commentId}')`;
                    index_1.connection.query(ADD_FILES_BLOG_COMMENTS, (err, result) => {
                        if (err) {
                            logger_1.loggerError.error(`failed to add file of comment blog in db. ${err}`);
                            resolve(false);
                        }
                        else {
                            if (result) {
                                logger_1.loggerInfo.info(`success add to add comment blog post`);
                                resolve(true);
                            }
                            else {
                                logger_1.loggerInfo.info(`failed add to add comment blog post`);
                                resolve(false);
                            }
                        }
                    });
                    logger_1.loggerInfo.info(`${username} success to add blog comment`);
                    resolve(true);
                }
                else {
                    logger_1.loggerInfo.info(`${username} failed to add blog comment`);
                    resolve(false);
                }
            }
        });
    });
};
exports.addComment = addComment;
const getAllPosts = () => {
    return new Promise((resolve, reject) => {
        const GET_POSTS = `SELECT blog_posts.name, blog_posts.title, blog_posts.description, blog_posts.date, blog_posts.postid, blog_files.path
        FROM blog_posts LEFT JOIN blog_files
        ON blog_posts.postid = blog_files.post_file_id;`;
        index_1.connection.query(GET_POSTS, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to get all posts in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    const posts = [];
                    result.map(post => {
                        const obj = {
                            'postid': post.postid,
                            'name': post.name,
                            'title': post.title,
                            'content': post.description,
                            'date': post.date,
                            'files': post.path
                        };
                        posts.push(obj);
                    });
                    logger_1.loggerInfo.info('success to load all posts');
                    resolve(posts);
                }
                else {
                    logger_1.loggerInfo.info('failed to load all posts');
                    resolve([]);
                }
            }
        });
    });
};
exports.getAllPosts = getAllPosts;
const getAllComments = () => {
    return new Promise((resolve, reject) => {
        const GET_COMMENTS = `SELECT blog_comments.name, blog_comments.description, blog_comments.date, blog_comments.postid, blog_comments.commentid, blog_comments_files.path
        FROM blog_comments LEFT JOIN blog_comments_files
        ON blog_comments.postid = blog_comments_files.post_id and blog_comments.commentid = blog_comments_files.comment_id;`;
        index_1.connection.query(GET_COMMENTS, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to get all comments in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    const comments = [];
                    result.map(comment => {
                        const obj = {
                            'postid': comment.postid,
                            'commentid': comment.commentid,
                            'name': comment.name,
                            'description': comment.description,
                            'date': comment.date,
                            'files': comment.path
                        };
                        comments.push(obj);
                    });
                    logger_1.loggerInfo.info('success to load all comments');
                    resolve(comments);
                }
                else {
                    logger_1.loggerInfo.info('failed to load all comments');
                    resolve(false);
                }
            }
        });
    });
};
exports.getAllComments = getAllComments;
// DIRECT
// DIRECT
// DIRECT
// DIRECT
const addDirectPost = (username, title, description, date, files) => {
    return new Promise((resolve, reject) => {
        const ADD_POST = `INSERT INTO direct_posts (name, title, description, date) VALUES ('${username}', '${title}', '${description}', '${date}'); SELECT LAST_INSERT_ID(); `;
        index_1.connection.query(ADD_POST, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to add direct post in db. ${err}`);
                resolve(false);
            }
            else {
                if (result) {
                    const postId = result[1][0]['LAST_INSERT_ID()'];
                    const files_to_send = files;
                    const ADD_FILES_BLOG_POSTS = `INSERT INTO direct_files (path, post_file_id) VALUES ('${files_to_send}', '${postId}')`;
                    index_1.connection.query(ADD_FILES_BLOG_POSTS, (err, result) => {
                        if (err) {
                            logger_1.loggerError.error(`failed to add file of direct post in db. ${err}`);
                            resolve(false);
                        }
                        else {
                            if (result) {
                                logger_1.loggerInfo.info(`${files_to_send} success add to direct post`);
                                resolve(true);
                            }
                            else {
                                logger_1.loggerInfo.info(`${files_to_send} failed add to direct post`);
                                resolve(false);
                            }
                        }
                    });
                    logger_1.loggerInfo.info(`${username} success to add direct post`);
                    resolve(true);
                }
                else {
                    logger_1.loggerInfo.info(`${username} failed to add direct post`);
                    resolve(false);
                }
            }
        });
    });
};
exports.addDirectPost = addDirectPost;
const addDirectComment = (username, description, date, postid, files) => {
    return new Promise((resolve, reject) => {
        const ADD_COMMENT = `INSERT INTO direct_comments (name, description, date, postid) VALUES ('${username}', '${description}', '${date}', '${postid}'); SELECT LAST_INSERT_ID(); `;
        index_1.connection.query(ADD_COMMENT, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to add comment direct in db. ${err}`);
                resolve(false);
            }
            else {
                if (result) {
                    const commentId = result[1][0]['LAST_INSERT_ID()'];
                    const files_to_send = files;
                    const ADD_FILES_BLOG_COMMENTS = `INSERT INTO direct_comments_files (path, post_id, comment_id) VALUES ('${files_to_send}', '${postid}', '${commentId}')`;
                    index_1.connection.query(ADD_FILES_BLOG_COMMENTS, (err, result) => {
                        if (err) {
                            logger_1.loggerError.error(`failed to add file of comment direct in db. ${err}`);
                            resolve(false);
                        }
                        else {
                            if (result) {
                                logger_1.loggerInfo.info(`success add to add comment direct post`);
                                resolve(true);
                            }
                            else {
                                logger_1.loggerInfo.info(`failed add to add comment direct post`);
                                resolve(false);
                            }
                        }
                    });
                    logger_1.loggerInfo.info(`${username} success to add direct comment`);
                    resolve(true);
                }
                else {
                    logger_1.loggerInfo.info(`${username} failed to add direct comment`);
                    resolve(false);
                }
            }
        });
    });
};
exports.addDirectComment = addDirectComment;
const getAllDirectPosts = (username) => {
    return new Promise((resolve, reject) => {
        const GET_POSTS = `SELECT direct_posts.name, direct_posts.title, direct_posts.description, direct_posts.date, direct_posts.postid, direct_files.path 
        FROM direct_posts LEFT JOIN direct_files 
        ON direct_posts.postid = direct_files.post_file_id
        WHERE direct_posts.name = '${username}'`;
        index_1.connection.query(GET_POSTS, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to get all direct posts in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    const posts = [];
                    result.map(post => {
                        const obj = {
                            'postid': post.postid,
                            'name': post.name,
                            'title': post.title,
                            'content': post.description,
                            'date': post.date,
                            'files': post.path
                        };
                        posts.push(obj);
                    });
                    logger_1.loggerInfo.info('success to load all direct posts');
                    resolve(posts);
                }
                else {
                    logger_1.loggerInfo.info('failed to load all direct posts');
                    resolve([]);
                }
            }
        });
    });
};
exports.getAllDirectPosts = getAllDirectPosts;
const getAllDirectComments = () => {
    return new Promise((resolve, reject) => {
        const GET_COMMENTS = `SELECT direct_comments.name, direct_comments.description, direct_comments.date, direct_comments.postid, direct_comments.commentid, direct_comments_files.path
        FROM direct_comments LEFT JOIN direct_comments_files
        ON direct_comments.postid = direct_comments_files.post_id and
        direct_comments.commentid = direct_comments_files.comment_id;`;
        index_1.connection.query(GET_COMMENTS, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to get all comments in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    const comments = [];
                    result.map(comment => {
                        const obj = {
                            'postid': comment.postid,
                            'commentid': comment.commentid,
                            'name': comment.name,
                            'description': comment.description,
                            'date': comment.date,
                            'files': comment.path
                        };
                        comments.push(obj);
                    });
                    logger_1.loggerInfo.info('success to load all comments');
                    resolve(comments);
                }
                else {
                    logger_1.loggerInfo.info('failed to load all comments');
                    resolve(false);
                }
            }
        });
    });
};
exports.getAllDirectComments = getAllDirectComments;
const getAdminDirectPosts = () => {
    return new Promise((resolve, reject) => {
        const GET_POSTS = `SELECT direct_posts.name, direct_posts.title, direct_posts.description, direct_posts.date, direct_posts.postid, direct_files.path 
        FROM direct_posts LEFT JOIN direct_files 
        ON direct_posts.postid = direct_files.post_file_id`;
        index_1.connection.query(GET_POSTS, (err, result) => {
            if (err) {
                logger_1.loggerError.error(`failed to get all direct posts in db. ${err}`);
                reject(err);
            }
            else {
                if (result[0]) {
                    const posts = [];
                    result.map(post => {
                        const obj = {
                            'postid': post.postid,
                            'name': post.name,
                            'title': post.title,
                            'content': post.description,
                            'date': post.date,
                            'files': post.path
                        };
                        posts.push(obj);
                    });
                    logger_1.loggerInfo.info('success to load all direct posts');
                    resolve(posts);
                }
                else {
                    logger_1.loggerInfo.info('failed to load all direct posts');
                    resolve([]);
                }
            }
        });
    });
};
exports.getAdminDirectPosts = getAdminDirectPosts;
//# sourceMappingURL=mysqlAPI.js.map