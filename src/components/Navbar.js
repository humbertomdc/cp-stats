import React from 'react';
import { Menu, Input, Header } from 'semantic-ui-react';

class Navbar extends React.Component {
    state = {
        inputText: null,
    }

    keyPress = (event) => {
        if (event.keyCode === 13) {
            console.log(this.state.inputText);
            this.props.onSearchUser(this.state.inputText);
        }
    }

    render() {
        return (
            <Menu
                size="huge"
                fixed="top"
                inverted
                secondary
                style={{
                    height: "60px",
                    backgroundColor: "#212121"
                }}
            >
                <Menu.Item style={{ width: "24%", justifyContent: "right" }}>
                    <Header
                        as="h2"
                        content="Codeforces Stats"
                        style={{ color: "#ffffff" }}
                    />
                </Menu.Item>
                <Menu.Item style={{ width: "40%" }}>
                    <Input
                        fluid
                        size="mini"
                        icon='search'
                        placeholder='Search user'
                        onKeyDown={this.keyPress}
                        onChange={(event) => this.setState({ inputText: event.target.value })}
                    />
                </Menu.Item>
                <Menu.Item position="right">
                    Bye
                </Menu.Item>
            </Menu>
        );
    }
}

export default Navbar;
