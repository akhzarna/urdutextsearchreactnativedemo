
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Dimensions,
  CheckBox,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

// Akhzar Nazir
var Header=require('./Header')
var Loader=require('./Loader')

var RNFS = require('react-native-fs');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Progress from 'react-native-progress';
import Autocomplete from 'react-native-autocomplete-input';
import Carousel from 'react-native-snap-carousel';

var BookManager=require('./BookManager');

var dashboard_logo=require('./Icons/logo.png')
var checkIcon=require('./Icons/checkBoxWhite.png');
var uncheckIcon=require('./Icons/uncheckBoxWhite.png');
var backgroundImage=require('./Icons/Bg.png');
var Constants=require('./Constants')
var isiPhone=Platform.OS === 'ios';
const window = Dimensions.get('window');
var DEVICE_WIDTH=window.width;
var DEVICE_HEIGHT=window.height;
var sliderWidth=DEVICE_WIDTH;
var itemWidth=DEVICE_WIDTH/2-50;

// For Database
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'booksdatabase.db' });

var allNuskhaJaat = [];

class Dashboard extends Component{

  constructor(props){
    super(props);

    // For Database
    db.transaction(function(txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_books'",
          [],
          function(tx, res) {
            // console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS table_books', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_books(book_name VARCHAR(255), chapter_name VARCHAR(255), disease_name VARCHAR(255),prescription_name VARCHAR(255),prescription_detail VARCHAR(255))',
                []
              );
            }
          }
        );
      });

    var alif = {key:'ا',data:0};
    var bay = {key:'ب',data:0};
    var pay = {key:'پ',data:0};
    var tay = {key:'ت',data:0};
    var ttay = {key:'ٹ',data:0};
    var say = {key:'ث',data:0};
    var jeem = {key:'ج',data:0};
    var chay = {key:'چ',data:0};
    var hey = {key:'ح',data:0};
    var khey = {key:'خ',data:0};
    var dal = {key:'د',data:0};
    var ddal = {key:'ڈ',data:0};
    var zaal = {key:'ذ',data:0};
    var ray = {key:'ر',data:0};
    var aray = {key:'ڑ',data:0};
    var zay = {key:'ز',data:0};
    var say = {key:'ژ',data:0};
    var seen = {key:'س',data:0};
    var sheen = {key:'ش',data:0};
    var saad = {key:'ص',data:0};
    var zaad = {key:'ض',data:0};
    var toain = {key:'ط',data:0};
    var zoain = {key:'ظ',data:0};
    var ain = {key:'ع',data:0};
    var ghain = {key:'غ',data:0};
    var fey = {key:'ف',data:0};
    var kaf = {key:'ق',data:0};
    var kaaf = {key:'ک',data:0};
    var gaaf = {key:'گ',data:0};
    var laam = {key:'ل',data:0};
    var meem = {key:'م',data:0};
    var noon = {key:'ن',data:0};
    var wao = {key:'و',data:0};
    var haa = {key:'ہ',data:0};
    var chotiye = {key:'ی',data:0};

    var array=[alif,bay,pay,tay,ttay,say,jeem,chay,hey,khey,dal,ddal,zaal,ray,aray,zay,say,seen,sheen,saad,zaad,toain,zoain,ain,ghain,fey,kaf,kaaf,gaaf,laam,meem,noon,wao,haa,chotiye];

    this.state={
        lastSelectedAlphabetIndex:{ index: '0', data: 2 },
        urduAlphabet:array,
        fileContent:'kdsnfk',
        bookArray:[],
        txtSearch:'',
        isUrduSelected:true,
        buttonSearchTitle:'تلاش کریں',
        booksListTitle:'کتابوں کی فہرست کے لیئے آگے چلیئے',
        placeholderText:'نسخہ جات یا علاج تلاش کریں',
        showProgress:true,
        isTitleSelected:true,
        isTitleAndTextSelected:true,
        isDiseasesSelected:true,
        isُPrescriptionAndTreatmentSelected:true,
        pressStatus: false,
        searchArray:[],
        searchResultArray:[],
        searchResultCloneArray:[],
        bannersArray:[
          {fileName:require('./Banner/Matab_Banner_1.jpg'),key:5},
          {fileName:require('./Banner/Matab_Banner_2.png'),key:6},
          {fileName:require('./Banner/Matab_Banner_3.png'),key:7},
          {fileName:require('./Banner/honey_1.jpg'),key:0},
          {fileName:require('./Banner/honey_3.jpeg'),key:1},
          {fileName:require('./Banner/honey_2.jpg'),key:2},
          {fileName:require('./Banner/Honey_Farmi.jpg'),key:3},
          {fileName:require('./Banner/Honey_Wild.jpg'),key:4},
        ],
    }
}

  componentWillUnmount() {

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
          this.horizontalrowselected();
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
            this.horizontalrowselected();
            // this.dumpIntoDB();
          })

          Constants.BookArray=finalBookArrayCarrot;
          Constants.isBookLoaded=true;
          this.setState({
            bookArray:finalBookArrayCarrot
          })
        }
}

