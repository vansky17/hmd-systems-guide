import React from 'react';
import config from './config';
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
    video: '',
    page: '',
    fade: new Animated.Value(0)
  };

  fetchHmdData(index) {
    fetch(`${config.API_ENDPOINT}/hmds`)
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
     this.setState({
      video: data[index].video,
      page: data[index].page
     });
    });
    
  }

  componentDidMount() {
    this.fetchHmdData(0);
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
            source={{url:  this.state.video +'.mp4'}}
            stereo={'2D'}
            volume = {0.17}
            style={{
              width: 600,
              height: 350,
            }}
          />
          <View style={styles.header} style={{height: 125, backgroundColor: '#003459', opacity:0.5}}>
            <Text href={this.state.page}>{this.state.page}</Text>
            <Text style={styles.headerText} ></Text>
          </View>
      </View>
    );
  }
}

const ConnectedLeftPanel = connect(LeftPanel);

export default ConnectedLeftPanel;
