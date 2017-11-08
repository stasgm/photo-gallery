import React, { Component } from 'react';
import Gallery from './components/Gallery';
import Profile from './components/Profile';
import './App.css';
import $ from 'jquery';


const ACCESS_TOKEN = '220968095.60ee6b5.fa4881ace5a049799d3b1342699302d9';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            status :' ',
            profile: {
                id: null,
                username: 'Stas',
                full_name : 'Stas',
                profile_picture: 'https://instagram.fiev1-1.fna.fbcdn.net/t51.2885-15/e35/23279419_1870135956347978_250684463539814400_n.jpg',
                followers: 0,
                follow: 0,
                image_count : 0
            },
            images: [{
                title: 'test',
                url : ''
            }]
        }
    }

    showMessage(){
        /* Выводит цитату Рона Свонсона */
        let URL = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';

        fetch(URL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                this.setState({status: json[0]});
                //console.log('artist', json[0]);
            }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            //this.setState({state: 'There has been a problem with your fetch operation: ' + error.message})
        })
    }

    GetID() {
        $.ajax({
            url: 'https://api.instagram.com/v1/users/search?q=damned_god',
            dataType: 'jsonp',
            type: 'GET',
            data: {access_token: ACCESS_TOKEN},
            success: function(data){
                const profile = data.data[0];
                this.setState({ profile });
            }.bind(this),
            error: function(error){
                this.setState({status: error.message});
            }.bind(this),
        });
    };

    search() {
        /* Загрузка информации о профиле*/
        this.GetID();
    }

    render(){
        return(
            <div className='App'>
                <div className='App-title'>
                    My Personal gallery!
                </div>
                <div>
                    <button className='Tags-button-show-message button' onClick={() => this.showMessage()}>
                        Загрузить цитату
                    </button>
                    <div className='status'>{this.state.status}</div>
                    <button className='Tags-button-show-profile button' onClick={() => this.search()}>
                        Загрузить профиль
                    </button>
                    {/*
                      <input className='Tags-input' placeholder='Введите теги' />
                    */}
                    <div>
                        <Profile profile={this.state.profile} />
                        <Gallery images={this.state.images} count={this.state.images.length} />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;