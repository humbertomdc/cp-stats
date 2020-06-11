import './ProfileCard.css'
import React from 'react';
import { Card, Image, Grid, Segment, Divider, Header, Label } from 'semantic-ui-react';
import { flag } from 'country-emoji';

class ProfileCard extends React.Component {
    state = { coloredRankRectHeight: null };

    rankColor = (rank) => {
        if (rank < 1200) return "grey";
        if (rank < 1400) return "green";
        if (rank < 1600) return "teal";
        if (rank < 1900) return "blue";
        if (rank < 2100) return "purple";
        if (rank < 2400) return "orange";
        if (rank >= 2400) return "red";
        return "black";
    }

    render() {
        const user = this.props.userProfile;
        const color = this.rankColor(parseInt(user.currentRating))
        return (
            <Card color={color}>
                <Card.Content>
                    <Segment color={color} raised>
                        <Image
                            src={user.image}
                            rounded
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
                                <Header size="medium">{user.currentRating}</Header>
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