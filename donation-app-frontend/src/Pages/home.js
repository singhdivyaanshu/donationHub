import React from 'react'
import Banner from '../Components/Banner/Banner'
import About from '../Components/About/About'
import Overview from '../Components/Overview/Overview'
import Footer from '../Components/Footer/Footer'
import Donate from "../Components/Donatenow/Donatenow";

export default function home({setActiveItem}) {
  return (
    <div>
          <Banner />
          <Overview/>
          <About/>  
          <Footer/>
          <Donate setActiveItem={setActiveItem}/>
      </div>
    
  )
}
