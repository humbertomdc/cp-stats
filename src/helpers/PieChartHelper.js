import '../style/index.css'
import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import * as Colors from '../helpers/Colors'
import * as CodeforcesData from '../helpers/CodeforcesData';

export const customTooltip = (totalVerdicts) => {
    return (
        ({ id, value }) => (
            <div style={{ textAlign: "center" }}>
                <p>{id}</p>
                <Divider fitted />
                <Grid columns={2}>
                    <Grid.Column textAlign="left">
                        <Grid.Row>
                            <strong>Total:</strong>
                        </Grid.Row>
                        <Grid.Row>
                            <strong>Rate:</strong>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Grid.Row>
                            {value}
                        </Grid.Row>
                        <Grid.Row>
                            {(100 * parseInt(value) / parseInt(totalVerdicts)).toFixed(2)}%
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        )
    );
}

export const getVerdictDefs = () => {
    const ids = CodeforcesData.verdictIds();
    const colors = Colors.dataScheme1();
    const defs = ids.map((id, index) => {
        return (
            {
                id: id,
                type: "patternLines",
                background: colors[index],
                color: "rgba(255, 255, 255, 0.1)",
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            }
        );
    });

    return defs
}

export const getVerdictFills = () => {
    const ids = CodeforcesData.verdictIds();
    const fills = ids.map(id => {
        return (
            {
                match: {
                    id: id
                },
                id: id
            }
        );
    });

    return fills;
}

export const getSubmittedDefs = () => {
    const colors = Colors.dataScheme1();
    const defs = colors.map((color, index) => {
        return (
            {
                id: index,
                type: 'patternLines',
                background: color,
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            }
        );
    });
    
    return defs;
}

export const getSubmittedFills = (data) => {
    const mod = Colors.dataScheme1().length;
    const arr = data.map((element, index) => {
        return (
            {
                match: {
                    id: element.id
                },
                id: index % mod
            }
        );
    });

    return arr;
}
