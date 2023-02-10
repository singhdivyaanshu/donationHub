import React from 'react'
import {Outlet,useNavigate} from "react-router-dom";
import{Button} from 'semantic-ui-react'



const Org = () => {
  const navigate = useNavigate();
  
    return(
        <div style={{marginTop:"70px"}}>
        <ul >
          <Button color="teal" style={{margin:"20px 10px"}} onClick={()=>navigate("/org/login")}>Login As Donator</Button>
          <Button color="teal" style={{margin:"20px 10px"}} onClick={()=>navigate("/org/signup")}>SignUp As Donator</Button>
        </ul>
        <Button color="teal"  onClick={()=>navigate("/people")} >Login As Donatee</Button>
        <Outlet/>
      </div>
      

    )

  }

  export default Org;

