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
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class Newcontroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      demoArray:['الم','پارہ نمبر ۲','Akhzar','Abrar','Akhzar','Abrar','Akhzar','Abrar','Akhzar','Abrar','Akhzar','Abrar'],
      // demoArray:[{id:0,name:'Akhzar'},{id:1,name:'Abrar'}],
    };
  }

_onPressButton = () =>{
  alert('Params are = ', this.props.navigation.state.params.others);
  // this.props.navigation.pop();
}

componentDidMount(){
  // alert('I am testing');
}

rowSelected(item){
alert('Item Number is =' + item)
this.props.navigation.navigate('SectionListController',{

});
}

render() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>

          <View style={styles.body}>

            <View style={styles.sectionContainer}>

        <FlatList
         data={this.state.demoArray}
         initialNumToRender={1}
         extraData={this.state}
         keyExtractor = { (item, index) => index.toString()}
         renderItem={({item}) =>

         <View style={{flex:0.9,paddingRight:6,paddingLeft:6,paddingBottom:3,paddingTop:3,justifyContent:'center',}}>

         <TouchableOpacity style={ {justifyContent:'center', elevation: 3,
         height:60,borderRadius:4,padding:4,shadowOpacity: 10,
         backgroundColor : 'white',shadowColor: 'black',} }
         onPress={()=>this.rowSelected(item)}>

         <Text>
         {item}
        </Text>

         </TouchableOpacity>



          </View>
       }

       />

            </View>

          </View>

      </SafeAreaView>
    </>
    );
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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
