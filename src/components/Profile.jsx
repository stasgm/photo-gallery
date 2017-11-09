import React, { Component } from 'react';
import '../App.css';

class Profile extends Component{
    render(){
        const {profile} = this.props;
        return(
            <div className='profile'>
                <img
                    className='profile-img'
                    src={profile.profile_picture}
                    alt={profile.full_name}
                />
                <div className='profile-info'>
                    <div className='profile-name'>{profile.full_name}</div>
                    <div className='profile-id'>ID: {profile.id}</div>
                    <div className='profile-followers'>Подписчиков: {profile.counts.followed_by}</div>
                    <div className='profile-follows'>Подписан: {profile.counts.follows}</div>
                    <div className='profile-image-count'>Фотографий: {profile.counts.media}</div>
                </div>
            </div>
        )
    }
}

export default Profile;


