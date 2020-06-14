import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Segment, Container, Statistic, Icon } from 'semantic-ui-react';
import * as PieChartHelper from '../helpers/PieChartHelper';
import * as ExtraComponents from '../helpers/ExtraComponents';

const createPieChart = (data) => {
    return (
        <ResponsivePie
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            innerRadius={0.45}
            padAngle={1.25}
            cornerRadius={4}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'dark', modifiers: [ [ 'darker', 2 ] ] }}
            enableRadialLabels={false}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={20}
            radialLabelsLinkHorizontalLength={12}
            radialLabelsLinkStrokeWidth={2}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={40}
            slicesLabelsTextColor="#333333"
            sliceLabel="id"
            animate={true}
            motionStiffness={95}
            motionDamping={20}
            defs={PieChartHelper.getDefs()}
            fill={PieChartHelper.getVerdictFills()}
        />
    );
}

class VerdictPieChart extends React.Component {

    getAcceptanceRate(data) {
        var total = 0;
        var oks = 0;
        data.forEach(element => {
            if (element.id === "OK") {
                oks += parseInt(element.value);
            }
            total += parseInt(element.value);
        });
        return (100 * oks / total).toFixed(0);
    }

    render() {
        const data = this.props.verdictData;
        const pieChart = data ? createPieChart(data) : ExtraComponents.loadingView();
        const rate = data ? this.getAcceptanceRate(data) : "0";
        return (
            <Segment style={{ height: "500px"}}>
                <Statistic size="huge" style={{ position: "absolute", height: "100%", width: "100%", justifyContent: "center", left: "0", top: "0" }}>
                    <Statistic.Value style={{ color: "#4f4f4f" }}>{rate}<Icon size="small" name="percent"/></Statistic.Value>
                    <Statistic.Label style={{ color: "#4f4f4f" }}>Acceptance Rate</Statistic.Label>
                </Statistic>
                <Container style={{ zIndex: "1", height: "100%"}}>
                    {pieChart}
                </Container>
            </Segment>
        );
    }
}

export default VerdictPieChart;