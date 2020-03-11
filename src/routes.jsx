// src/routes.jsx
 
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
 
import Home from './Home'
import Inscription from './Inscription'
import Connexion from './Connexion'
import Home_user from './Home_user'
import postSnap from './postSnap'
import getSnap from './getSnap'
import getSnap_id from './DisplaySnap'


export default function MainRouter () {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/inscription" component={Inscription}/>
                <Route exact path="/connection" component={Connexion}/>
                <Route exact path="/home" component={Home_user}/>
                <Route exact path="/snap" component={postSnap}/>
                <Route exact path="/getSnap" component={getSnap}/>
                <Route exact path="/getSnap/:id" component={getSnap_id}/>
            </div>
        </Router>
    )
}