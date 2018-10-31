import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormField from '../utils/Form/formField';
import{ update, generateData, isFormValid } from '../utils/Form/formActions';
import { loginUser } from '../../actions/userActions';

class Login extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'login');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData, 'login');
        let formIsValid = isFormValid(this.state.formData, 'login');
        if (formIsValid) {
            console.log("VALID");
            this.props.loginUser(dataToSubmit)
            .then(res => {
                if (res.payload.loginSuccess){
                    console.log(res.payload);
                    this.props.history.push('/user/dashboard');

                } else {
                    this.setState({
                        formError: true
                    })
                }
            });
        } else {
            this.setState({
                formError: true
            })
        }        
    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField 
                        id={'email'}                    
                        formData={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField 
                        id={'password'}                    
                        formData={this.state.formData.password}
                        change={(element) => this.updateForm(element)}
                    />

                    {this.state.formError  ?
                        <div className="error_label">
                            Please correct the error(s) above
                        </div>
                    : null }
                    <button onClick={(event) => this.submitForm(event)}>Login</button>

                </form>                
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loginUser }, dispatch);
}



export default connect(null, mapDispatchToProps)(withRouter(Login));