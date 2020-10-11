import React from 'react';
import config from './config';
import {
  Animated,
  asset,
  Image,
  NativeModules,
  Text,
  View,
  VrButton
} from 'react-360';
import { connect, nextHmd } from './store';
import styles from './stylesheet';

const { AudioModule } = NativeModules;

class RightPanel extends React.Component {
  state = {
    id: null,
    panel: '',
    resolution:'',
    ppd: '',
    refrate: '',
    fov: '',
    tracking: '',
    price: '',
    rating: '',
    hover: false,
    fade: new Animated.Value(0)
  };

  fetchHmdData(index) {
    fetch(`${config.API_ENDPOINT}/hmds`)
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
     this.setState({
      id: data[index].id, 
      panel: data[index].panel,
      resolution: data[index].resolution,
      ppd: data[index].ppd,
      refrate: data[index].refrate,
      fov: data[index].fov,
      tracking: data[index].tracking,
      price: data[index].price,
      rating: data[index].rating
     });
    });  
  }

  componentDidMount() {
    this.fetchHmdData(this.props.index);

    Animated.timing(
      this.state.fade,
      {
        toValue: 0.7,
        duration: 4000,
      }
    ).start();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.fetchHmdData(this.props.index);
    }
  }
  _incrementCount = () => {
    this.setState({rating: this.state.rating + 1});
    if (this.state.rating >= 10){
      this.setState({rating: 1});
    }
    AudioModule.playOneShot({
      source: asset('audio/click.wav'),
      volume: 0.1
    });
  };

  clickHandler() {
    const {rating} = this.state;
    const newRating = {rating}
    fetch(`${config.API_ENDPOINT}/hmds/${this.state.id}`, {
      method: 'PATCH',
      body: JSON.stringify(newRating),
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(error => Promise.reject(error))
    })
    .then(response => response.json())
    .then(json => console.log(json));

    AudioModule.playOneShot({
      source: asset('audio/rate.wav'),
      volume: 0.7
    });
  }

  render() {
    let { fade } = this.state;

    return (
      <Animated.View style={[{opacity: fade},styles.rightPanel]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Information</Text>
        </View>
        <View>
          <View>
            <Image source={this.state.panel==='lcd'? asset('lcd.png') : asset('oled.png')} style={{width: 150, height: 75, marginLeft: 75}}></Image>
          </View>
          <Text style={styles.textSize}>
            Resolution: {this.state.resolution}
          </Text>
          <Text style={styles.textSize}>
            Pixels per Degree: {this.state.ppd}
          </Text>
          <Text style={styles.textSize}>
            Refresh Rate: {this.state.refrate}
          </Text>
          <Text style={styles.textSize}>
            Field of View: {this.state.fov}
          </Text> 
          <Text style={styles.textSize}>
            Tracking: {this.state.tracking}
          </Text>
          <Text style={styles.textSize}>
            Price: {this.state.price}
          </Text>
        </View>
        <View>
          <Text >Rating: {this.state.rating}</Text>
          <VrButton onClick={this._incrementCount} style={styles.buttonRate}><Text>Rate</Text></VrButton>
          <VrButton style={this.state.hover ? styles.hover : styles.button}
                    onEnter={() => this.setState({hover: true})}
                    onExit={() => this.setState({hover: false})}
                    onClick={() => this.clickHandler()}>
            <Text style={styles.textSize}>Save Rating</Text>
          </VrButton>
        </View>
      </Animated.View>
    );
  }
}

const ConnectedRightPanel = connect(RightPanel);

export default ConnectedRightPanel;
