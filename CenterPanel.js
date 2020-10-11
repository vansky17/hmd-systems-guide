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
import { connect, nextHmd, prevHmd } from './store';
import styles from './stylesheet';

const { AudioModule } = NativeModules;

class CenterPanel extends React.Component {
  state = {
    name: '',
    image: '',
    id: 1,
    hover: false,
    fade: new Animated.Value(0)
  };

  fetchHmdData(index) {
    fetch(`${config.API_ENDPOINT}/hmds`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
     this.setState({
      name: data[index].name,
      image: data[index].image,
      id: data[index].id
     });

    });  
  }

  componentDidMount() {
    this.fetchHmdData(0);

    Animated.timing(
      this.state.fade,
      {
        toValue: 0.7,
        duration: 2000,
      }
    ).start();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.fetchHmdData(this.props.index);
    }
  }
  clickHandler(index) {
    nextHmd(index)

    AudioModule.playOneShot({
      source: asset('audio/next.wav'),
      volume: 0.4
    });
  }
  clickHandlerPrev(index) {
    prevHmd(index)

    AudioModule.playOneShot({
      source: asset('audio/next.wav'),
      volume: 0.4
    });
  }
  render () {
    let { fade } = this.state;
    return(
      <Animated.View style={[{opacity: fade}, styles.centerPanel]}>
        <View style={styles.header}>
    <Text style={styles.headerText}>{this.state.name}</Text>
        </View>
        <View>
         <Image source={{uri: 'https://userdocsmanager.s3.us-east-2.amazonaws.com/'+this.state.image}}  style={{width:460, height: 250}}></Image>
        </View>
        <View style={{flexDirection:"row"}}>
          <VrButton style={ this.state.hover ? styles.hoverCenter :  styles.buttonCenter}
                      onEnter={() => this.setState({hover: true})}
                      onExit={() => this.setState({hover: false})}
                      onClick={() => this.clickHandlerPrev(this.props.index)}>
              <Text style={styles.textSize}>PREV</Text>
          </VrButton>
          <VrButton style={this.state.hover ? styles.hoverCenter : styles.buttonCenter}
                    onEnter={() => this.setState({hover: true})}
                    onExit={() => this.setState({hover: false})}
                    onClick={() => this.clickHandler(this.props.index)}>
            <Text style={styles.textSize}>NEXT / {this.props.index +1} of 9</Text>
          </VrButton>  
        </View>
      </Animated.View>
    );
  }
}
const ConnectedCenterPanel = connect(CenterPanel);

export default ConnectedCenterPanel;