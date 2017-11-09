import React, { Component } from 'react';
import '../App.css';

class Gallery extends Component{
    openImage(url){
        let win = window.open(url, '_blank');
        win.focus();

    }
    render(){
        const {images} = this.props;
        return(
            <div className='gallery'>
                <div className='image-count'>Количество загруженных фото: {this.props.count}</div>
                <div className='gallery-list'>
                    {images.map((item, key) => {
                        //console.log('image title', image.title);
                        return(
                            <div className='item' key={key}>
                                <img
                                    src={item.images.low_resolution.url}
                                    className='item-img'
                                    alt='media'
                                    onClick={() => this.openImage(item.link)}
                                />
                            </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Gallery;