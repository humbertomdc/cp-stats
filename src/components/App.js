import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import * as CodeforcesAPI from '../api/CodeforcesAPI';
import * as ProcessData from '../helpers/ProcessData';
import { Grid, Rail, Ref, Segment, Sticky, Container } from 'semantic-ui-react';
import ProfileCard from './ProfileCard';
import RatingLineChart from './RatingLineChart';
import PieChart from './PieChart';
import LineChart from './LineChart';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userHandle: "MiFaFaOvO",
            userInfo: {},
            userRating: null,
            userVerdicts: null,
            userTotalVeredicts: null,
            userProblemTags: null,
            userTotalProblemsSolved: null,
            ratedListRaw: null,
            ratedUsers: null,
            ratedUsersBinSize: 10,
        }
        this.contextRef = React.createRef();
    }

    componentDidMount() {
        // Get user info.
        CodeforcesAPI.getUserInfo(this.state.userHandle).then((user) => {
            this.setState({ userInfo: user });
            this.updateBinSize(0);
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
            const verdictData = ProcessData.parseVeredictData(status);
            const [tagsData, totalSubmitted] = ProcessData.parseTagsData(status);
            this.setState({
                userVerdicts: verdictData,
                userTotalVeredicts: status.length,
                userProblemTags: tagsData,
                userTotalProblemsSolved: totalSubmitted
            });
        });

        // Get rated list.
        CodeforcesAPI.getRatedList(false).then((ratedList) => {
            // Process data.
            const data = ProcessData.parseUsersData(ratedList, this.state.ratedUsersBinSize, this.state.userInfo.rating);
            this.setState({ ratedListRaw: ratedList, ratedUsers: data });
        });

    }

    updateBinSize = (value) => {
        if (!this.state.ratedListRaw) return;
        if (this.state.ratedUsersBinSize + value <= 100 && this.state.ratedUsersBinSize + value >= 10) {
            const data = ProcessData.parseUsersData(this.state.ratedListRaw, this.state.ratedUsersBinSize + value, this.state.userInfo.rating);
            this.setState({ ratedUsers: data, ratedUsersBinSize: this.state.ratedUsersBinSize + value });
        }
    }

    render() {
        return (
            <Container
                fluid
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
                                        <PieChart
                                            data={this.state.userVerdicts}
                                            isVerdict={true}
                                            statsNumber={this.state.userTotalVeredicts}
                                            statsLabel="Submissions"
                                            statsSize="small"
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <PieChart
                                            data={this.state.userProblemTags}
                                            isVerdict={false}
                                            statsNumber={this.state.userTotalProblemsSolved}
                                            statsLabel="Solved"
                                            statsSize="small"
                                        />
                                    </Grid.Column>
                                </Grid>
                                <LineChart
                                    data={this.state.ratedUsers}
                                    binSize={this.state.ratedUsersBinSize}
                                    onBinSizeChange={this.updateBinSize}
                                />
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
