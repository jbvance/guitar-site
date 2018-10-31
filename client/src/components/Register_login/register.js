import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormField from '../utils/Form/formField';
import{ update, generateData, isFormValid } from '../utils/Form/formActions';
import { registerUser, loginUser } from '../../actions/userActions';

class Register extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastName_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
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
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'                    
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'register');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData, 'register');
        let formIsValid = isFormValid(this.state.formData, 'register');
        if (formIsValid) {
            this.props.registerUser(dataToSubmit)
            .then(response => {
                if (response.payload.success) {                    
                    // login the new user
                   this.props.loginUser(dataToSubmit)
                    // Redirect to dashboard
                    .then(() => {
                        this.props.history.push('/user/dashboard');
                    });
                } else {
                    console.log("ERROR", response.payload);
                    this.setState((prevState, props) => ({ formError: true }))
                }
            }).catch(e => {
                console.log("ERROR", e);
                this.setState((prevState, props) => ({formError: true }))
            });
        } else {
            this.setState({
                formError: true
            })
        }        
    }


    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <h2>Personal Information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField 
                                            id={'name'}                    
                                            formData={this.state.formData.name}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField 
                                            id={'lastName'}                    
                                            formData={this.state.formData.lastName}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <FormField 
                                        id={'email'}                    
                                        formData={this.state.formData.email}
                                        change={(element) => this.updateForm(element)}
                                    />
                                </div>
                                <h2>Password</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField 
                                            id={'password'}                    
                                            formData={this.state.formData.password}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField 
                                            id={'confirmPassword'}                    
                                            formData={this.state.formData.confirmPassword}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {this.state.formError  ?
                                        <div className="error_label">
                                            Please correct the error(s) above
                                        </div>
                                    : null }
                                    <button onClick={(event) => this.submitForm(event)}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>                

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ registerUser, loginUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Register);