actionButtonBooksList(){

    this.props.navigation.navigate('BooksListScreen',{
      finalArray:finalArray,
    });

    // var screenName='BooksListScreen';
    // this.props.navigator.push({
    //   screen:screenName,
    //   // passProps:{finalArray},
    //   navigatorStyle:{
    //     navBarHidden:true,
    //   },
    // })

}

horizontalrowselected(){
  // Get all Nuskha-Jaat
  //  var allNuskhaJaat = [];
   for (var ww = 0; ww < this.state.bookArray.length; ww++)    {
     var chaptersArray = this.state.bookArray[ww].data;
     for (var xx = 0; xx < chaptersArray.length; xx++)       {
       var diseaseArray = chaptersArray[xx].data;
       for (var yy = 0; yy < diseaseArray.length; yy++)    {
         var nuskhaArray = diseaseArray[yy].data;
         for (var zz = 0; zz < nuskhaArray.length; zz++) {
           var title = nuskhaArray[zz].title;
           var obj = {title:title,bookname:this.state.bookArray[ww].title};
           allNuskhaJaat.push(obj);
         }
       }
     }
   }

   var finalArrayForFlatList=[];

   for (var u = 0; u < this.state.urduAlphabet.length; u++) {
   var letter=this.state.urduAlphabet[u].key;
   var finalArray=[];

     for (var i = 0; i < allNuskhaJaat.length; i++) {
       var title = allNuskhaJaat[i].title;
       var stringArray=title.split(")");
       var newString=stringArray[0];
       if (stringArray.length>0) {
         newString = stringArray[1];
      }

       if (newString == null) {
         continue;
       }

       newString=newString.trim();
       if (newString[0]==letter) {
         var ObjectToSaveInArray = {title:title,data:title,key:newString};
         finalArray.push(ObjectToSaveInArray);
         this.state.urduAlphabet[u].data = 1;
       }
     }

     // console.log('Final Array bar bar key is =',finalArray);

 if (u == 0) {
   // 2 value is for selected item
   this.state.urduAlphabet[0].data = 2;
   // this.setState({
   //   searchResultArray:finalArray,
   // })
 }

 finalArrayForFlatList.push(finalArray);

}

// Complete Clone array conaining all data about nuskhajaat of alif, bay, pay etc
this.setState({
  searchResultCloneArray:finalArrayForFlatList,
})

// At first step index 0 data (alif) data will be presented
this.setState({
  searchResultArray:finalArrayForFlatList[0],
})
   console.log('My My final array length is = ',this.state.searchResultArray.length);
}

componentDidMount() {

  AsyncStorage.getItem("booksData").then((value) => {
  var testVar = JSON.parse(value);
  if (testVar == null) {
    this.booksLoadAction();
  }else{
    this.booksLoadAction();
  // For Testing Else Part is Commented by Akhzar Nazir
  this.setState({
    bookArray:JSON.parse(value)
  });
  this.setState({showProgress:false});
  // Alert.alert(this.state.bookArray[0].data[0].subbestheading);
  this.horizontalrowselected();
  }
}
  ).done();
}

