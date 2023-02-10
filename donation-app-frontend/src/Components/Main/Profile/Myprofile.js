import React,{useState,useEffect} from "react";
import { Button, Form, Modal, Select,Grid,Header,Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";


const base_url = process.env.REACT_APP_BASE_URL;

export default function EditProfile({setActiveItem,form :{form, handleChange,saveAndContinue,formError,open,
  setreset,modOpen,fetchData,setModopen,setForm,countryOptions
}}) {

  const [userType,setUserType] = useState("user");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // setUserType(localStorage.getItem("userType"));

  let chimkandi=0;

  useEffect(()=>{
    if(!token){
      alert("Please login to continue");
      navigate("/");
      setActiveItem("Home");
      chimkandi = 1;
    }
  },[]);



  useEffect(() => {

    async function fetchuserdata() {
      const response = await fetch(`${base_url}/userdetails`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        })
      })
  
      const data = await response.json();
  
      if(data.msg.includes("Sucess"))
      {
        return data.data;
      }
      else{

        if(chimkandi===0)
        {
          alert(data.msg);
          navigate("/");
        }
      }
    }
    
      fetchuserdata().then((data)=>{
        // console.log(data);
        setForm(data);
      })

  },[]);

  const handleopen = () =>{
    setModopen(false);
    // console.log(" user completed"); 
    setreset();
  }

  useEffect(()=>{
    if(open){
        let data = {
          token,
          name: form.name,
          phoneNo: form.phoneNo,
          state: form.state,
        }
        // console.log(data,"data");
        fetchData(`${base_url}/updateuser`,data,"updateuser","POST");
    }
  },[open]);
  

  return (

      <Grid textAlign='center' style={{ height: '90vh'}} verticalAlign='middle'>
        {/* <br/> */}
        <Grid.Column style={{ maxWidth: '1050px'}}>
          
        <Header as='h2' color='teal' textAlign='center'>
            
            My Profile
          </Header>
          <hr style ={{width :'80%', opacity: '0.7'}}/>

          {modOpen && 
            <Modal open={modOpen}>
            <Modal.Header>Thank you!</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                Your Profile Updated Successfully 
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={handleopen}>Ok</Button>
            </Modal.Actions>
          </Modal>
            }


          <Segment style ={{border: '0px'}} >

{    form &&   
        <Form onSubmit={saveAndContinue}>
        <Form.Group widths="equal">
          <Form.Input fluid label={userType==="user"?"Name":"Organisation Name"} 
          name="name"
          placeholder={userType==="user"?"Name":"Organisation Name"} 
          value={form.name} 
          onChange={handleChange}
          error={(formError.nameError? true: false)?{content: formError.nameError} : false}
          />

          {userType==="user" && <Form.Input fluid label="Last Name" 
          placeholder="Last Name" 
          name="lastName"
          value={form.lastName} 
          onChange={handleChange}
          error={(formError.lastName? true: false)?{content: formError.lastName} : false}
          />}

        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Email address</label>
            <Form.Input 
            placeholder="Email address" 
            value={form.email} 
            disabled
            />

          </Form.Field>
          <Form.Field>
            <label>Phone number</label>
            <Form.Input  
            placeholder="Phone number" 
            value={form.phoneNo} 
            name="phoneNo" 
            onChange={handleChange}
            error={(formError.phoneNo? true: false)?{content: formError.phoneNo} : false}
            />

          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>State</label>
            <Select placeholder="Select state" 
            name="state" 
            value={form.state} 
            options={countryOptions} 
            onChange={handleChange}
            error={(formError.state? true: false)?{content: formError.state} : false}
            />
          </Form.Field>
        </Form.Group>
        <Button primary type="submit">Save Changes</Button>
      </Form>}
      </Segment> 
    </Grid.Column>
      </Grid> 
    

  )
}
