import React from 'react';
import { RouteComponentProps } from 'react-router';
import { SetAccessToken, json, User } from '../utils/api';
import { Link } from 'react-router-dom'
export interface IRegisterProps extends RouteComponentProps { }

export interface IRegisterState {
    username: string;
    email: string;
    password: string;
}


export default class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.registerSubmit = this.registerSubmit.bind(this)
    }

    componentDidMount() {
        if (User && User.role == 'admin') {
            this.props.history.push('/message2');
        }
    }

    async registerSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            let result = await json('/auth/register', 'POST', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                if (result.role === 'admin') {
                    this.props.history.push('/message2');
                } else {
                    this.props.history.push('/');
                }
            }
        } catch (e) {
            console.log(e)
        }

    }




    render() {
        const { username, email, password } = this.state;

        return (
            <div style={{ width: '100%', height: '100vh', overflow: 'hidden', fontFamily: 'Baloo Bhai' }}>
                <h1 style={{ color: '#659999', fontFamily: 'Baloo Bhai', font: 'cursive', fontSize: '70px' }}>SAFEHAVEN</h1>
                <h5 className="float-right" style={{ color: '#f4791f', fontFamily: 'Baloo Bhai', fontSize: '25px' }}>A Safe Space to Discuss Agriculture</h5>
                <div className="container " style={{ backgroundColor: '#659999', width: '700', marginTop: '20%', color: '#659999' }}>
                    <div className="row m-2 d-flex justify-content-center">
                        <div className="col-md-9"  >
                            <form className="form-group p-2 font-weight-bold mt-2"
                                style={{ backgroundColor: '#f4791f' }}
                                onSubmit={(e) => this.registerSubmit(e)}>
                                <label>UserName:</label>
                                <input type="text" className="form-control m-1" placeholder="Create Username"
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ username: e.target.value })}
                                />
                                <label>Email: </label>
                                <input type="text" className="form-control m-1" placeholder="Enter Email."
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}
                                />
                                <label>Password: </label>
                                <input type="password" className="form-control m-1" placeholder="Enter Password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}
                                />

                                <button className="btn mt-1 p-1" style={{ color: '#659999' }} >Register</button>

                            </form>
                            <div className="text-center">
                                <Link className="mt-2" style={{ color: '#f4791f', fontSize: '1.5em' }} to="/Login">Back To Login</Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )


    }

}