import React, {useEffect, useState} from 'react'
import {Menu,Icon} from 'semantic-ui-react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'


export default function ({activeItem,setActiveItem}) {
    
    const [visible, setVisible] = useState(false);
    const [icon,setIcon] = useState('angle right');
    const [user,setUser] = useState(localStorage.getItem('userType'));

    const navigate = useNavigate();

 const handleItemClick = (e, { name }) => {
   setActiveItem(name);
  }

  useEffect(()=>{
    if(activeItem==='Post')
    {
      navigate('/main/post'); 
    }
    else if(activeItem==='Home')
    {
      navigate('/main/home');  
    }
    else if(activeItem==='My_Post')
    {
      navigate('/main/mypost');  
    }
    else if(activeItem==='Create_Post')
    {
      navigate('/main/createpost');  
    }
    else if(activeItem==='Update_Post')
    {
      navigate('/main/updatepost');  
    }
    else if(activeItem==='Profile')
    {
      navigate('/main/myprofile');  
    }
  

  },[setActiveItem,activeItem])

 const  handleicon = () =>{
      setVisible(!visible);
      if(icon === 'angle right'){
          setIcon('angle left');
      }else{
          setIcon('angle right');
      }
 }
  return (
    <div style={{top:"60px",marginRight:"0"}}>
          <Menu 
          vertical
          tabular 
          style={{fontSize:"1.5rem",top:"70px",position:"fixed",zIndex:"1",backgroundColor:"#fff",height:"100%"}} 
          className={visible ? "visibles" : "hiddens"}
          direction="left" 
          >

            {
              user!=="user" ?(
                <div>
                  <Menu.Item
                  name='Home'
                  active={activeItem === 'Home'}
                  onClick={handleItemClick}
                  />

                  <Menu.Item
                  name='Profile'
                  active={activeItem === 'Profile'}
                  onClick={handleItemClick}
                  />
                </div>

              ):(
                <div>
                  <Menu.Item
                    name='Profile'
                    active={activeItem === 'Profile'}
                    onClick={handleItemClick}
                  />
                    <Menu.Item
                    name='My_Post'
                    active={activeItem === 'My_Post'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='Create_Post'
                    active={activeItem === 'Create_Post'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name='Update_Post'
                    active={activeItem === 'Update_Post'}
                    onClick={handleItemClick}
                  />
                </div>
              )
            }
            
          
          </Menu>
   
          <Icon name={icon} className={`lefticons ${visible && "lefts"}`} onClick={handleicon}/>        
      </div>
  )
}
