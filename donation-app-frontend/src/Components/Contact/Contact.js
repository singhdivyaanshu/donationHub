import React,{useEffect} from 'react'
import { Button, Form, Grid, Header,Modal,Message, Dropdown} from 'semantic-ui-react'

import { useNavigate} from "react-router-dom";

const Options = [
  { key: 'AL', text: 'Donator', value: 'Organisation' },
  { key: 'Ab', text: 'Donatee', value: 'Individual' },
]

const base_url = process.env.REACT_APP_BASE_URL;


const Contact = ({form :{form, handleChange,saveAndContinue,formError,open,
  setreset,errMessage,message,modOpen,fetchData,setModopen,setCurrent
}}) =>{

  setCurrent('Contact');

  const handleopen = () =>{
    setreset();
    console.log("Message Successfully Sent"); 
    setModopen(false);
    navigate("/");
  }


  useEffect(()=>{
    if(open){
      let data = {
        email: form.email,
        message: form.message,
        userType: form.userType,
        name: form.name
      }
      fetchData(`${base_url}/message`,data,"contact","POST");
    }

  },[open]);


  

  const navigate = useNavigate();

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>

          <br/>
          <br/>
        {modOpen && 
      <Modal open={modOpen}>
      
      <Modal.Content>
        <Modal.Description>
          Hurrah! Your Message Is Sent Successfully.
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleopen}>OK</Button>
      </Modal.Actions>
    </Modal>
    }
          <Header as='h2' color='teal' textAlign='center'>
            Contact Us
          </Header>
          {
            errMessage && 
            <Message negative>
            <p>{message}</p>
            </Message>
          }

          
          <Form size='large' onSubmit={saveAndContinue}>
            <set stacked>

              <Form.Input
              label='First Name'
              name="name"
              placeholder='First Name'
              value={form.name||""}
              onChange={handleChange}
              error={(formError.nameError? true: false)?{content: formError.nameError} : false}
            />

              <Form.Input fluid 
                icon='user' 
                iconPosition='left'
                name="email"
                value={form.email||""} 
                placeholder='E-mail address' 
                onChange={handleChange}
                type='email'
                error={(formError.emailError? true: false)?{content: formError.emailError} : false}
                label='Email'
                />
                <p style={{fontSize: '14px'}} textAlign='center'>
                 <strong>User Type</strong> 
                </p>
                <Dropdown
                fluid
                labeled
                label='User Type'
                name="userType"
                value={form.userType||""}
                type="dropdown"
                placeholder='Select a User Type'
                onChange={handleChange}
                error={(formError.userTypeError? true: false)?{content: formError.userTypeError} : false}
                search
                selection
                options={Options}
                />        
                <br/>
                <Form.TextArea  
                  fluid
                  label='Message'
                  icon="message"
                  name="message"
                  value={form.message||""}
                  iconPosition="left"
                  type='text'
                  placeholder='Message'
                  onChange={handleChange}
                  error={(formError.messageError? true: false)?{content: formError.messageError} : false}
                  />
                  <br/>
                  
                <Button color='teal' fluid size='large'>Send Message</Button>      
                
                </set>
          </Form>
        </Grid.Column>
      </Grid>
  )
}

export default Contact;
