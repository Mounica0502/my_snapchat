import React from 'react';
// import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom/';
import axios from 'axios';
import Loader from "react-loader-spinner"

class DisplaySnap extends React.Component {
    
    constructor () {
        super();

        this.state = {
            id: [],
            image: '',
            time: null,
        }
        this.deconnexion = this.deconnexion.bind(this);
        this.countDown = this.countDown.bind(this);
        // this.getSnap = this.getSnap.bind(this);
    }

    deconnexion () {
        localStorage.removeItem('token');       
        this.props.history.push('/');
        alert('Deconnexion réussi.');
    }

    countDown () {
        this.setState({time: this.state.time -1});
    }
    
    componentDidMount () {
        var chemin = this.props.match.params.id
        
        var token = localStorage.getItem('token');
        let options = {
            method: "GET",
            headers: {
                "token": token
            },
        }
        
        fetch('http://snapchat.wac.under-wolf.eu/snap/' + chemin, options)
        .then((pro) => pro.json())
        .then((resp) => {
            let timer = resp.data.duration;

            const snap = resp.data.image.link;
            this.setState({image: 'http://snapchat.wac.under-wolf.eu' + snap});
            this.setState({time: timer});
        })
    }

    componentWillUnmount () {
        var chemin = this.props.match.params.id
        
        var token = localStorage.getItem('token');

        var obj = {id: chemin}
        // myForm.append('id', chemin);
        
        const ax = axios.create({
            baseURL: 'http://snapchat.wac.under-wolf.eu',
            timeout: 5000,
            headers:  {
                'Content-Type': 'application/json',
                token: token
            }
        })

        ax.post('/seen', obj)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        var time = this.state.time;
        if (time == null) {
            return (
                <div className="loader">
                    <Loader type="Oval" color="black" height={80} width={80} />
                </div>
            )
        }
        if(time > 0  && time !== null){
            setTimeout(() => (this.countDown()), 1000);
            console.log(this.componentWillUnmount)
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light color_nav">
                        <Link className="nav-link text-white lien" to={`/home`}>Home</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link text-white lien" onClick={this.deconnexion} >Deconnexion</Link>
                            </li>
                            <li className="nav-item active">
                            <Link className="nav-link text-white lien" to={'/home'} >Liste des utilisateurs</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-white lien" to={'/snap'} >Poster un snap</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-white lien" to={this.getSnap} >Voir snap</Link>
                            </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="snap" align="center">
                        <h1>L'image va disparaitre dans : {this.state.time}</h1>
                        <img src={this.state.image} />
                    </div>
                </div>
            )
        }
        else {
            return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light color_nav">
                    <Link className="nav-link text-white lien" to={`/home`}>Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link text-white lien" onClick={this.deconnexion} >Deconnexion</Link>
                        </li>
                        </ul>
                    </div>
                </nav>

                <div align="center">
                    <div className="apulimage">
                        <Link className="lien_apu" to={`/getSnap`}>Retourner sur les snaps</Link>
                    </div>
                </div>
            </div>
            )
        }
    }
}

export default DisplaySnap;