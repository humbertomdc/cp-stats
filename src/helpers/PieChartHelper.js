import '../style/index.css'
import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

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

export const getSubmittedDefs = () => {
    return ([
        {
            id: 'submitted',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.1)',
            rotation: -45,
            lineWidth: 2,
            spacing: 6
        }
    ]);
}

export const getVerdictDefs = () => {
    return (
        [
            {
                id: 'ok',
                type: 'patternLines',
                background: 'rgba(119, 221, 119, 1)', //green
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'wrong',
                type: 'patternLines',
                background: 'rgba(244, 117, 96, 1)', //red
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'compilation-error',
                type: 'patternLines',
                background: 'rgba(241, 225, 91, 1)', //yellow
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'time-limit-exceeded',
                type: 'patternLines',
                background: 'rgba(114, 211, 254, 1)', //baby blue
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'skipped',
                type: 'patternLines',
                background: 'rgba(194, 157, 253, 1)', //purple
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'challenged',
                type: 'patternLines',
                background: 'rgba(119, 157, 202, 1)', //blue
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'runtime-error',
                type: 'patternLines',
                background: 'rgba(232, 168, 56, 1)', //orange
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'memory-limit-exceeded',
                type: 'patternLines',
                background: 'rgba(97, 205, 187, 1)', //dark teal
                color: 'rgba(255, 255, 255, 0.1)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'partial',
                type: 'patternLines',
                background: 'rgba(232, 193, 160, 1)', //cream
                color: 'rgba(255, 255, 255, 0.05)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
        ]
    );
}

export const getSubmittedFills = (data) => {
    var arr = [];
    data.forEach(element => {
        arr.push(
            {
                match: {
                    id: element.id
                },
                id: 'submitted'
            }
        );
    });
    return arr;
}

export const getVerdictFills = () => {
    return (
        [
            {
                match: {
                    id: 'OK'
                },
                id: 'ok'
            },
            {
                match: {
                    id: 'WRONG_ANSWER'
                },
                id: 'wrong'
            },
            {
                match: {
                    id: 'COMPILATION_ERROR'
                },
                id: 'compilation-error'
            },
            {
                match: {
                    id: 'TIME_LIMIT_EXCEEDED'
                },
                id: 'time-limit-exceeded'
            },
            {
                match: {
                    id: 'SKIPPED'
                },
                id: 'skipped'
            },
            {
                match: {
                    id: 'CHALLENGED'
                },
                id: 'challenged'
            },
            {
                match: {
                    id: 'RUNTIME_ERROR'
                },
                id: 'runtime-error'
            },
            {
                match: {
                    id: 'MEMORY_LIMIT_EXCEEDED'
                },
                id: 'memory-limit-exceeded'
            },
            {
                match: {
                    id: 'PARTIAL'
                },
                id: 'partial'
            },
        ]
    );
}