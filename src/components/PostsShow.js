import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostShow extends Component {

  componentWillMount() {
    const { fetchPost, match: {params: {id} } } = this.props;
    fetchPost(id);
  }
  
  onDeleteClick = () => {
    const { deletePost , match: {params: {id} }, history } = this.props;
    deletePost(id, ()=> {
      history.push('/');
    });
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div style={{marginTop: '30px'}}>
        <Link to="/" className="btn btn-primary"> Back to All Posts</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick = {this.onDeleteClick}
        >
        DELETE POST
        </button>
        <h2>{post.title}</h2>
        <h6>Categories: {post.categories}</h6>
        <p> {post.content} </p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost } )(PostShow);