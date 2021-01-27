import {GET_ALL_COMMENTS, LIKE_COMMENT, ADD_COMMENT, LIKE_REPLY, REPLY_TO_COMMENT} from './types';

export const addComment = (commentData) => {
    let comment = JSON.parse(localStorage.getItem('comment'));
    let currNum = localStorage.getItem('currNum');
    if(!currNum){
        currNum = 0;
    }
    
    if(comment){
        const newComment = {
            num: currNum,
            content: commentData.content,
            replies: [],
            likes: 0,
            liked: false,
            posted: commentData.posted,
        }
        comment.push(newComment);
    }
    else{
        comment = [{
            num: currNum,
            content: commentData.content,
            replies: [],
            likes: 0,
            liked: false,
            posted: commentData.posted,
        }]
    }
    localStorage.setItem('comment', JSON.stringify(comment));
    localStorage.setItem('currNum', ++currNum);
    return({
        type: ADD_COMMENT,
        payload: comment,
    })
}

export const getAllComments = () => {
    const comment = JSON.parse(localStorage.getItem('comment'));
    return({
        type: GET_ALL_COMMENTS,
        payload: comment,
    })
}

export const replyToComment = (replyComment, commentNum) => {
    const comment = JSON.parse(localStorage.getItem('comment'));
    let currNum = localStorage.getItem('currNum');
    const newReply = {
        num: currNum,
        content: replyComment.content,
        likes: 0,
        liked: false,
        posted: replyComment.posted,
    }
    for (let i=0; i<comment.length; i++){
        if(parseInt(comment[i].num, 10) === parseInt(commentNum)){
            comment[i].replies.push(newReply);
            break;
        }
    }
    localStorage.setItem('comment', JSON.stringify(comment));
    localStorage.setItem('currNum', ++currNum);
    return({
        type: REPLY_TO_COMMENT,
        payload: comment,
    })
}

export const likeComment = (commentNum) => {
    const comment = JSON.parse(localStorage.getItem('comment'));
    for(let i=0; i<comment.length; i++){
        if(parseInt(comment[i].num, 10) === parseInt(commentNum, 10)){
            if(comment[i].liked){
                break;
            }
            comment[i].likes += 1;
            comment[i].liked = true;
            break;
        }
    }
    localStorage.setItem('comment', JSON.stringify(comment));
    return({
        type: LIKE_COMMENT,
        payload: comment,
    })
}

export const likeReply = (commentNum, replyNum) => {
    const comment = JSON.parse(localStorage.getItem('comment'));
    for(let i=0; i<comment.length; i++){
        if(parseInt(comment[i].num, 10) === parseInt(replyNum, 10)){
            for(let j=0; j<comment[i].length; j++){
                const reply = comment[i].replies[j];
                if(parseInt(reply.num, 10) === parseInt(replyNum, 10)){
                    if(reply.liked){
                        break;
                    }
                    reply.likes += 1;
                    reply.liked = true;
                    break;
                }
            }
        }
    }
    localStorage.setItem('comment', JSON.stringify(comment));
    return({
        type: LIKE_REPLY,
        payload: comment,
    })
}