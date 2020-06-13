import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import * as CodeforcesAPI from '../api/CodeforcesAPI';
import * as ProcessData from '../api/ProcessData';
import { Grid, Rail, Ref, Segment, Sticky, Container } from 'semantic-ui-react';
import ProfileCard from './ProfileCard/ProfileCard'
import RatingLineChart from './RatingLineChart'


class App extends React.Component {
    state = {
        userHandle: "MiFaFaOvO",
        userInfo: {},
        userRating: null,
    };
    contextRef = React.createRef()

    componentDidMount() {
        // Get user info.
        CodeforcesAPI.getUserInfo(this.state.userHandle).then((user) => {
            this.setState({ userInfo: user });
        });

        // Get user rating history.
        CodeforcesAPI.getUserRating(this.state.userHandle).then((rating) => {
            // Preprocess data.
            const data = ProcessData.toChartData(rating);
            var dates = ProcessData.rangeBetweenDates(data[0]["x"], data[data.length - 1]["x"]);
            this.setState({ userRating: [{  id: "rating", dates: dates, data: data }] });
        });
    }

    render() {
        return (
            <Container fluid style={{ minWidth: "1400px", backgroundColor: "#f8fcfd" }}>
                <Grid centered columns={2} padded>
                    <Grid.Column stretched>
                        <Ref innerRef={this.contextRef}>
                            <Segment>
                                {/* Main View */}
                                <RatingLineChart ratingData={this.state.userRating}/>
                                <ProfileCard userProfile={this.state.userInfo} />
                                <ProfileCard userProfile={this.state.userInfo} />
                                <ProfileCard userProfile={this.state.userInfo} />
                                <ProfileCard userProfile={this.state.userInfo} />
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