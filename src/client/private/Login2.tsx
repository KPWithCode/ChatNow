import * as React from 'react';
import { json, SetAccessToken, User } from '../utils/api';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom'


export interface ILoginProps extends RouteComponentProps { }

export interface ILoginState {
    username: string;
    password: string;
}

export default class ILogin extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            username: null,
            password: null
        };
    }

    componentDidMount() {
        if (User && User.role == 'admin') {
            this.props.history.push('/message2');
        }
    }

    async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            let result = await json('/auth/login', 'POST', {
                username: this.state.username,
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
            console.log(e);
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <div style={{ width: '100%', height: '100vh', overflow: 'hidden', fontFamily: 'Baloo Bhai' }}>
                <h1 style={{ color: '#659999', fontFamily: 'Baloo Bhai', font: 'cursive', fontSize: '70px' }}>SAFEHAVEN</h1>
                <h5 className="float-right" style={{ color: '#f4791f', fontFamily: 'Baloo Bhai', fontSize: '25px' }}>A Safe Space to Discuss Agriculture</h5>
                <div style={{ height: '10%' }}>
                    <img
                        style={{ width: '100%' }}
                        src="https://images.unsplash.com/photo-1535048637252-3a8c40fa2172?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1790&q=80"
                        alt="Farm trucks on open field"
                    />
                </div>
                <div className="container d-flex justify-content-center"
                    style={{ backgroundColor: '#f4791f', width: '80%', marginTop: '20em', position: 'relative' }}>
                    <div className=" d-flex justify-content-center">
                        <div>
                            <h2 style={{ color: '#659999', fontFamily: 'Baloo Bhai', fontSize: '50px' }}
                                className="d-flex justify-content-center">LOGIN</h2>
                            <div className="d-flex justify-content-center">
                                <form
                                    style={{ width: '100%' }}
                                    onSubmit={e => this.handleSubmit(e)}
                                    className="d-flex justify-content-center  rounded p-3 shadow-lg">

                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={((e: React.ChangeEvent<HTMLInputElement>) => this.setState({ username: e.target.value }))}
                                        required
                                    />
                                    <input
                                        value={password}
                                        type="password"
                                        placeholder="Password"
                                        required
                                        onChange={((e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value }))}
                                    />
                                    <button style={{ color: '#659999', backgroundColor: '#f4791f' }} className="btn btn-block shadow">Login</button>
                                </form>

                            </div>
                            <div className="text-center">
                                <Link className="mt-2" style={{ color: '#659999', fontSize: '1.5em' }} to="/Register2">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    // render() {

    //     const { email, password } = this.state;

    //     return (
    //         <div className="row">
    //             <div className="col-md-12">
    //                 <form onSubmit={(e) => this.handleLoginSubmit(e)} className="form-group p-3 my-4 bg-white border border-primary">
    //                     <label>Email:</label>
    //                     <input
    //                     className="form-control p-1 my-2"
    //                     value={email}
    //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}>
    //                     </input>
    //                     <label>Password:</label>
    //                     <input
    //                     className="form-control p-1 my-2"
    //                     value={password}
    //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}
    //                     type="password">
    //                     </input>
    //                     <button className="btn btn-primary mt-2">Login</button>
    //                 </form>
    //             </div>
    //         </div>
    //     );
    // }
}