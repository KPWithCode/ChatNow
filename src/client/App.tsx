import * as React from 'react';
import './scss/app';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Register2 from './private/Register2';
import Message2 from './public/Message2';
import Login2 from './private/Login2';
import Home from './public/Home';
 


export interface AppProps { }

const App: React.SFC<AppProps> = () => {

    return (
        <BrowserRouter>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register2" component={Register2} />
                    <Route exact path="/message2" component={Message2} />
                    <Route exact path="/login"component={Login2} />
                </Switch>
            </Router>
        </BrowserRouter>

    )

}

export default App;

