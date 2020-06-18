import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Segment } from 'semantic-ui-react';
import * as ExtraComponents from '../helpers/ExtraComponents';
import * as RadarChartHelper from '../helpers/RadarChartHelper';

const createRadarChart = (data) => {
    return (
        <ResponsiveRadar
            data={data}
            keys={[ "approximateRating", "acceptanceRate" ]}
            indexBy="tag"
            maxValue="auto"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: 'color' }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={32}
            enableDots={true}
            dotSize={8}
            dotColor="white"
            dotBorderWidth={3}
            dotBorderColor={{ from: "color"}}
            enableDotLabel={true}
            dotLabel={(value) =>
                `${RadarChartHelper.formatDotLabels(data)}`
            }
            dotLabelYOffset={-16}
            colors={[ "rgba(119, 157, 202, 1)" , "rgba(244, 117, 96, 1)"]}
            fillOpacity={0.3}
            blendMode="multiply"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
            tooltipFormat={(value) =>
                `${RadarChartHelper.formatTootltipLabels(data)}`
            }
        />
    );
}

class RadarChart extends React.Component {
    render() {
        const data = this.props.data;
        const radarChart = data ? createRadarChart(data) : ExtraComponents.loadingView();
        return (
            <Segment style={{ height: "700px" }}>
                {radarChart}
            </Segment>
        );
    }
}

export default RadarChart;
