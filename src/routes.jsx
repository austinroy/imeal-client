import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import App from './App';
import Meals from './components/Meals';
import Login from './components/Login';
import SignUp from './components/SignUp';
import jwt from 'jsonwebtoken';
import AddMeal from './components/AddMeal';
import UpdateMeal from './components/UpdateMeal';



const loggedIn = () => {
    const token = localStorage.getItem('token');

    if(token){
        const decoded = jwt.decode(token);
        return true;
    } else {
        return false;
    }
}


const Routes = () => (
    <App>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/meals" render={(props) => (!loggedIn() ? ( <Redirect to="/login"/> ): (<Meals {...props} />))} />
            <Route exact path="/addmeal" render={(props) => (!loggedIn() ? ( <Redirect to="/login"/> ): (<AddMeal {...props} />))} />
            <Route path="/updatemeal/:meal_id" render={(props) => (!loggedIn() ? ( <Redirect to="/login"/> ): (<UpdateMeal {...props} />))} />
        </Switch>
    </App>   
)

export default Routes