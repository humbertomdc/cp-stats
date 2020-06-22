import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import React from 'react';
import Home from './Home';
import MainUserView from './MainUserView';
import ErrorView from './ErrorView';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/userStats/:handle" exact component={MainUserView} />
                    <Route path="/error" component={ErrorView} />
                    <Route path="/" component={ErrorView} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
