import React from 'react';
import ReactDOM from 'react-dom';
import './navbar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Menu() {
  return (
    <>
      <Navbar fixed="top" expand="lg" className='color-nav' >
      
          <Navbar.Brand href="#home">PRESCRIPTIO</Navbar.Brand>
          <Nav className="navbar-nav ml-auto">
            <Nav.Link className='nav-item' href="/">Home</Nav.Link>
            <Nav.Link className='nav-item' href="/prescriptions">Prescription</Nav.Link>
            <Nav.Link className='nav-item' href="/patients">Patients</Nav.Link>
            {/* <Nav.Link href="/sheduler">Sheduler</Nav.Link> */}
          </Nav>
        
      </Navbar>
      <br />
      
    </>
  );
}

export default Menu;