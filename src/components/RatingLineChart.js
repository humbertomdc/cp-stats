import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const createLineChart = (data) => {
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 5, right: 10, bottom: 5, left: 40 }}
            xScale={{
                type: "time",
                format: `%Y-%m-%d`,
                userUTC: false,
                precision: "day"
            }}
            yScale={{
                type: "linear",
                min: 800,
                max: 3800,
            }}
            xFormat="time:%Y-%m-%d"
            axisBottom={{
                format: '%Y %b %d',
                tickValues: 'every 100 years',
                tickRotation: 90,
                legendOffset: -12,
            }}
            enableGridX={false}
            enableGridY={true}
            colors={{ scheme: "nivo" }}
            pointSize={4}
            pointColor={"black"}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
        />
    );
}

const displayLoadingView = () => {
    return (
        <Dimmer active inverted>
            <Loader size="large" inverted></Loader>
        </Dimmer>
    );
}

class RatingLineChart extends React.Component { 
    render() {
        const data = this.props.ratingData;
        const lineChart = data ? createLineChart(data) : displayLoadingView();

        return (
            <Segment style={{ height: "400px" }}>
                {lineChart}
            </Segment>
        );
    }
}

export default RatingLineChart;