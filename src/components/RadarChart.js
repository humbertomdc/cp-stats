import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Segment } from 'semantic-ui-react';
import * as ExtraComponents from '../helpers/ExtraComponents';

const createRadarChart = (data) => {
    return (
        <ResponsiveRadar
            data={data}
            keys={[ "avg", "acceptanceRate" ]}
            indexBy="tag"
            maxValue="auto"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: 'color' }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={36}
            enableDots={true}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color' }}
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={{ scheme: 'nivo' }}
            fillOpacity={0.25}
            blendMode="multiply"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
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
