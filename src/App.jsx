import React, { Component } from 'react'
import './App.css';

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            tags : ''
        }
    }

    render(){
        return(
            <div className='App'>
                <div className='App-title'>
                    My Personal gallery!
                </div>

            </div>
        )
    }
}

export default App;