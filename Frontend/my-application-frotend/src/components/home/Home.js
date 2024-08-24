import React from 'react'
import Header from '../header/Header'
import ViewAllService from '../service/ViewAllService'
import '../../style/home.css'
import Footer from '../footer/Footer'
import HomeBanner from './HomeBanner'
import About from './About'
import GetInTouch from './GetInTouch'
import Contact from './Contact'
import OurServiceProvider from './OurServiceProvider'
import ViewAllServiceProvider from '../serviceProvider/ViewAllServiceProvider'
import OurService from './OurService'
const Home = () => {
  return (
    <div>
        <Header />
        <div className='container text-center '>
          {/* <h3 className='textMain'>ServiceProvider</h3> */}
          {/* <p className='paraMain'>Connecting you seamlessly with expert service providers</p> */}
        </div>
        <HomeBanner />
        <About />
        <OurService />
        {/* <OurServiceProvider />  */}
        <OurServiceProvider />
        <GetInTouch/>
        <Contact />
        <Footer />
    </div>
  )
}

export default Home