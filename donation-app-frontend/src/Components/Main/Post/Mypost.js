import React,{useState} from 'react'
import { Button, Grid, Header, Segment,Message,Card,Image } from 'semantic-ui-react'
import { useNavigate} from "react-router-dom";
import Profile from "../Profile/Profile";

const base_url = process.env.REACT_APP_BASE_URL;

export default function Mypost() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if(!token){
        alert("Please login to continue");
        navigate("/");
    }

    const [showPost,setShowPost] = useState(false);
    const [postData,setPostData] = useState({});
    const [myposterror,setmyposterror] = useState("");
    const [active,setActive] = useState(false);

    const fetchmypost = async() =>{
        let url = `${base_url}/mypost`;
        const response = await fetch(url,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            token:token
          })
        });
        const data = await response.json();
        if(data.msg.includes("Sucess")){
          setPostData(data.data);
          setmyposterror("");
          setShowPost(true);
        }
        else{
          setmyposterror(data.msg);
        }
      }

      fetchmypost();

  return (
    <Grid textAlign='center' style={{ height: '60vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 350 }}>
        <br/>
        <br/>
        {
        myposterror!=="" && 
        <Message negative>
        <p>{myposterror}</p>
        </Message>
        }

      {
        showPost &&
        <Segment stacked style={{alignItems:"center" ,height:"250px"}}>
          <Header as='h2' color='teal' textAlign='center'>Your Post</Header>
        <div className='row__poster' style={{margin:"auto auto"}}>
              <Card>
              <Card.Content>
                <Image
                  floated='right'
                  size='mini'
                  src={postData.imageLink}
                />
                <Card.Header>{postData.postTitle}</Card.Header>
                <Card.Meta>Location: {postData.state}</Card.Meta>
                <Card.Description>
                <Card.Meta>Amount needed <strong>₨ {postData.amountRequired}/-</strong></Card.Meta>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='teal' onClick={()=>setActive(true)}>
                    Contact Me
                  </Button>
                </div>
              </Card.Content>
            </Card>
              </div>
                 
        </Segment>
      }
            {
                active && <Profile active={active} setActive={setActive} profileData={postData} />
            }
        </Grid.Column>
    </Grid>
    

      
    
  )
}
