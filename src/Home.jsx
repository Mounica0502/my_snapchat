// src/pages/Home.jsx
 
import React from 'react';
import img from './assets/fantome2.png';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
 
export default function Home() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light color_nav">
                <Link className="nav-link text-white lien" to={`/`}>Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link text-white lien" to={`/inscription`}>Inscription</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link text-white lien" to={`/connection`}>Connexion</Link>
                    </li>
                    </ul>
                </div>
            </nav>
            
            <h1 className="titre_home">Welcome !</h1>

            <img className="img" src={img} alt="logo"></img>
        </div>
    )
}