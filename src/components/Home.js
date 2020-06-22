import React from 'react';
import { Container, Input, Header } from 'semantic-ui-react';

import Navbar from './Navbar';

class Home extends React.Component {
    state = {
        inputText: "",
    }

    /**
     * Handles action when a key is pressed.
     * If enter key is pressed then react router sends userStats
     * route with inputText as parameter.
     * @param {Object} event Key pressed event.
     */
    keyPress = (event) => {
        // The key code for enter is 13.
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
            <Container style={{
                    height: "100vh",
                    width: "50%",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Navbar history={this.props.history}/>
                <div style={{ flex: 1, width: "100%", textAlign: "center"}}>
                    <Header
                        size="huge"
                        content="Codeforces Stats"
                        style={{
                            marginBottom: "24px",
                            fontSize: "72px"
                        }}
                    />
                    <Input style={{ }}
                        action={{
                            color: "teal",
                            content: "Search",
                            onClick: () => {
                                this.props.history.push({
                                    pathname: `/userStats/${this.state.inputText}`,
                                    state: { handle: this.state.inputText }
                                });
                            }
                        }}
                        fluid
                        size="large"
                        icon="user"
                        iconPosition="left"
                        placeholder="Search user handle"
                        onKeyDown={this.keyPress}
                        onChange={(event) => this.setState({ inputText: event.target.value })}
                        onClick={(event) => console.log(event)}
                    />
                </div>
            </Container>
        );
    }
}

export default Home;
