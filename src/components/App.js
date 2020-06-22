import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import React from 'react';
import Home from './Home';
import MainUserView from './MainUserView';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/userStats" exact component={MainUserView} />
                    <Route path="/" render={() => <div>404</div>} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
