import { Outlet } from "react-router-dom";
import { Button, Grid } from '@material-ui/core';
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
    const [reqErrorMsg, setReqErrorMsg] = useState('');
    const [reqErrorFlag, setReqErrorFlag] = useState(false);

    const [reqSuccessMsg, setReqSuccessMsg] = useState('');
    const [reqSuccessFlag, setReqSuccessFlag] = useState(false);

    const handleClick = method => {
        const productsUrl = "http://localhost:8080/product/";
        const token = sessionStorage.getItem("token");
        axios({
            method,
            url: productsUrl,
            data: {},
            headers: {
                token
            }
        }).then(response => {
            setReqErrorFlag(false);
            setReqSuccessFlag(true);
            setReqSuccessMsg(response.data);
        }).catch(errorObj => {
            setReqErrorMsg(errorObj.response.data);
            setReqErrorFlag(true);
            setReqSuccessFlag(false);
        })
    }

    const successMessage = () => {
        return (
            <div style={{ color: "green" }}>
                {reqSuccessMsg}
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


    return (
        <div style={{ "margin-left": "50px" }}>
            <h1>Dashboard</h1>

            <div>
                {reqErrorFlag && reqErrorMessage()}
                {reqSuccessFlag && successMessage()}
            </div>
            <Grid container spacing={2}>

                <Grid item xs={8}>
                    <Button color="primary" value="get" onClick={() => handleClick("get")}>GET</Button>
                </Grid>
                <Grid item xs={8}>
                    <Button color="primary" value="post" onClick={() => handleClick("post")}>Add</Button>
                </Grid>
                <Grid item xs={8}>
                    <Button color="primary" value="put" onClick={() => handleClick("put")}>Update</Button>
                </Grid>
                <Grid item xs={8}>
                    <Button color="primary" value="delete" onClick={() => handleClick("delete")}>Delete</Button>
                </Grid>

            </Grid>

            <Outlet />
        </div >
    )
};

export default Dashboard;