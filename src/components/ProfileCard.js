import './ProfileCard.css'
import React from 'react';

const ProfileCard = (props) => {
    return (
        <div className="ui card background profile-card">
            <div className="content">
                <div className="align-center">
                    <h3>{props.userProfile.maxRank}</h3>
                </div>
                <div className="ui rounded image center">
                    <img src={props.userProfile.image} alt="Profile" />
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;