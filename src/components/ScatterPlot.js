import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { Segment } from 'semantic-ui-react';
import * as ExtraComponents from '../helpers/ExtraComponents';

const createScatterPlot = (data) => {
    return (
        <ResponsiveScatterPlot
            data={data}
            margin={{ top: 10, right: 10, bottom: 50, left: 60 }}
            xScale={{ type: 'linear', min: 0, max: 'auto' }}
            //xFormat="kg"
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            //yFormat="kg"
            colors={d => d.color}
            blendMode="hue"
            animate={false}
            isInteractive={false}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Rating',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Years',
                legendPosition: 'middle',
                legendOffset: -60
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: 'left-to-right',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            annotations={[
                {
                    type: 'circle',
                    match: { index: data[0].group },
                    noteX: 50,
                    noteY: 50,
                    offset: 3,
                    noteTextOffset: -3,
                    noteWidth: 10,
                    note: 'You are here.',
                },
            ]}
        />
    )
}

class ScatterPlot extends React.Component {
    render() {
        const data = this.props.data;
        if (data) console.log(data);
        const scatterPlot = data ? createScatterPlot(data) : ExtraComponents.loadingView();
        return (
            <Segment style={{ height: "500px" }}>
                {scatterPlot}
            </Segment>
        );
    }
}

export default ScatterPlot;
