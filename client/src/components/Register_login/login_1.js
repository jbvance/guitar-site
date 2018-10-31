import React from 'react';
import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import { loginUser } from '../../actions/userActions';


const Login = props => {  
    const {                        
        touched,
        errors,
        isSubmitting        
      } = props;  
  return (
    <Form>
      <div>        
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && <p className="error_label">{errors.email}</p>}
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p className="error_label">{errors.password}</p>}
      </div>  
              
      <button disabled={isSubmitting}>Submit</button>
    </Form>
  )
}

const FormikLogin = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || '',
      password: password || '',      
    }
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
  }),

  handleSubmit(values, { props, resetForm, setErrors, setSubmitting}) {     
     console.log(values);       
     props.loginUser(values)
        .then(res => {
            if (res.payload.loginSuccess){
                console.log(res.payload);
                props.history.push('/user/dashboard');

            } else {
                setErrors({
                    password: 'Invalid email/password. Please try again'
                  });
            }
        });  
        setSubmitting(false);
  }
})(Login);

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loginUser }, dispatch);
}


export default connect(null, mapDispatchToProps)(withRouter(FormikLogin));
