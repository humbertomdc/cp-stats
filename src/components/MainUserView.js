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

class MainUserView extends React.Component {
    constructor(props) {
        this.state = {

        }
        this.contextRef = React.createRef();
    }

    render() {
        return (
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
        )
    }
}

export default MainUserView;
