/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

var flag = 12;

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      flag: '',
  };
  }

  _onPressButton = () => {

      this.props.navigation.navigate('Dashboard',{
      rollnumber:1,
      others:'Akhzar Nazir',
      data:'My Data',
      compare:1,
    });

  }


  _onPressNewScreen = () => {

    this.props.navigation.navigate('Dashboard',{
    rollnumber:1,
    others:'Akhzar Nazir',
    data:'My Data',
    compare:1,
  });

  }


  componentWillMount(){

    alert('will mount');

  }

render() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <Header />

          <View style={styles.body}>
            <View style={styles.sectionContainer}>

              <TextInput
                style={{height:40}}
                placeholder="Enter Login!"
                onChangeText={(text)=>this.setState({text})}
                value={this.state.text}
              />

              <Text>{this.state.flag}</Text>

            </View>

            <View style={styles.sectionContainer}>

              <TextInput
                style={{height:40}}
                placeholder="Enter Password!"
                onChangeText={(text)=>this.setState({text})}
                value={this.state.text}
              />

            </View>

            <View style={styles.sectionContainer}>

              <Button
                onPress={this._onPressButton}
                title="Submit Pressed"
                color="#841584"
              />

            </View>

            <View style={styles.sectionContainer}>

              <Button
                onPress={this._onPressNewScreen}
                title="New Screen"
                color="#841584"
              />

            </View>

            { /* <LearnMoreLinks /> */ }

          </View>

        </ScrollView>

      </SafeAreaView>
    </>
    );
  }

  componentDidMount(){

alert('did mount');

  this.setState({flag:455});

  }

}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  textinput1:
  {
    height:40
  },
  engine: {
    position: 'absolute',
    right: 0,
  },

  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

// export default App;
