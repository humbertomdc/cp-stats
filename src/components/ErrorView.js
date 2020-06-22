import { Container, Header, Icon } from 'semantic-ui-react';

import React from 'react';
import Navbar from './Navbar';

class ErrorView extends React.Component {
    render() {
        return (
            <Container style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Navbar history={this.props.history}/>
                <div style={{ textAlign: "center" }}>
                    <Icon
                        name='bug'
                        size='huge'
                        style={{ width: "100%" }} />
                    <Header as="h1">Oops! Something unexpected occcurred.</Header>
                    <Header as="h2">Make sure that the user you are looking for exists...</Header>
                </div>
            </Container>
        );
    }
}

export default ErrorView;
