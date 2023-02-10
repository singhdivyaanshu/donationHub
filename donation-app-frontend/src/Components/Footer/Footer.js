import React from 'react'
// import "./Footer.css"
import { Grid, Header, Segment,Container,List} from 'semantic-ui-react'
import {useNavigate} from "react-router-dom";

    
    export default function Footer() {
      const navigate = useNavigate();
      return (
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
        
        
        <meta name="viewport" content="width=device-width, initial-scale=1.00, maximum-scale=2.00, minimum-scale=1.00"></meta>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={5} >
                <Header inverted style ={{textAlign: 'center'}} as='h4' content='Sitemap' />

                <List link inverted style={{textAlign: 'center'}}
                >
                  <List.Item as='a' href="#">Homepage</List.Item>
                  <List.Item as='a'href="#overview">Overview</List.Item>
                  <List.Item as='a'href="#about">About Our Platform</List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={5}>
                <Header inverted style ={{textAlign: 'center'}} as='h4' content='Login/Signup' />
                <List link inverted style={{textAlign: 'center'}}>
                  <List.Item as='a' onClick={()=>navigate("/org")}>Login as an Donator</List.Item>
                  <List.Item as='a' onClick={()=>navigate("/people")}>Login as a Donatee</List.Item>
                </List>
              </Grid.Column>
              
              <Grid.Column width={5}>
                <Header inverted style ={{textAlign: 'center'}} as='h4' content='Get in Touch With Us' />
                <List link inverted style={{textAlign: 'center'}}>
                  <List.Item as='a' onClick={()=>navigate("/contact")}>Contact Us</List.Item>
                  <List.Item as='a' href="mailto:donatenowindia@gmail.com">Write To us at : donatenowindia@gmail.com</List.Item>
                </List>
              </Grid.Column>
 
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
        )
    }
    




