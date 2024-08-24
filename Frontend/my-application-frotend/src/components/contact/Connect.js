import React from 'react'
import '../../style/connect.css'

const Connect = () => {
  
  return (
    <div className='connect-icon my-4'>
       <ul className='list-unstyled'>
        <li className='list-item'><i class=" fa fa-map-marker" style={{fontSize:"23px"}}></i> <span className='mx-2'>ST Goush , 44444 USA</span></li>
        <li className='list-item'><i class=" fa fa-envelope"></i> <span className='mx-2'>abc@xyz.com</span></li>
        <li className='list-item'><i class=" fa fa-phone" style={{fontSize:"23px"}}></i> <span className='mx-2'>+91-9876543210</span></li>
       </ul>
    </div>
  )
}

export default Connect
