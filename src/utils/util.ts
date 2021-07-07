export const mergePostsComment = (posts, comments) => {
    posts && posts.forEach(post => {
        post.comments = []
        post.files ? 
            post.files = post.files.split(",")
            : null
    });
    comments && comments.forEach(comment => {
        posts.forEach(post => {
            if(comment.postid === post.postid){
                comment.files ? 
                    comment.files = comment.files.split(",")
                    : null
                post.comments.push(comment)
            }
        });
    });
    return posts
}
