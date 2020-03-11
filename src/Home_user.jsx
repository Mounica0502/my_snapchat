import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class UserLogout extends React.Component {
    constructor () {
        super();
        this.state = {
            users : []
        }

        this.handleAll = this.handleAll.bind(this);
        this.getSnap = this.getSnap.bind(this);
        this.snap = this.snap.bind(this);
        this.deconnexion = this.deconnexion.bind(this);
    }
    
    deconnexion () {
        localStorage.removeItem('token');       
        this.props.history.push('/');
        alert('Deconnexion réussi.');
    }

    snap () {
        this.props.history.push('/snap');
    }
    
    getSnap () {
        this.props.history.push('/getSnap');
    }

    handleAll () {
        var token = localStorage.getItem('token');
        // console.log(token);

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
    
    render() {
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
                            <Link className="nav-link text-white lien" onClick={this.handleAll} >Liste des utilisateurs</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link text-white lien" onClick={this.snap} >Poster un snap</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link text-white lien" onClick={this.getSnap} >Voir snap</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <div className="block_liste">
                        <div className="row">
                            {
                                this.state.users.map((user) => {
                                    return <div className="col-6 liste">
                                                <li>{user.email}</li>
                                            </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }    
}
export default UserLogout