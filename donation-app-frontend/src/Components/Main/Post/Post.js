import React,{useState,useEffect} from 'react'
import { Button, Form, Grid, Header, Segment,Modal,Message} from 'semantic-ui-react'
import { useNavigate} from "react-router-dom";
import { initializeApp } from "firebase/app";
import {getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage"
import '../Sidebar/Sidebar.css'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const base_url = process.env.REACT_APP_BASE_URL;
// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage();

export default function Post({setActiveItem,activeItem,form :{form, handleChange,saveAndContinue,formError,open,
    setreset,errMessage,message,modOpen,fetchData,setModopen,setCurrent,setForm
  }}) {
    
    const navigate = useNavigate();
    let token = localStorage.getItem("token");

    useEffect(()=>{
      if(!token){
        alert("Please login to continue");
        setActiveItem("Profile");
        navigate("/");
      }
    },[token,setActiveItem,navigate]);

    

    const [imageLink,setImageLink] = useState("");
    const [docLink,setDocLink] = useState("");
    const [button,setbutton] = useState(true);

    const uploadImage = async(file,type) =>{
      const name  = file.name;
      const metadata = {
          name: name,
          contentType:file.type
      }
  
      const storageRef = ref(storage, 'documents/'+localStorage.getItem("token") +"/"+ file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
    }, 
    (error) => {
      // console.log(error.message);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        if(type==="image"){
          setImageLink(downloadURL);
        }
        else{
          setDocLink(downloadURL);
        }
      });
    }
  );
  
  }

    const handleimage = (e) =>{
      setForm({...form,image:e.target.files[0]});
      uploadImage(e.target.files[0],"image")
    }

    const handledocument = (e) =>{
      setForm({...form,document:e.target.files[0]});
      uploadImage(e.target.files[0],"document")
    }



    setCurrent('post');
  
    const handleopen = () =>{
      setreset();
      setModopen(false);
      setActiveItem("My_Post");
      navigate("/main/mypost");
    }
    
    useEffect(() => {
      if(imageLink && docLink && form){
        setbutton(false);
      }

    },[imageLink,docLink,form]);

  
    useEffect(()=>{
      if(open){
          let data = {
            token,
            imageLink,
            docLink,
            postTitle: form.name,
            amountRequired: form.amount,
            postContent: form.cause
          }
          fetchData(`${base_url}/${(activeItem==="Create_Post")?("createpost"):("updatepost")}`,data,"createpost","POST");
      }
  
    },[open,token,imageLink,docLink,fetchData,form.name,form.amount,form.cause,activeItem]);    
  
    
      
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <br/>
      <br/>
    {modOpen && 
  <Modal open={modOpen}>
  
  <Modal.Content>
    <Modal.Description>
      {
        (activeItem==="Create_Post")?("Post Created Successfully") : ("Post Updated Successfully")
      }
    </Modal.Description>
  </Modal.Content>
  <Modal.Actions>
    <Button onClick={handleopen}>OK</Button>
  </Modal.Actions>
</Modal>
}
     


      <Header as='h2' color='teal' textAlign='center'>
       {
        (activeItem==="Create_Post") ?("Post your problem") : ("Update your problem")
       }
      </Header>
      {
        errMessage && 
        <Message negative>
        <p>{message}</p>
        </Message>
      }

      <Form size='large' onSubmit={saveAndContinue}>
        <Segment stacked>
          <Form.Input 
            fluid 
            name="name"
            value={form.name||""} 
            placeholder='Name' 
            onChange={handleChange}
            type='name'
            error={(formError.nameError? true: false)?{content: formError.nameError} : false}
          />
          <Form.Input 
            fluid 
            name="amount"
            value={form.amount||""} 
            placeholder='Amount Needed' 
            onChange={handleChange}
            type='Number'
            min = {5000}
            error={(formError.amountError? true: false)?{content: formError.amountError} : false}
          />
          <p>Please provide a image</p>
          <Form.Input 
            fluid 
            name="image"
            placeholder='Provide a Image Link' 
            onChange={handleimage}
            type='file'
            error={(formError.imageError? true: false)?{content: formError.imageError} : false}
          />
          
          {imageLink && <img src={imageLink} alt="preview" style={{width:"100px",height:"100px"}}/>}
          <p>Provide Supporting Documents in Single file</p>
          <Form.Input 
            fluid 
            name="document"
            placeholder='Provide a Drive Link' 
            onChange={handledocument}
            type='file'
            error={(formError.documentError? true: false)?{content: formError.documentError} : false}
          />
          <Form.TextArea 
            fluid 
            name="cause"
            value={form.cause||""} 
            placeholder='Describe your problem' 
            onChange={handleChange}
            type='Text'
            error={(formError.causeError? true: false)?{content: formError.causeError} : false}
          />
          <Button color='teal' fluid size='large' disabled={button} type="submit">{activeItem==="Create_Post" ?("Create Post") : ("Update Post")}</Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
    
  )
}



