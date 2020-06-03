import React from 'react';
import axios from 'axios';
import ProfileCard from './ProfileCard'


class App extends React.Component {
    state = {
        userProfile: {
            handle: null,
            image: null,
            maxRank: null,
        }
    };

    componentDidMount() {
        axios.get("https://codeforces.com/api/user.info", {
            params: {
                handles: "Humberto"
            }
        }).then(response => {
            console.log(response.data.result[0])
            const user = response.data.result[0];
            this.setState({ 
                userProfile: {
                    handel: user.handle,
                    image: user.titlePhoto,
                    maxRank: user.maxRank,
                }
            });
        });
    }

    render() {
        return (
            <div className="ui feed">
                <div className="event">
                    <ProfileCard userProfile={this.state.userProfile} />
                    <div className="ui segment" style={{ marginLeft: '10px', marginTop: '0px', width: '70vw'}} ></div>
                </div>
            </div>
        );
    }
}

export default App;