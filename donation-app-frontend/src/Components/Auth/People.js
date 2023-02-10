import React from 'react'
import { Link,Outlet,useNavigate } from "react-router-dom";

import{Button} from 'semantic-ui-react'
const People = () => {
  const navigate = useNavigate();
    return(
      <div style={{marginTop:"70px"}}>
        <ul>
          <Button color="teal" style={{margin:"20px 20px"}} onClick={()=>navigate("/people/login")}>Login As Donatee</Button>
          <Button color="teal" style={{margin:"20px 20px"}} onClick={()=>navigate("/people/signup")}>SignUp As Donatee</Button>
        </ul>
        <Button color="teal" onClick={()=>navigate("/org")} >Login As Donator</Button>
        <Outlet/>
      </div>

    )

  }

  export default People;

