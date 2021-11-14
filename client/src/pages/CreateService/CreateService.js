import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../Firebase";
import { doc, getFirestore, collection } from "firebase/firestore";
import app from "../../Firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import "../../components/ContactUs/ContactUs.css";
import "./CreateService.css";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBBtn } from 'mdbreact';


function CreateService() {
  const serviceNameRef = useRef();
  const serviceDescripitionRef = useRef();
  const servicePriceRef = useRef();
  const servicePhoneRef = useRef();
  const serviceImage = useRef();
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const { currentUser, logout, setService, getAllUserService } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);
  const serviceCollectionRef = collection(db, "service");


  function handelChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      console.log(image)
    }
    
  }

  async function handelUpload(){
    const storage = getStorage(app);
    const storageReff = storageRef(storage);
    const imagesRef = storageRef(storageReff,`images/${image.name}`);
    uploadBytes(imagesRef,image )
    let result = getDownloadURL(imagesRef).then((downloadURL) => {
      console.log("File available at", downloadURL);
      return downloadURL;
    });
    return result;
  }

  async function handelSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      let path = await handelUpload();
      await setService(serviceCollectionRef, {
        serviceName: serviceNameRef.current.value,
        serviceDescripition: serviceDescripitionRef.current.value,
        servicePrice: servicePriceRef.current.value,
        servicePhone: servicePhoneRef.current.value,
        imagePath:path
      })

      history.push("/dashboard")
      console.log('done')
    } catch (error) {
      console.log(error);
      setError("Failed to create an service");
    }
    setLoading(false);
  }

  return (
    <Container className="mt-5">
      <div className="row">
        <div className="col-md-12">
          <Card
            className="card-image"
            style={
              {
              backgroundImage:"url(https://i.pinimg.com/564x/0d/17/83/0d178380d5b058a37584d1804820c589.jpg)",
             //   backgroundRepeat: "no-repeat"
              }
            }
          >
            <div className="rgba-stylish-strong py-5 px-5 z-depth-4">
              <div className="text-center">
                <h3 className="font-weight-bold">
                  <strong>Create Your </strong>
                  <a href="#!" className="text-primary font-weight-bold">
                    <strong>Service</strong>
                  </a>
                </h3>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}       
              <form onSubmit={handelSubmit}>
                         
                <Form.Group id="Service_Name">
                  <Form.Label className="text-primary font-weight-bold">
                    Service name
                  </Form.Label>                       
                  <Form.Control
                    validate
                    labelClass="white-text"
                    type="text"
                    ref={serviceNameRef}
                    required
                    placeholder="Enter Your Service Name"
                  />                       
                </Form.Group>
                                         
                <Form.Group id="Service_Descripition">
                  <Form.Label className="text-primary font-weight-bold">
                    Service Descripition
                  </Form.Label>               
                  <Form.Control
                    type="text"
                    ref={serviceDescripitionRef}
                    required
                    style={{height:"8rem"}}
                    placeholder="Enter Your Service description"
                  />
                </Form.Group>
                         
                <Form.Group id="Service_Price">
                  <Form.Label className="text-primary font-weight-bold">
                    Service Price
                  </Form.Label>   
                <Form.Control type="number" ref={servicePriceRef} required className="col-md-2" placeholder="Enter Your Service Price" style={{height:"2rem"}}/>      
                </Form.Group>
                         
                <Form.Group id="Phone_Number">
                  <Form.Label className="text-primary font-weight-bold">
                    Phone Number
                  </Form.Label>                     
                  <Form.Control type="number" ref={servicePhoneRef} required placeholder="Enter Your Phone Number"/> 
                         
                </Form.Group>
                <Form.Group id="Service_Image">   
                <label className="text-primary font-weight-bold mb-2">Service Image </label>          
                  <MDBInput 
                    type="file"
                    required
                    onChange={handelChange}
                  />
                </Form.Group>
                         
                <Button  type="submit" className="w-100 btn-upload-gradiant mt-5">
                 Let's Create your Service
                </Button>
                       
              </form>
                   
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default CreateService;
