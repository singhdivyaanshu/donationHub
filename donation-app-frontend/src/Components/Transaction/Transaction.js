import React,{useEffect} from "react";
import { Button, Form, Modal, Select,Grid,Header,Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";


const dropdown = [
  { key: "1", text: "Yes", value: "1" },
  { key: "2", text: "No", value: "2" },
]


export default function Transaction({form :{form, handleChange,saveAndContinue,formError,open,
  setreset,modOpen,setModopen,setCurrent}}) {

  setCurrent("Transaction");

  const navigate = useNavigate();

  const handleopen = () =>{
    setModopen(false);
    // console.log(" user completed"); 
    setreset();
    navigate("/main/home")
  }

  useEffect(()=>{
    if(open){
        setModopen(true);
        setreset();
    }
  },[open,setModopen,setreset]);
  

  return (

      <Grid textAlign='center' style={{ height: '90vh'}} verticalAlign='middle'>
        
        <Grid.Column style={{ maxWidth: '1050px'}}>
        <br/>
        <br/>
        <br/>
          
        <Header as='h2' color='teal' textAlign='center'>
            
            Transaction Details
          </Header>
          <hr style ={{width :'80%', opacity: '0.7'}}/>

          {modOpen && 
            <Modal open={modOpen}>
            <Modal.Header>Thank you!</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                Your transaction has been completed Successfully
                <br/>
                "Thank you for your help🙏" 
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={handleopen}>Ok</Button>
            </Modal.Actions>
          </Modal>
            }


          <Segment style ={{border: '0px'}} >


        <Form onSubmit={saveAndContinue}>
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" 
          name="name"
          placeholder="Name"
          value={form.name} 
          onChange={handleChange}
          error={(formError.nameError? true: false)?{content: formError.nameError} : false}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Email address</label>
            <Form.Input 
            name="email"
            type="email"
            value={form.email} 
            onChange={handleChange}
            placeholder="Email address" 
            
            error={(formError.emailError? true: false)?{content: formError.emailError} : false}
            />

          </Form.Field>
          <Form.Field>
            <label>Phone number</label>
            <Form.Input  
            placeholder="Phone number" 
            value={form.phoneNo} 
            name="phoneNo" 
            type="text"
            onChange={handleChange}
            error={(formError.phoneNoError? true: false)?{content: formError.phoneNoError} : false}
            />

          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Do You Wish To Stay Anonymous ?</label>
            <Select placeholder="Choose" 
            name="anonymous" 
            value={form.anonymous} 
            options={dropdown} 
            onChange={handleChange}
            error={(formError.anonymous? true: false)?{content: formError.anonymous} : false}
            />
          </Form.Field>
        </Form.Group>

        <Form.Field>
            <label>Donation Amount</label>
            <Form.Input  
            placeholder="Enter Amount (INR)" 
            value={form.amount} 
            name="amount"
            type="number" 
            onChange={handleChange}
            error={(formError.amountError? true: false)?{content: formError.amountError} : false}
            />
          </Form.Field>

          <Form.Field>
            <label>Enter Card Details</label>
            <Form.Input  
            placeholder="Enter Card Number" 
            value={form.cardNo} 
            name="cardNo" 
            type="number"
            onChange={handleChange}
            error={(formError.cardNoError? true: false)?{content: formError.cardNoError} : false}
            />
            </Form.Field>
          <Form.Group widths="equal">
          <Form.Input
            type="month"
            placeholder=" Expiration Date - year"
            name="date"
            value={form.date} 
            label="Expiration Date"
            onChange={handleChange}
            error={(formError.dateError? true: false)?{content: formError.dateError} : false}
          />

          <Form.Field>
            <label>Enter CVV</label>
            <Form.Input  
            placeholder="Three Digit CVV Number" 
            value={form.cvv} 
            name="cvv"
            type="number"
            min = {100}
            max = {999} 
            onChange={handleChange}
            error={(formError.cvvError? true: false)?{content: formError.cvvError} : false}
            />
            </Form.Field>
          </Form.Group>
        <Button style ={{backgroundColor: 'teal'}} primary type="submit">Continue</Button>
      </Form>
      </Segment> 
    </Grid.Column>
      </Grid> 
    

  )
}
