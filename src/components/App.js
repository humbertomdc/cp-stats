import 'semantic-ui-css/semantic.min.css'
import '../style/index.css'
import React from 'react';
import * as CodeforcesAPI from '../api/CodeforcesAPI';
import * as ProcessData from '../helpers/ProcessData';
import { Header, Grid, Rail, Ref, Segment, Sticky, Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ProfileCard from './ProfileCard';
import RatingLineChart from './RatingLineChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import RadarChart from './RadarChart';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userHandle: "humberto",
            userInfo: {},
            userRating: null,
            userVerdicts: null,
            userTotalVeredicts: null,
            userProblemTags: null,
            userTotalProblemsSolved: null,
            userStrengthsByTag: null,
            ratedListRaw: null,
            ratedUsers: null,
            ratedUsersBinSize: 10,
        }
        this.contextRef = React.createRef();
    }

    componentDidMount() {
        this.runApp();
    }

    runApp() {
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
            const tagsData = ProcessData.parseTagsData(status);
            const totalSolved = ProcessData.totalSolved(status);
            const strengthsByTag = ProcessData.parseStrengthsByTagData(status);
            this.setState({
                userVerdicts: verdictData,
                userTotalVeredicts: status.length,
                userProblemTags: tagsData,
                userTotalProblemsSolved: totalSolved,
                userStrengthsByTag: strengthsByTag,
            });
        });

        // Get rated list.
        CodeforcesAPI.getRatedList(false).then((ratedList) => {
            // Process data.
            const data = ProcessData.parseUsersData(ratedList, this.state.ratedUsersBinSize, this.state.userInfo.rating);
            this.setState({ ratedListRaw: ratedList, ratedUsers: data });
        });
    }

    onSearchUser = (handle) => {
        console.log(handle);
        this.setState({
            userHandle: handle,
            userInfo: {},
            userRating: null,
            userVerdicts: null,
            userTotalVeredicts: null,
            userProblemTags: null,
            userTotalProblemsSolved: null,
            userStrengthsByTag: null,
            ratedListRaw: null,
            ratedUsers: null,
            ratedUsersBinSize: 10,
        }, this.runApp);
    }


    updateBinSize = (value) => {
        if (!this.state.ratedListRaw) return;
        if (this.state.ratedUsersBinSize + value <= 100 && this.state.ratedUsersBinSize + value >= 10) {
            const data = ProcessData.parseUsersData(this.state.ratedListRaw, this.state.ratedUsersBinSize + value, this.state.userInfo.rating);
            this.setState({
                ratedUsers: data,
                ratedUsersBinSize: this.state.ratedUsersBinSize + value
            });
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
                <Navbar onSearchUser={this.onSearchUser}/>
                <Grid columns={2} centered padded>
                    <Grid.Column>
                        <Ref innerRef={this.contextRef}>
                            <Segment style={{ minWidth: "1000px", top: 15 }}>
                                {/* Main View */}
                                <Header as="h2" icon="user secret" content={`${this.state.userHandle}'s Rating`} style={{ color: "#3d3d3d" }} />
                                <RatingLineChart ratingData={this.state.userRating} />
                                <Grid>
                                    <Grid.Column width={8}>
                                        <Header as="h2" content="Verdicts" textAlign="center" style={{ color: "#3d3d3d" }} />
                                        <PieChart
                                            data={this.state.userVerdicts}
                                            isVerdict={true}
                                            statsNumber={this.state.userTotalVeredicts}
                                            statsLabel="Submissions"
                                            statsSize="small"
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Header as="h2" content="Tags" textAlign="center" style={{ color: "#3d3d3d" }} />
                                        <PieChart
                                            data={this.state.userProblemTags}
                                            isVerdict={false}
                                            statsNumber={this.state.userTotalProblemsSolved}
                                            statsLabel="Solved"
                                            statsSize="small"
                                        />
                                    </Grid.Column>
                                </Grid>
                                <Header as="h2" icon="grav" content={`${this.state.userHandle}'s Strengths By Tag`} style={{ color: "#3d3d3d" }} />
                                <RadarChart data={this.state.userStrengthsByTag} />
                                <Header as="h2" icon="area graph" content="User Distribution" style={{ color: "#3d3d3d" }} />
                                <LineChart
                                    data={this.state.ratedUsers}
                                    binSize={this.state.ratedUsersBinSize}
                                    onBinSizeChange={this.updateBinSize}
                                />
                                <Rail position='left' close >
                                    <Sticky
                                        context={this.contextRef}
                                        offset={70}
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