actionButtonSearch(){
  // Alert.alert(this.state.txtSearch);
  var searchWord='خواص ';
  // var searchWord=this.state.txtSearch;
  console.log('String to Search = ' + searchWord);
  searchWord=searchWord.toLowerCase();
  if (searchWord.length <=0) {
    Alert.alert('Stop!','Search complete word');
    return;
  }

  var finalArray=[];
  // var tempArray=[];
  // var tempArrayClone=[];

  // کتاب کے نام میں سے ڈھونڈیں
  var searchBookTitle=[];
  //ابواب میں سے ڈھونڈیں
  var searchChaptersTitle=[];
  //بیماریوں میں سے ڈھونڈیں
  var searchDiseasesTitle=[];
  // نسخہ جات میں سے ڈھونڈیں
  var searchPrescriptionsTitle=[];
  // تمام آپشنز میں سے تلاش کرنے کے بعد
  var allOptionsArray=[];
  console.log('Main Array is = ',this.state.bookArray);

  for (var ww = 0; ww < this.state.bookArray.length; ww++)    {
    var title = this.state.bookArray[ww].title;

    var paragraph=''+title;
    var index=paragraph.indexOf(searchWord);
    if (index!=-1){
      searchBookTitle.push(title);
    }

    var chaptersArray = this.state.bookArray[ww].data;

    for (var xx = 0; xx < chaptersArray.length; xx++) {
      var title = chaptersArray[xx].title;

      var paragraph=''+title;
      var index=paragraph.indexOf(searchWord);
      if (index!=-1){
        searchChaptersTitle.push(title);
      }
      var diseaseArray = chaptersArray[xx].data;
      for (var yy = 0; yy < diseaseArray.length; yy++) {

        var title = diseaseArray[yy].title;
        var paragraph=''+title;
        var index=paragraph.indexOf(searchWord);
        if (index!=-1){
          searchDiseasesTitle.push(title);
        }
        var nuskhaArray = diseaseArray[yy].data;
        for (var zz = 0; zz < nuskhaArray.length; zz++) {

          var title = nuskhaArray[zz].title;
          var paragraph=''+title;
          var index=paragraph.indexOf(searchWord);
          if (index!=-1){
            searchPrescriptionsTitle.push(title);
          }
        }
      }
    }
  }

  var tempArrayClone=[];
  // To remove duplication from array
  tempArrayClone = searchBookTitle.filter(function(elem, pos) {
    return searchBookTitle.indexOf(elem) == pos;
  });

  if(tempArrayClone.length>0){
    var searchBookTitleObj={
            title:'کتب',
            data:tempArrayClone
            };
    allOptionsArray.push(searchBookTitleObj);
  }

  var tempArrayClone=[];
  // To remove duplication from array
  tempArrayClone = searchChaptersTitle.filter(function(elem, pos) {
    return searchChaptersTitle.indexOf(elem) == pos;
  });

  if(tempArrayClone.length>0){
  var searchChaptersTitleObj={
          title:'ابواب',
          data:tempArrayClone
          };
  allOptionsArray.push(searchChaptersTitleObj);
  }

  var tempArrayClone=[];
  // To remove duplication from array
  tempArrayClone = searchDiseasesTitle.filter(function(elem, pos) {
    return searchDiseasesTitle.indexOf(elem) == pos;
  });

  if(tempArrayClone.length>0){
  var searchDiseasesTitleObj={
          title:'بیماریاں',
          data:tempArrayClone
          };
  allOptionsArray.push(searchDiseasesTitleObj);
  }

  var tempArrayClone=[];
  // To remove duplication from array
  tempArrayClone = searchPrescriptionsTitle.filter(function(elem, pos) {
    return searchPrescriptionsTitle.indexOf(elem) == pos;
  });

  if(tempArrayClone.length>0){
  var searchPrescriptionsTitleObj={
          title:'نسخہ جات',
          data:tempArrayClone
          };
  allOptionsArray.push(searchPrescriptionsTitleObj);
  }

  this.props.navigation.navigate('DisplayResultScreen',{
    finalArray:allOptionsArray,
    word:searchWord,
    bookArray:this.state.bookArray,
  });

}

