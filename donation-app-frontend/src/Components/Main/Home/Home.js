import React ,{useState} from 'react'
import { Grid} from 'semantic-ui-react'
import  CardGroups from '../Card/CardGroup';
import Profile from '../Profile/Profile';

export default function Home({setActiveItem,setName}) {

  const [active,setActive] = useState(false);
  // const [search,setSearch] = useState([]);
  const [profileData,setProfileData] = useState({});


  return (
    <Grid.Column style={{top:"100px",width:"100vw",margin:"0 0"}}>
    {/* {search.length!==0 && 
      <CardGroups data={search} setActive={setActive} state="search" setProfileData={setProfileData}/>
    } */}
    <br/>
    <br/>
    <CardGroups state="Delhi" amountRequired={5000} setActive={setActive} data={[]} setProfileData={setProfileData}/>
    <CardGroups state="Haryana" amountRequired={5000} setActive={setActive} data={[]} setProfileData={setProfileData}/>

    {
      active && <Profile active={active} setActive={setActive} profileData={profileData} setName={setName}/>
    }
    </Grid.Column>
  )
}
