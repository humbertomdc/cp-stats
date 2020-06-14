import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import * as CodeforcesAPI from '../api/CodeforcesAPI';
import * as ProcessData from '../api/ProcessData';
import { Grid, Rail, Ref, Segment, Sticky, Container } from 'semantic-ui-react';
import ProfileCard from './ProfileCard';
import RatingLineChart from './RatingLineChart';
import VerdictPieChart from './VerdictPieChart';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userHandle: "MiFaFaOvO",
            userInfo: {},
            userRating: null,
            userVerdicts: null,
        }
        this.contextRef = React.createRef();
    }

    componentDidMount() {
        // Get user info.
        CodeforcesAPI.getUserInfo(this.state.userHandle).then((user) => {
            this.setState({ userInfo: user });
        });

        // Get user rating history.
        CodeforcesAPI.getUserRating(this.state.userHandle).then((rating) => {
            // Preprocess data.
            const data = ProcessData.parseRatingData(rating);
            this.setState({ userRating: [{  id: "rating", data: data }] });
        });

        // Get user status.
        CodeforcesAPI.getUserStatus(this.state.userHandle).then((status) => {
            // Preprocess data.
            const data = ProcessData.parseVeredictData(status);
            this.setState({ userVerdicts: data });
        });
    }

    render() {
        return (
            <Container fluid
                style={{
                    height: "100%",
                    backgroundColor: "#f8fcfd"
                    }}
            >
                <Grid columns={2} centered padded >
                    <Grid.Column>
                        <Ref innerRef={this.contextRef}>
                            <Segment style={{ minWidth: "1000px" }} ref={this.mainSegmentRef}>
                                {/* Main View */}
                                <RatingLineChart ratingData={this.state.userRating} />
                                <Grid>
                                    <Grid.Column width={8}>
                                        <VerdictPieChart verdictData={this.state.userVerdicts} />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <VerdictPieChart verdictData={this.state.userVerdicts} />
                                    </Grid.Column>
                                </Grid>
                                <Rail position='left' close >
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