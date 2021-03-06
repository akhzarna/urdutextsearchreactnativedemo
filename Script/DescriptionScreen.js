
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
var isiPhone=Platform.OS === 'ios';

class DescriptionScreen extends Component{

  constructor(props){
    super(props);
    // Alert.alert('Description Screen');
    var bookName=this.props.navigation.state.params.selectedItem.bookName;
    var tempValue=this.props.navigation.state.params.selectedItem.data;
   // Alert.alert("hello"+this.props.navigation.state.params.selectedItem.data);
    var mainHeading = this.props.navigation.state.params.selectedItem.data;
    // var subHeading = this.props.navigation.state.params.selectedItem.data;
    // var subbestHeading = this.props.navigation.state.params.selectedItem.completedata;
    // Alert.alert("mainheading"+mainHeading);

    mainHeading=this.seperateHeadingWord(mainHeading);
    var mainArray = [mainHeading];

    var orignalData=tempValue;
    var headingWords=this.seperateHeadingWord(orignalData);

    var searchWord=this.props.navigation.state.params.selectedItem.searchWord;

    // var stringTOreplace='/'+searchWord+'/g';
    // tempValue=tempValue.replaceAll(searchWord,'<b>'+searchWord+'</b>');

    var newwrod='<b>'+searchWord+'</b>'
    var index=tempValue.indexOf('\r');

    var beforeHeading=tempValue.slice(0,index);
    var afterHeading=tempValue.slice(index+1,tempValue.length);
    var headingData='<h1>'+beforeHeading+'</h1>';
    var str2='<p>'+afterHeading+'</p>';

    // str2.replace('\r','');
    // str2.replace('\n','');
    // str2=str2.split(searchWord).join(newwrod);

    str2=this.tagSearchWord(str2);
    var newStr=str2;
    tempValue=newStr;

    // tempValue='<html>'+tempValue+'</html>';
    // tempValue='<div>'+tempValue+'</div>';

    this.state = {
      visible: false,
      data:tempValue,
      orignalData:orignalData,
      isAlreadyBookMarked:false,
      indexOfBookMark:-1,
      headingWords:headingWords,
      mainHeading:mainHeading,
      // subHeading:subHeading,
      // subbestHeading:subbestHeading,
      mainArray:mainArray,
      bookName:bookName,
      forABMdata:this.props.navigation.state.params.selectedItem.data,
    }

    this.checkForAlreadyBookMark();
    this.tagSearchWord(afterHeading);
  }

     UNSAFE_componentWillMount(){
      // Alert.alert("hello! :)");
     }

seperateHeadingWord(data){

// Alert.data(data);

var index1=data.indexOf('#');
var array=[];
if (index1!=-1) {
  var urduWord=data.slice(0,index1);
  urduWord=urduWord.trim();
  array.push(urduWord);
  var index2=data.indexOf('#',index1+1);
          if (index2!=-1) {
            var persianWord=data.slice(index1+1,index2);
            persianWord=persianWord.trim();
            var index3=data.indexOf('\r');
            var englishWord=data.slice(index2+1,index3);
            englishWord=englishWord.trim();
            array.push(persianWord);
            array.push(englishWord);
          }else{
            var index3=data.indexOf('\r');
            var englishWord=data.slice(index1+1,index3);
            englishWord=englishWord.trim();
            array.push(englishWord);
          }
  }else{
    var index3=data.indexOf('\r');
    var word=data.slice(0,index3);
    word=word.trim();
    array.push(word);
  }
// console.log(array);
array.reverse();
return array;
}

tagSearchWord(data){
  var searchWord=this.props.navigation.state.params.selectedItem.searchWord;
  var tempString=data;
  var index=0;
  for (var i = 0; i <tempString.length; i++){
      index=tempString.indexOf(searchWord,index);
      if (index==-1) {
        break;
      }
      if (index==0) {
        var spaceAfterIndex=tempString.indexOf(' ',index+1);
        var word=tempString.slice(index,spaceAfterIndex)
        if (word==searchWord) {
          var str1=tempString.slice(0,index-1);
          var str2=tempString.slice(spaceAfterIndex,tempString.length);
          var newWord='<b>'+searchWord+'</b>';
          tempString=str1+newWord+str2;
          index=spaceAfterIndex;
        }
      }else{
          if (tempString[index-1]==' ') {
              var spaceAfterIndex=tempString.indexOf(' ',index+1);
              var word=tempString.slice(index,spaceAfterIndex)
              if (word==searchWord) {
                var str1=tempString.slice(0,index-1);
                var str2=tempString.slice(spaceAfterIndex,tempString.length);
                var newWord='<b>'+searchWord+'</b>';
                tempString=str1+newWord+str2;
                index=spaceAfterIndex;
              }else{//tag similara word
                  tempString=this.tagSimiliarword(tempString, spaceAfterIndex, index);
                  index=spaceAfterIndex;
                }
          }else{
            var spaceAfterIndex=tempString.indexOf(' ',index+1);
            tempString=this.tagSimiliarword(tempString, spaceAfterIndex, index);
            index=spaceAfterIndex;
          }
      }
      index=index+1;
  }
return tempString;
}

tagSimiliarword(data,spaceAfterIndex,index){
        var spaceBeforeIndex=-1;
        for (var i = index; i >0; i--) {
          var letter=data[i];
            if (letter==' ') {
              spaceBeforeIndex=i;
              break;
            }
        }
    var word=data.slice(spaceBeforeIndex,spaceAfterIndex);
    var str1=data.slice(0,spaceBeforeIndex);
    var str2=data.slice(spaceAfterIndex,data.length);
    var newWord='<u>'+word+'</u>';
    var  tempString=str1+newWord+str2;
    // console.log(word);
    return tempString;
}