searchExactWord(){

  var searchWord=this.state.txtSearch.trim().toLowerCase();
  if (searchWord.length<=1) {
    Alert.alert('Stop!','Search complete word');
    return;
  }
  var bookArray=this.state.bookArray;
  var searchedArray=[];
  var counter=0;

  for (var i = 0; i < bookArray.length; i++) {
    var paragraph=bookArray[i];
    var indexOfNewLine=paragraph.indexOf('\r');
    var headingData=paragraph.slice(0,indexOfNewLine);
    var subdata=paragraph;
    subdata.replace('\r','');
    subdata.replace('\n','');
    subdata=subdata.toLowerCase();
    var index=0
    for (var j = 0; j < subdata.length; j++) {
        index=subdata.indexOf(searchWord,index);
        if (index==-1) {
          break;
        }
            if (index==0) {
                  var spaceAfterIndex=subdata.indexOf(' ',index+1);
                  var word=subdata.slice(index,spaceAfterIndex)
                  if (word==searchWord) {
                    var object={key:counter,data:paragraph.trim()}
                    searchedArray.push(object);
                    counter++;
                    break;
                  }
                  index+=1;
                }
                else{
                  if (subdata[index-1]==' ') {
                    var spaceAfterIndex=subdata.indexOf(' ',index+1);
                    var word=subdata.slice(index,spaceAfterIndex)
                            if (word==searchWord) {
                              var object={key:counter,data:paragraph.trim()}
                              searchedArray.push(object);
                              counter++;
                              break;

                            }
                      }
                            index+=1;
                  }
          }
}

    var searchResult={'word':searchWord,'searchedArray':searchedArray};

    if (searchedArray.length==0) {
      Alert.alert('Stop!','No result found');
      return;
    }

    this.props.navigation.navigate('DisplayResultScreen',{
      searchResult:searchResult,
    });
}

checkBoxTitle(){
  // Title
  this.setState({
                isTitleSelected:!this.state.isTitleSelected,
                });
}

checkBoxTitleAndText(){
  // Title + Text
  this.setState({isTitleAndTextSelected:!this.state.isTitleAndTextSelected,
                });
}

checkBoxDiseases(){
  // بیماریاں
  this.setState({isDiseasesSelected:!this.state.isDiseasesSelected,
                });
}

checkBoxُPrescriptionAndTreatment(){
  // نسخہ جات یا علاج
  this.setState({
                isُPrescriptionAndTreatmentSelected:!this.state.isُPrescriptionAndTreatmentSelected,
                });
}

wordSelected(index){

  if (this.state.urduAlphabet[index].data == 0) {
    // If Selected Row is empty no need to process any more
  }else{
    // Last selectedAlphabet
  if (this.state.urduAlphabet[index].key == this.state.urduAlphabet[this.state.lastSelectedAlphabetIndex.index].key) {
    // If You press already selected row, no need to process any more
  }else{

  this.state.urduAlphabet[index].data = 2;
  this.state.urduAlphabet[this.state.lastSelectedAlphabetIndex.index].data = 1;
  // Update Laste selected index
  this.state.lastSelectedAlphabetIndex.index = index;

  this.setState({
    searchResultArray:this.state.searchResultCloneArray[index],
  })
    }
  }
}

 dumpIntoDB(){
console.log('insertDB Called');
     db.transaction((tx)=> {
        for (var i = 0; i < this.state.bookArray.length; i++) {
          for (var j = 0; j < this.state.bookArray[i].data.length; j++) {

       tx.executeSql(
         'INSERT INTO table_books (book_name, chapter_name, disease_name, prescription_name, prescription_detail) VALUES (?,?,?,?,?)',
         [this.state.bookArray[i].title, this.state.bookArray[i].data[j].mainheading, this.state.bookArray[i].data[j].subheading, this.state.bookArray[i].data[j].subbestheading, this.state.bookArray[i].data[j].data],
         (tx, results) => {
           if(results.rowsAffected>0){

           }else{
             alert('Updation Failed');
           }
         }
       );
     }
   }
});
 }

 _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }

  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }

_rowSelected(index){
  var finalArrayToCheckRepitition = [];
  for (var i = 0; i < this.state.searchResultArray.length; i++) {
    if (this.state.searchResultArray[index].key == this.state.searchResultArray[i].key) {
      finalArrayToCheckRepitition.push(this.state.searchResultArray[i]);
    }
  }

  if (finalArrayToCheckRepitition.length > 1) {
  this.props.navigation.navigate('RelatedWords',{
   sectionArray:finalArrayToCheckRepitition,
   });

  }else{

    var selectedRow = 0; //index
    var sectionArray = [];
    sectionArray.push(this.state.searchResultArray[index]);
    this.props.navigation.navigate('ReadingScreen',{
    sectionArray:sectionArray,
    selectedRow:selectedRow,
     });
  }
}

