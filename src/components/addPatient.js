import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";


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

const AddPatient = ({classes}) => {

  const [patient, setPatient] = useState('')
  const [age, setAge] = useState('')
  const [date, setDate] = useState('')
  const [phone, setPhone] = useState('')
  const [successMSG, setSuccess] = useState(false)

  const addPatient = async (event) => {
    event.preventDefault();
    // console.log(patient)
    // console.log(age)
    // console.log(date)
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name": patient, "age":age, "phone":phone})
    };
    try {
      const response = await fetch('http://127.0.0.1:5000/addPatient', requestOptions);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      else{
        console.log("Hello")
        setSuccess({successMSG : true})
        clearForm()
      }
    
     
    } catch (err) {
    } finally {
        console.log(successMSG);
        
    }
  }

  const clearForm = ()=>
  {
    
    console.log(successMSG)
    setPatient('')
    setAge('')
    setPhone('')
  }

  

  return (
    
    <div className={classes.root}>
        
      <div className="form-box">
        <form>
      <fieldset>
         <label>
           <input placeholder="Patient's name" name="patient" 
           type="text"
           required
           value={patient}
           onChange={(e) => setPatient(e.target.value)}
           />
         </label>
       </fieldset>
       <fieldset>
         <label>
           <input placeholder="Age" name="age" 
           type="text"
           required
           value={age}
           onChange={(e) => setAge(e.target.value)}
           />
         </label>
       </fieldset>
       <fieldset>
         <label> 
           <input placeholder="Phone no:" name="phone" 
           type="text"
           required
           value={phone}
           onChange={(e) => setPhone(e.target.value)}
           />
         </label>
       </fieldset>
       <button onClick={addPatient}>Add Patient</button>
      </form>
      </div>

     </div>
  );
}

export default withStyles(useStyles)(AddPatient);