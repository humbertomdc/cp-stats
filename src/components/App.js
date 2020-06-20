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
import ScatterPlot from './ScatterPlot';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** Users handle which will be used as parameter for some api calls and
                to display information on charts.*/
            userHandle: "humberto",
            /** User information received from the codeforces api, userHandle was used
                as a parameter for this call. This data will be used mainly in ProfileCard.*/
            userInfo: {},
            /** Array of data containing user's contest history as well as its ranking throught time. */
            userRating: null,
            /** Array of data containing user's verdict history as well as its verdict rate. */
            userVerdicts: null,
            /** Total number of user's verdicts. Used to display the total amount of submission in PieChart. */
            userTotalVeredicts: null,
            /** Array of data containing tags information. A problem in codeforces contians multiple tags
                indicating the categories to which a particular problem belongs. This array contains the
                frequency of tag appearance in problems solved by the user. */
            userProblemTags: null,
            /** Number indicating the total of problems solve by the users. */
            userTotalProblemsSolved: null,
            /** Array of data containing an approximate rating per problem tag as well as its acceptance rate. */
            userStrengthsByTag: null,
            /** Array of data containing user information for every rated user in codeforces. */
            ratedListRaw: null,
            /** Array of data containig the amount of users in a certain range as well as their position
                in comparison to other users, binSize is used here to determine users rating range. */
            ratedUsers: null,
            /** Initial bin size for user distribution line chart. */
            ratedUsersBinSize: 10,

            rankByTimeOfExperience: null,
        }
        this.contextRef = React.createRef();
    }

    componentDidMount() {
        this.searchUserHandle();
    }

    searchUserHandle = () => {
        // Get user info.
        CodeforcesAPI.getUserInfo(this.state.userHandle).then((user) => {
            this.setState({ userInfo: user }, this.runApp);
        });
    }

    // If the user exists then we make the rest of the api calls
    // and get the corresponding information for each chart.
    runApp() {
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
            const dataRankByTimeOfExperience = ProcessData.parseRankByTimeOfExperience(ratedList, this.state.userInfo);
            this.setState({
                ratedListRaw: ratedList,
                ratedUsers: data,
                rankByTimeOfExperience: dataRankByTimeOfExperience,
            });
        });
    }

    /**
     * Handles action when a new user is search on the search bar.
     * If the user exists then the data is displayed.
     * TODO: Handle when user does not exist.
     * @param {String} handle User handle to search.
     */
    onSearchUser = (handle) => {
        // Set all states to null and starts search.
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
        }, this.searchUserHandle);
    }

    /**
     * Updates the bin size in user distribution line chart.
     * @param {Number} value New bin size.
     */
    updateBinSize = (value) => {
        // If the data hasn't been received from the api then return and try later.
        if (!this.state.ratedListRaw) {
            return;
        }
        // If the data is not null then we can proceed to update the bin size.
        // Bin size ranges from 10 to 100 inclusive so we need to check that the new
        // bin size does not exceed this limits.
        if (this.state.ratedUsersBinSize + value <= 100 && this.state.ratedUsersBinSize + value >= 10) {
            // Parse data and update states.
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
                                <Header as="h2" icon="fire" content="Rank vs Time" style={{ color: "#3d3d3d" }} />
                                <ScatterPlot data={this.state.rankByTimeOfExperience} />
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
