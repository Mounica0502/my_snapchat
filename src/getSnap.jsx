import React from 'react'
import { Link } from 'react-router-dom';

class GetSnaps extends React.Component {
    
    constructor () {
        super();

        this.state = {
            id: [],
            snap: '',
            users: [],
            time: null,
            email: ''
        }
        this.deconnexion = this.deconnexion.bind(this);
    }

    deconnexion () {
        localStorage.removeItem('token');       
        this.props.history.push('/');
        alert('Deconnexion réussi.');
    }

    componentDidMount () {
        var token = localStorage.getItem('token');
        let options = {
            method: "GET",
            headers: {
                "token": token
            },
        }
        
        fetch('http://snapchat.wac.under-wolf.eu/snaps/', options)
        .then((pro) => pro.json())
        .then((resp) => {
            const array_id = resp.data;
            this.setState({id: array_id})
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
                
                <div className="div_display">
                    <div className="liste_user">
                        <h1>Liste des snaps reçu </h1>
                        {this.state.id.map((user) => 
                        <p key={user._id} value={user.email}>
                            De <a className="a_user" href={'getSnap/' + user._id}>{user.from}</a>
                        </p>)}
                    </div>
                </div>
            </div>

        )
    }
}
export default GetSnaps;