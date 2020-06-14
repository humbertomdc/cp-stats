import '../style/index.css'
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Segment, Container, Statistic } from 'semantic-ui-react';
import * as PieChartHelper from '../helpers/PieChartHelper';
import * as ExtraComponents from '../helpers/ExtraComponents';

const createPieChart = (data, totalVerdicts) => {
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
            tooltip={PieChartHelper.customTooltip(totalVerdicts)}
            
        />
    );
}

class VerdictPieChart extends React.Component {

    getTotalVerdicts(data) {
        var total = 0;
        data.forEach(element => {
            total += parseInt(element.value);
        });
        return total;
    }

    formatNumberCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const data = this.props.verdictData;
        const totalVerdicts = data ? this.getTotalVerdicts(data) : 0;
        const pieChart = data ? createPieChart(data, totalVerdicts) : ExtraComponents.loadingView();
        const formattedTotalVerdicts = this.formatNumberCommas(totalVerdicts)
        return (
            <Segment style={{ height: "500px"}}>
                <Statistic size="medium" style={{ position: "absolute", height: "100%", width: "100%", justifyContent: "center", left: "0", top: "0" }}>
                    <Statistic.Value style={{ color: "#4f4f4f" }}>{formattedTotalVerdicts}</Statistic.Value>
                    <Statistic.Label style={{ color: "#4f4f4f" }}>Total Verdicts</Statistic.Label>
                </Statistic>
                <Container style={{ zIndex: "1", height: "100%"}}>
                    {pieChart}
                </Container>
            </Segment>
        );
    }
}

export default VerdictPieChart;