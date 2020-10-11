import React from 'react';
import {
  Animated,
  asset,
  AppRegistry,
  View,
} from 'react-360';
import ConnectedRightPanel from './rightPanel';
import ConnectedLeftPanel from './leftPanel';
import ConnectedCenterPanel from './CenterPanel';
import { connect } from './store';
import Entity from 'Entity';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export class CryptoModel extends React.Component {
  state = {
    rotation: new Animated.Value(0),
    bounceValue: new Animated.Value(0.5)
  }

  bounce({value, initial, toValue, friction = 1.5}) {
    value.setValue(initial);

    Animated.spring(
      value, {
        toValue,
        friction,
      }
    ).start();
  }

  componentDidMount() {
    Animated.loop(Animated.timing(
      this.state.rotation,
      {
        toValue: 360,
        duration: 11000,
      }
    )).start();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.hmd !== nextProps.hmd) {
      const cryptoConfig = {
        value: this.state.bounceValue,
        initial: 0.3,
        toValue: 0.5,
        friction: 5
      };

      this.bounce(cryptoConfig);
    }
  }

  rotations = {
    BTC: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0,
    },
    DASH: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0,
    },
    XMR: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0,
    },
    ZEN: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0,
    }
  };

  render() {
    return (
      <View>
        <AnimatedEntity
          style={{transform: [{scaleX: this.state.bounceValue},
                              {scaleY: this.state.bounceValue},
                              {scaleZ: this.state.bounceValue},
                              {rotateX: this.rotations[`${this.props.hmd}`].rotateX},
                              {rotateY: this.rotations[`${this.props.hmd}`].rotateY},
                              {rotateZ: this.rotations[`${this.props.hmd}`].rotateZ}
                            ]}}
          /* source={{obj: asset(`models/${this.props.hmd}.obj`), mtl: asset(`models/${this.props.hmd}.mtl`)}} */
          source={{obj: asset(`models/BTC.obj`), mtl: asset(`models/BTC.mtl`)}}
        />
      </View>
    );
  }
};

const ConnectedCryptoModel = connect(CryptoModel);

AppRegistry.registerComponent('ConnectedLeftPanel', () => ConnectedLeftPanel);
AppRegistry.registerComponent('ConnectedRightPanel', () => ConnectedRightPanel);
AppRegistry.registerComponent('ConnectedCenterPanel', () => ConnectedCenterPanel);
AppRegistry.registerComponent('ConnectedCryptoModel', () => ConnectedCryptoModel);
