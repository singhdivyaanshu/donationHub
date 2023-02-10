import React,{useState,useEffect,useCallback} from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import '../Sidebar/Sidebar.css'

const base_url = process.env.REACT_APP_BASE_URL;

export default function CardGroup({setActive,data,state,amountRequired,setProfileData}) {

  const [cardData,setCardData] = useState([]);
  useEffect(()=>{
    if(data.length === 0)
    {
      async function fetchdata(){
        const response = await fetch(`${base_url}/getposts`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            state,
            amountRequired
          })
  
        })
        const dat = await response.json();
        if(dat.msg.includes("Sucess"))
        {
          // console.log(dat.data);
          return dat.data;
        }
        else{
          return [];
        }
      }
      fetchdata().then((card)=>{
        setCardData(card); 
      })  
    }
    else{
      if(cardData.length === 0)
      setCardData(data);
    }
  },[state,amountRequired,data,cardData.length]);

    const handleClick = useCallback(movie =>{
      setProfileData(movie);
      setActive(true);
    },[setActive,setProfileData]);



  return (
    <div className='rows'>
            <h1 className='row__title'>{state==="search"?("Seach Results"):(`Needy People in ${state}`)}</h1>

              <div className="row__posters">
              { cardData.length!==0 &&
                cardData.map((data=>{
                  return(
                    <div className='row__poster' id={data.postID}>
                    <Card>
                    <Card.Content>
                      <Image
                        floated='right'
                        size='mini'
                        src={data.imageLink}
                        style={{width:"50px",height:"50px"}}
                      />
                      <Card.Header>{data.postTitle}</Card.Header>
                      <Card.Meta>Location: {data.state}</Card.Meta>
                      <Card.Description>
                      <Card.Meta>Amount needed <strong>₨ {data.amountRequired}/-</strong></Card.Meta>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className='ui two buttons'>
                        <Button onClick={()=>handleClick(data)} basic color='teal'>
                          Contact Me
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                    </div>
                  )}))
              }
          </div>
    </div>
  )
}

