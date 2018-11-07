import React  from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Layout from './hoc/layout';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import UserDashboard from './components/user';
import Auth from './hoc/auth';
import Shop from './components/shop';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)}/>
        <Route path="/register" exact component={Auth(Register, false)}/>
        <Route path="/shop" exact component={Auth(Shop, null)} />  
        <Route path="/" exact component={Auth(Home, null)} />        
      </Switch>
    </Layout>
    
  )
}

export default Routes;
