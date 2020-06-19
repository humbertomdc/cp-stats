import '../style/index.css'
import React from 'react';
import { Card, Image, Grid, Segment, Divider, Header } from 'semantic-ui-react';
import { flag } from 'country-emoji';
import * as CodeforcesData from '../helpers/CodeforcesData';

class ProfileCard extends React.Component {

    render() {
        const user = this.props.userProfile;
        const color = CodeforcesData.rankColor(parseInt(user.rating))

        return (
            <Card color={color}>
                <Card.Content>
                    <Segment color={color}>
                        <Image
                            src={user.titlePhoto}
                            rounded
                            fluid
                            label={{
                                as: "a",
                                color: color,
                                content: user.rank ? user.rank : "Not Visible",
                                ribbon: true,
                            }}
                        />
                    </Segment>
                    <Card.Header textAlign="center">{flag(user.country)}{user.handle}</Card.Header>
                    <Card.Meta textAlign="center">{user.city}, {user.country}</Card.Meta>
                    <Card.Meta textAlign="center">{user.organization}</Card.Meta>
                    <Divider horizontal>Rating</Divider>
                    <Grid centered columns={2}>
                        <Grid.Column textAlign="center">
                            <Grid.Row>
                                <Header size="medium">{user.rating}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header size="small">Rating</Header>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Grid.Row>
                                <Header size="medium">{user.maxRating}</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Header size="small">Max Rating</Header>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default ProfileCard;
