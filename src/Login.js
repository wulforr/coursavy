import React, { Component } from 'react';
import cookie from 'react-cookies'
import axios from 'axios'
import moment from 'moment';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";



class Login extends Component {
    constructor(){
        super()
        this.state = {
            token:cookie.load('token'),
            email:'',
            password:''
            // cookieloaded:false
        }
    }

    handleOnChange = field => event => {
        console.log(event,field)
        this.setState({[field]: event.target.value})
      }
    
    handlelogin = () => {
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
    handlelogout = () => {
        cookie.remove('token',{path:'/'})
        this.setState({token:undefined})
    }

    render() {
        console.log(this.state)
        // const day = moment("1995-12-25");
        // console.log(day.year(),moment().diff(moment('2008-08-14T23:22:45.210Z'), 'years'))
        if(this.state.token){
            return(
                <div className="login-page">
                    <div className="logout-btn">
                <button onClick={this.handlelogout}>logout</button>
                </div>
                </div>)
        }
        else {
        return (
            <div className="login-page">
                <div className="login-form">

           {/* Login  */}
           {/* <button onClick={this.login}>login</button>     */}
           <div className="text-field">
           <TextField
                  id="name"
                  label="Email"
                  className="text-field"
                  value={this.state.email}
                  onChange={this.handleOnChange("email")}
                  fullWidth
                  helperText="Test email - eve.holt@reqres.in"
                  variant="outlined"
                  />
                  test
                  </div>
            <div className="text-field">
            <TextField
                  id="name"
                  label="Password"
                  type="password"
                  className="text-field"
                  value={this.state.password}
                  onChange={this.handleOnChange("password")}
                  fullWidth
                  helperText="Test Password - cityslicka"
                  variant="outlined"
                  />
                  </div>
            <Button  variant="outlined" onClick={this.handlelogin} color="primary">
                  Login
                </Button>
                </div>
            </div>
        );
        }
    }
}

export default Login;