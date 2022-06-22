import React from "react";
import { useState } from "react";
import { TextField, Grid, Select, Button, MenuItem, InputLabel } from '@material-ui/core';
import axios from "axios";

function SignUp() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || role === '' || password === '') {
            setError(true);
        } else {
            const reqObj = {
                username, password, role
            }
            axios.post('http://localhost:8080/user/register', reqObj)
                .then(response => {
                    setSubmitted(true);
                    setError(false);
                    setReqError(false)
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


    // Handling the email change
    const handleRole = (e) => {
        setRole(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };
    return (
        <div style={{ "margin-left": "50px" }}>
            <h1>SignUp Here</h1>
            <div>
                {error && errorMessage()}
                {submitted && !error && successMessage()}
                {reqError && reqErrorMessage()}
            </div>
            <form style={{ "align": "cengter" }} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={8}><TextField id="username" label="Username" onChange={handleUserName} /></Grid>
                    <Grid item xs={8}><TextField type="password" id="password" label="password" onChange={handlePassword} /></Grid>
                    <Grid item xs={8}>
                        <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={handleRole}

                        >
                            <MenuItem value="supporter">Supporter</MenuItem>
                            <MenuItem value="seller">Seller</MenuItem>
                            <MenuItem value="customer">Customer</MenuItem>
                        </Select></Grid>
                </Grid>
                <Button type="submit">SignUp</Button>
            </form>
        </div >
    );
}

export default SignUp;