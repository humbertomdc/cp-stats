import React from 'react';
import { Segment, Grid, Divider, Label } from 'semantic-ui-react';
import * as CodeforcesData from '../helpers/CodeforcesData';

export const ratingLayers = (props) => {
    const alpha = 0.75;
    const data = [
        { maxY: 1200, minY: 800, color: "rgba(204,204,204," + alpha + ")" },
        { maxY: 1400, minY: 1200, color: "rgba(119,255,119," + alpha + ")"},
        { maxY: 1600, minY: 1400, color: "rgba(119,221,187," + alpha + ")"},
        { maxY: 1900, minY: 1600, color: "rgba(170,170,255," + alpha + ")"},
        { maxY: 2100, minY: 1900, color: "rgba(255,136,255," + alpha + ")"},
        { maxY: 2300, minY: 2100, color: "rgba(255,204,136," + alpha + ")"},
        { maxY: 2400, minY: 2300, color: "rgba(255,187,85," + alpha + ")"},
        { maxY: 2600, minY: 2400, color: "rgba(255,119,119," + alpha + ")"},
        { maxY: 3000, minY: 2600, color: "rgba(255,51,51," + alpha + ")"},
        { maxY: 4000, minY: 3000, color: "rgba(170,0,0," + alpha + ")"},
    ];
    var components = [];
    for (var i in data) {
        components.push(
            <rect
                y={props.yScale(data[i].maxY)}
                width={props.width}
                height={props.yScale(data[i].minY) - props.yScale(data[i].maxY)}
                fill={data[i].color}
            />
        )
    }
    return <g>{components}</g>;
}

export const ratingToolTip = (slice) => {
    return (
        <Segment raised
            style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",

                width: "150px",
            }}
        >
            {slice.points.map(point => (
                <div>
                    <div style={{ textAlign: "center" }}>{point.data.contestName}</div>
                    <Divider />
                    <Grid columns={2}>
                        <Grid.Column width={4}>
                            <Grid.Row>
                                <strong>Date: </strong>
                            </Grid.Row>
                            <Grid.Row>
                                <strong>Rating: </strong>
                            </Grid.Row>
                            <Grid.Row>
                                <strong>Rank: </strong>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={12} textAlign="right">
                            <Grid.Row>
                                {new Date(point.data.x).toLocaleDateString()}
                            </Grid.Row>
                            <Grid.Row>
                                {point.data.yFormatted}
                            </Grid.Row>
                            <Grid.Row>
                                {point.data.rank}
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                    <div>
                        <p style={{ color: "white" }} >.</p>
                        <Label
                            attached="bottom right"
                            color={CodeforcesData.rankColor(point.data.yFormatted)}
                            size="mini"
                        >
                            {CodeforcesData.rank(point.data.yFormatted)}
                        </Label>
                    </div>
                </div>
            ))}
        </Segment>
    )
}

export const ratedUsersToolTip = (slice) => {
    return (
        <Segment raised
            style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",

                width: "150px",
            }}
        >
            <Grid columns={2}>
                <Grid.Column width={4}>
                    <Grid.Row>
                        <strong>Users: </strong>
                    </Grid.Row>
                    <Grid.Row>
                        <strong>Range: </strong>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={12} textAlign="right">

                    <Grid.Row>
                        {slice.points[0].data.yFormatted}
                    </Grid.Row>
                    <Grid.Row>
                        {slice.points[0].data.xFormatted} - {slice.points[0].data.x + slice.points[0].data.binSize - 1}
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}