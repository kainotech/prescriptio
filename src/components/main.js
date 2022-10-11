import React, {useState} from "react";
import {Button} from "react-bootstrap";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import speechToTextUtils from "../controllers/utility_transcribe";
// import TranscribeOutput from "../TranscribeOutput";
import jsonData from '../utils/data.json';
import './navbar.css'
// import SettingsSections from "./SettingsSection";

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

});

const Main = ({classes}) => {
  const [transcribedData, setTranscribedData] = useState([]);
  const [interimTranscribedData, setInterimTranscribedData] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState('')
  const [patient, setPatient] = useState('')
  // const [age, setAge] = useState('')
  // const [date, setDate] = useState('')
  const [labels, setLabels] = useState([])
  const [dummyData, setDummyData] = useState(jsonData);
  const [date, setDate] = useState('')
  // const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  // const supportedLanguages = {'en-US': 'English', 'de-DE': 'German', 'fr-FR': 'French', 'es-ES': 'Spanish'}

  // const addPatient = async (event) => {
  //   event.preventDefault();
  //   console.log(patient)
  //   console.log(age)
  //   console.log(date)
  // }

  const handleSubmit = async (event)=> {
  event.preventDefault();
  // console.log("Hello")
  //  alert('You have submitted the form.')
    console.log(formData);
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "data": formData })
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/analyzeText', requestOptions);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    //   console.log(response)
      const result = await response.json();
    //   console.log(result);
      
      setLabels(result);
      addRows(result)
      setFormData('')
       
      
    } catch (err) {
    } finally {
        // console.log(labels);
        
    }
 }

 const tableRows = dummyData.map((info) => {
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
  });

  const addPrescription = async (event) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name":patient, "prescription": dummyData, "date":date })
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/addPrescription', requestOptions);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      // const result = await response.json();
      setPatient('')
      setDate('')
    } catch (err) {
    } finally {      
    }
  }


    const addRows = (data) => {
    console.log("Pressed")
    const totalData = dummyData.length;
    data.id = totalData + 1;
    const updatedTotalData = [...dummyData];
    updatedTotalData.push(data);
    setDummyData(updatedTotalData);
    console.log(updatedTotalData)
  };

  function flushInterimData() {
    if (interimTranscribedData !== '') {
      setInterimTranscribedData('')
      setTranscribedData(oldData => [...oldData, interimTranscribedData])
    }
  }

  function handleDataReceived(data, isFinal) {
    console.log(data['transcripted_text'])
    if (isFinal) {
      setInterimTranscribedData('')
      setTranscribedData(oldData => [...oldData, data['transcripted_text']])
      setFormData(oldData => [...oldData, data['transcripted_text']])
    } else {
      setInterimTranscribedData(data['transcripted_text'])
      // setFormData(data['transcripted_text'])
    }
  }

  function getTranscriptionConfig() {
    return {
      audio: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        // languageCode: selectedLanguage,
      },
      interimResults: true
    }
  }

  function onStart() {
    setTranscribedData([])
    setIsRecording(true)

    speechToTextUtils.initRecording(
      getTranscriptionConfig(),
      handleDataReceived,
      (error) => {
        console.error('Error when transcribing', error);
        setIsRecording(false)
        // No further action needed, as stream already closes itself on error
      });
  }

  function onStop() {
    setIsRecording(false)
    flushInterimData() // A safety net if Google's Speech API doesn't work as expected, i.e. always sends the final result
    speechToTextUtils.stopRecording();
  }

  return (
    
    <div className={classes.root}>
        {/* <Menu/> */}
      {/* <div className={classes.title}>
        
        <Typography variant="h5">
          PRESCRIPTIO 
          {/* <span role="img" aria-label="microphone-emoji">🎤</span> */}
        {/* </Typography> */}

      <div >
        {!isRecording && <Button className="button-start" onClick={onStart}>Start transcribing</Button>}
        {isRecording && <Button onClick={onStop} variant="danger">Stop</Button>}
      </div>
      <div className="form-box">
        <form>
      <fieldset>
         <label>
           <p></p>
           <input name="name" 
           type="text"
           required
           value={formData}
           onChange={(e) => setFormData(e.target.value)}
           />
         </label>
       </fieldset>
       <Button className="button-start" onClick={handleSubmit}>Add</Button>
       <p></p>
       <div>
        {/* <p>{labels}</p> */}
        <table className="table table-stripped">
        <thead className="table-head">
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
        <tbody>{tableRows}</tbody>
      </table>
      </div>
      </form>
      </div>
      <div className="form-box">
        <form>
          <fieldset>
         <label>
           <p></p>
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
           <p></p>
           <input placeholder="Date" name="date"
           type="text"
           required
           value={date}
           onChange={(e) => setDate(e.target.value)}
           />
         </label>
       </fieldset>
       <div>
        <Button className="button-start" onClick={addPrescription}>Submit Prescription</Button>
      </div>
        </form>
      </div>
      
    </div>
  );
}

export default withStyles(useStyles)(Main);