import { divide } from "lodash";
import React , {useState, useEffect} from "react";
import '.././App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import withStyles from "@material-ui/core/styles/withStyles";
import jsonData from '../utils/patients.json';
import Profile from './showProfile'

const useStyles = () => ({
  root: {
    display: 'flex',
    flex: '1',
    margin: '100px 0px 50px 0px',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  title: {
    marginRight:'20px',
    marginBottom: '20px',
  },
  settingsSection: {
    marginBottom: '20px',
  },
  buttonsSection: {
    marginBottom: '40px',
  },
});




const Patients = ({classes}) =>{
    const [patients, setPatients] = useState([]);
    const [patientsData, setPatientsData] = useState([])

    useEffect(() => {
  getPatients();
}, []);

    const getPatients = async (event) =>{
      // event.preventDefault();
      console.log("Get data!")
      const requestOptions = {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
    };
    try {
      const response = await fetch('http://127.0.0.1:5000/getPatients', requestOptions);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setPatients(result.patients);
      // setPatientsData(result.patients)
          
      // console.log(result.patients[0].name)
    } catch (err) {
    } finally {    
    }
    }

    const showProfile = ()=>{
      console.log("Clicked")
      return(
        <h1>Profile</h1>
      )
    }


    //  const tableRows = ;
    
    
    const patientsCards = patients.map((info) => {
      // console.log(info.prescriptions[0]['med'])
      
    return (
     
      <Card style={{ width: '60rem' , margin: '20px' }}>
      <Card.Header as="h6">{info['name']}</Card.Header>
      <Card.Body>
        {/* <Card.Title>Special title treatment</Card.Title> */}
        <Card.Text>Age:
          {info['age']}
        </Card.Text>
         <Card.Text as="h6">
          Prescriptions
        </Card.Text>
        { 

        info.prescriptions.map((data)=>{
              // const medData = Object.values(data);
              console.log((data))
              if (data!=null) {
      
  
              return (
                <div>
        <p>{data['date']}</p>
      
        <table className="table table-stripped">
        <thead>
          <tr>
            <th>id</th>
            <th>Drug</th>
            <th>Dosage</th>
            <th>Form</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Route</th>
            <th>Strength</th>
          </tr>
        </thead>
        <tbody>{
        data['med'].map((info) => {
          console.log(info)
    return (
      <tr>
        <td>{info.id}</td>
        <td>{info.DRUG}</td>
        <td>{info.DOSAGE}</td>
        <td>{info.FORM}</td>
        <td>{info.FREQUENCY}</td>
        <td>{info.DURATION}</td>
        <td>{info.ROUTE}</td>
        <td>{info.STRENGTH}</td>
      </tr>
    );
  })
        }</tbody>
      </table>
      </div>
              )}
            }
            )}
          
        {/* <Button variant="primary" onClick={showProfile}>Show Profile</Button> */}
      </Card.Body>
    </Card>
    );
  });


    return(
        <div className={classes.root}>
            <h4>Patients</h4>
            <div>
              {patientsCards}
              
             
            </div>
            
        </div>
        
    )
}

export default withStyles(useStyles)(Patients);