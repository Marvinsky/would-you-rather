import React from 'react'
import { NavLink } from 'react-router-dom'

function Page404() {
    return (
        <div className='center'>
            <h1>Oooops!</h1>
            <p>Page not found 404</p>
            <p className='padding-top'>
                <NavLink className='click-here' to='/'>Click here</NavLink> to go back to home page.
            </p>
        </div>
    )
}

export default Page404