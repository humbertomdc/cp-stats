import React from 'react';
import { Menu, Input, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    state = {
        inputText: null,
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

    loadInput = () => {
        return (
            <Input
                fluid
                size="mini"
                icon='search'
                placeholder='Search user'
                onKeyDown={this.keyPress}
                onChange={(event) => this.setState({ inputText: event.target.value })}
            />
        )
    }

    render() {
        const isHomePage = this.props.isHomePage ? this.props.isHomePage : false;
        const inputView = !isHomePage ? this.loadInput() : null
        return (
            <Menu
                size="huge"
                fixed="top"
                inverted
                secondary
                style={{
                    zIndex: "20",
                    height: "60px",
                    backgroundColor: "#212121"
                }}
            >
                <Menu.Item>
                    <Header
                        as={ Link } to="/"
                        size="large"
                        content="Codeforces Stats"
                        style={{ color: "#ffffff" }}
                    />
                </Menu.Item>
                <Menu.Item style={{ width: "40%" }}>
                    {inputView}
                </Menu.Item>
                <Menu.Item href="https://github.com/humbertoatondo/cp-stats" target="_blank" position="right">
                    <Icon name="github" size="large" fitted />
                </Menu.Item>

            </Menu>
        );
    }
}

export default Navbar;
