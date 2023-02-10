import React from 'react'
import { Button} from 'semantic-ui-react'
import './Donate.css'
import {useNavigate} from 'react-router-dom'


export default function Donatenow({setActiveItem}) {
  const navigate = useNavigate();

  const handleClick = () => {
    setActiveItem("Home");
    navigate("/main/home");
  }

  return (
    <div className='donate'>
      <Button className='donatebutton' onClick={handleClick}>
        Donate Now
      </Button>
    </div>
  )
}
