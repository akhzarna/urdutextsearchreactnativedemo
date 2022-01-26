import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
var RNFS = require('react-native-fs');
var Loader=require('./Loader')
import HTMLView from 'react-native-htmlview';
var isiPhone=Platform.OS === 'ios';
var Constants=require('./Constants')

// For Database
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'booksdatabase.db' });

const window = Dimensions.get('window');
var DEVICE_WIDTH=window.width;
var DEVICE_HEIGHT=window.height;
var Cell_Width=(DEVICE_WIDTH/2);

var BookManager=require('./BookManager');

class Tasaneef extends Component{
    constructor(props){
      super(props);
      // this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
      this.state={
          bookArray:[],
          showProgress:true,
      }
    }
    
    componentDidMount() {
      AsyncStorage.getItem("booksData").then((value) => {
        var booksData = JSON.parse(value);
        if (booksData == null) {
          this.booksLoadAction();
        }else{
        this.setState({
          bookArray:booksData,
          showProgress:false
        });
        }
      }
    ).done();
}

booksLoadAction(){
  console.log('Book Load Action Always Call or Not');
  var allBooksInOne = '';
  if (isiPhone) {
  // isiPhone
  allBooksInOne = RNFS.MainBundlePath+'/allbooks.txt';

  var finalBookArrayCarrot = [];
  RNFS.readFile(allBooksInOne)
      .then((contents) => {
        var contentString = contents.toString();
        console.log('contentString for iOS is = ', contentString);
        var chaptersArray=[];
        // For Chapters Titles denoted by & Sign
        for (var i = 0; i < contentString.length; i++) {
          var firstIndex=contentString.indexOf('^',i);
          var secondIndex=contentString.indexOf('^',firstIndex+1);
          if (secondIndex==-1 || firstIndex==-1) {
            break;
          }
          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
          chaptersArray.push(tempString);
          i=secondIndex;
        }
        // console.log('Chapters Array is = ',chaptersArray);
        var diseasesArray = [];
        // For Main Titles denoted by @ Sign
        for (var i = 0; i < chaptersArray.length; i++) {
          var stringAtIndex = chaptersArray[i];
          var headingEndIndex = stringAtIndex.indexOf('\r',1);
          var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
          var titlesArray=[];
          for (var x = 0; x < stringAtIndex.length; x++) {
            var firstIndex=stringAtIndex.indexOf('&',x);
            var secondIndex=stringAtIndex.indexOf('&',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }
            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
            // Save String and Heading Both in Array
            // var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
            titlesArray.push(tempString.trim());
            x=secondIndex;
          }
          var mainArrayObjIs = {key:i, title:testStringChapters,data:titlesArray};
          diseasesArray.push(mainArrayObjIs);
          // console.log('diseasesArray Array = ',diseasesArray);
        }
        var completeBookArray = [];
        // For Main Titles denoted by @ Sign
        for (var i = 0; i < diseasesArray.length; i++) {
          var prescriptionArray = [];
          for (var j = 0; j < diseasesArray[i].data.length; j++) {
            var titlesArrayNew = [];
            var stringAtIndex = diseasesArray[i].data[j];
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
            for (var x = 0; x < stringAtIndex.length; x++) {
              var firstIndex=stringAtIndex.indexOf('@',x);
              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // Save String and Heading Both in Array
              titlesArrayNew.push(tempString.trim());
              x=secondIndex;
            }
            var mainArrayObjIs = {key:j, title:testStringChapters,data:titlesArrayNew};
            prescriptionArray.push(mainArrayObjIs);
          }
          var aiknaiarrayObj = {key:i, title:diseasesArray[i].title,data:prescriptionArray};
          completeBookArray.push(aiknaiarrayObj);
        }

        // For Test
        for (var g = 0; g < completeBookArray.length; g++) {
          var completeBookArrayCarrot = [];
          for (var h = 0; h < completeBookArray[g].data.length; h++) {
            var prescriptionArrayCarrot = [];
            for (var k = 0; k < completeBookArray[g].data[h].data.length; k++) {
              var titlesArrayNew = [];
              var stringAtIndex = completeBookArray[g].data[h].data[k];
              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
              var indexforDollar = -1;
              for (var x = 0; x < stringAtIndex.length; x++) {
                // console.log('String At Index = ',completeBookArray[g].data[h].data[k]);
                var firstIndex=stringAtIndex.indexOf('$',x);
                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                // Save String and Heading Both in Array
                indexforDollar++;
                var titlesArrayObj = {key:indexforDollar, title:tempString.trim()};
                titlesArrayNew.push(titlesArrayObj);
                x=secondIndex;
              }
              var mainArrayObjIs = {key:k, title:testStringChapters,data:titlesArrayNew};
              prescriptionArrayCarrot.push(mainArrayObjIs);
            }
            var aiknaiarrayObj = {key:h, title:completeBookArray[g].data[h].title,data:prescriptionArrayCarrot};
            completeBookArrayCarrot.push(aiknaiarrayObj);
          }

          // To Separate Title from CoverPhoto
          var coverArray = completeBookArray[g].title.split(':cover:');
          var aiknaiarrayObjCarrot = [];
          if (g==0) {
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/arind.jpg'), data:completeBookArrayCarrot};
          }else if (g==1){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/indrain.jpg'), data:completeBookArrayCarrot};
          }else if (g==2){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/angoor.jpg'), data:completeBookArrayCarrot};
          }else if (g==3){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/aam.jpg'), data:completeBookArrayCarrot};
          }else if (g==4){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/aak.jpg'), data:completeBookArrayCarrot};
          }else if (g==5){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/badam.jpg'), data:completeBookArrayCarrot};
          }else if (g==6){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/bargad.jpg'), data:completeBookArrayCarrot};
          }else if (g==7){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/dhatoora.jpg'), data:completeBookArrayCarrot};
          }else if (g==8){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==9){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==10){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==11){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==12){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==13){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==14){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
          }else if (g==15){
            aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
          }
          finalBookArrayCarrot.push(aiknaiarrayObjCarrot);
        }
        // console.log('Final Book Array is = ',finalBookArrayCarrot);
        this.setState({showProgress:false});
        AsyncStorage.setItem('booksData', JSON.stringify(finalBookArrayCarrot));
        // this.horizontalrowselected();
        // this.dumpIntoDB();
      })

      Constants.BookArray=finalBookArrayCarrot;
      Constants.isBookLoaded=true;
      this.setState({
        bookArray:finalBookArrayCarrot
      })

      console.log('final array to dump all bookss into DB is = ',this.state.bookArray);

    }else{
    // isAndroid
    allBooksInOne ='allbooks.txt';

    var finalBookArrayCarrot = [];
    RNFS.readFileAssets(allBooksInOne)
        .then((contents) => {
          var contentString = contents.toString();
          // console.log('contentString for Android is = ', contentString);
          var chaptersArray=[];
          // For Chapters Titles denoted by & Sign
          for (var i = 0; i < contentString.length; i++) {
            var firstIndex=contentString.indexOf('^',i);
            var secondIndex=contentString.indexOf('^',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }
            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
            chaptersArray.push(tempString);
            i=secondIndex;
          }
          // console.log('Chapters Array is = ',chaptersArray);
          var diseasesArray = [];
          // For Main Titles denoted by @ Sign
          for (var i = 0; i < chaptersArray.length; i++) {
            var stringAtIndex = chaptersArray[i];
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
            var titlesArray=[];
            for (var x = 0; x < stringAtIndex.length; x++) {
              var firstIndex=stringAtIndex.indexOf('&',x);
              var secondIndex=stringAtIndex.indexOf('&',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // Save String and Heading Both in Array
              // var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
              titlesArray.push(tempString.trim());
              x=secondIndex;
            }
            var mainArrayObjIs = {key:i, title:testStringChapters,data:titlesArray};
            diseasesArray.push(mainArrayObjIs);
            // console.log('diseasesArray Array = ',diseasesArray);
          }
          var completeBookArray = [];
          // For Main Titles denoted by @ Sign
          for (var i = 0; i < diseasesArray.length; i++) {
            var prescriptionArray = [];
            for (var j = 0; j < diseasesArray[i].data.length; j++) {
              var titlesArrayNew = [];
              var stringAtIndex = diseasesArray[i].data[j];
              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
              for (var x = 0; x < stringAtIndex.length; x++) {
                var firstIndex=stringAtIndex.indexOf('@',x);
                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                // Save String and Heading Both in Array
                titlesArrayNew.push(tempString.trim());
                x=secondIndex;
              }
              var mainArrayObjIs = {key:j, title:testStringChapters,data:titlesArrayNew};
              prescriptionArray.push(mainArrayObjIs);
            }
            var aiknaiarrayObj = {key:i, title:diseasesArray[i].title,data:prescriptionArray};
            completeBookArray.push(aiknaiarrayObj);
          }

          // For Test
          for (var g = 0; g < completeBookArray.length; g++) {
            var completeBookArrayCarrot = [];
            for (var h = 0; h < completeBookArray[g].data.length; h++) {
              var prescriptionArrayCarrot = [];
              for (var k = 0; k < completeBookArray[g].data[h].data.length; k++) {
                var titlesArrayNew = [];
                var stringAtIndex = completeBookArray[g].data[h].data[k];
                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testStringChapters=stringAtIndex.slice(0,headingEndIndex);
                var indexforDollar = -1;
                for (var x = 0; x < stringAtIndex.length; x++) {
                  // console.log('String At Index = ',completeBookArray[g].data[h].data[k]);
                  var firstIndex=stringAtIndex.indexOf('$',x);
                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }
                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  // Save String and Heading Both in Array
                  indexforDollar++;
                  var titlesArrayObj = {key:indexforDollar, title:tempString.trim()};
                  titlesArrayNew.push(titlesArrayObj);
                  x=secondIndex;
                }
                var mainArrayObjIs = {key:k, title:testStringChapters,data:titlesArrayNew};
                prescriptionArrayCarrot.push(mainArrayObjIs);
              }
              var aiknaiarrayObj = {key:h, title:completeBookArray[g].data[h].title,data:prescriptionArrayCarrot};
              completeBookArrayCarrot.push(aiknaiarrayObj);
            }

            // To Separate Title from CoverPhoto
            var coverArray = completeBookArray[g].title.split(':cover:');
            // console.log('coverArray is =');
            // console.log(coverArray[0]);
            // console.log(coverArray[1]);
            var aiknaiarrayObjCarrot = [];
            if (g==0) {
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/arind.jpg'), data:completeBookArrayCarrot};
            }else if (g==1){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/indrain.jpg'), data:completeBookArrayCarrot};
            }else if (g==2){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/angoor.jpg'), data:completeBookArrayCarrot};
            }else if (g==3){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/aam.jpg'), data:completeBookArrayCarrot};
            }else if (g==4){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/aak.jpg'), data:completeBookArrayCarrot};
            }else if (g==5){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/badam.jpg'), data:completeBookArrayCarrot};
            }else if (g==6){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/bargad.jpg'), data:completeBookArrayCarrot};
            }else if (g==7){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/dhatoora.jpg'), data:completeBookArrayCarrot};
            }else if (g==8){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            }else if (g==9){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            }else if (g==10){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            }else if (g==11){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            }else if (g==12){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            }else if (g==13){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            }else if (g==14){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            }else if (g==15){
              aiknaiarrayObjCarrot = {key:g, title:coverArray[0], cover:require('./Icons/anar.jpg'), data:completeBookArrayCarrot};
            }
            finalBookArrayCarrot.push(aiknaiarrayObjCarrot);
          }
          this.setState({showProgress:false});
          AsyncStorage.setItem('booksData', JSON.stringify(finalBookArrayCarrot));
          // this.horizontalrowselected();
          // this.dumpIntoDB();
        })

        Constants.BookArray=finalBookArrayCarrot;
        Constants.isBookLoaded=true;
        this.setState({
          bookArray:finalBookArrayCarrot
        })
      }
}

