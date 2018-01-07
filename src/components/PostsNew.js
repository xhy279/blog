import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import { createPost } from "../actions";

class PostsNew extends Component {
  

  renderField = (field) => {
    const { meta: {touched, error}} = field;
    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input} 
        />
        <div className="text-help">
          { touched ? error : '' }
        </div>
        
      </div>
    );
  }

  onSubmit = (values) => {
    // history is get from react-router
    const {createPost, history} = this.props;
    createPost(values, ()=>{
      history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)} >
          <Field 
            label="Title"
            name="title"
            component={ this.renderField } // component props determines how to show this field.
          />
          <Field 
            label="Categories"
            name="categories"
            component={ this.renderField } // component props determines how to show this field.
          />
          <Field 
            label = "Content"
            name="content"
            component={ this.renderField } // component props determines how to show this field.
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/"  className="btn btn-danger" >CANCEL</Link>
        </form>       
      </div>
    );
  }
}

// triggered when try to submit form
const validateForm = (values) => {
  // console.log(values); --> values contains all form field values
  
  const errors = {};

  // validate the inputs form 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title that is at least 3 characters';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  
  if (!values.content) {
    errors.content = 'Enter some content';
  }


  // if errors is empty, the form is ok to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
  form: 'PostsNewForm', 
  validate: validateForm, 

})(
  connect(null, { createPost })(PostsNew)
);