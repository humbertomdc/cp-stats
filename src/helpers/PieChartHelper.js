export const getDefs = () => {
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
                color: 'rgba(255, 255, 255, 0.05)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'compilation-error',
                type: 'patternLines',
                background: 'rgba(241, 225, 91, 1)', //yellow
                color: 'rgba(255, 255, 255, 0.05)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'time-limit-exceeded',
                type: 'patternLines',
                background: 'rgba(114, 211, 254, 1)', //baby blue
                color: 'rgba(255, 255, 255, 0.05)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'skipped',
                type: 'patternLines',
                background: 'rgba(194, 157, 253, 1)', //purple
                color: 'rgba(255, 255, 255, 0.05)',
            },
            {
                id: 'challenged',
                type: 'patternLines',
                background: 'rgba(119, 157, 202, 1)', //blue
                color: 'rgba(255, 255, 255, 0.05)',
            },
            {
                id: 'runtime-error',
                type: 'patternLines',
                background: 'rgba(232, 168, 56, 1)', //orange
                color: 'rgba(255, 255, 255, 0.05)',
                rotation: -45,
                lineWidth: 2,
                spacing: 6
            },
            {
                id: 'memory-limit-exceeded',
                type: 'patternLines',
                background: 'rgba(97, 205, 187, 1)', //dark teal
                color: 'rgba(255, 255, 255, 0.05)',
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