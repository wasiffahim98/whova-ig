import React from 'react';
import profilePic from '../profilePic.jpg';
import bannerPost from '../bannerPost.jpeg';
import {connect} from 'react-redux';
import {getAllComments, addComment, likeReply, likeComment, replyToComment} from '../redux/actions/commentFunction';
import whiteHeart from '../whiteHeart.png';
import redHeart from '../redHeart.png';

class LandscapePost extends React.Component{
    constructor(){
        super();
        this.state = {
            comment: '',
        }
        this.stateAddComment = this.stateAddComment.bind(this);
        this.stateChange = this.stateChange.bind(this);
        this.sortedComment = this.sortedComment.bind(this);
        this.time = this.time.bind(this);
        this.stateReplyClick = this.stateReplyClick.bind(this);
        this.stateLikeClick = this.stateLikeClick.bind(this);
        this.stateReplyLikeClick = this.stateReplyLikeClick.bind(this);
    }
    componentDidMount(){
        this.props.getAllComments();
    }
    stateChange(event){
        this.setState({
            comment: event.target.value,
        })
    }
    stateAddComment(event){
        event.preventDefault();
        if(this.state.comment.trim() === ''){
            return;
        }
        const newComment = {
            content: this.state.comment,
            posted: new Date(),
        }
        this.setState({comment: ''});
        this.props.addComment(newComment);
    }
    sortedComment(comList){
        comList.sort((a,b) => {
            a = new Date(a.posted);
            b = new Date(b.posted);
            return a>b?-1:a<b?1:0
        })
        return comList;
    }
    stateReplyClick(event){
        const commentNum = event.target.id;
        const reply = {
            content: this.state.comment,
            posted: new Date(),
        }
        if(this.state.comment.trim() !== ''){
            this.props.replyToComment(reply, commentNum);
        }
        this.setState({comment: ''});
    }
    stateLikeClick(event){
        event.preventDefault();
        const commentNum = event.target.id;
        this.props.likeComment(commentNum);
    }
    stateReplyLikeClick(event){
        this.props.likeReply(commentNum, replyNum);
    }
    time(date){
        const currTime = new Date();
        const postTime = new Date(date);
        let timeDiff = Math.floor((currTime-postTime)/1000);
        if(timeDiff<60){
            return timeDiff+"s";
        }
        timeDiff = Math.floor(timeDiff/60);
        if(timeDiff<60){
            return timeDiff+"m";
        }
        timeDiff = Math.floor(timeDiff/60);
        if(timeDiff<60){
            return timeDiff+"h";
        }
        timeDiff = Math.floor(timeDiff/24);
        if(timeDiff<7){
            return timeDiff+"d";
        }
        timeDiff = Math.floor(timeDiff/7);
        return timeDiff+"w";
    }
    render(){
        const {comList} = this.props.comment;
        const sortComment = comList ? this.sortedComment(comList) : comList;
        const recent = sortComment ? sortComment.map(comment =>
            <div className='comment'>
                <div className='titleLandscapeView'>
                    <img src={profilePic} height='40px' width='40px' style={{flex:'0 0 10%'}}/>
                    <div className='commentLandscapeView'>
                        <div className='landscapeContainer'>
                            <div className='comment' style={{flex:'0, 0, 10%'}}>
                                <p className='username'>username</p>
                                <p className='comment'>{comment.content}</p>
                            </div>
                            <div className='commentStatContainer'>
                                <div className='commentReplyStat'>
                                    {
                                        comment.likes > 0 ? comment.likes === 1 ?
                                        <div className='numLikes'>
                                            <p>{comment.likes} like</p>
                                        </div> :
                                        <div className='numLikes'>
                                            <p>{comment.likes} likes</p>
                                        </div>
                                        : null
                                    }
                                </div>
                                <div className='commentReplyStat'>
                                    <button className="button" if={comment.id} onClick={this.stateReplyClick}>Reply</button>
                                </div>
                            </div>
                        </div>
                        <div className='likeButtonLandscape'>
                            {
                                comment.liked ? 
                                <img className="heart" src={redHeart} height='10px' width='10px'/> :
                                <img className="heart" src={whiteHeart} height='10px' width='10px'
                                    id={comment.id} onClick={this.stateLikeClick}/>
                            }
                        </div>
                    </div>
                    {
                        comment.replies.length>0 ?
                        comment.replies.map(reply => 
                            <div className='replyContentLandscape'>
                                <div className='fullContentLandscape'>
                                    <img src={profilePic} height='40px' width='40px' style={{flex:'0 0 10%'}}/>
                                    <div className='contentLandscapeFill'>
                                        <p className='username'>username</p>
                                        <p className='comment'>{reply.content}</p>
                                    </div>
                                    <div className='landscapeContainer'>
                                        <p className='commentReplyStat'>{this.time(reply.posted)}</p>
                                        <div className='commentReplyStat'>
                                            {
                                                reply.likes > 0 ?
                                                    reply.likes === 1 ?
                                                        <div className='numLikes'>
                                                            <p>{reply.likes} like</p>
                                                        </div> :
                                                        <div className='numLikes'>
                                                            <p>{reply.likes} likes</p>
                                                        </div>
                                                        : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{flex:'1'}}>
                                {
                                    reply.liked ? 
                                            <img className='heart' src={redHeart} height='10px' width='10px' /> :
                                            <img className='heart' src={whiteHeart} height='10px' width='10px'
                                                id={reply.id} onClick={() => this.stateReplyClick(comment.id, reply.id)} />
                                }
                                
                            </div>
                            ):null;
                    }
                </div>
            </div>)
    }
}