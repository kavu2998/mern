import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const logoutUser = () => {
        localStorage.removeItem('authToken');
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" style={{ color: "white", textDecoration: "none" }} >Contacts</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            localStorage.getItem('authToken') ?
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" style={{ color: "#adb5bd", textDecoration: "none" }} to="/add">Add</Link>
                                </li> :
                                null
                        }

                    </ul>
                </div>
                {
                    localStorage.getItem('authToken') ?
                        <div className="d-flex">
                            <button className='btn btn-info' onClick={logoutUser}>Logout</button>
                        </div> :
                        null
                }

            </div>
        </nav>
    )
}

export default Navbar
