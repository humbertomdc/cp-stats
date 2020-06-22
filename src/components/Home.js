import React from 'react';
import { Container, Input } from 'semantic-ui-react';

import Navbar from './Navbar';

class Home extends React.Component {
    state = {
        inputText: "",
    }

    keyPress = (event) => {
        if (event.keyCode === 13) {
            const handle = this.state.inputText;
            this.props.history.push({
                pathname: `/userStats/${handle}`,
                state: { handle: handle }
            });
        }
    }

    render() {
        return (
            <Container style={{ height: "100vh", width: "50%", backgroundColor: "" }}>
                <Navbar history={this.props.history}/>
                <Input style={{ top: "50%" }}
                    fluid
                    size="large"
                    icon='search'
                    placeholder="Search user"
                    onKeyDown={this.keyPress}
                    onChange={(event) => this.setState({ inputText: event.target.value })}
                />
            </Container>
        );
    }
}

export default Home;
