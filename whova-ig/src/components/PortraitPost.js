import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addComment, getAllComments} from '../redux/actions/commentFunction';
import profilePic from '../profilePic.jpg';
import bannerPost from '../bannerPost.jpeg';

class PortraitPost extends React.Component{
    constructor(){
        super();
        this.state = {
            comment: '',
        }
        this.stateAddComment = this.stateAddComment.bind(this);
        this.stateChange = this.stateChange.bind(this);
        this.sortComment = this.sortComment.bind(this);
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
        const newComment = {
            content: this.state.comment,
            posted: new Date(),
        }
        this.props.addComment(newComment);
    }
    sortComment(comList){
        comList.sort((a,b) => {
            a = new Date(a.posted);
            b = new Date(b.posted);
            return a>b?-1:a<b?1:0
        })
        return comList;
    }
    render(){
        const {comList} = this.props.comment;
        const sortedComment = comList ? this.sortComment(comList) : null;
        const recentComment = sortedComment ? sortedComment.slice(0, 2).map(comment =>
            <div key={comment.num} className='comment portrait-view'>
                <div className='user-comment portrait-view'>
                    <p className="username">username</p>
                    <p className="recent-comment">{comment.content}</p>
                </div>
            </div>
            ) : null;
        return(
            <div className='postContainer'>
                <div className='contentPost'>
                    <div className='userPortraitViewContainer'>
                        <img src={profilePic} alt='user' height='40px' width='40px' style={{flex:'0 0 1%'}}/>
                        <p className='portraitContainer'>'bwayne98'</p>
                    </div>
                    <img src={bannerPost} alt='gotham' style={{width: '50vw'}}></img>
                    <div className="flexContainer">
                        <p className='pUsername'>bwayne98</p>
                        <p className='pDesc'>No place is home like Gotham City</p>
                    </div>
                    <div className="commentSec">
                        {
                            comList ?
                            <Link to='/allcomments'>View all {comList.length} comments</Link> : null
                        }
                        <div className='recentCom'>
                            {recentComment}
                        </div>
                    </div>
                    <hr />
                    <form className="submit-comment" onSubmit={this.stateAddComment}>
                        <input id='comment' type='text' value='Post'/>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        comment: state.comment,
    }
}
export default connect(mapStateToProps, {addComment, getAllComments})(PortraitPost);