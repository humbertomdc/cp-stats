import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Segment } from 'semantic-ui-react';
import * as LineChartHelper from '../helpers/LineChartHelper';
import * as ExtraComponents from '../helpers/ExtraComponents';

const createLineChart = (data) => {
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: 35 }}
            curve="linear"
            xScale={{
                type: "time",
                format: `%Y-%m-%d`,
                userUTC: false,
                precision: "day"
            }}
            yScale={{
                type: "linear",
                min: 1000,
                max: 3800,
            }}
            xFormat="time:%Y-%m-%d"
            axisBottom={{
                format: '%Y',
                tickValues: 'every 1 years',
                tickSize: 0,
                tickRotation: 0,
            }}
            enableGridX={true}
            enableGridY={true}
            gridYValues={[1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000]}
            enableSlices="x"
            sliceTooltip={({ slice }) => LineChartHelper.ratingToolTip(slice)}
            colors={["grey"]}
            borderColor={{
                from: 'color',
                modifiers: [
                    ['darker', .1],
                    ['opacity', .1]
                ]
            }}
            lineWidth={2}
            pointSize={2}
            pointColor="white"
            pointBorderWidth={4}
            pointBorderColor={{ theme: 'labels.text.fill' }}
            layers={[
                'grid',
                'markers',
                'areas',
                LineChartHelper.ratingLayers,
                'lines',
                'slices',
                'crosshair',
                'axes',
                'points',
                'legends',
            ]}
            useMesh={true}
            motionStiffness={95}
            motionDamping={20}
        />
    );
}

class RatingLineChart extends React.Component {
    render() {
        const data = this.props.ratingData;
        const lineChart = data ? createLineChart(data) : ExtraComponents.loadingView();

        return (
            <Segment style={{ height: "350px"}}>
                {lineChart}
            </Segment>
        );
    }
}

export default RatingLineChart;