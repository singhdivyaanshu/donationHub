import React from 'react'
import Sidebar from '../Components/Main/Sidebar/Sidebar'
import { Outlet} from 'react-router-dom'


export default function Main({activeItem,setActiveItem}) {

  return (
      <div>
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem}/>
          <br/>
          <br/>
          <Outlet/>    
      </div>    
  )
}