render(){

   return(

  <View style={styles.outerContainer}>
  <ImageBackground source={backgroundImage} style={{width:window.width,height:window.height,backgroundColor:'gray'}}>
    <Header navigation={this.props.navigation} navigator={this.props.navigator} showMenu={true} title='طبی  کتب'/>

    <ScrollView>

    <View style={styles.logoView}>
    <Image source={dashboard_logo} style={styles.logoStyle}/>
    </View>
    <View style={styles.subView}>
    <TextInput style={[styles.inputStyle,{textAlign:this.state.isUrduSelected?'right':'left'}]}
    value={this.state.txtSearch}
    onChangeText={(txtSearch) => this.setState({txtSearch})}
    placeholder={this.state.placeholderText}
    underlineColorAndroid='transparent'
     />

    <Text style={{textAlign:'right',marginRight:15,marginTop:15,color:'white'}}>کس کتاب سے تلاش کرنا چاہتے ہیں؟</Text>
     <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginRight:40,marginLeft:40,backgroundColor:'transparent'}}>
     <View style={{flexDirection:'row'}}>

         <TouchableOpacity onPress={()=>this.checkBoxTitleAndText()} style={{marginRight:20,width:120,height:40,alignItems:'flex-end',justifyContent:'center'}}>
           <View style={{flexDirection:'row',}}>
             <Text style={{alignSelf:'center',color:'white'}}>Title + Text</Text>
             <Image source={this.state.isTitleAndTextSelected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
            </View>
         </TouchableOpacity>

         <TouchableOpacity onPress={()=>this.checkBoxTitle()} style={{width:140,height:40,alignItems:'flex-end',justifyContent:'center'}}>
              <View style={{flexDirection:'row'}}>
              <Text style={{alignSelf:'center',color:'white'}}>Title</Text>
              <Image source={this.state.isTitleSelected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
              </View>
        </TouchableOpacity>

    </View>

       <View style={{flexDirection:'row'}}>

        <TouchableOpacity onPress={()=>this.checkBoxُPrescriptionAndTreatment()} style={{marginRight:20,width:120,height:40,alignItems:'flex-end',justifyContent:'center'}}>

                  <View style={{flexDirection:'row'}}>
                  <Text style={{alignSelf:'center',color:'white'}}> نسخہ جات یا علاج</Text>
                  <Image source={this.state.isُPrescriptionAndTreatmentSelected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
                  </View>

                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>this.checkBoxDiseases()} style={{width:140,height:40,alignItems:'flex-end',justifyContent:'center'}}>

                  <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:12,color:'white'}}>بیماریاں</Text>
                  <Image source={this.state.isDiseasesSelected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
                  </View>

                  </TouchableOpacity>
        </View>

    </View>

     <View style={styles.buttonView}>
     <TouchableOpacity onPress={()=>this.actionButtonSearch()} style={styles.buttonStyleOne}>
     <Text style={styles.textStyle}>{this.state.buttonSearchTitle}</Text>
     </TouchableOpacity>
     </View>

       <View style={{flex:1,backgroundColor:'transparent',justifyContent:'flex-end'}}>
       <View style={{alignItems:'flex-start',marginTop:10,marginBottom:isiPhone?20:20}}>
       <Carousel
          style={{}}
           ref={(c) => { this._carousel = c; }}
           data={this.state.bannersArray}
           renderItem={this._renderItem}
           sliderWidth={sliderWidth}
           itemWidth={itemWidth}
           itemHeight={itemWidth}
           loop={true}
           autoplay={true}
         />
         </View>
         </View>

       <View style={{marginTop:0,}}>
       <FlatList
       data={this.state.urduAlphabet}
       keyExtractor={(item, index) => index}
       horizontal={true}
       inverted={true}
       renderItem={({item,index}) =>
        <TouchableOpacity
         style={{ height:60,
          width:60,
          borderWidth:1,
          alignItems:'center',
          justifyContent:'center',
          borderColor:'white',backgroundColor:(this.state.urduAlphabet[index].data==0)?'transparent':(this.state.urduAlphabet[index].data==1)?'#38803B':'grey',}}
        onPress={()=> this.wordSelected(index)}
       >
        <Text style={styles.textStyleNP} > {item.key}  </Text>
        </TouchableOpacity>
      }
        />
       </View>

      <View style={{marginTop:20}}>
        <FlatList
        data={this.state.searchResultArray}
        keyExtractor={(item, index) => index}
        renderItem={({item,index}) =>
        <TouchableOpacity onPress={()=>this._rowSelected(index)} style={{
          height:50,
        }}>
        <View style={{
          marginLeft:20,marginRight:20,marginTop:10,
          borderColor:'white',borderWidth:1,flex:1,
          justifyContent:'center',}}>

        <Text numberOfLines={1} style={{
          backgroundColor:'transparent',color:'white',textAlign:'right',
          marginRight:20,marginLeft:20,fontSize:20,
          fontFamily:'Jameel-Noori-Nastaleeq',
        }}> {item.title}</Text>
        </View>
        </TouchableOpacity>
      }
        />
      </View>

      <View style={{marginTop:30}}>
       <Text> In The Name of Allah </Text>
      </View>

    </View>

    </ScrollView>

    </ImageBackground>

  </View>

   );
 }
}

