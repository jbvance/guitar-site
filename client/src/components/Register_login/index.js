import React from 'react';
import Button from '../utils/button';
//import Login from './login';
import Login from './login_1';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>
                            Sint elit tempor ad labore commodo eu eu duis labore excepteur irure consequat. Pariatur aliqua eu proident esse cupidatat minim eu. Reprehenderit et duis velit amet consequat elit enim aute ullamco ea non mollit.
                        </p>  
                        <Button
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="right">
                       <h2>Registered Customers</h2>
                       <p>If you have an account please log in.</p>
                       <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;