  fetchDataFromDB(bookName){
    // console.log('bookName is = ',bookName);
    var arrayDB = [];
    db.transaction(tx => {
           tx.executeSql(
             'SELECT * FROM table_books WHERE book_name = ?',[bookName],
             (tx, results) => {
               var resultslength = results.rows.length;
              //  console.log('select * results are = ',resultslength);
               if (resultslength > 0) {
                 for (let i = 0; i < resultslength; ++i) {
                   var objforDB = {
                     key:i,
                     book_name:results.rows.item(i).book_name,
                     chapter_name:results.rows.item(i).chapter_name,
                     disease_name:results.rows.item(i).disease_name,
                     prescription_name:results.rows.item(i).prescription_name,
                     prescription_detail:results.rows.item(i).prescription_detail,
                   };
                   arrayDB.push(objforDB);
                  //  console.log(objforDB);
                 }
                //  console.log('0 index is = ', arrayDB[0].book_name);
                //  this.setState({
                //   finalArray:arrayDB,
                //   // showProgress:true,
                //  });
                 this.pushToNextViewController(arrayDB);
               }else{
                 alert('Book data is not available');
               }
             }
           );
         });
  }

    pushToNextViewController(arrayDB){
      this.props.navigation.navigate('ChaptersListComponent',{
        finalArray:arrayDB,
      });
    }

