import React from 'react';
import axios from 'axios';
import { Grid, Rail, Ref, Segment, Sticky, Container } from 'semantic-ui-react';
import ProfileCard from './ProfileCard/ProfileCard'



class App extends React.Component {
    state = {
        userProfile: {
            handle: null,
            image: null,
            country: null,
            rank: null,
            currentRating: null,
            maxRating: null,
        },
    };
    contextRef = React.createRef()

    componentDidMount() {
        axios.get("https://codeforces.com/api/user.info", {
            params: {
                handles: "MiFaFaOvO"
            }
        }).then(response => {
            console.log(response.data.result[0])
            const user = response.data.result[0];
            this.setState({ 
                userProfile: {
                    handle: user.handle,
                    image: user.titlePhoto,
                    country: user.country,
                    city: user.city,
                    organization: user.organization,
                    rank: user.rank,
                    currentRating: user.rating,
                    maxRating: user.maxRating,
                }
            });
        });
    }

    render() {
        return (
            <Container fluid style={{ minWidth: "1400px", backgroundColor: "black" }}>
                <Grid centered columns={2} padded>
                    <Grid.Column stretched>
                        <Ref innerRef={this.contextRef}>
                            <Segment>
                                <ProfileCard userProfile={this.state.userProfile} />
                                <ProfileCard userProfile={this.state.userProfile} />
                                <ProfileCard userProfile={this.state.userProfile} />
                                <ProfileCard userProfile={this.state.userProfile} />
                                {/* Main View */}
                                <Rail position='left' close>
                                    <Sticky
                                        context={this.contextRef}
                                        offset={15}    
                                    >
                                        <ProfileCard userProfile={this.state.userProfile} />
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