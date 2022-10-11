import flask
from flask_cors import CORS, cross_origin
import json
import os
from flask import jsonify, request, make_response, render_template
from asyncio.windows_events import NULL
import spacy
import en_core_med7_trf
from pymongo import MongoClient
from flask_pymongo import PyMongo
from bson import json_util, ObjectId


med7 = en_core_med7_trf.load()

text = 'Paracetamols'

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = '*'

try:
    client = MongoClient("mongodb+srv://admin:Kaino123@cluster0.gqaeir8.mongodb.net/?retryWrites=true&w=majority")
    print("Connected successfully!!!")
except:  
    print("Could not connect to MongoDB")

db = client.prescriptio

collection = db.patients

# mongodb_host = os.environ.get('MONGO_HOST', 'localhost')
# mongodb_port = int(os.environ.get('MONGO_PORT', '27017'))
# client = MongoClient('localhost', '27017')    #Configure the connection to the database
# db = client.camp2016    #Select the database
# patients = db.patients #Select the collection



print("DB Connected")

@app.route("/addPatient", methods=['POST'])
def addPatients():
    name = json.loads(request.data)['name']
    phone = json.loads(request.data)['phone']
    age = json.loads(request.data)['age']
    prescriptions = []
    res = {"name":name, "age":age, "phone":phone, "prescriptions":prescriptions}
    x = collection.insert_one(res)
    # print(x)
    return ("Data Added!")


@app.route("/addPrescription", methods=['POST'])
def addPrescription():
    name = json.loads(request.data)['name']
    new_prescription = json.loads(request.data)['prescription']
    date = json.loads(request.data)['date']
    res = {"med":new_prescription, "date":date}
    names = collection.find({},{"name":1})
    for data in names:
        if name==data['name']:
            print(data['name'])
            result = collection.update_many(
                {"name":name},
                {'$push':
                    {'prescriptions': res}
                }
            )
    # age = json.loads(request.data)['age']
    # date = json.loads(request.data)['date']
    # res = {"name":name, "age":age}
    # x = collection.insert_one(res)
    # print(x)
    return ("Data Added!")



@app.route("/getPatients", methods=['GET'])
def getPatients():
    x = collection.find()
    patients_list = []
    for data in x:
        # print(data)
        patients_list.append(data)
    print(patients_list)
    res = {"patients": patients_list}
    return json.loads(json_util.dumps(res))



@app.route('/analyzeText', methods=['POST'])
@cross_origin()
def analyse_text():
    text = json.loads(request.data)['data']
    print(text)
    texts = []
    labels = []
    doc = med7(text)
    for ent in doc.ents:
        texts.append(ent.text)
        labels.append(ent.label_)
    if doc.ents == NULL:
        return NULL
    else: 
        res = dict(zip(labels, texts))
        print(res)
        return make_response(res)
    
    # start_time = str(data["start_date"])+"T"+str(data["start_time"])
    # response = make_response(_zoom.create_meeting(data["topic"], data["agenda"], start_time, data["invitees"]))

    # return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


