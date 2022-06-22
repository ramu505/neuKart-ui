import React from "react";
import { useState } from "react";
import { TextField, Grid, Button } from '@material-ui/core';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError(true);
        } else {
            const reqObj = {
                username, password
            }
            axios.post('http://localhost:8080/user/login', reqObj)
                .then(response => {
                    setSubmitted(true);
                    setError(false);
                    sessionStorage.setItem("token", response.data.token);
                    navigate('/dashboard');
                })
                .catch(err => {
                    setReqErrorMsg(err.response.data.error)
                    setSubmitted(false);
                    setReqError(true);
                })


        }
    };

    const errorMessage = () => {
        return (
            <div style={{ color: "red" }}>
                Please enter all the fields
            </div>
        );
    };

    const successMessage = () => {
        return (
            <div style={{ color: "green" }}>
                User {username} successfully registered!!
            </div>
        );
    };

    const reqErrorMessage = () => {
        return (
            <div style={{ color: "red" }}>
                {reqErrorMsg}
            </div>
        );
    };

    const handleUserName = (e) => {
        setUserName(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };
    return (
        <div style={{ "margin-left": "50px" }}>
            <h1>SignIn Here</h1>
            <div>
                {error && errorMessage()}
                {reqError && reqErrorMessage()}
            </div>
            <form style={{ "align": "cengter" }} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={8}><TextField id="username" label="Username" onChange={handleUserName} /></Grid>
                    <Grid item xs={8}><TextField type="password" id="password" label="password" onChange={handlePassword} /></Grid>
                </Grid>
                <Button type="submit">SignIn</Button>
            </form>
        </div >
    );
}

export default SignIn;