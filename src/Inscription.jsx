import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

class RegisterFrom extends React.Component {
    constructor()  {
        //initialise l'héritage
        super();
        this.state = {
            emailValue: '',
            passwordValue: ''
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(e) {
        this.setState({emailValue: e.target.value});
    }

    handlePass(e) {
        this.setState({passwordValue: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            "email": this.state.emailValue,
            "password": this.state.passwordValue
        }
        console.log(data)
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch('http://snapchat.wac.under-wolf.eu/inscription', options)
        .then((pro) => pro.json())
        .then((resp) => {
            console.log(resp);
            if(resp.status === 200) {
                this.props.history.push('/connection');
            }
            else if(resp.status === 400) {
                alert(resp.message);
            }
        })
    }

    render () {
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
                            <Link className="nav-link text-white lien" to={`/connection`}>Connexion</Link>
                        </li>
                        </ul>
                    </div>
                </nav>

                <div className="form_class">
                    <form onSubmit={this.handleSubmit} className="form">
                        <h1>Register</h1>

                        <label>Email :</label><br></br>
                        <input placeholder='test@test.com'  onChange={this.handleEmail} type="email" required/>
                        <br/><br/>

                        <label>Password: </label><br></br>
                        <input type="password" onChange={this.handlePass} required/>
                        <br/><br/>

                        <button type="submit" class="btn btn-secondary btn-lg btn-block adm">Envoyer</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default RegisterFrom;