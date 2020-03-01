import React from 'react';
import {
  Animated,
  asset,
  Image,
  NativeModules,
  Text,
  View,
  VrButton
} from 'react-360';
import { connect, nextCrypto } from './store';
import styles from './stylesheet';

const { AudioModule } = NativeModules;

class CenterPanel extends React.Component {
  state = {
    cryptoData: {
      symbol: '',
      algorithm: '',
      proofType: '',
      blockNumber: '',
      blockTime: '',
      blockReward: ''
    },
    hover: false,
    fade: new Animated.Value(0)
  };

  fetchCryptoData(crypto) {
    fetch(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${crypto}&tsym=USD&api_key=`)
      .then(response => response.json())
      .then(data => this.setState({
        cryptoData: {
          symbol: data["Data"][0]["CoinInfo"]["Name"],
          algorithm: data["Data"][0]["CoinInfo"]["Algorithm"],
          proofType: data["Data"][0]["CoinInfo"]["ProofType"],
          blockNumber: data["Data"][0]["CoinInfo"]["BlockNumber"],
          blockTime: data["Data"][0]["CoinInfo"]["BlockTime"],
          blockReward: data["Data"][0]["CoinInfo"]["BlockReward"]
        }
      })
    )
  }

  componentDidMount() {
    this.fetchCryptoData(this.props.crypto);

    Animated.timing(
      this.state.fade,
      {
        toValue: 0.7,
        duration: 2000,
      }
    ).start();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.crypto !== this.props.crypto) {
      this.fetchCryptoData(this.props.crypto);
    }
  }
  clickHandler(index) {
    nextCrypto(index)

    AudioModule.playOneShot({
      source: asset('audio/click.wav'),
      volume: 0.1
    });
  }
  render () {
    let { fade } = this.state;
    return(
      <Animated.View style={[{opacity: fade}, styles.centerPanel]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Vive Cosmos</Text>
        </View>
        <View>
         <Image source={{uri: 'https://userdocsmanager.s3.us-east-2.amazonaws.com/cosmos.jpg'}}  style={{width:460, height: 250}}></Image>
        </View>
        <View>
          <VrButton style={this.state.hover ? styles.hover : styles.button}
                    onEnter={() => this.setState({hover: true})}
                    onExit={() => this.setState({hover: false})}
                    onClick={() => this.clickHandler(this.props.index)}>
            <Text style={styles.textSize}>Next</Text>
          </VrButton>
        </View>
      </Animated.View>
    );
  }
}
const ConnectedCenterPanel = connect(CenterPanel);

export default ConnectedCenterPanel;