  onCancel() {
      // console.log("CANCEL")
      this.setState({visible:false});
    }
    onOpen() {
      // console.log("OPEN")
      this.setState({visible:true});
    }

    acutionButtonBookMark(){

      if (this.state.indexOfBookMark != -1) {
        AsyncStorage.getItem("bookMark").then((value) => {
                  // console.log('user data= ',JSON.parse(value));
                  if (value!=null) {
                        var savedValue=JSON.parse(value);
                        var array=savedValue.bookMark;
                        var tempArray=[];
                        for(var i = 0; i < array.length; i++) {
                         // if (i!=this.state.indexOfBookMark) {
                          if ( array[i] !=this.state.data) {
                            tempArray.push(array[i]);
                          }
                        }
                        var bookMark={bookMark:tempArray};
                        AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
                        this.setState({indexOfBookMark:-1});
                        Alert.alert('Alert!','Book Mark removed.')
                  }

               }).done();
      }else{
        console.log("book mark");
      AsyncStorage.getItem("bookMark").then((value) => {
                // console.log('user data= ',JSON.parse(value));
                if (value!=null) {
                      var savedValue=JSON.parse(value);
                      var array=savedValue.bookMark;
                    //  array.push(this.state.orignalData);
                    array.push(this.props.navigation.state.params.selectedItem.data);
                      var bookMark={bookMark:array};
                      AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
                      this.setState({indexOfBookMark:array.length-1});

                }else{
                  var tempArray=[];
                  tempArray.push(this.props.navigation.state.params.selectedItem.data);
                  var bookMark={bookMark:tempArray};
                  AsyncStorage.setItem('bookMark', JSON.stringify(bookMark))
                  this.setState({indexOfBookMark:tempArray.length-1});

                }
                Alert.alert('Alert!','Book Mark Saved.')
             }).done();
        }

    }


checkForAlreadyBookMark(){
 // var data=this.props.navigation.state.params.selectedItem.data;
 var data= this.state.data;
  console.log("data"+data[0]);
  AsyncStorage.getItem("bookMark").then((value) => {
            // console.log('user data= ',JSON.parse(value));
            if (value!=null) {
                  var savedValue=JSON.parse(value);
                  var array=savedValue.bookMark;
                  for (var i = 0; i < array.length; i++) {
                    var paragraph=array[i];
                    var str1 = array[i].slice(0,60);
                  //
                    var str2 =   data.slice(0,60);        //this.state.forABMdata.slice(0,60);
                    if (str1==str2) {
                      // console.log("marked");
                      this.setState({indexOfBookMark:i});
                      break;
                    }else{
                     // this.setState({indexOfBookMark:9});
                      // console.log("not marked");
                    }
                  }
            }
         }).done();
}

  render(){

    let shareOptions = {
         title: "کتاب الرویا",
         message:this.props.navigation.state.params.selectedItem.data,
        //  url: "",
         subject: "Share Link" //  for email
       };

      return(

            <View style={styles.outerContainer}>

            <ScrollView style={styles.textView}>
              <View style={{marginBottom:15}}>
              <HeadingView headingWords={this.state.mainArray}/>
              </View>

            <HTMLView
              value={this.state.data}
              addLineBreaks={false}
              textComponentProps={{textAlign:'right'}}
              stylesheet={htmlstyles}
              />

          <TouchableOpacity onPress={()=>this.acutionButtonBookMark()} style={{marginLeft:40,marginRight:40,marginBottom:20,marginTop:40,backgroundColor:(this.state.indexOfBookMark!=-1)?'#E8590A':'#999999',height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>
          <View style={styles.innerView}>
          <Image source={bookmark_icon} style={styles.iconStar}/>
          <Text style={styles.textStyle1}>بک مارک </Text>

          </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>{
             Share.open(shareOptions);
            }}  style={{marginLeft:40,marginRight:40,marginBottom:40,marginTop:30,backgroundColor:'#2C3990',height:50,justifyContent:'center',alignItems:'center',borderRadius:30}}>
            <View style={styles.innerView}>
            <Image source={share_icon}  style={styles.iconShare}/>
              <Text style={styles.textStyle1}>  شیئیر</Text>
            </View>
            </TouchableOpacity>
            </ScrollView>
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
      fontFamily:'Jameel-Noori-Nastaleeq',
      color:'#606060',
      fontSize:23,
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
      fontFamily:'Jameel-Noori-Nastaleeq',
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
    fontFamily:'Jameel-Noori-Nastaleeq',
    fontSize:20,
  },
  wrapper: {
        alignItems: "center",
  },
   p: {
     textAlign: "right",
     lineHeight:35,
     fontFamily:'Jameel-Noori-Nastaleeq',
     fontSize:25,
     color:'#606060',
    //  paddingTop:-40,
    // marginBottom: 3
  },
  h1:{
    fontSize:30,
    color:'red',
    fontFamily:'Jameel-Noori-Nastaleeq',
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

module.exports=DescriptionScreen;
