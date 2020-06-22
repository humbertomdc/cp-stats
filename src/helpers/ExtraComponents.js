import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
export const loadingView = () => {
    return (
        <Dimmer active inverted style={{ zIndex: "0" }}>
            <Loader size="large" inverted></Loader>
        </Dimmer>
    );
}
