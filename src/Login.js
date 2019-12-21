import React, { Component } from 'react';
import cookie from 'react-cookies'
import axios from 'axios'
import moment from 'moment';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            token:cookie.load('token'),
            // cookieloaded:false
        }
    }
    login = () => {
        console.log("in login")
        axios.post('https://reqres.in/api/login',{
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        })
        .then(res => {
            this.setState({token:res.data.token})
            // Set cookie such that it expires after 30 minutes
            let d = new Date();
            d.setTime(d.getTime() + (30*60*1000));
            cookie.save('token',res.data.token, {path:'/', expires:d})
            // this.setState({cookieloaded:true})

        })
        .catch(err => console.log(err))
    }
    logout = () => {
        cookie.remove('token',{path:'/'})
        this.setState({token:undefined})
    }

    render() {
        console.log(this.state)
        const day = moment("1995-12-25");
        console.log(day.year(),moment().diff(moment('2008-08-14T23:22:45.210Z'), 'years'))
        if(this.state.token){
            return(<button onClick={this.logout}>logout</button>)
        }
        else {
        return (
            <div>
           Login 
           <button onClick={this.login}>login</button>    
            </div>
        );
        }
    }
}

export default Login;