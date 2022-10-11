import React from 'react';
import { BrowserRouter , Route, Routes } from "react-router-dom"; 
import AddPatient from './components/addPatient';
// import withStyles from "@material-ui/core/styles/withStyles";
import Main from './components/main';
import Menu from './components/navbar';
import Patients from './components/patients';
import Sheduler from './components/sheduler';

const App = () => {
    return(
        <BrowserRouter>
        <Menu/>
            <Routes>
                 <Route path="/" element={<AddPatient/>} />
                 <Route path="/prescriptions" element={<Main/>} />
                 <Route path="/patients" element={<Patients/>} />
                 <Route path="/sheduler" element={<Sheduler/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default (App);