    rowSelected(item){
        var bookName = this.state.bookArray[item.key]
        this.props.navigation.navigate('ChaptersListComponent',{
          finalArray:this.state.bookArray[item.key].data,
          finalDict:this.state.bookArray[item.key],
        });

        // this.fetchDataFromDB(bookName);

    }

  render(){

    return(
      <View style={styles.outerContainer}>
      <Header title='تصانیف' showMenu={false} navigator={this.props.navigator} navigation={this.props.navigation}/>
            <FlatList
                  style={{flex:1,marginBottom:20}}
                  data={this.state.bookArray}
                  numColumns={2}
                  renderItem={
                  ({item}) =>
                  <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.rowSelected(item)}>
                    <Image source={item.cover} style={styles.imageStyle}/>
                    <Text style={styles.textStyle}>{item.title}</Text>
                  </TouchableOpacity>
                }
            />

      </View>
    );
  }
}

const styles=StyleSheet.create({
outerContainer:{
  flex:1,
  backgroundColor:'white',
  justifyContent: 'center',
  alignItems: 'center',
},
buttonStyle:{
  marginLeft:0,
  marginRight:0,
  marginTop:10,
  marginBottom:0,
  justifyContent: 'center',
  alignItems: 'center',
  width:Cell_Width,
},
imageStyle:{
  width:120,
  height:180,
},
textStyle:{
  color:'#38803B',
  marginTop:0,
  marginBottom:5,
  textAlign:'center',
  fontSize:20,
  // fontWeight:'bold',
  fontFamily:'MehrNastaliqWeb'
},
})

module.exports=Tasaneef;
