
  import React, { Component } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    Text,
    Alert,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Platform,
    SectionList,ScrollView,
    ImageBackground,
    Dimensions,
    TextInput,
  } from 'react-native';

  var Header=require('./Header');
  var arrow_left=require('./Icons/arrow_left.png');
  import HTMLView from 'react-native-htmlview';
  import SearchHeader from './SearchHeader';
  var isiPhone=Platform.OS === 'ios';
  var backArrow=require('./Icons/backArrow_2.png')
  var headerImage=require('./Icons/header.png');
  var searchIcon =  require('./Icons/search_icon.png');
  const window = Dimensions.get('window');

  class RelatedWords extends Component{
    constructor(props){
      super(props);
      var finalArray=[];
        // finalArray = this.props.finalArrayToCheckRepitition;
        finalArray = this.props.navigation.state.params.sectionArray;
        this.state={
          finalArray:finalArray,
          sectionArray:[],
        }
  }

  UNSAFE_componentWillMount(){
    Alert.alert('RelatedWords');
    this.function();
  }

  _rowSelected(item,section){
    var selectedRow = item.key;
    var sectionArray = [];
    sectionArray = this.state.finalArray;

    console.log("section Array is = ",sectionArray);
    console.log("selected Row is = ",selectedRow);

    this.props.navigation.navigate('ReadingScreen',{
      sectionArray:sectionArray,
      selectedRow:selectedRow,
    });

  }

 function(){
  tempArray=[];
  title=[];
  //Alert.alert("length"+this.state.finalArray.length);
   for(var i=0; i<this.state.finalArray.length; i++){
       var data=this.state.finalArray[i].data;
       var title=this.state.finalArray[i].title;
      var mainObj = {title:title,data:[{data:data.subbestheading, key:i} ],  read:data };
       tempArray.push(mainObj);
  }
  this.setState({ sectionArray: tempArray,
  });
 }

  actButtonSearch(){
    this.setState({
      showSearchField:true,
    })
  }

    render(){
    return(

    <View style={{flex:1}}>
     <Header title='مشترکات' showMenu={false} navigator={this.props.navigator} navigation={this.props.navigation} />
     <ScrollView style={{flex:1}}>
      <SectionList
        renderItem={({item,section}) => <TouchableOpacity onPress={()=>this._rowSelected(item,section)}>
                      <View style={styles.textView}>
                      <View style={{flex:1}}>
                      <Image source={arrow_left} style={styles.iconDimention}/>
                      </View>
                      <View style={{flex:8}}>
                      <Text numberOfLines={1} style={styles.textStyle}> {item.data} {item.read}</Text>
                      </View>
                      </View>
                      <View style={styles.lineView}/>
                      </TouchableOpacity>}
        renderSectionHeader={({section}) =>
        <View style={{height:40,backgroundColor:'#999999',justifyContent:'center'}}>
        <Text style={{color:'white',textAlign:'right',
        paddingLeft:15,paddingRight:15,
        fontSize:20,
        fontFamily:'Jameel-Noori-Nastaleeq',
          }}>
          {section.title}
          </Text>
        </View>
        }
        sections={this.state.sectionArray}
        />
        </ScrollView>
        </View>
      );}
  }

  const styles=StyleSheet.create({
    outerContainer:{
      flex:1,
      backgroundColor:'#F7FAFB',
    },
    textView:{
      height:80,
      alignItems:'center',
      justifyContent:'flex-end',
      marginLeft:15,
      marginRight:15,
      flexDirection:'row',
    },
    lineView:{
      height:1,
      marginRight:15,
      marginLeft:15,
      backgroundColor:'#E5E5E5',
    },
    textStyle:{
      textAlign:'right',
      color:'#000000',
      fontFamily:'Jameel-Noori-Nastaleeq',
      fontSize:17,
    },
    iconDimention:{
      width:12,
      height:20,
    }
  })

  const htmlstyles = StyleSheet.create({
    a: {
      fontWeight:'300',
      color:'#FF3366', // make links coloured pink
    },
    b:{
      fontWeight:'bold',
      color:'red',
    }
  });

  module.exports = RelatedWords;
