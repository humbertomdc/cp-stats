import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import * as CodeforcesAPI from '../api/CodeforcesAPI';
import { Grid, Rail, Ref, Segment, Sticky, Container } from 'semantic-ui-react';
import ProfileCard from './ProfileCard/ProfileCard'


class App extends React.Component {
    state = {
        userInfo: {},
        userRating: null,
    };
    contextRef = React.createRef()

    componentDidMount() {
        // Get user info.
        CodeforcesAPI.getUserInfo("MiFaFaOvO").then((user) => {
            this.setState({ userInfo: user });
        });

        // Get user rating history.
        CodeforcesAPI.getUserRating("MiFaFaOvO").then((rating) => {
            this.setState({ userRating: rating });
            console.log(this.state.userRating);
        });
    }

    render() {
        return (
            <Container fluid style={{ minWidth: "1400px", backgroundColor: "#f8fcfd" }}>
                <Grid centered columns={2} padded>
                    <Grid.Column stretched>
                        <Ref innerRef={this.contextRef}>
                            <Segment>
                                <ProfileCard userProfile={this.state.userInfo} />
                                <ProfileCard userProfile={this.state.userInfo} />
                                <ProfileCard userProfile={this.state.userInfo} />
                                <ProfileCard userProfile={this.state.userInfo} />
                                {/* Main View */}
                                <Rail position='left' close>
                                    <Sticky
                                        context={this.contextRef}
                                        offset={15}    
                                    >
                                        <ProfileCard userProfile={this.state.userInfo} />
                                    </Sticky>
                                </Rail>
                            </Segment>
                        </Ref>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default App;