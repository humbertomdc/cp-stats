import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Segment, Container, Statistic, Button } from 'semantic-ui-react';
import * as LineChartHelper from '../helpers/LineChartHelper';
import * as ExtraComponents from '../helpers/ExtraComponents';

const createLineChart = (data) => {
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 10, right: 0, bottom: 10, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            curve="step"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Users',
                legendOffset: -60,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            enableSlices="x"
            colors={d => d.color}
            enablePoints={false}
            lineWidth={1}
            enableArea={true}
            areaOpacity={0.5}
            useMesh={true}
            sliceTooltip={({ slice }) => LineChartHelper.ratedUsersToolTip(slice)}
        />
    );
}

class LineChart extends React.Component {

    handleAdd = (value) => {
        this.props.onBinSizeChange(5);
    }

    handleRemove = (value) => {
        this.props.onBinSizeChange(-5);
    }

    didUpdateComponent = () => {
        console.log(this.props.binSize);
    }

    render () {
        const data = this.props.data;
        const binSize = this.props.binSize;
        const place = data ? data[0].place : 0;
        const lineChart = data ? createLineChart(data) : ExtraComponents.loadingView();

        return (
            <Segment style={{ height: "500px", width: "100%" }}>
                <Container style={{ position: "absolute", height: "80%", width: "20%", top: 24, right: 12 }}>
                    <Container style={{ position: "relative", height: "30%" }}>
                        <Statistic ref={this.labelRef} size="large" style={{ display: "flex" }}>
                            <Statistic.Label style={{ color: "#4f4f4f" }}>Better than</Statistic.Label>
                            <Statistic.Value style={{ color: "#4f4f4f" }}>{place}%</Statistic.Value>
                            <Statistic.Label style={{ color: "#4f4f4f" }}>of other users</Statistic.Label>
                        </Statistic>
                    </Container>
                    <Container style={{ height: "40%" }} />
                    <Container style={{ position: "relative", width: "50%", height: "30%" }}>
                        <Statistic size="small" style={{ display: "flex" }}>
                            <Statistic.Value style={{ color: "#4f4f4f" }}>{binSize}</Statistic.Value>
                            <Statistic.Label style={{ color: "#4f4f4f" }}>Bin Size</Statistic.Label>
                        </Statistic>
                        <Button.Group style={{ zIndex: "10", position: "relative", display: "flex" }}>
                            <Button
                                icon='minus'
                                onClick={this.handleRemove}
                            />
                            <Button
                                icon='plus'
                                onClick={this.handleAdd}
                            />
                        </Button.Group>
                    </Container>
                </Container>

                <Container style={{ height: "100%" }}>
                    {lineChart}
                </Container>
            </Segment>
        );
    }
    
}

export default LineChart;