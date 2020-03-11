import React from 'react'
import axios from 'axios'
import Webcam from "react-webcam";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class PostSnap extends React.Component {
    
    constructor () {
        super();
        this.state = {
            snap: [],
            show: [],
            users : [],
            email: '',
            time: 1,
            screenshot: null,
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handleAll = this.handleAll.bind(this)
        this.handleFiles = this.handleFiles.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.screenshot = this.screenshot.bind(this);
        this.deconnexion = this.deconnexion.bind(this);
    }
    
    deconnexion () {
        localStorage.removeItem('token');       
        this.props.history.push('/');
        alert('Deconnexion réussi.');
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
    }

    handleTime(e) {
        this.setState({time: e.target.value});
        console.log(this.state.time)
    }
    
    screenshot() {
        var screenshot = this.refs.webcam.getScreenshot();
        this.setState({screenshot: screenshot});
    }

    handleAll () {
        var token = localStorage.getItem('token');

        let options = {
            method: "GET",
            headers: {
                "token": token
            },
        }
        
        fetch('http://snapchat.wac.under-wolf.eu/all', options)
        .then((pro) => pro.json())
        .then((resp) => {
            const users = resp.data; 
            this.setState({users})
        })
    }

    handleFiles (e) {
        let file = e.target.files[0];
        this.setState({snap: file});
        this.setState({show: URL.createObjectURL(file)});
        console.log(this.state.snap)
    }

    handleSubmit (e) {
        e.preventDefault();
        var token = localStorage.getItem('token');

        var myForm = new FormData();
        myForm.append('duration', this.state.time);
        myForm.append('to', this.state.email);
        myForm.append('image', this.state.snap);
        
        // 'http://snapchat.wac.under-wolf.eu/snap'
        const ax = axios.create({
            baseURL: 'http://snapchat.wac.under-wolf.eu',
            headers:  {
                'Content-Type': 'application/json',
                token: token
            }
        })

        ax.post('/snap', myForm)
            .then((res) => {
                // console.log(res)
                alert('Snap envoyer !');
            })
            .catch((err) => {
                // console.log(err)
                alert(err)
            })
    }
    
    render () {
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
                            <Link className="nav-link text-white lien" to={'/getSnap'} >Voir snap</Link>
                        </li>
                         </ul>
                     </div>
                 </nav>

                 <div className="container">
                    <div className="row">
                        <form onSubmit={this.handleSubmit} className="col-12 form_snap">
                            <div className="contenue">
                                <input onChange={this.handleFiles} type="file"  />
                                <select onClick={this.handleAll} onChange={this.handleEmail}>
                                    {this.state.users.map((user) => 
                                    <option key={user.email} value={user.email} >
                                        {user.email}
                                    </option>)}
                                </select>

                                <select  onChange={this.handleTime}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>

                                <button type="submit">Envoyer</button>
                            </div>
                        </form>

                        <div className="col-lg-3 col-md-2"></div>

                        <div className="col-lg-6 col-md-8 col-sm-12 preview">
                            <img className="img_preview" src={this.state.show}/><br/><br/>
                        </div>
                    </div>
                </div>

                <h1 className="titre_webcam">Prendre une photo ↓</h1><br/>
                <div className="container">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-lg-5 col-sm-12 webcam">
                            <Webcam audio ={false}
                                ref='webcam'
                                screenshotFormat="image/jpeg"
                                className="web"
                            />
                        </div>
                        {/* <div className="col-1"></div> */}
                        <div className="col-1 btnn">
                            <button onClick={this.screenshot}>Capture</button><br/>
                        </div>
                        <div className="col-lg-5 col-sm-12 webcam">
                            <img className="img_screen" src={this.state.screenshot} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PostSnap;