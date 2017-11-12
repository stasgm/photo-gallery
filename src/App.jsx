//Libraries
import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import $ from 'jquery';
import { Form, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
//Components
import Gallery from './components/Gallery';
import Profile from './components/Profile';
// Styles
import './App.css';

//const INSTAGRAM_ID = 220968095;
//const INSTAGRAM_ID = 3567862449; //ardent_arctic

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            status : '',
            pagination: 1,
            current_id: 3567862449,
            id_list: [3567862449, 220968095],
            access_token: '220968095.60ee6b5.fa4881ace5a049799d3b1342699302d9',
            profile: {
                id: 0,
                username: '',
                full_name : '',
                profile_picture: 'https://instagram.fiev1-1.fna.fbcdn.net/t51.2885-15/e35/23279419_1870135956347978_250684463539814400_n.jpg',
                counts: {
                    followed_by: 0,
                    follows: 0,
                    media : 0
                }
            },
            media: []
        }
    }

    componentDidMount() {
        this.showMessage();
        this.loadProfile(this.state.id_list[0]);
        this.loadRecentMedia();
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
            data: {access_token: this.state.access_token},
            success: function(data){
                const profile = data.data[0];
                this.setState({ profile });
            }.bind(this),
            error: function(error){
                this.setState({status: error.message});
            }.bind(this),
        });
    };



    loadProfile(id){
        this.setState({current_id: id});
        this.setState({pagination: 1});

        const url = `https://api.instagram.com/v1/users/${id}/?access_token=${this.state.access_token}`;
        fetchJsonp(url)
            .then(function(response) {
                return response.json()
            }).then(function(json) {
            const profile = json.data;
            this.setState({ profile });
        }.bind(this)).catch(function(ex) {
//            console.log('parsing failed', ex);
            this.setState({status: 'parsing failed' + ex});
        }.bind(this))

        //this.loadRecentMedia();
    }
    loadProfile_old() {
        /* Загрузка информации о профиле*/
        //this.GetID();


        //console.log(this.state.profile.id);
        $.ajax({
            url: `https://api.instagram.com/v1/users/${this.state.current_id}/`,
            dataType: 'jsonp',
            type: 'GET',
            data: {access_token: this.state.access_token},
            success: function(data){
                const profile = data.data;
                this.setState({ profile });
            }.bind(this),
            error: function(error){
                this.setState({status: error.message});
            }.bind(this),
        });
    }


    loadRecentMedia() {
        /* Загрузка последних 10 фотографий*/
        //this.GetID();
        this.setState({pagination: this.state.pagination + 1});
        //console.log(this.state.profile.id);
        //console.log(this.state.pagination);
        $.ajax({
            url: `https://api.instagram.com/v1/users/${this.state.current_id}/media/recent/?count=${this.state.pagination*5}`,
            dataType: 'jsonp',
            type: 'GET',
            data: {access_token: this.state.access_token},
            success: function(data){
                const media = data.data;
                this.setState({ media });
            }.bind(this),
            error: function(error){
                this.setState({status: error.message});
            }.bind(this),
        });
    }

    render(){
        return(
            <div className='App'>
                <div className='App-title'>
                    My Personal gallery!
                </div>
                <Form inline>
                    <div>
                        <Button className='Tags-button-show-message button' onClick={() => this.showMessage()}>
                            Загрузить цитату
                        </Button>
                        <div className='status'>{this.state.status}</div>
                    </div>
                    {/*
                    <button className='Tags-button-show-profile button' onClick={() => this.loadProfile()}>
                        Загрузить профиль
                    </button>
                    */}
                    <ButtonToolbar className='buttons-select-profile'>
                        <ToggleButtonGroup type="radio" defaultValue={0} name='options'>
                            <ToggleButton className='Tags-button-show-profile button' value={0} onClick={() => this.loadProfile(this.state.id_list[0])}>
                                Alexandra
                            </ToggleButton>
                            <ToggleButton className='Tags-button-show-profile button' value={1} onClick={() => this.loadProfile(this.state.id_list[1])}>
                                Stas
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>

                    <Button className='Tags-button-show-profile button' onClick={() => this.loadRecentMedia()}>
                        Загрузить 5 фото
                    </Button>
                    {/*
                      <input className='Tags-input' placeholder='Введите теги' />
                    */}
                    <div>
                        <Profile profile={this.state.profile} />
                        <Gallery images={this.state.media} count={this.state.media.length} pagination={this.state.pagination}/>
                    </div>
                </Form>
            </div>
        )
    }
}

export default App;