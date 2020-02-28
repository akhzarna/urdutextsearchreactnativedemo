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
  SectionList,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class SectionListController extends React.Component {
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
alert('Item Number is =',item.data)
// this.props.navigation.navigate('Register',{
//
// });
}

_sectionHeader = (info) => {
    var txt = info.section.key;
    return <Text
      style={{ height: 80, textAlign: 'center', textAlignVertical: 'center', backgroundColor: 'green', color: 'white', fontSize: 30 }}>{txt}</Text>
  }

  _renderItem = (info) => {
    var txt = '  ' + info.item.title;
    return <Text
      style={{ height: 60, textAlignVertical: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}>{txt}</Text>
  }
  
render() {


  var sections = [
      { key: "ہمارے شہر", data: [{ title: "لاہور" }, { title: "کراچی" }, { title: "اسلام آباد" }] },
      { key: "ہمارے کھیل", data: [{ title: "ہاکی" }, { title: "کرکٹ" }, { title: "کبڈی" }, { title: "گلی ڈنڈہ" }, { title: "کوئی اور" }] },
      { key: "ہمارے تعلیمی ادارے", data: [{ title: "پنجاب یونیورسٹی" }, { title: "افرو ایشین" }] },
      { key: "ہمارے مدرسے", data: [{ title: "جامعہ نعیمیہ" }, { title: "جامعہ اشرفیہ" }, { title: "جامعہ دارالعلوم" },{ title: "جامعہ بنوری" }, { title: "جامعہ ہندسیہ" }, { title: "جامعہ کراچی" }] },
    ];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>

          <View style={styles.body}>

            <View style={styles.sectionContainer}>




                    <SectionList
                      sections={sections}
                      renderSectionHeader={this._sectionHeader}
                      renderItem={this._renderItem}

                      ItemSeparatorComponent={() => <View><Text>____________________</Text></View>}
                      ListHeaderComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 40 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>سب سے اوپر</Text></View>}
                      ListFooterComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 40 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>سب سے نیچے</Text></View>}
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
