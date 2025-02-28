import React from "react";
import { useEffect } from "react";
import { Container, Box, Grid, Typography, Tab } from '@mui/material/';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    

    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (window.location.pathname === "/chats" && !user) {
            navigate("/");
        }
    },[navigate]);



    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={0}
                marginTop={8}
                direction="column"
                alignItems="center"
                sx={{ minHeight: '90vh' }}>

                <Typography component='div' variant="h2"> <Box fontWeight='fontWeightMedium' display='inline'>BuzzChat</Box></Typography>

                <Box sx={{ marginTop: '50px', width: '500px', padding: '0' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList variant="fullWidth" onChange={handleChange} centered>
                                <Tab sx={{
                                    color: 'black', '&.Mui-selected': {
                                        color: 'white',
                                        fontWeight: 'bolder',
                                        backgroundColor: '00FFFFFF',
                                    }
                                }} width="50%" label="Login" value="1" />
                                <Tab sx={{
                                    color: 'black', '&.Mui-selected': {
                                        color: 'white',
                                        fontWeight: 'bolder',
                                        backgroundColor: '00FFFFFF',
                                    }
                                }} width="50%" label="Signup" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ textAlign: 'center' }}>{<Login />}</TabPanel>
                        <TabPanel value="2" sx={{ textAlign: 'center' }}>{<Signup />}</TabPanel>
                    </TabContext>
                </Box>
            </Grid>
        </Container>

    )
}