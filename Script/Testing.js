
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Image,
  Platform,
} from 'react-native';

var Header=require('./Header');
var HeadingView=require('./HeadingView');
var bookmark_icon=require('./Icons/bookmark_icon.png')
var share_icon=require('./Icons/share_icon.png')
import HTMLView from 'react-native-htmlview';
import Share, {ShareSheet, Button} from 'react-native-share';
import _ from "lodash";
import Pagination, { Icon, Dot } from "react-native-pagination";
var isiPhone=Platform.OS === 'ios';
var SCREEN_WIDTH=window.width;
class Testing extends Component{

  constructor(props){
    super(props);
    var bookName=this.props.fullData;
    //var tempData=this.props.selectedItem.data.data;

    this.state = {
      visible: false,
      showData: [],
      
    }

  }
  
     componentWillMount(){
     //  console.log("hello! :)",this.props.fullData[0],this.props.fullData.length,
    //   this.props.fullData[0].data.length);
       
     }
     componentDidMount(){
    //  this.settingOut();
     }
        
        // settingOut(){
        //   var tempArray=[];
        //   Alert.alert(this.props.fullData[1].title,this.props.fullData[1].data[0].data);
        //    Alert.alert(''+this.props.fullData.length);
        //   for(var i=0; i<this.props.fullData.length; i++){
        //     var title= this.props.fullData[i].title;

        //     for(var j=0; j<this.props.fullData[i].data.length; j++){
        //     var data= this.props.fullData[i].data[j].data;
            
        //     var key= j;
        //     var obj={data:data,title:title,key:key}
        //     tempArray.push(obj);
        //   }
        // }
        //    this.setState({showData:tempArray});
        // }

     onPressItem = item => console.log("onPressItem:item ", item);

     //map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
     _keyExtractor = (item, index) => item.key;
   
     // REQUIRED for ReactNativePagination to work correctly
     onViewableItemsChanged = ({ viewableItems, changed }) =>
       this.setState({ viewableItems });


  render(){

    let shareOptions = {
         title: "کتاب الرویا",
         message:this.props.fullData.data,
        //  url: "",
         subject: "Share Link" //  for email
       };

      return(

            <View style={styles.outerContainer}>
            <Header title='نسخہ ' navigator={this.props.navigator}/>
              
            <FlatList 
             horizontal
             pagingEnabled={true}
             showsHorizontalScrollIndicator={false}
           
             legacyImplementation={false}
          data={this.props.fullData}
         // ref={r => (this.refs = r)} // create refrence point to enable scrolling
           // map your keys to whatever unique ids the have (mine is a "id" prop)
          keyExtractor={item => item.key}
            renderItem={({item}) =>

            <ScrollView style={styles.textView}>
              <View style={{flex:1, width: SCREEN_WIDTH, height: 'auto'}}>
              <Text style={{flex:1,}}> {item.title} </Text>
              </View>
           <Text style={{flex:1,alignItems:'center',textAlign:'right'}}>
           {item.data}
           </Text>

          <TouchableOpacity  style={{marginLeft:40,marginRight:40,marginBottom:20,marginTop:40,backgroundColor:(this.state.indexOfBookMark!=-1)?'#E8590A':'#999999',height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>
          <View style={styles.innerView}>
          <Image source={bookmark_icon} style={styles.iconStar}/>
          <Text style={styles.textStyle1}> بک مارک </Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>{
             Share.open(shareOptions);}} 
            style={{marginLeft:40,marginRight:40,marginBottom:40,marginTop:30,backgroundColor:'#2C3990',height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>
            <View style={styles.innerView}>
            <Image source={share_icon}  style={styles.iconShare}/>
              <Text style={styles.textStyle1}>  شیئیر </Text>
            </View>
            </TouchableOpacity>
            </ScrollView>
            }
            />
         
            </View>
          );}
}

const styles=StyleSheet.create({
    outerContainer:{
      flex:1,
      // backgroundColor:'white',
      backgroundColor:'#F9FBFC',
    },
    textView:{
      flex:1,
      // backgroundColor:'green',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:20,
      // marginTop:20,
    },
    textStyle:{
      textAlign:'right',
      paddingTop:20,
      fontFamily:'Adobe Arabic',
      color:'#606060',
      fontSize:23,
      // fontFamily:'Nafees Web Naskh',
    },innerView:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
    iconStar:{
      height:25,
      width:25,
      marginRight:10,
      // backgroundColor:'green'
    },
    textStyle1:{
      color:'white',
      fontFamily:'Nafees Web Naskh',
      fontSize:25,
      fontWeight:'bold',
    },
    iconShare:{
      width:30,
      height:25,
      marginRight:10,
    },
    subViewStyle:{
      flex:1,
      // backgroundColor:'green',
      // borderWidth:1,
      // height:50,
      alignItems:'center',
      justifyContent:'center',
    }
})

const htmlstyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  b:{
    fontWeight:'bold',
    color:'blue',
    fontFamily:'Nafees Web Naskh',
    fontSize:20,
  },
  wrapper: {
        alignItems: "center",
  },
   p: {
     textAlign: "right",
     lineHeight:35,
     fontFamily:'Adobe Arabic',
     // fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
     fontSize:25,
     color:'#606060',
    //  paddingTop:-40,
    // marginBottom: 3
  },
  h1:{
    fontSize:30,
    color:'red',
    fontFamily:'Nafees Web Naskh',
    textAlign: "right",
    // paddingTop:25,
    // lineHeight:20,
    // paddingBottom:-40,
  },
  // u:{
  //   // color:'red',
  //   // height:4,
  //   // textDecorationColor:'red',
  //   // fontSize:20,
  // }
});

module.exports=Testing;
