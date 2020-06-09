import './ProfileCard.css'
import React from 'react';
import { flag } from 'country-emoji';

class ProfileCard extends React.Component {
    state = { coloredRankRectHeight: null };

    constructor(props) {
        super(props);
        this.imageDivRef = React.createRef();
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.getColoredRankRectHeight);
    }

    getColoredRankRectHeight = () => {
        const currentImage = this.imageRef.current;
        const currentImageDiv = this.imageDivRef.current;
        this.setState({
            coloredRankRectHeight: currentImage.clientHeight / 3 + currentImageDiv.offsetTop
        });
    }

    rankColor = (rank) => {
        if (rank < 1200) return "grey";
        if (rank < 1400) return "green";
        if (rank < 1600) return "teal";
        if (rank < 1900) return "blue";
        if (rank < 2100) return "purple";
        if (rank < 2400) return "orange";
        if (rank >= 2400) return "red";
        return "black";
    }

    render() {
        const user = this.props.userProfile;
        const color = this.rankColor(parseInt(user.currentRating))
        return (
            <div className={`ui raised fluid ${color} card`}>
                <div className="content">
                    <div className="ui one column center aligned grid">
                        <div className="column">
                            <div 
                                ref={this.imageDivRef} 
                                className={`ui rounded raised ${color} segment image center aligned`}
                            >
                                <img
                                    ref={this.imageRef}
                                    src={user.image}
                                    alt="Profile"
                                />
                            </div>
                            <div>
                                <h4>{flag(user.country)} {user.handle}</h4>
                            </div>
                            <div 
                                className="ui two column grid container"
                                style={{marginTop: "0px"}}
                            >
                                <div className="eight wide column">
                                    <h3>{user.currentRating}</h3>
                                    <h5>Rating</h5>
                                </div>
                                <div className="eight wide column">
                                    <h3>{user.maxRating}</h3>
                                    <h5>Max Rating</h5>
                                </div>
                            </div>
                            <div className="ui clearing divider"></div>
                            <div>
                                <h4 className="capitalize">{user.rank}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileCard;