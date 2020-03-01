import React from 'react';
import {
  asset,
  Animated,
  Text,
  View,
  staticResourceURL,
} from 'react-360';
import { connect } from './store';
import styles from './stylesheet';
import {VideoPlayer, VideoControl} from './src/VideoExtra'


class LeftPanel extends React.Component {
  state = {
    cryptocurrency: {
      symbol: '',
      time: '',
      close: '',
      high: '',
      low: '',
      open: '',
      volumefrom: '',
      volumeto: ''
    },
    fade: new Animated.Value(0)
  };

  fetchCryptoData(crypto) {
    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${crypto}&tsym=USD`)
    .then(response => response.json())
    .then(data => {
      this.setState({ cryptocurrency: {
          open: data["Data"][30]["open"],
          close: data["Data"][30]["close"],
          high: data["Data"][30]["high"],
          low: data["Data"][30]["low"],
          volumefrom: data["Data"][30]["volumefrom"],
          volumeto: data["Data"][30]["volumeto"]
        }
      });
    })
  }

  componentDidMount() {
    this.fetchCryptoData(this.props.crypto);

    Animated.timing(
      this.state.fade,
      {
        toValue: 0.7,
        duration: 4000,
      }
    ).start();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.crypto !== this.props.crypto) {
      this.fetchCryptoData(this.props.crypto);
    }
  }

  render() {
    let { fade } = this.state;

    return (
        <View style={{flex: 1, height: 600, borderColor: '#003459',
        borderWidth: 1}}>
          <View style={styles.header} style={{height: 125, backgroundColor: '#003459', opacity:0.5}}>
            <Text style={styles.headerText}>Watch Video</Text>
          </View>
          <VideoPlayer 
            muted={false}
            loop={true}
            source={{url: 'https://userdocsmanager.s3.us-east-2.amazonaws.com/VIVECosmos.mp4'}}
            stereo={'2D'}
            volume = {0.1}
            style={{
              width: 600,
              height: 350,
            }}
          />
          <View style={styles.header} style={{height: 125, backgroundColor: '#003459', opacity:0.5}}>
            <Text style={styles.headerText} ></Text>
          </View>
      </View>
    );
  }
}

const ConnectedLeftPanel = connect(LeftPanel);

export default ConnectedLeftPanel;
