import React from 'react';
import axios from 'axios';
import ProfileCard from './ProfileCard/ProfileCard'


class App extends React.Component {
    state = {
        userProfile: {
            handle: null,
            image: null,
            country: null,
            rank: null,
            currentRating: null,
            maxRating: null,
        }
    };

    componentDidMount() {
        axios.get("https://codeforces.com/api/user.info", {
            params: {
                handles: "MiFaFaOvO"
            }
        }).then(response => {
            console.log(response.data.result[0])
            const user = response.data.result[0];
            this.setState({ 
                userProfile: {
                    handle: user.handle,
                    image: user.titlePhoto,
                    country: user.country,
                    rank: user.rank,
                    currentRating: user.rating,
                    maxRating: user.maxRating,
                }
            });
        });
    }

    render() {
        return (
            <div
                className="ui padded grid"
                style={{ minWidth: "1000px", minHeight: "100vh", backgroundColor: "#f8fcfd" }}
            >
                <div className="four wide column">
                    <ProfileCard userProfile={this.state.userProfile} />
                </div>
                <div className="eleven wide column">
                    <div className="ui fluid segment">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default App;