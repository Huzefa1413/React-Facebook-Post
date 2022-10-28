import React from 'react'
import logo from './assets/facebook.png'
import logout from './assets/logout.png'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div>
                <div className="logoimage"><img src={logo} alt="" /></div>
                <div className="logoname">Facebook</div>
            </div>
            <div>
                <img src={logout} alt="" />
            </div>
        </div>
    )
}

export default Navbar