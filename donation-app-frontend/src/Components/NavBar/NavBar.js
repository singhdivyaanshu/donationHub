import {Icon,Popup} from "semantic-ui-react";
import React , {useRef} from "react";
import "./NavBar.css";
import { useLocation ,useNavigate} from 'react-router-dom';

export default function Navbar() {
    const navbar = useRef(null);
    const sidebar = useRef(null);
    let i=0,f=0;
    const show = () =>{
        if(i===0)
        {
            navbar.current.style.display = "flex";
            i=1;
            f=1;
        }
        else{
            navbar.current.style.display = "none";
            i=0;
            f=0;
        }
    }

    const navigate = useNavigate();

    const click = () => {
        if(f===1)
        {
            console.log(f);
            navbar.current.style.display = "none";
            f=0;
            i=0;
        }
    }
    const reset = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/");
    }

    const location  = useLocation();


  return (
      <header className="top">
          <div id="brand" className="brand">
            <img src="./charitylogo.png" alt="charity" />
          </div>

          {
            location.pathname === "/" ?
            (<div className="temp">
            <nav className="navbar" id="navbar" ref={navbar}>
             <a  href="#home" onClick={click}>Home</a>
             <a href="#about" onClick={click}>About</a>
             <a style={{cursor:"pointer"}} onClick={()=>navigate("/contact")} >Contact</a>
            </nav>
            <div className="sidebar" id="sidebar" ref={sidebar} onClick={show}>
                 <Icon name="ellipsis vertical"/>
            </div>
            </div>
           ):(<div  className="brandlogin">
              <Popup content='Logout' trigger={<Icon name="user" onClick={reset}/>} />
                  </div>
              )
          }
          
      </header>
  );
}