const styles=StyleSheet.create({
outerContainer:{
  flex:1,
  backgroundColor:'#F5DDC5',
},

logoView:{
  alignItems:'center',
  justifyContent:'center',
  marginTop:10,
  marginBottom:0,
},

logoStyle:{
  marginTop:0,
  height:132,
  width:120,
},

inputStyle:{
  // width:140,
  marginRight:40,
  marginLeft:40,
  height:60,
  borderWidth:1,
  borderRadius:10,
  alignItems:'center',
  justifyContent:'center',
  // paddingLeft:15,
  // paddingRight:15,
  borderColor:'#E0E3E7',
  color:'#AEAEAE',
  fontFamily:'Jameel-Noori-Nastaleeq',
  fontSize:22,
  backgroundColor:'white',
  // backgroundColor:'green',
},

buttonPressed:{
            height:60,
            width:60,
            borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            borderColor:'white',
            backgroundColor:'blue',
},

buttonNotpressed:{
            height:60,
            width:60,
            borderWidth:1,
            alignItems:'center',
            justifyContent:'center',
            borderColor:'white',
          // backgroundColor:'blue',
},

subView:{
  flex:1,
  // backgroundColor:'gray',
  justifyContent:'flex-start',
  marginTop:10,
  // alignItems:'center',
},

buttonView:{
  marginTop:20,
  alignItems:'center',
  justifyContent:'center',
},

buttonStyleOne:{
height:50,
width:140,
borderRadius:25,
alignItems:'center',
justifyContent:'center',
backgroundColor:'#38803B',
marginTop:15,
},

buttonStyleTwo:{
height:50,
width:340,
borderRadius:25,
alignItems:'center',
justifyContent:'center',
backgroundColor:'#38803B',
marginTop:15,
},

textStyle:{
  color:'white',
  fontFamily:'Jameel-Noori-Nastaleeq',
  fontSize:25,
  // fontWeight:'bold',
},

textStyleNP:{
  color:'white',
  fontFamily:"Jameel-Noori-Nastaleeq",
  fontSize:25,
  backgroundColor:'transparent',
  // fontWeight:'bold',
},

tabView:{
  flexDirection:'row',
  marginTop:20,
  alignItems:'center',
  justifyContent:'center',
  // marginLeft:75,
  // marginRight:75,
},

tabButtonStyle:{
  // flex:1,
  height:45,
  // marginRight:20,
  marginLeft:20,
  alignItems:'center',
  justifyContent:'center',
},

buttonText:{
  color:'blue',
  fontSize:15,
  fontWeight:'bold',
},

progressbarStyle:{
  position:'absolute',
  left:'40%',
  top:'50%',
},

  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    height:30,
    width:30,
    backgroundColor:'green',
  },
})

module.exports=Dashboard;
