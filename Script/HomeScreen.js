
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
  AsyncStorage,
  FlatList,
} from 'react-native';

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

class HomeScreen extends Component{

  constructor(props){
    super(props);

    // For Database
    db.transaction(function(txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_books'",
          [],
          function(tx, res) {
            console.log('item:', res.rows.length);
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

    // Akhzar Nazir
    // this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));

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
        placeholderText:'نسخہ جات  یا علاج تلاش کریں',
        showProgress:true,
        isBook1Selected:true,
        isBook2Selected:true,
        pressStatus: false,
        isBook3Selected: this.props.isOption1,
        isBook4Selected: !this.props.isOption1,
        // ْْْْisBook3Selected: true,
        // isBook4Selected: true,
        searchResultArray:[],
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

  componentDidMount() {
    console.log('Akhzar Nazir New Experiment',BookManager.bookArrayForNuskhajaat);
    // For Testing Commented by Akhzar Nazir
    AsyncStorage.getItem("booksData").then((value) => {
    var testVar = JSON.parse(value);
    if (testVar == null) {
      this.booksLoadAction();
    }else{
      this.booksLoadAction();
    // For Testing Else Part is Commented by Akhzar Nazir

    // this.setState({
    //   bookArray:JSON.parse(value)
    // });
    // this.setState({showProgress:false});
    // // Alert.alert(this.state.bookArray[0].data[0].subbestheading);
    // this.horizontalrowselected();

    }
  }
    ).done();


}

  componentWillUnmount() {

  }

  booksLoadAction(){

    var path0='';
    var path1='';
    var path2='';
    var path3='';
    var path4='';
    var path5='';
    var path6='';
    var path7='';
    var path8='';
    var path9='';
    var path10='';
    var path11='';
    var path12='';
    var path13='';
    var path14='';
    var path15='';
    var path16='';

    if (isiPhone) {

    // isiPhone
    path0=RNFS.MainBundlePath+'/Articles.txt';
    path1=RNFS.MainBundlePath+'/آرنڈ.txt';
    path2=RNFS.MainBundlePath+'/اندرائین.txt';
    path3=RNFS.MainBundlePath+'/انگور.txt';
    path4=RNFS.MainBundlePath+'/آم.txt';
    path5=RNFS.MainBundlePath+'/خواص آک.txt';
    path6=RNFS.MainBundlePath+'/بادام.txt';
    path7=RNFS.MainBundlePath+'/برگد.txt';
    path8=RNFS.MainBundlePath+'/دھتورہ.txt';
    path9=RNFS.MainBundlePath+'/خواص شہد.txt';
    path10=RNFS.MainBundlePath+'/دھنیہ.txt';
    path11=RNFS.MainBundlePath+'/دودھ.txt';
    path12=RNFS.MainBundlePath+'/گاجر.txt';
    path13=RNFS.MainBundlePath+'/گھی کوار.txt';
    path14=RNFS.MainBundlePath+'/گھی.txt';
    path15=RNFS.MainBundlePath+'/دھی.txt';
    path16=RNFS.MainBundlePath+'/گل سرک.txt';

    // For Articles
    var mainArray=[];
    var finalArray0=[];
    RNFS.readFile(path0)
        .then((contents) => {
          var contentString = contents.toString();
          var articlesNameArray=[];
          var articlesHeadingArray=[];
          var articlesDetailArray=[];
          for (var i = 0; i < contentString.length; i++) {
            // Main Heading denoted by & Sign
            var firstIndexname=contentString.indexOf('&',i);
            var secondIndexname=contentString.indexOf('&',firstIndexname+1);
            if (secondIndexname==-1 || firstIndexname==-1) {
              break;
            }

            var tempString=contentString.slice(firstIndexname+1,secondIndexname-1);
            articlesNameArray.push(tempString);
            i=secondIndexname;

            }

            for (var i = 0; i < contentString.length; i++) {
            // ArticleHeading denoted by @ Sign
            var firstIndexheading=contentString.indexOf('@',i);
            var secondIndexheading=contentString.indexOf('@',firstIndexheading+1);
            if (secondIndexheading==-1 || firstIndexheading==-1) {
              break;
            }

            var tempString=contentString.slice(firstIndexheading+1,secondIndexheading-1);
            articlesHeadingArray.push(tempString);
            i=secondIndexheading;
          }

          for (var i = 0; i < contentString.length; i++) {
            // ArticleDetail denoted by $ Sign
            var firstIndexdetail=contentString.indexOf('$',i);
            var secondIndexdetail=contentString.indexOf('$',firstIndexdetail+1);
            if (secondIndexdetail==-1 || firstIndexdetail==-1) {
              break;
            }

            var tempString=contentString.slice(firstIndexdetail+1,secondIndexdetail-1);
            articlesDetailArray.push(tempString);
            i=secondIndexdetail;

          }

          for (var x = 0; x < articlesDetailArray.length; x++) {
            var ObjectToSaveInArray = {mainheading:articlesNameArray[0],subheading:articlesHeadingArray[x],subbestheading:articlesHeadingArray[x],data:articlesDetailArray[x].trim()};
            finalArray0.push(ObjectToSaveInArray);
          }

        })



    var finalArray1=[];
    RNFS.readFile(path1)
        .then((contents) => {
          var contentString = contents.toString();
          var chaptersArray=[];
          // For Chapters Titles denoted by & Sign
          for (var i = 0; i < contentString.length; i++) {
            var firstIndex=contentString.indexOf('&',i);
            var secondIndex=contentString.indexOf('&',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }

            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
            chaptersArray.push(tempString);
            i=secondIndex;
          }

          var titlesArray=[];

          // For Main Titles denoted by @ Sign
          for (var i = 0; i < chaptersArray.length; i++) {
            var stringAtIndex = chaptersArray[i];
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);

            for (var x = 0; x < stringAtIndex.length; x++) {

              var firstIndex=stringAtIndex.indexOf('@',x);
              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // Save String and Heading Both in Array
              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
              titlesArray.push(ObjectToSaveInArray);
              x=secondIndex;

            }
          }

          var tempArray=[];
          // For Nuskha Jaat denoted by $ Sign
          for (var i = 0; i < titlesArray.length; i++) {

            var mainHeading = titlesArray[i].heading;
            var stringAtIndex = titlesArray[i].data;
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            for (var x = 0; x < stringAtIndex.length; x++) {
              var firstIndex=stringAtIndex.indexOf('$',x);
              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
              tempArray.push(ObjectToSaveInArray);
              x=secondIndex;

            }
          }

          // Extract Headings from Sub Content From $ Sign.
          // For Nuskha Jaat denoted by $ Sign
          for (var i = 0; i < tempArray.length; i++) {

            var mainHeading = tempArray[i].mainheading;
            var subHeading = tempArray[i].subheading;
            var stringAtIndex = tempArray[i].data;

            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
            finalArray1.push(ObjectToSaveInArray);
          }

        })


        var finalArray2=[];

        RNFS.readFile(path2)
            .then((contents) => {

              var contentString = contents.toString();
              var chaptersArray=[];
              // For Chapters Titles denoted by & Sign
              for (var i = 0; i < contentString.length; i++) {
                var firstIndex=contentString.indexOf('&',i);
                var secondIndex=contentString.indexOf('&',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                chaptersArray.push(tempString);
                i=secondIndex;
              }

              var titlesArray=[];

              // For Main Titles denoted by @ Sign
              for (var i = 0; i < chaptersArray.length; i++) {
                var stringAtIndex = chaptersArray[i];
                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);

                for (var x = 0; x < stringAtIndex.length; x++) {

                  var firstIndex=stringAtIndex.indexOf('@',x);
                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }

                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  // Save String and Heading Both in Array
                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                  titlesArray.push(ObjectToSaveInArray);
                  x=secondIndex;
                }

              }

              var tempArray=[];
              // For Nuskha Jaat denoted by $ Sign
              for (var i = 0; i < titlesArray.length; i++) {
                var mainHeading = titlesArray[i].heading;
                var stringAtIndex = titlesArray[i].data;
                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                for (var x = 0; x < stringAtIndex.length; x++) {
                  var firstIndex=stringAtIndex.indexOf('$',x);
                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }
                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                  tempArray.push(ObjectToSaveInArray);
                  x=secondIndex;
                }
              }
              // Extract Headings from Sub Content From $ Sign.

              // For Nuskha Jaat denoted by $ Sign
              for (var i = 0; i < tempArray.length; i++) {

                var mainHeading = tempArray[i].mainheading;
                var subHeading = tempArray[i].subheading;
                var stringAtIndex = tempArray[i].data;

                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                finalArray2.push(ObjectToSaveInArray);

              }

            })

            var finalArray3=[];

            RNFS.readFile(path3)
                .then((contents) => {
                  var contentString = contents.toString();
                  var chaptersArray=[];
                  // For Chapters Titles denoted by & Sign
                  for (var i = 0; i < contentString.length; i++) {
                    var firstIndex=contentString.indexOf('&',i);
                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                    if (secondIndex==-1 || firstIndex==-1) {
                      break;
                    }

                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                    chaptersArray.push(tempString);
                    i=secondIndex;
                  }

                  var titlesArray=[];

                  // For Main Titles denoted by @ Sign
                  for (var i = 0; i < chaptersArray.length; i++) {
                    var stringAtIndex = chaptersArray[i];
                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);

                    for (var x = 0; x < stringAtIndex.length; x++) {

                      var firstIndex=stringAtIndex.indexOf('@',x);
                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                      // Save String and Heading Both in Array
                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                      titlesArray.push(ObjectToSaveInArray);
                      x=secondIndex;

                    }

                  }


                  var tempArray=[];
                  // For Nuskha Jaat denoted by $ Sign
                  for (var i = 0; i < titlesArray.length; i++) {

                    var mainHeading = titlesArray[i].heading;
                    var stringAtIndex = titlesArray[i].data;

                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);

                    for (var x = 0; x < stringAtIndex.length; x++) {

                      var firstIndex=stringAtIndex.indexOf('$',x);
                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                      tempArray.push(ObjectToSaveInArray);
                      x=secondIndex;

                    }
                  }

                  // Extract Headings from Sub Content From $ Sign.

                  // For Nuskha Jaat denoted by $ Sign
                  for (var i = 0; i < tempArray.length; i++) {

                    var mainHeading = tempArray[i].mainheading;
                    var subHeading = tempArray[i].subheading;
                    var stringAtIndex = tempArray[i].data;

                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);
                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                    finalArray3.push(ObjectToSaveInArray);

                  }
                })



                var finalArray4=[];

                RNFS.readFile(path4)
                    .then((contents) => {
                      var contentString = contents.toString();
                      var chaptersArray=[];
                      // For Chapters Titles denoted by & Sign
                      for (var i = 0; i < contentString.length; i++) {
                        var firstIndex=contentString.indexOf('&',i);
                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                        if (secondIndex==-1 || firstIndex==-1) {
                          break;
                        }

                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                        chaptersArray.push(tempString);
                        i=secondIndex;
                      }

                      var titlesArray=[];

                      // For Main Titles denoted by @ Sign
                      for (var i = 0; i < chaptersArray.length; i++) {
                        var stringAtIndex = chaptersArray[i];
                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);

                        for (var x = 0; x < stringAtIndex.length; x++) {

                          var firstIndex=stringAtIndex.indexOf('@',x);
                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                          // Save String and Heading Both in Array
                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                          titlesArray.push(ObjectToSaveInArray);
                          x=secondIndex;

                        }

                      }

                      var tempArray=[];
                      // For Nuskha Jaat denoted by $ Sign
                      for (var i = 0; i < titlesArray.length; i++) {

                        var mainHeading = titlesArray[i].heading;
                        var stringAtIndex = titlesArray[i].data;

                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);

                        for (var x = 0; x < stringAtIndex.length; x++) {

                          var firstIndex=stringAtIndex.indexOf('$',x);
                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                          tempArray.push(ObjectToSaveInArray);
                          x=secondIndex;

                        }
                      }

                      // Extract Headings from Sub Content From $ Sign.

                      // For Nuskha Jaat denoted by $ Sign
                      for (var i = 0; i < tempArray.length; i++) {

                        var mainHeading = tempArray[i].mainheading;
                        var subHeading = tempArray[i].subheading;
                        var stringAtIndex = tempArray[i].data;

                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);
                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                        finalArray4.push(ObjectToSaveInArray);

                      }
                    })




                    var finalArray5=[];

                    RNFS.readFile(path5)
                        .then((contents) => {
                          var contentString = contents.toString();
                          var chaptersArray=[];
                          // For Chapters Titles denoted by & Sign
                          for (var i = 0; i < contentString.length; i++) {
                            var firstIndex=contentString.indexOf('&',i);
                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                            if (secondIndex==-1 || firstIndex==-1) {
                              break;
                            }

                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                            chaptersArray.push(tempString);
                            i=secondIndex;
                          }

                          var titlesArray=[];

                          // For Main Titles denoted by @ Sign
                          for (var i = 0; i < chaptersArray.length; i++) {
                            var stringAtIndex = chaptersArray[i];
                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);

                            for (var x = 0; x < stringAtIndex.length; x++) {

                              var firstIndex=stringAtIndex.indexOf('@',x);
                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                              // Save String and Heading Both in Array
                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                              titlesArray.push(ObjectToSaveInArray);
                              x=secondIndex;

                            }

                          }

                          var tempArray=[];
                          // For Nuskha Jaat denoted by $ Sign
                          for (var i = 0; i < titlesArray.length; i++) {

                            var mainHeading = titlesArray[i].heading;
                            var stringAtIndex = titlesArray[i].data;

                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);

                            for (var x = 0; x < stringAtIndex.length; x++) {

                              var firstIndex=stringAtIndex.indexOf('$',x);
                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                              tempArray.push(ObjectToSaveInArray);
                              x=secondIndex;

                            }
                          }

                          // Extract Headings from Sub Content From $ Sign.

                          // For Nuskha Jaat denoted by $ Sign
                          for (var i = 0; i < tempArray.length; i++) {

                            var mainHeading = tempArray[i].mainheading;
                            var subHeading = tempArray[i].subheading;
                            var stringAtIndex = tempArray[i].data;

                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);
                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                            finalArray5.push(ObjectToSaveInArray);

                          }
                        })



                        var finalArray6=[];

                        RNFS.readFile(path6)
                            .then((contents) => {
                              var contentString = contents.toString();
                              var chaptersArray=[];
                              // For Chapters Titles denoted by & Sign
                              for (var i = 0; i < contentString.length; i++) {
                                var firstIndex=contentString.indexOf('&',i);
                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                if (secondIndex==-1 || firstIndex==-1) {
                                  break;
                                }

                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                chaptersArray.push(tempString);
                                i=secondIndex;
                              }

                              var titlesArray=[];

                              // For Main Titles denoted by @ Sign
                              for (var i = 0; i < chaptersArray.length; i++) {
                                var stringAtIndex = chaptersArray[i];
                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                for (var x = 0; x < stringAtIndex.length; x++) {

                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                  // Save String and Heading Both in Array
                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                  titlesArray.push(ObjectToSaveInArray);
                                  x=secondIndex;

                                }

                              }

                              var tempArray=[];
                              // For Nuskha Jaat denoted by $ Sign
                              for (var i = 0; i < titlesArray.length; i++) {

                                var mainHeading = titlesArray[i].heading;
                                var stringAtIndex = titlesArray[i].data;

                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                for (var x = 0; x < stringAtIndex.length; x++) {

                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                  tempArray.push(ObjectToSaveInArray);
                                  x=secondIndex;

                                }
                              }

                              // Extract Headings from Sub Content From $ Sign.

                              // For Nuskha Jaat denoted by $ Sign
                              for (var i = 0; i < tempArray.length; i++) {

                                var mainHeading = tempArray[i].mainheading;
                                var subHeading = tempArray[i].subheading;
                                var stringAtIndex = tempArray[i].data;

                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                finalArray6.push(ObjectToSaveInArray);

                              }
                            })



                            var finalArray7=[];

                            RNFS.readFile(path7)
                                .then((contents) => {
                                  var contentString = contents.toString();
                                  var chaptersArray=[];
                                  // For Chapters Titles denoted by & Sign
                                  for (var i = 0; i < contentString.length; i++) {
                                    var firstIndex=contentString.indexOf('&',i);
                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                    if (secondIndex==-1 || firstIndex==-1) {
                                      break;
                                    }

                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                    chaptersArray.push(tempString);
                                    i=secondIndex;
                                  }


                                  var titlesArray=[];

                                  // For Main Titles denoted by @ Sign
                                  for (var i = 0; i < chaptersArray.length; i++) {
                                    var stringAtIndex = chaptersArray[i];
                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                      // Save String and Heading Both in Array
                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                      titlesArray.push(ObjectToSaveInArray);
                                      x=secondIndex;

                                    }

                                  }

                                  var tempArray=[];
                                  // For Nuskha Jaat denoted by $ Sign
                                  for (var i = 0; i < titlesArray.length; i++) {

                                    var mainHeading = titlesArray[i].heading;
                                    var stringAtIndex = titlesArray[i].data;

                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                      tempArray.push(ObjectToSaveInArray);
                                      x=secondIndex;

                                    }
                                  }

                                  // Extract Headings from Sub Content From $ Sign.

                                  // For Nuskha Jaat denoted by $ Sign
                                  for (var i = 0; i < tempArray.length; i++) {

                                    var mainHeading = tempArray[i].mainheading;
                                    var subHeading = tempArray[i].subheading;
                                    var stringAtIndex = tempArray[i].data;

                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                    finalArray7.push(ObjectToSaveInArray);

                                  }
                                })


                                var finalArray8=[];

                                RNFS.readFile(path8)
                                    .then((contents) => {
                                      var contentString = contents.toString();
                                      var chaptersArray=[];
                                      // For Chapters Titles denoted by & Sign
                                      for (var i = 0; i < contentString.length; i++) {
                                        var firstIndex=contentString.indexOf('&',i);
                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                        if (secondIndex==-1 || firstIndex==-1) {
                                          break;
                                        }

                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                        chaptersArray.push(tempString);
                                        i=secondIndex;
                                      }

                                      var titlesArray=[];

                                      // For Main Titles denoted by @ Sign
                                      for (var i = 0; i < chaptersArray.length; i++) {
                                        var stringAtIndex = chaptersArray[i];
                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                          // Save String and Heading Both in Array
                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                          titlesArray.push(ObjectToSaveInArray);
                                          x=secondIndex;

                                        }

                                      }

                                      var tempArray=[];
                                      // For Nuskha Jaat denoted by $ Sign
                                      for (var i = 0; i < titlesArray.length; i++) {

                                        var mainHeading = titlesArray[i].heading;
                                        var stringAtIndex = titlesArray[i].data;

                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                          tempArray.push(ObjectToSaveInArray);
                                          x=secondIndex;

                                        }
                                      }

                                      // Extract Headings from Sub Content From $ Sign.

                                      // For Nuskha Jaat denoted by $ Sign
                                      for (var i = 0; i < tempArray.length; i++) {

                                        var mainHeading = tempArray[i].mainheading;
                                        var subHeading = tempArray[i].subheading;
                                        var stringAtIndex = tempArray[i].data;

                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                        finalArray8.push(ObjectToSaveInArray);

                                      }
                                    })



                                    var finalArray9=[];

                                    RNFS.readFile(path9)
                                        .then((contents) => {
                                          var contentString = contents.toString();
                                          var chaptersArray=[];
                                          // For Chapters Titles denoted by & Sign
                                          for (var i = 0; i < contentString.length; i++) {
                                            var firstIndex=contentString.indexOf('&',i);
                                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                                            if (secondIndex==-1 || firstIndex==-1) {
                                              break;
                                            }

                                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                            chaptersArray.push(tempString);
                                            i=secondIndex;
                                          }

                                          var titlesArray=[];

                                          // For Main Titles denoted by @ Sign
                                          for (var i = 0; i < chaptersArray.length; i++) {
                                            var stringAtIndex = chaptersArray[i];
                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                              var firstIndex=stringAtIndex.indexOf('@',x);
                                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                              // Save String and Heading Both in Array
                                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                              titlesArray.push(ObjectToSaveInArray);
                                              x=secondIndex;

                                            }

                                          }

                                          var tempArray=[];
                                          // For Nuskha Jaat denoted by $ Sign
                                          for (var i = 0; i < titlesArray.length; i++) {

                                            var mainHeading = titlesArray[i].heading;
                                            var stringAtIndex = titlesArray[i].data;

                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                              var firstIndex=stringAtIndex.indexOf('$',x);
                                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                              tempArray.push(ObjectToSaveInArray);
                                              x=secondIndex;

                                            }
                                          }

                                          // Extract Headings from Sub Content From $ Sign.

                                          // For Nuskha Jaat denoted by $ Sign
                                          for (var i = 0; i < tempArray.length; i++) {

                                            var mainHeading = tempArray[i].mainheading;
                                            var subHeading = tempArray[i].subheading;
                                            var stringAtIndex = tempArray[i].data;

                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                            finalArray9.push(ObjectToSaveInArray);

                                          }
                                        })



                                        var finalArray10=[];

                                        RNFS.readFile(path10)
                                            .then((contents) => {
                                              var contentString = contents.toString();
                                              var chaptersArray=[];
                                              // For Chapters Titles denoted by & Sign
                                              for (var i = 0; i < contentString.length; i++) {
                                                var firstIndex=contentString.indexOf('&',i);
                                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                if (secondIndex==-1 || firstIndex==-1) {
                                                  break;
                                                }

                                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                chaptersArray.push(tempString);
                                                i=secondIndex;
                                              }


                                              var titlesArray=[];

                                              // For Main Titles denoted by @ Sign
                                              for (var i = 0; i < chaptersArray.length; i++) {
                                                var stringAtIndex = chaptersArray[i];
                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                  // Save String and Heading Both in Array
                                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                  titlesArray.push(ObjectToSaveInArray);
                                                  x=secondIndex;

                                                }

                                              }


                                              var tempArray=[];
                                              // For Nuskha Jaat denoted by $ Sign
                                              for (var i = 0; i < titlesArray.length; i++) {

                                                var mainHeading = titlesArray[i].heading;
                                                var stringAtIndex = titlesArray[i].data;

                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                  tempArray.push(ObjectToSaveInArray);
                                                  x=secondIndex;

                                                }
                                              }

                                              // Extract Headings from Sub Content From $ Sign.

                                              // For Nuskha Jaat denoted by $ Sign
                                              for (var i = 0; i < tempArray.length; i++) {

                                                var mainHeading = tempArray[i].mainheading;
                                                var subHeading = tempArray[i].subheading;
                                                var stringAtIndex = tempArray[i].data;

                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                finalArray10.push(ObjectToSaveInArray);

                                              }
                                            })

                                            var finalArray11=[];

                                            RNFS.readFile(path11)
                                                .then((contents) => {
                                                  var contentString = contents.toString();
                                                  var chaptersArray=[];
                                                  // For Chapters Titles denoted by & Sign
                                                  for (var i = 0; i < contentString.length; i++) {
                                                    var firstIndex=contentString.indexOf('&',i);
                                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                      break;
                                                    }

                                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                    chaptersArray.push(tempString);
                                                    i=secondIndex;
                                                  }

                                                  var titlesArray=[];

                                                  // For Main Titles denoted by @ Sign
                                                  for (var i = 0; i < chaptersArray.length; i++) {
                                                    var stringAtIndex = chaptersArray[i];
                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                      // Save String and Heading Both in Array
                                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                      titlesArray.push(ObjectToSaveInArray);
                                                      x=secondIndex;

                                                    }

                                                  }

                                                  var tempArray=[];
                                                  // For Nuskha Jaat denoted by $ Sign
                                                  for (var i = 0; i < titlesArray.length; i++) {

                                                    var mainHeading = titlesArray[i].heading;
                                                    var stringAtIndex = titlesArray[i].data;

                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                      tempArray.push(ObjectToSaveInArray);
                                                      x=secondIndex;

                                                    }
                                                  }

                                                  // Extract Headings from Sub Content From $ Sign.

                                                  // For Nuskha Jaat denoted by $ Sign
                                                  for (var i = 0; i < tempArray.length; i++) {

                                                    var mainHeading = tempArray[i].mainheading;
                                                    var subHeading = tempArray[i].subheading;
                                                    var stringAtIndex = tempArray[i].data;

                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                    finalArray11.push(ObjectToSaveInArray);

                                                  }
                                                })




                                                var finalArray12=[];

                                                RNFS.readFile(path12)
                                                    .then((contents) => {
                                                      var contentString = contents.toString();
                                                      var chaptersArray=[];
                                                      // For Chapters Titles denoted by & Sign
                                                      for (var i = 0; i < contentString.length; i++) {
                                                        var firstIndex=contentString.indexOf('&',i);
                                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                          break;
                                                        }

                                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                        chaptersArray.push(tempString);
                                                        i=secondIndex;
                                                      }

                                                      var titlesArray=[];

                                                      // For Main Titles denoted by @ Sign
                                                      for (var i = 0; i < chaptersArray.length; i++) {
                                                        var stringAtIndex = chaptersArray[i];
                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                          // Save String and Heading Both in Array
                                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                          titlesArray.push(ObjectToSaveInArray);
                                                          x=secondIndex;

                                                        }

                                                      }


                                                      var tempArray=[];
                                                      // For Nuskha Jaat denoted by $ Sign
                                                      for (var i = 0; i < titlesArray.length; i++) {

                                                        var mainHeading = titlesArray[i].heading;
                                                        var stringAtIndex = titlesArray[i].data;

                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                          tempArray.push(ObjectToSaveInArray);
                                                          x=secondIndex;

                                                        }
                                                      }

                                                      // Extract Headings from Sub Content From $ Sign.

                                                      // For Nuskha Jaat denoted by $ Sign
                                                      for (var i = 0; i < tempArray.length; i++) {

                                                        var mainHeading = tempArray[i].mainheading;
                                                        var subHeading = tempArray[i].subheading;
                                                        var stringAtIndex = tempArray[i].data;

                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                        finalArray12.push(ObjectToSaveInArray);

                                                      }
                                                    })



                                                    var finalArray13=[];

                                                    RNFS.readFile(path13)
                                                        .then((contents) => {
                                                          var contentString = contents.toString();
                                                          var chaptersArray=[];
                                                          // For Chapters Titles denoted by & Sign
                                                          for (var i = 0; i < contentString.length; i++) {
                                                            var firstIndex=contentString.indexOf('&',i);
                                                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                              break;
                                                            }

                                                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                            chaptersArray.push(tempString);
                                                            i=secondIndex;
                                                          }

                                                          var titlesArray=[];

                                                          // For Main Titles denoted by @ Sign
                                                          for (var i = 0; i < chaptersArray.length; i++) {
                                                            var stringAtIndex = chaptersArray[i];
                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                                              var firstIndex=stringAtIndex.indexOf('@',x);
                                                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                              // Save String and Heading Both in Array
                                                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                              titlesArray.push(ObjectToSaveInArray);
                                                              x=secondIndex;

                                                            }

                                                          }


                                                          var tempArray=[];
                                                          // For Nuskha Jaat denoted by $ Sign
                                                          for (var i = 0; i < titlesArray.length; i++) {

                                                            var mainHeading = titlesArray[i].heading;
                                                            var stringAtIndex = titlesArray[i].data;

                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                                              var firstIndex=stringAtIndex.indexOf('$',x);
                                                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                              tempArray.push(ObjectToSaveInArray);
                                                              x=secondIndex;

                                                            }
                                                          }

                                                          // Extract Headings from Sub Content From $ Sign.

                                                          // For Nuskha Jaat denoted by $ Sign
                                                          for (var i = 0; i < tempArray.length; i++) {

                                                            var mainHeading = tempArray[i].mainheading;
                                                            var subHeading = tempArray[i].subheading;
                                                            var stringAtIndex = tempArray[i].data;

                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                            finalArray13.push(ObjectToSaveInArray);

                                                          }
                                                        })




                                                        var finalArray14=[];

                                                        RNFS.readFile(path14)
                                                            .then((contents) => {
                                                              var contentString = contents.toString();
                                                              var chaptersArray=[];
                                                              // For Chapters Titles denoted by & Sign
                                                              for (var i = 0; i < contentString.length; i++) {
                                                                var firstIndex=contentString.indexOf('&',i);
                                                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                if (secondIndex==-1 || firstIndex==-1) {
                                                                  break;
                                                                }

                                                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                chaptersArray.push(tempString);
                                                                i=secondIndex;
                                                              }

                                                              var titlesArray=[];

                                                              // For Main Titles denoted by @ Sign
                                                              for (var i = 0; i < chaptersArray.length; i++) {
                                                                var stringAtIndex = chaptersArray[i];
                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                  // Save String and Heading Both in Array
                                                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                  titlesArray.push(ObjectToSaveInArray);
                                                                  x=secondIndex;

                                                                }

                                                              }


                                                              var tempArray=[];
                                                              // For Nuskha Jaat denoted by $ Sign
                                                              for (var i = 0; i < titlesArray.length; i++) {

                                                                var mainHeading = titlesArray[i].heading;
                                                                var stringAtIndex = titlesArray[i].data;

                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                  tempArray.push(ObjectToSaveInArray);
                                                                  x=secondIndex;

                                                                }
                                                              }

                                                              // Extract Headings from Sub Content From $ Sign.

                                                              // For Nuskha Jaat denoted by $ Sign
                                                              for (var i = 0; i < tempArray.length; i++) {

                                                                var mainHeading = tempArray[i].mainheading;
                                                                var subHeading = tempArray[i].subheading;
                                                                var stringAtIndex = tempArray[i].data;

                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                finalArray14.push(ObjectToSaveInArray);

                                                              }
                                                            })


                                                            var finalArray15=[];

                                                            RNFS.readFile(path15)
                                                                .then((contents) => {
                                                                  var contentString = contents.toString();
                                                                  var chaptersArray=[];
                                                                  // For Chapters Titles denoted by & Sign
                                                                  for (var i = 0; i < contentString.length; i++) {
                                                                    var firstIndex=contentString.indexOf('&',i);
                                                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                                      break;
                                                                    }

                                                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                    chaptersArray.push(tempString);
                                                                    i=secondIndex;
                                                                  }


                                                                  var titlesArray=[];

                                                                  // For Main Titles denoted by @ Sign
                                                                  for (var i = 0; i < chaptersArray.length; i++) {
                                                                    var stringAtIndex = chaptersArray[i];
                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                      // Save String and Heading Both in Array
                                                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                      titlesArray.push(ObjectToSaveInArray);
                                                                      x=secondIndex;

                                                                    }

                                                                  }

                                                                  var tempArray=[];
                                                                  // For Nuskha Jaat denoted by $ Sign
                                                                  for (var i = 0; i < titlesArray.length; i++) {

                                                                    var mainHeading = titlesArray[i].heading;
                                                                    var stringAtIndex = titlesArray[i].data;

                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                      tempArray.push(ObjectToSaveInArray);
                                                                      x=secondIndex;

                                                                    }
                                                                  }

                                                                  // Extract Headings from Sub Content From $ Sign.

                                                                  // For Nuskha Jaat denoted by $ Sign
                                                                  for (var i = 0; i < tempArray.length; i++) {

                                                                    var mainHeading = tempArray[i].mainheading;
                                                                    var subHeading = tempArray[i].subheading;
                                                                    var stringAtIndex = tempArray[i].data;

                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                    finalArray15.push(ObjectToSaveInArray);

                                                                  }
                                                                })


                                                                var finalArray16=[];

                                                                RNFS.readFile(path16)
                                                                    .then((contents) => {
                                                                      var contentString = contents.toString();
                                                                      var chaptersArray=[];
                                                                      // For Chapters Titles denoted by & Sign
                                                                      for (var i = 0; i < contentString.length; i++) {
                                                                        var firstIndex=contentString.indexOf('&',i);
                                                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                                          break;
                                                                        }

                                                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                        chaptersArray.push(tempString);
                                                                        i=secondIndex;
                                                                      }


                                                                      var titlesArray=[];

                                                                      // For Main Titles denoted by @ Sign
                                                                      for (var i = 0; i < chaptersArray.length; i++) {
                                                                        var stringAtIndex = chaptersArray[i];
                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                          // Save String and Heading Both in Array
                                                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                          titlesArray.push(ObjectToSaveInArray);
                                                                          x=secondIndex;

                                                                        }

                                                                      }

                                                                      var tempArray=[];
                                                                      // For Nuskha Jaat denoted by $ Sign
                                                                      for (var i = 0; i < titlesArray.length; i++) {

                                                                        var mainHeading = titlesArray[i].heading;
                                                                        var stringAtIndex = titlesArray[i].data;

                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                          tempArray.push(ObjectToSaveInArray);
                                                                          x=secondIndex;

                                                                        }
                                                                      }

                                                                      // Extract Headings from Sub Content From $ Sign.

                                                                      // For Nuskha Jaat denoted by $ Sign
                                                                      for (var i = 0; i < tempArray.length; i++) {

                                                                        var mainHeading = tempArray[i].mainheading;
                                                                        var subHeading = tempArray[i].subheading;
                                                                        var stringAtIndex = tempArray[i].data;

                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                        finalArray16.push(ObjectToSaveInArray);

                                                                      }

                                                                      this.setState({showProgress:false});
                                                                      AsyncStorage.setItem('booksData', JSON.stringify(this.state.bookArray));
                                                                      this.horizontalrowselected();
                                                                      this.dumpIntoDB();
                                                                    })

        var mainArray=[];
        // First Array is for Articles and Other is for Books
        var Object0ToSaveInMainArray = {title:'مضامین',data:finalArray0};
        var Object1ToSaveInMainArray = {title:'آرنڈ',data:finalArray1};
        var Object2ToSaveInMainArray = {title:'اندرائین',data:finalArray2};
        var Object3ToSaveInMainArray = {title:'انگور',data:finalArray3};
        var Object4ToSaveInMainArray = {title:'آم',data:finalArray4};
        var Object5ToSaveInMainArray = {title:'خواص آک',data:finalArray5};
        var Object6ToSaveInMainArray = {title:'بادام',data:finalArray6};
        var Object7ToSaveInMainArray = {title:'برگد',data:finalArray7};
        var Object8ToSaveInMainArray = {title:'دھتورہ',data:finalArray8};
        var Object9ToSaveInMainArray = {title:'خواص شہد',data:finalArray9};
        var Object10ToSaveInMainArray = {title:'دھنیہ',data:finalArray10};
        var Object11ToSaveInMainArray = {title:'دودھ',data:finalArray11};
        var Object12ToSaveInMainArray = {title:'گاجر',data:finalArray12};
        var Object13ToSaveInMainArray = {title:'گھی کوار',data:finalArray13};
        var Object14ToSaveInMainArray = {title:'گھی',data:finalArray14};
        var Object15ToSaveInMainArray = {title:'دھی',data:finalArray15};
        var Object16ToSaveInMainArray = {title:'گل سرک',data:finalArray16};

        mainArray.push(Object0ToSaveInMainArray);
        mainArray.push(Object1ToSaveInMainArray);
        mainArray.push(Object2ToSaveInMainArray);
        mainArray.push(Object3ToSaveInMainArray);
        mainArray.push(Object4ToSaveInMainArray);
        mainArray.push(Object5ToSaveInMainArray);
        mainArray.push(Object6ToSaveInMainArray);
        mainArray.push(Object7ToSaveInMainArray);
        mainArray.push(Object8ToSaveInMainArray);
        mainArray.push(Object9ToSaveInMainArray);
        mainArray.push(Object10ToSaveInMainArray);
        mainArray.push(Object11ToSaveInMainArray);
        mainArray.push(Object12ToSaveInMainArray);
        mainArray.push(Object13ToSaveInMainArray);
        mainArray.push(Object14ToSaveInMainArray);
        mainArray.push(Object15ToSaveInMainArray);
        mainArray.push(Object16ToSaveInMainArray);

        Constants.BookArray=mainArray;
        Constants.isBookLoaded=true;

        this.setState({
          bookArray:mainArray
        })

        console.log('final array to dump all bookss into DB is = ',this.state.bookArray);

  }else{

    // isAndroid
    // For Android Path is different

    var  articles='Articles.txt';
    var  arind='ارنڈ.txt';
    var  indrain='اندرائین.txt';
    var  angoor='انگور.txt';
    var  aam='ام.txt';
    var  khawasaak='خواص اک.txt';
    var  badaam='بادام.txt';
    var  bargad='برگد.txt';
    var  dhatoora='دھتورہ.txt';
    var  khawasshehad='خواص شہد.txt';
    var  dhania='دھنیہ.txt';
    var  doodh='دودھ.txt';
    var  gajar='گاجر.txt';
    var  gheekawar='گھی کوار.txt';
    var  ghee='گھی.txt';
    var  dahi='دھی.txt';
    var  gulsarak='گل سرک.txt';

    // Alert.alert('title')
    RNFS.readDirAssets('') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
      // stat the first file
        // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      });


      // For Articles
      var mainArray=[];
      var finalArray0=[];
      RNFS.readFileAssets(articles)
          .then((contents) => {
            var contentString = contents.toString();
            var articlesNameArray=[];
            var articlesHeadingArray=[];
            var articlesDetailArray=[];
            for (var i = 0; i < contentString.length; i++) {
              // Main Heading denoted by & Sign
              var firstIndexname=contentString.indexOf('&',i);
              var secondIndexname=contentString.indexOf('&',firstIndexname+1);
              if (secondIndexname==-1 || firstIndexname==-1) {
                break;
              }

              var tempString=contentString.slice(firstIndexname+1,secondIndexname-1);
              articlesNameArray.push(tempString);
              i=secondIndexname;
              }

              for (var i = 0; i < contentString.length; i++) {
              // ArticleHeading denoted by @ Sign
              var firstIndexheading=contentString.indexOf('@',i);
              var secondIndexheading=contentString.indexOf('@',firstIndexheading+1);
              if (secondIndexheading==-1 || firstIndexheading==-1) {
                break;
              }

              var tempString=contentString.slice(firstIndexheading+1,secondIndexheading-1);
              articlesHeadingArray.push(tempString);
              i=secondIndexheading;
            }

            for (var i = 0; i < contentString.length; i++) {
              // ArticleDetail denoted by $ Sign
              var firstIndexdetail=contentString.indexOf('$',i);
              var secondIndexdetail=contentString.indexOf('$',firstIndexdetail+1);
              if (secondIndexdetail==-1 || firstIndexdetail==-1) {
                break;
              }

              var tempString=contentString.slice(firstIndexdetail+1,secondIndexdetail-1);
              articlesDetailArray.push(tempString);
              i=secondIndexdetail;

            }

            for (var x = 0; x < articlesDetailArray.length; x++) {
              var ObjectToSaveInArray = {key:x,mainheading:articlesNameArray[0],subheading:articlesHeadingArray[x],subbestheading:articlesHeadingArray[x],data:articlesDetailArray[x].trim()};
              finalArray0.push(ObjectToSaveInArray);
            }

          })

    var finalArray1=[];
    RNFS.readFileAssets(arind)
        .then((contents) => {
          console.log('Arind Book is = ',contents);
          var contentString = contents.toString();
          var chaptersArray=[];
          // For Chapters Titles denoted by & Sign
          for (var i = 0; i < contentString.length; i++) {
            var firstIndex=contentString.indexOf('&',i);
            var secondIndex=contentString.indexOf('&',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }

            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
            chaptersArray.push(tempString);
            i=secondIndex;
          }

          var titlesArray=[];

          // For Main Titles denoted by @ Sign
          for (var i = 0; i < chaptersArray.length; i++) {
            var stringAtIndex = chaptersArray[i];
            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            // // // // console.log('Akhzar is testing heading' + testString);

            for (var x = 0; x < stringAtIndex.length; x++) {

              var firstIndex=stringAtIndex.indexOf('@',x);
              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }

              // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // Save String and Heading Both in Array
              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
              titlesArray.push(ObjectToSaveInArray);
              x=secondIndex;

            }

          }

          // // // // console.log('Titles Array is ='+titlesArray);

          var tempArray=[];
          // For Nuskha Jaat denoted by $ Sign
          for (var i = 0; i < titlesArray.length; i++) {

            var mainHeading = titlesArray[i].heading;
            var stringAtIndex = titlesArray[i].data;
            // // // // console.log('Main Heading is == ' + mainHeading);
            // // // // console.log('stringAtIndex is == ' + stringAtIndex);

            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            // // // // console.log('Akhzar is testing heading' + testString);

            for (var x = 0; x < stringAtIndex.length; x++) {

              var firstIndex=stringAtIndex.indexOf('$',x);
              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }

              // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
              // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
              tempArray.push(ObjectToSaveInArray);
              x=secondIndex;

            }
          }
          // // // // console.log('Main Temp Temp Array is ='+tempArray);

          // Extract Headings from Sub Content From $ Sign.

          // For Nuskha Jaat denoted by $ Sign
          for (var i = 0; i < tempArray.length; i++) {

            var mainHeading = tempArray[i].mainheading;
            var subHeading = tempArray[i].subheading;
            var stringAtIndex = tempArray[i].data;

            // // // // console.log('Main Main Heading is == ' + mainHeading);
            // // // // console.log('Sub Sub Heading is == ' + subHeading);
            // // // // console.log('Main Main Data is == ' + stringAtIndex);

            var headingEndIndex = stringAtIndex.indexOf('\r',1);
            var testString=stringAtIndex.slice(0,headingEndIndex);
            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
            finalArray1.push(ObjectToSaveInArray);
          }
        })

        var finalArray2=[];

        RNFS.readFileAssets(indrain)
            .then((contents) => {
              console.log('Indrain Book is = ',contents);
              var contentString = contents.toString();

              var chaptersArray=[];
              // For Chapters Titles denoted by & Sign
              for (var i = 0; i < contentString.length; i++) {
                var firstIndex=contentString.indexOf('&',i);
                var secondIndex=contentString.indexOf('&',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                chaptersArray.push(tempString);
                i=secondIndex;
              }

              // // // // console.log('Chapters Array is ='+chaptersArray);

              var titlesArray=[];

              // For Main Titles denoted by @ Sign
              for (var i = 0; i < chaptersArray.length; i++) {
                var stringAtIndex = chaptersArray[i];
                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                // // // // console.log('Akhzar is testing heading' + testString);

                for (var x = 0; x < stringAtIndex.length; x++) {

                  var firstIndex=stringAtIndex.indexOf('@',x);
                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }

                  // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  // Save String and Heading Both in Array
                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                  titlesArray.push(ObjectToSaveInArray);
                  x=secondIndex;

                }

              }

              // // // // console.log('Titles Array is ='+titlesArray);

              var tempArray=[];
              // For Nuskha Jaat denoted by $ Sign
              for (var i = 0; i < titlesArray.length; i++) {

                var mainHeading = titlesArray[i].heading;
                var stringAtIndex = titlesArray[i].data;
                // // // // console.log('Main Heading is == ' + mainHeading);
                // // // // console.log('stringAtIndex is == ' + stringAtIndex);

                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                // // // // console.log('Akhzar is testing heading' + testString);

                for (var x = 0; x < stringAtIndex.length; x++) {

                  var firstIndex=stringAtIndex.indexOf('$',x);
                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }

                  // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                  // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                  tempArray.push(ObjectToSaveInArray);
                  x=secondIndex;

                }
              }
              // // // // console.log('Main Temp Temp Array is ='+tempArray);

              // Extract Headings from Sub Content From $ Sign.

              // For Nuskha Jaat denoted by $ Sign
              for (var i = 0; i < tempArray.length; i++) {

                var mainHeading = tempArray[i].mainheading;
                var subHeading = tempArray[i].subheading;
                var stringAtIndex = tempArray[i].data;

                // // // // console.log('Main Main Heading is == ' + mainHeading);
                // // // // console.log('Sub Sub Heading is == ' + subHeading);
                // // // // console.log('Main Main Data is == ' + stringAtIndex);

                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                var testString=stringAtIndex.slice(0,headingEndIndex);
                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                finalArray2.push(ObjectToSaveInArray);

              }
            })


            var finalArray3=[];

            RNFS.readFileAssets(angoor)
                .then((contents) => {
                  var contentString = contents.toString();
                  var chaptersArray=[];
                  // For Chapters Titles denoted by & Sign
                  for (var i = 0; i < contentString.length; i++) {
                    var firstIndex=contentString.indexOf('&',i);
                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                    if (secondIndex==-1 || firstIndex==-1) {
                      break;
                    }

                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                    chaptersArray.push(tempString);
                    i=secondIndex;
                  }

                  // // // // console.log('Chapters Array is ='+chaptersArray);

                  var titlesArray=[];

                  // For Main Titles denoted by @ Sign
                  for (var i = 0; i < chaptersArray.length; i++) {
                    var stringAtIndex = chaptersArray[i];
                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);
                    // // // // console.log('Akhzar is testing heading' + testString);

                    for (var x = 0; x < stringAtIndex.length; x++) {

                      var firstIndex=stringAtIndex.indexOf('@',x);
                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                      // Save String and Heading Both in Array
                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                      titlesArray.push(ObjectToSaveInArray);
                      x=secondIndex;

                    }

                  }

                  // // // // console.log('Titles Array is ='+titlesArray);

                  var tempArray=[];
                  // For Nuskha Jaat denoted by $ Sign
                  for (var i = 0; i < titlesArray.length; i++) {

                    var mainHeading = titlesArray[i].heading;
                    var stringAtIndex = titlesArray[i].data;
                    // // // // console.log('Main Heading is == ' + mainHeading);
                    // // // // console.log('stringAtIndex is == ' + stringAtIndex);

                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);
                    // // // // console.log('Akhzar is testing heading' + testString);

                    for (var x = 0; x < stringAtIndex.length; x++) {

                      var firstIndex=stringAtIndex.indexOf('$',x);
                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                      // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                      tempArray.push(ObjectToSaveInArray);
                      x=secondIndex;

                    }
                  }
                  // // // // console.log('Main Temp Temp Array is ='+tempArray);

                  // Extract Headings from Sub Content From $ Sign.

                  // For Nuskha Jaat denoted by $ Sign
                  for (var i = 0; i < tempArray.length; i++) {

                    var mainHeading = tempArray[i].mainheading;
                    var subHeading = tempArray[i].subheading;
                    var stringAtIndex = tempArray[i].data;

                    // // // // console.log('Main Main Heading is == ' + mainHeading);
                    // // // // console.log('Sub Sub Heading is == ' + subHeading);
                    // // // // console.log('Main Main Data is == ' + stringAtIndex);

                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                    var testString=stringAtIndex.slice(0,headingEndIndex);
                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                    finalArray3.push(ObjectToSaveInArray);

                  }
                })


                var finalArray4=[];

                RNFS.readFileAssets(aam)
                    .then((contents) => {
                      console.log('Aam Book is = ',contents);
                      var contentString = contents.toString();
                      var chaptersArray=[];
                      // For Chapters Titles denoted by & Sign
                      for (var i = 0; i < contentString.length; i++) {
                        var firstIndex=contentString.indexOf('&',i);
                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                        if (secondIndex==-1 || firstIndex==-1) {
                          break;
                        }

                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                        chaptersArray.push(tempString);
                        i=secondIndex;
                      }

                      var titlesArray=[];

                      // For Main Titles denoted by @ Sign
                      for (var i = 0; i < chaptersArray.length; i++) {
                        var stringAtIndex = chaptersArray[i];
                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);

                        for (var x = 0; x < stringAtIndex.length; x++) {

                          var firstIndex=stringAtIndex.indexOf('@',x);
                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                          // Save String and Heading Both in Array
                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                          titlesArray.push(ObjectToSaveInArray);
                          x=secondIndex;

                        }

                      }

                      var tempArray=[];
                      // For Nuskha Jaat denoted by $ Sign
                      for (var i = 0; i < titlesArray.length; i++) {

                        var mainHeading = titlesArray[i].heading;
                        var stringAtIndex = titlesArray[i].data;

                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);

                        for (var x = 0; x < stringAtIndex.length; x++) {

                          var firstIndex=stringAtIndex.indexOf('$',x);
                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                          tempArray.push(ObjectToSaveInArray);
                          x=secondIndex;

                        }
                      }

                      // Extract Headings from Sub Content From $ Sign.

                      // For Nuskha Jaat denoted by $ Sign
                      for (var i = 0; i < tempArray.length; i++) {

                        var mainHeading = tempArray[i].mainheading;
                        var subHeading = tempArray[i].subheading;
                        var stringAtIndex = tempArray[i].data;

                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                        var testString=stringAtIndex.slice(0,headingEndIndex);
                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                        finalArray4.push(ObjectToSaveInArray);

                      }
                    })


                    var finalArray5=[];

                    RNFS.readFileAssets(khawasaak)
                        .then((contents) => {
                          console.log('Khawas Aak Book is = ',contents);
                          var contentString = contents.toString();
                          var chaptersArray=[];
                          // For Chapters Titles denoted by & Sign
                          for (var i = 0; i < contentString.length; i++) {
                            var firstIndex=contentString.indexOf('&',i);
                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                            if (secondIndex==-1 || firstIndex==-1) {
                              break;
                            }

                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                            chaptersArray.push(tempString);
                            i=secondIndex;
                          }

                          var titlesArray=[];

                          // For Main Titles denoted by @ Sign
                          for (var i = 0; i < chaptersArray.length; i++) {
                            var stringAtIndex = chaptersArray[i];
                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);

                            for (var x = 0; x < stringAtIndex.length; x++) {

                              var firstIndex=stringAtIndex.indexOf('@',x);
                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                              // Save String and Heading Both in Array
                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                              titlesArray.push(ObjectToSaveInArray);
                              x=secondIndex;

                            }

                          }

                          var tempArray=[];
                          // For Nuskha Jaat denoted by $ Sign
                          for (var i = 0; i < titlesArray.length; i++) {

                            var mainHeading = titlesArray[i].heading;
                            var stringAtIndex = titlesArray[i].data;

                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);

                            for (var x = 0; x < stringAtIndex.length; x++) {

                              var firstIndex=stringAtIndex.indexOf('$',x);
                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                              tempArray.push(ObjectToSaveInArray);
                              x=secondIndex;

                            }
                          }

                          // Extract Headings from Sub Content From $ Sign.

                          // For Nuskha Jaat denoted by $ Sign
                          for (var i = 0; i < tempArray.length; i++) {

                            var mainHeading = tempArray[i].mainheading;
                            var subHeading = tempArray[i].subheading;
                            var stringAtIndex = tempArray[i].data;

                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                            var testString=stringAtIndex.slice(0,headingEndIndex);
                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                            finalArray5.push(ObjectToSaveInArray);

                          }
                        })



                        var finalArray6=[];


                        RNFS.readFileAssets(badaam)
                            .then((contents) => {
                              console.log('Aik aur Book is = ',contents);
                              var contentString = contents.toString();
                              var chaptersArray=[];
                              // For Chapters Titles denoted by & Sign
                              for (var i = 0; i < contentString.length; i++) {
                                var firstIndex=contentString.indexOf('&',i);
                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                if (secondIndex==-1 || firstIndex==-1) {
                                  break;
                                }

                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                chaptersArray.push(tempString);
                                i=secondIndex;
                              }

                              var titlesArray=[];

                              // For Main Titles denoted by @ Sign
                              for (var i = 0; i < chaptersArray.length; i++) {
                                var stringAtIndex = chaptersArray[i];
                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                for (var x = 0; x < stringAtIndex.length; x++) {

                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                  // Save String and Heading Both in Array
                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                  titlesArray.push(ObjectToSaveInArray);
                                  x=secondIndex;

                                }

                              }

                              var tempArray=[];
                              // For Nuskha Jaat denoted by $ Sign
                              for (var i = 0; i < titlesArray.length; i++) {

                                var mainHeading = titlesArray[i].heading;
                                var stringAtIndex = titlesArray[i].data;

                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                for (var x = 0; x < stringAtIndex.length; x++) {

                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                  tempArray.push(ObjectToSaveInArray);
                                  x=secondIndex;

                                }
                              }

                              // Extract Headings from Sub Content From $ Sign.

                              // For Nuskha Jaat denoted by $ Sign
                              for (var i = 0; i < tempArray.length; i++) {

                                var mainHeading = tempArray[i].mainheading;
                                var subHeading = tempArray[i].subheading;
                                var stringAtIndex = tempArray[i].data;

                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                finalArray6.push(ObjectToSaveInArray);

                              }
                            })



                            var finalArray7=[];


                            RNFS.readFileAssets(bargad)
                                .then((contents) => {
                                  var contentString = contents.toString();
                                  var chaptersArray=[];
                                  // For Chapters Titles denoted by & Sign
                                  for (var i = 0; i < contentString.length; i++) {
                                    var firstIndex=contentString.indexOf('&',i);
                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                    if (secondIndex==-1 || firstIndex==-1) {
                                      break;
                                    }

                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                    chaptersArray.push(tempString);
                                    i=secondIndex;
                                  }

                                  var titlesArray=[];

                                  // For Main Titles denoted by @ Sign
                                  for (var i = 0; i < chaptersArray.length; i++) {
                                    var stringAtIndex = chaptersArray[i];
                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                      // Save String and Heading Both in Array
                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                      titlesArray.push(ObjectToSaveInArray);
                                      x=secondIndex;

                                    }

                                  }

                                  var tempArray=[];
                                  // For Nuskha Jaat denoted by $ Sign
                                  for (var i = 0; i < titlesArray.length; i++) {

                                    var mainHeading = titlesArray[i].heading;
                                    var stringAtIndex = titlesArray[i].data;

                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                      tempArray.push(ObjectToSaveInArray);
                                      x=secondIndex;

                                    }
                                  }

                                  // Extract Headings from Sub Content From $ Sign.

                                  // For Nuskha Jaat denoted by $ Sign
                                  for (var i = 0; i < tempArray.length; i++) {

                                    var mainHeading = tempArray[i].mainheading;
                                    var subHeading = tempArray[i].subheading;
                                    var stringAtIndex = tempArray[i].data;

                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                    finalArray7.push(ObjectToSaveInArray);

                                  }
                                })

                                var finalArray8=[];


                                RNFS.readFileAssets(dhatoora)
                                    .then((contents) => {
                                      var contentString = contents.toString();
                                      var chaptersArray=[];
                                      // For Chapters Titles denoted by & Sign
                                      for (var i = 0; i < contentString.length; i++) {
                                        var firstIndex=contentString.indexOf('&',i);
                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                        if (secondIndex==-1 || firstIndex==-1) {
                                          break;
                                        }

                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                        chaptersArray.push(tempString);
                                        i=secondIndex;
                                      }

                                      var titlesArray=[];

                                      // For Main Titles denoted by @ Sign
                                      for (var i = 0; i < chaptersArray.length; i++) {
                                        var stringAtIndex = chaptersArray[i];
                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                          // Save String and Heading Both in Array
                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                          titlesArray.push(ObjectToSaveInArray);
                                          x=secondIndex;

                                        }

                                      }

                                      var tempArray=[];
                                      // For Nuskha Jaat denoted by $ Sign
                                      for (var i = 0; i < titlesArray.length; i++) {

                                        var mainHeading = titlesArray[i].heading;
                                        var stringAtIndex = titlesArray[i].data;
                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);

                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                          tempArray.push(ObjectToSaveInArray);
                                          x=secondIndex;

                                        }
                                      }

                                      // Extract Headings from Sub Content From $ Sign.

                                      // For Nuskha Jaat denoted by $ Sign
                                      for (var i = 0; i < tempArray.length; i++) {

                                        var mainHeading = tempArray[i].mainheading;
                                        var subHeading = tempArray[i].subheading;
                                        var stringAtIndex = tempArray[i].data;

                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                        finalArray8.push(ObjectToSaveInArray);

                                      }
                                    })



                                    var finalArray9=[];

                                    RNFS.readFileAssets(khawasshehad)
                                        .then((contents) => {
                                          var contentString = contents.toString();
                                          var chaptersArray=[];
                                          // For Chapters Titles denoted by & Sign
                                          for (var i = 0; i < contentString.length; i++) {
                                            var firstIndex=contentString.indexOf('&',i);
                                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                                            if (secondIndex==-1 || firstIndex==-1) {
                                              break;
                                            }

                                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                            chaptersArray.push(tempString);
                                            i=secondIndex;
                                          }

                                          var titlesArray=[];

                                          // For Main Titles denoted by @ Sign
                                          for (var i = 0; i < chaptersArray.length; i++) {
                                            var stringAtIndex = chaptersArray[i];
                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                              var firstIndex=stringAtIndex.indexOf('@',x);
                                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                              // Save String and Heading Both in Array
                                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                              titlesArray.push(ObjectToSaveInArray);
                                              x=secondIndex;

                                            }

                                          }

                                          var tempArray=[];
                                          // For Nuskha Jaat denoted by $ Sign
                                          for (var i = 0; i < titlesArray.length; i++) {

                                            var mainHeading = titlesArray[i].heading;
                                            var stringAtIndex = titlesArray[i].data;

                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);

                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                              var firstIndex=stringAtIndex.indexOf('$',x);
                                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                              tempArray.push(ObjectToSaveInArray);
                                              x=secondIndex;

                                            }
                                          }

                                          // Extract Headings from Sub Content From $ Sign.

                                          // For Nuskha Jaat denoted by $ Sign
                                          for (var i = 0; i < tempArray.length; i++) {

                                            var mainHeading = tempArray[i].mainheading;
                                            var subHeading = tempArray[i].subheading;
                                            var stringAtIndex = tempArray[i].data;

                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                            finalArray9.push(ObjectToSaveInArray);

                                          }
                                        })



                                        var finalArray10=[];



                                        RNFS.readFileAssets(dhania)
                                            .then((contents) => {
                                              var contentString = contents.toString();
                                              var chaptersArray=[];
                                              // For Chapters Titles denoted by & Sign
                                              for (var i = 0; i < contentString.length; i++) {
                                                var firstIndex=contentString.indexOf('&',i);
                                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                if (secondIndex==-1 || firstIndex==-1) {
                                                  break;
                                                }

                                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                chaptersArray.push(tempString);
                                                i=secondIndex;
                                              }


                                              var titlesArray=[];

                                              // For Main Titles denoted by @ Sign
                                              for (var i = 0; i < chaptersArray.length; i++) {
                                                var stringAtIndex = chaptersArray[i];
                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                  // Save String and Heading Both in Array
                                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                  titlesArray.push(ObjectToSaveInArray);
                                                  x=secondIndex;

                                                }

                                              }

                                              // // // // console.log('Titles Array is ='+titlesArray);

                                              var tempArray=[];
                                              // For Nuskha Jaat denoted by $ Sign
                                              for (var i = 0; i < titlesArray.length; i++) {

                                                var mainHeading = titlesArray[i].heading;
                                                var stringAtIndex = titlesArray[i].data;

                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);

                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                  tempArray.push(ObjectToSaveInArray);
                                                  x=secondIndex;

                                                }
                                              }

                                              // Extract Headings from Sub Content From $ Sign.

                                              // For Nuskha Jaat denoted by $ Sign
                                              for (var i = 0; i < tempArray.length; i++) {

                                                var mainHeading = tempArray[i].mainheading;
                                                var subHeading = tempArray[i].subheading;
                                                var stringAtIndex = tempArray[i].data;

                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                finalArray10.push(ObjectToSaveInArray);

                                              }
                                            })

                                            var finalArray11=[];


                                            RNFS.readFileAssets(doodh)
                                                .then((contents) => {
                                                  var contentString = contents.toString();
                                                  var chaptersArray=[];
                                                  // For Chapters Titles denoted by & Sign
                                                  for (var i = 0; i < contentString.length; i++) {
                                                    var firstIndex=contentString.indexOf('&',i);
                                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                      break;
                                                    }

                                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                    chaptersArray.push(tempString);
                                                    i=secondIndex;
                                                  }


                                                  var titlesArray=[];

                                                  // For Main Titles denoted by @ Sign
                                                  for (var i = 0; i < chaptersArray.length; i++) {
                                                    var stringAtIndex = chaptersArray[i];
                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                      // Save String and Heading Both in Array
                                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                      titlesArray.push(ObjectToSaveInArray);
                                                      x=secondIndex;

                                                    }

                                                  }


                                                  var tempArray=[];
                                                  // For Nuskha Jaat denoted by $ Sign
                                                  for (var i = 0; i < titlesArray.length; i++) {

                                                    var mainHeading = titlesArray[i].heading;
                                                    var stringAtIndex = titlesArray[i].data;

                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);

                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);

                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                      tempArray.push(ObjectToSaveInArray);
                                                      x=secondIndex;

                                                    }
                                                  }

                                                  // Extract Headings from Sub Content From $ Sign.

                                                  // For Nuskha Jaat denoted by $ Sign
                                                  for (var i = 0; i < tempArray.length; i++) {

                                                    var mainHeading = tempArray[i].mainheading;
                                                    var subHeading = tempArray[i].subheading;
                                                    var stringAtIndex = tempArray[i].data;

                                                    // // // // console.log('Main Main Heading is == ' + mainHeading);
                                                    // // // // console.log('Sub Sub Heading is == ' + subHeading);
                                                    // // // // console.log('Main Main Data is == ' + stringAtIndex);

                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                    finalArray11.push(ObjectToSaveInArray);

                                                  }
                                                })




                                                var finalArray12=[];


                                                RNFS.readFileAssets(gajar)
                                                    .then((contents) => {
                                                      var contentString = contents.toString();
                                                      // // // // console.log('Content Of Complete Book' + contentString);
                                                      var chaptersArray=[];
                                                      // For Chapters Titles denoted by & Sign
                                                      for (var i = 0; i < contentString.length; i++) {
                                                        var firstIndex=contentString.indexOf('&',i);
                                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                          break;
                                                        }

                                                        // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                        chaptersArray.push(tempString);
                                                        i=secondIndex;
                                                      }

                                                      // // // // console.log('Chapters Array is ='+chaptersArray);

                                                      var titlesArray=[];

                                                      // For Main Titles denoted by @ Sign
                                                      for (var i = 0; i < chaptersArray.length; i++) {
                                                        var stringAtIndex = chaptersArray[i];
                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                        // // // // console.log('Akhzar is testing heading' + testString);

                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                          // Save String and Heading Both in Array
                                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                          titlesArray.push(ObjectToSaveInArray);
                                                          x=secondIndex;

                                                        }

                                                      }

                                                      // // // // console.log('Titles Array is ='+titlesArray);

                                                      var tempArray=[];
                                                      // For Nuskha Jaat denoted by $ Sign
                                                      for (var i = 0; i < titlesArray.length; i++) {

                                                        var mainHeading = titlesArray[i].heading;
                                                        var stringAtIndex = titlesArray[i].data;
                                                        // // // // console.log('Main Heading is == ' + mainHeading);
                                                        // // // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                        // // // // console.log('Akhzar is testing heading' + testString);

                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                          // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                          tempArray.push(ObjectToSaveInArray);
                                                          x=secondIndex;

                                                        }
                                                      }
                                                      // // // // console.log('Main Temp Temp Array is ='+tempArray);

                                                      // Extract Headings from Sub Content From $ Sign.

                                                      // For Nuskha Jaat denoted by $ Sign
                                                      for (var i = 0; i < tempArray.length; i++) {

                                                        var mainHeading = tempArray[i].mainheading;
                                                        var subHeading = tempArray[i].subheading;
                                                        var stringAtIndex = tempArray[i].data;

                                                        // // // // console.log('Main Main Heading is == ' + mainHeading);
                                                        // // // // console.log('Sub Sub Heading is == ' + subHeading);
                                                        // // // // console.log('Main Main Data is == ' + stringAtIndex);

                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                        finalArray12.push(ObjectToSaveInArray);

                                                      }
                                                    })



                                                    var finalArray13=[];

                                                    RNFS.readFileAssets(gheekawar)
                                                        .then((contents) => {
                                                          var contentString = contents.toString();
                                                          // // // // console.log('Content Of Complete Book' + contentString);
                                                          var chaptersArray=[];
                                                          // For Chapters Titles denoted by & Sign
                                                          for (var i = 0; i < contentString.length; i++) {
                                                            var firstIndex=contentString.indexOf('&',i);
                                                            var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                              break;
                                                            }

                                                            // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                            var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                            chaptersArray.push(tempString);
                                                            i=secondIndex;
                                                          }

                                                          // // // // console.log('Chapters Array is ='+chaptersArray);

                                                          var titlesArray=[];

                                                          // For Main Titles denoted by @ Sign
                                                          for (var i = 0; i < chaptersArray.length; i++) {
                                                            var stringAtIndex = chaptersArray[i];
                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                                            // // // // console.log('Akhzar is testing heading' + testString);

                                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                                              var firstIndex=stringAtIndex.indexOf('@',x);
                                                              var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                              // Save String and Heading Both in Array
                                                              var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                              titlesArray.push(ObjectToSaveInArray);
                                                              x=secondIndex;

                                                            }

                                                          }

                                                          // // // // console.log('Titles Array is ='+titlesArray);

                                                          var tempArray=[];
                                                          // For Nuskha Jaat denoted by $ Sign
                                                          for (var i = 0; i < titlesArray.length; i++) {

                                                            var mainHeading = titlesArray[i].heading;
                                                            var stringAtIndex = titlesArray[i].data;
                                                            // // // // console.log('Main Heading is == ' + mainHeading);
                                                            // // // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                                            // // // // console.log('Akhzar is testing heading' + testString);

                                                            for (var x = 0; x < stringAtIndex.length; x++) {

                                                              var firstIndex=stringAtIndex.indexOf('$',x);
                                                              var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                              var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                              // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                              tempArray.push(ObjectToSaveInArray);
                                                              x=secondIndex;

                                                            }
                                                          }
                                                          // // // // console.log('Main Temp Temp Array is ='+tempArray);

                                                          // Extract Headings from Sub Content From $ Sign.

                                                          // For Nuskha Jaat denoted by $ Sign
                                                          for (var i = 0; i < tempArray.length; i++) {

                                                            var mainHeading = tempArray[i].mainheading;
                                                            var subHeading = tempArray[i].subheading;
                                                            var stringAtIndex = tempArray[i].data;

                                                            // // // // console.log('Main Main Heading is == ' + mainHeading);
                                                            // // // // console.log('Sub Sub Heading is == ' + subHeading);
                                                            // // // // console.log('Main Main Data is == ' + stringAtIndex);

                                                            var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                            var testString=stringAtIndex.slice(0,headingEndIndex);
                                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                            finalArray13.push(ObjectToSaveInArray);

                                                          }
                                                        })




                                                        var finalArray14=[];

                                                        RNFS.readFileAssets(ghee)
                                                            .then((contents) => {
                                                              var contentString = contents.toString();
                                                              // // // // console.log('Content Of Complete Book' + contentString);
                                                              var chaptersArray=[];
                                                              // For Chapters Titles denoted by & Sign
                                                              for (var i = 0; i < contentString.length; i++) {
                                                                var firstIndex=contentString.indexOf('&',i);
                                                                var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                if (secondIndex==-1 || firstIndex==-1) {
                                                                  break;
                                                                }

                                                                // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                chaptersArray.push(tempString);
                                                                i=secondIndex;
                                                              }

                                                              // // // // console.log('Chapters Array is ='+chaptersArray);

                                                              var titlesArray=[];

                                                              // For Main Titles denoted by @ Sign
                                                              for (var i = 0; i < chaptersArray.length; i++) {
                                                                var stringAtIndex = chaptersArray[i];
                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                // // // // console.log('Akhzar is testing heading' + testString);

                                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                                  var firstIndex=stringAtIndex.indexOf('@',x);
                                                                  var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                  // Save String and Heading Both in Array
                                                                  var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                  titlesArray.push(ObjectToSaveInArray);
                                                                  x=secondIndex;

                                                                }

                                                              }

                                                              // // // // console.log('Titles Array is ='+titlesArray);

                                                              var tempArray=[];
                                                              // For Nuskha Jaat denoted by $ Sign
                                                              for (var i = 0; i < titlesArray.length; i++) {

                                                                var mainHeading = titlesArray[i].heading;
                                                                var stringAtIndex = titlesArray[i].data;
                                                                // // // // console.log('Main Heading is == ' + mainHeading);
                                                                // // // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                // // // // console.log('Akhzar is testing heading' + testString);

                                                                for (var x = 0; x < stringAtIndex.length; x++) {

                                                                  var firstIndex=stringAtIndex.indexOf('$',x);
                                                                  var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                  var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                  // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                  tempArray.push(ObjectToSaveInArray);
                                                                  x=secondIndex;

                                                                }
                                                              }
                                                              // // // // console.log('Main Temp Temp Array is ='+tempArray);

                                                              // Extract Headings from Sub Content From $ Sign.

                                                              // For Nuskha Jaat denoted by $ Sign
                                                              for (var i = 0; i < tempArray.length; i++) {

                                                                var mainHeading = tempArray[i].mainheading;
                                                                var subHeading = tempArray[i].subheading;
                                                                var stringAtIndex = tempArray[i].data;

                                                                // // // // console.log('Main Main Heading is == ' + mainHeading);
                                                                // // // // console.log('Sub Sub Heading is == ' + subHeading);
                                                                // // // // console.log('Main Main Data is == ' + stringAtIndex);

                                                                var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                finalArray14.push(ObjectToSaveInArray);

                                                              }
                                                            })





                                                            var finalArray15=[];

                                                            RNFS.readFileAssets(dahi)
                                                                .then((contents) => {
                                                                  var contentString = contents.toString();
                                                                  // // // // console.log('Content Of Complete Book' + contentString);
                                                                  var chaptersArray=[];
                                                                  // For Chapters Titles denoted by & Sign
                                                                  for (var i = 0; i < contentString.length; i++) {
                                                                    var firstIndex=contentString.indexOf('&',i);
                                                                    var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                                      break;
                                                                    }

                                                                    // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                    var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                    chaptersArray.push(tempString);
                                                                    i=secondIndex;
                                                                  }

                                                                  // // // // console.log('Chapters Array is ='+chaptersArray);

                                                                  var titlesArray=[];

                                                                  // For Main Titles denoted by @ Sign
                                                                  for (var i = 0; i < chaptersArray.length; i++) {
                                                                    var stringAtIndex = chaptersArray[i];
                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                    // // // // console.log('Akhzar is testing heading' + testString);

                                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                                      var firstIndex=stringAtIndex.indexOf('@',x);
                                                                      var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                      // Save String and Heading Both in Array
                                                                      var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                      titlesArray.push(ObjectToSaveInArray);
                                                                      x=secondIndex;

                                                                    }

                                                                  }

                                                                  // // // // console.log('Titles Array is ='+titlesArray);

                                                                  var tempArray=[];
                                                                  // For Nuskha Jaat denoted by $ Sign
                                                                  for (var i = 0; i < titlesArray.length; i++) {

                                                                    var mainHeading = titlesArray[i].heading;
                                                                    var stringAtIndex = titlesArray[i].data;
                                                                    // // // // console.log('Main Heading is == ' + mainHeading);
                                                                    // // // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                    // // // // console.log('Akhzar is testing heading' + testString);

                                                                    for (var x = 0; x < stringAtIndex.length; x++) {

                                                                      var firstIndex=stringAtIndex.indexOf('$',x);
                                                                      var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                      var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                      // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                      tempArray.push(ObjectToSaveInArray);
                                                                      x=secondIndex;

                                                                    }
                                                                  }
                                                                  // // // // console.log('Main Temp Temp Array is ='+tempArray);

                                                                  // Extract Headings from Sub Content From $ Sign.

                                                                  // For Nuskha Jaat denoted by $ Sign
                                                                  for (var i = 0; i < tempArray.length; i++) {

                                                                    var mainHeading = tempArray[i].mainheading;
                                                                    var subHeading = tempArray[i].subheading;
                                                                    var stringAtIndex = tempArray[i].data;

                                                                    // // // // console.log('Main Main Heading is == ' + mainHeading);
                                                                    // // // // console.log('Sub Sub Heading is == ' + subHeading);
                                                                    // // // // console.log('Main Main Data is == ' + stringAtIndex);

                                                                    var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                    var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                    finalArray15.push(ObjectToSaveInArray);

                                                                  }
                                                                })





                                                                var finalArray16=[];



                                                                RNFS.readFileAssets(gulsarak)
                                                                    .then((contents) => {
                                                                      var contentString = contents.toString();
                                                                      // // // // console.log('Content Of Complete Book' + contentString);
                                                                      var chaptersArray=[];
                                                                      // For Chapters Titles denoted by & Sign
                                                                      for (var i = 0; i < contentString.length; i++) {
                                                                        var firstIndex=contentString.indexOf('&',i);
                                                                        var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                                          break;
                                                                        }

                                                                        // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                        var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                        chaptersArray.push(tempString);
                                                                        i=secondIndex;
                                                                      }

                                                                      // // // // console.log('Chapters Array is ='+chaptersArray);

                                                                      var titlesArray=[];

                                                                      // For Main Titles denoted by @ Sign
                                                                      for (var i = 0; i < chaptersArray.length; i++) {
                                                                        var stringAtIndex = chaptersArray[i];
                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                        // // // // console.log('Akhzar is testing heading' + testString);

                                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                                          var firstIndex=stringAtIndex.indexOf('@',x);
                                                                          var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                          // Save String and Heading Both in Array
                                                                          var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                          titlesArray.push(ObjectToSaveInArray);
                                                                          x=secondIndex;

                                                                        }

                                                                      }

                                                                      // // // // console.log('Titles Array is ='+titlesArray);

                                                                      var tempArray=[];
                                                                      // For Nuskha Jaat denoted by $ Sign
                                                                      for (var i = 0; i < titlesArray.length; i++) {

                                                                        var mainHeading = titlesArray[i].heading;
                                                                        var stringAtIndex = titlesArray[i].data;
                                                                        // // // // console.log('Main Heading is == ' + mainHeading);
                                                                        // // // // console.log('stringAtIndex is == ' + stringAtIndex);

                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                        // // // // console.log('Akhzar is testing heading' + testString);

                                                                        for (var x = 0; x < stringAtIndex.length; x++) {

                                                                          var firstIndex=stringAtIndex.indexOf('$',x);
                                                                          var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                                            break;
                                                                          }

                                                                          // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                          var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                          // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                          tempArray.push(ObjectToSaveInArray);
                                                                          x=secondIndex;

                                                                        }
                                                                      }
                                                                      // // // // console.log('Main Temp Temp Array is ='+tempArray);

                                                                      // Extract Headings from Sub Content From $ Sign.

                                                                      // For Nuskha Jaat denoted by $ Sign
                                                                      for (var i = 0; i < tempArray.length; i++) {

                                                                        var mainHeading = tempArray[i].mainheading;
                                                                        var subHeading = tempArray[i].subheading;
                                                                        var stringAtIndex = tempArray[i].data;

                                                                        // // // // console.log('Main Main Heading is == ' + mainHeading);
                                                                        // // // // console.log('Sub Sub Heading is == ' + subHeading);
                                                                        // // // // console.log('Main Main Data is == ' + stringAtIndex);

                                                                        var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                        var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                        finalArray16.push(ObjectToSaveInArray);

                                                                      }

                                                                      this.setState({showProgress:false});
                                                                      AsyncStorage.setItem('booksData', JSON.stringify(this.state.bookArray));
                                                                      this.horizontalrowselected();
                                                                      this.dumpIntoDB();

                                                                    })



        var mainArray=[];

        // First Array is for Articles and Other is for Books
        var Object0ToSaveInMainArray = {title:'مضامین',data:finalArray0};
        var Object1ToSaveInMainArray = {title:'آرنڈ',data:finalArray1};
        var Object2ToSaveInMainArray = {title:'اندرائین',data:finalArray2};
        var Object3ToSaveInMainArray = {title:'انگور',data:finalArray3};
        var Object4ToSaveInMainArray = {title:'آم',data:finalArray4};
        var Object5ToSaveInMainArray = {title:'خواص آک',data:finalArray5};
        var Object6ToSaveInMainArray = {title:'بادام',data:finalArray6};
        var Object7ToSaveInMainArray = {title:'برگد',data:finalArray7};
        var Object8ToSaveInMainArray = {title:'دھتورہ',data:finalArray8};
        var Object9ToSaveInMainArray = {title:'خواص شہد',data:finalArray9};
        var Object10ToSaveInMainArray = {title:'دھنیہ',data:finalArray10};
        var Object11ToSaveInMainArray = {title:'دودھ',data:finalArray11};
        var Object12ToSaveInMainArray = {title:'گاجر',data:finalArray12};
        var Object13ToSaveInMainArray = {title:'گھی کوار',data:finalArray13};
        var Object14ToSaveInMainArray = {title:'گھی',data:finalArray14};
        var Object15ToSaveInMainArray = {title:'دھی',data:finalArray15};
        var Object16ToSaveInMainArray = {title:'گل سرک',data:finalArray16};

        mainArray.push(Object0ToSaveInMainArray);
        mainArray.push(Object1ToSaveInMainArray);
        mainArray.push(Object2ToSaveInMainArray);
        mainArray.push(Object3ToSaveInMainArray);
        mainArray.push(Object4ToSaveInMainArray);
        mainArray.push(Object5ToSaveInMainArray);
        mainArray.push(Object6ToSaveInMainArray);
        mainArray.push(Object7ToSaveInMainArray);
        mainArray.push(Object8ToSaveInMainArray);
        mainArray.push(Object9ToSaveInMainArray);
        mainArray.push(Object10ToSaveInMainArray);
        mainArray.push(Object11ToSaveInMainArray);
        mainArray.push(Object12ToSaveInMainArray);
        mainArray.push(Object13ToSaveInMainArray);
        mainArray.push(Object14ToSaveInMainArray);
        mainArray.push(Object15ToSaveInMainArray);
        mainArray.push(Object16ToSaveInMainArray);

        Constants.BookArray=mainArray;
        Constants.isBookLoaded=true;
        this.setState({
          bookArray:mainArray
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


actionButtonSearch(){

// this.searchExactWord();
var stringToSearch=this.state.txtSearch.trim();
// // // // // console.log('String to Search' + stringToSearch);
  stringToSearch=stringToSearch.toLowerCase();
if (stringToSearch.length <=0) {
  Alert.alert('Stop!','Search complete word');
  return;
}

var finalArray=[];

this.setState({showProgress:true})
for (var x = 0; x < this.state.bookArray.length; x++) {
var bookArray=this.state.bookArray[x].data;
var searchedArray=[];
var counter = 0;
var flag = 0;

// Testing Akhzar Nazir
for (var i = 0; i < bookArray.length; i++) {
  var mainHeading=bookArray[i].mainheading;
  var subHeading=bookArray[i].subheading;
  var subbestheading=bookArray[i].subbestheading;
  var tempString=bookArray[i].data;
  var tempPara=tempString.toLowerCase();

  var index = -1;

 if (!this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {

    index=mainHeading.indexOf(stringToSearch);
    if (index==-1) {
      index=subHeading.indexOf(stringToSearch);
    }
    if (index==-1) {
      index=subbestheading.indexOf(stringToSearch);
    }
    if (index==-1) {
      index=tempPara.indexOf(stringToSearch);
    }

  }

  else if (this.state.isBook1Selected && this.state.isBook2Selected && this.state.isBook3Selected && this.state.isBook4Selected)
  {

    index=mainHeading.indexOf(stringToSearch);
    if (index==-1) {
      index=subHeading.indexOf(stringToSearch);
    }
    if (index==-1) {
      index=subbestheading.indexOf(stringToSearch);
    }
    if (index==-1) {
      index=tempPara.indexOf(stringToSearch);
    }

  }

  else if (this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);

  }

  else  if (this.state.isBook2Selected && !this.state.isBook1Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {
    index=tempPara.indexOf(stringToSearch);

  }

  else  if (this.state.isBook3Selected && !this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook4Selected)
  {
    index=subHeading.indexOf(stringToSearch);

  }

  else  if (this.state.isBook4Selected && !this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook3Selected)
  {
    index=subbestheading.indexOf(stringToSearch);

  }

  else  if (this.state.isBook1Selected && this.state.isBook2Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=tempPara.indexOf(stringToSearch);
  }

  else  if (this.state.isBook1Selected && this.state.isBook3Selected && !this.state.isBook2Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=subHeading.indexOf(stringToSearch);
  }

  else  if (this.state.isBook1Selected && this.state.isBook4Selected && !this.state.isBook2Selected && !this.state.isBook3Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=subbestheading.indexOf(stringToSearch);
  }



  else  if (this.state.isBook2Selected && this.state.isBook1Selected && !this.state.isBook3Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=tempPara.indexOf(stringToSearch);
  }

  else  if (this.state.isBook2Selected && this.state.isBook3Selected && !this.state.isBook1Selected && !this.state.isBook4Selected)
  {
    index=tempPara.indexOf(stringToSearch);
    index=subHeading.indexOf(stringToSearch);
  }

  else  if (this.state.isBook2Selected && this.state.isBook4Selected && !this.state.isBook1Selected && !this.state.isBook3Selected)
  {
    index=tempPara.indexOf(stringToSearch);
    index=subbestheading.indexOf(stringToSearch);
  }



////// ///// /////

  else  if (this.state.isBook3Selected && this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook4Selected)
  {
    index=mainHeading.indexOf(stringToSearch);
    index=subHeading.indexOf(stringToSearch);
  }

  else  if (this.state.isBook3Selected && this.state.isBook2Selected && !this.state.isBook1Selected && !this.state.isBook4Selected)
  {
    index=tempPara.indexOf(stringToSearch);
    index=subHeading.indexOf(stringToSearch);
  }

  else  if (this.state.isBook3Selected && this.state.isBook4Selected && !this.state.isBook1Selected && !this.state.isBook2Selected)
  {
    index=subHeading.indexOf(stringToSearch);
    index=subbestheading.indexOf(stringToSearch);
  }



  ////// ///// /////

    else  if (this.state.isBook4Selected && this.state.isBook1Selected && !this.state.isBook2Selected && !this.state.isBook3Selected)
    {
      index=mainHeading.indexOf(stringToSearch);
      index=subbestheading.indexOf(stringToSearch);

    }

    else  if (this.state.isBook4Selected && this.state.isBook2Selected && !this.state.isBook1Selected && !this.state.isBook3Selected)
    {

      index=tempPara.indexOf(stringToSearch);
      index=subbestheading.indexOf(stringToSearch);
    }

    else  if (this.state.isBook4Selected && this.state.isBook3Selected && !this.state.isBook1Selected && !this.state.isBook2Selected)
    {
      index=subHeading.indexOf(stringToSearch);
      index=subbestheading.indexOf(stringToSearch);
    }


    ////// ///// /////

      else  if (this.state.isBook1Selected && this.state.isBook2Selected && this.state.isBook3Selected && !this.state.isBook4Selected)
      {
        index=mainHeading.indexOf(stringToSearch);
        index=tempPara.indexOf(stringToSearch);
        index=subHeading.indexOf(stringToSearch);

      }

      else  if (this.state.isBook1Selected && this.state.isBook2Selected && this.state.isBook4Selected && !this.state.isBook3Selected)
      {
        index=mainHeading.indexOf(stringToSearch);
        index=tempPara.indexOf(stringToSearch);
        index=subbestheading.indexOf(stringToSearch);

      }

      else  if (this.state.isBook1Selected && this.state.isBook3Selected && this.state.isBook4Selected && !this.state.isBook2Selected)
      {

        index=mainHeading.indexOf(stringToSearch);
        index=subHeading.indexOf(stringToSearch);
        index=subbestheading.indexOf(stringToSearch);

      }


  if (index != -1) {
    var object={key:counter,data:bookArray[i]}
    searchedArray.push(object);
    counter++;
  }

}

var searchResult={'word':stringToSearch,'searchedArray':searchedArray,bookname:this.state.bookArray[x].title};

this.setState({showProgress:false})
if (searchedArray.length!=0) {
  flag++;
}

  finalArray.push(searchResult);

}

// // // // // console.log('Search Result Word is = ',finalArray[0]);

if (flag == 0){
  Alert.alert('Stop!','No result found');
  return;
}

this.setState({showProgress:false});

  this.props.navigation.navigate('DisplayResultScreen',{
    finalArray:finalArray,
  });

// this.props.navigator.push({
//   screen:'DisplayResultScreen',
//   passProps:{finalArray},
//   navigatorStyle:{
//     navBarHidden:true,
//   },
// })

}

// actionButtonSearch(){
// var stringToSearch=this.state.txtSearch.trim();
//   stringToSearch=stringToSearch.toLowerCase();
// if (stringToSearch.length <=0) {
//   Alert.alert('Stop!','Search complete word');
//   return;
// }else{
//   return;
// }
// }

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
    // var subdata=paragraph.slice(indexOfNewLine,paragraph.length);
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

    // this.props.navigator.push({
    //   screen:'DisplayResultScreen',
    //   passProps:{searchResult},
    //   navigatorStyle:{
    //     navBarHidden:true,
    //   },
    // })
}

actionCheckBox1(){
  this.setState({
                isBook1Selected:!this.state.isBook1Selected,
                  });
}

actionCheckBox2(){
  this.setState({isBook2Selected:!this.state.isBook2Selected,
                    });
}

actionCheckBox3(){
  this.setState({isBook3Selected:!this.state.isBook3Selected,
                    });
}

actionCheckBox4(){
  this.setState({
                isBook4Selected:!this.state.isBook4Selected,
                  });
}

// _renderItem ({item, index}) {
//         var image=item.fileName
//     return (
//         <View style={{backgroundColor:'transparent',justifyContent:'center',alignItems:'center'}}>
//             <Image source={image} style={{width:itemWidth,height:itemWidth,borderRadius:15}}/>
//         </View>
//     );
//   }

wordSelected(index){

  if (this.state.urduAlphabet[index].data == 0) {
    // If Selected Row is empty no need to process any more
  }else{
    // Last selectedAlphabet
  if (this.state.urduAlphabet[index].key == this.state.urduAlphabet[this.state.lastSelectedAlphabetIndex.index].key) {
    // If You press already selected row, no need to process any more

  }else{

    var letter=this.state.urduAlphabet[index].key;
    var finalArray=[];

    for (var x = 0; x < this.state.bookArray.length; x++) {
    var bookArray=this.state.bookArray[x].data;
    var searchedArray=[];
    var counter = 0;
    var flag = 0;

    for (var i = 0; i < bookArray.length; i++) {
      var mainHeading=bookArray[i].mainheading;
      var subHeading=bookArray[i].subheading;
      var subbestheading=bookArray[i].subbestheading.trim();
      var stringArray=subbestheading.split(")");
      var newString=stringArray[0];
      if (stringArray.length>0) {
        newString=stringArray[1];
      }

      if (newString == null) {
        continue;
      }

      newString=newString.trim();
      if (newString[0]==letter) {
        var ObjectToSaveInArray = {title:this.state.bookArray[x].title,data:bookArray[i]};
        finalArray.push(ObjectToSaveInArray)
      }
    }
  }

  this.state.urduAlphabet[index].data = 2;
  this.state.urduAlphabet[this.state.lastSelectedAlphabetIndex.index].data = 1;

  // Update Laste selected index
  this.state.lastSelectedAlphabetIndex.index = index;

  this.setState({
    searchResultArray:finalArray,
  })
    }
  }
}

 dumpIntoDB(){

   console.log('Dump DB Called or not ?');
   console.log('Data length is = ',this.state.bookArray.length);
   console.log('Data length at 1 is = ',this.state.bookArray[1].data.length);

  //  for (var i = 0; i < this.state.bookArray.length; i++) {
  //    for (var j = 0; j < this.state.bookArray[i].data.length; j++) {

      //  console.log(this.state.bookArray[i].title);
      //  console.log(this.state.bookArray[i].data[j].mainheading);
      //  console.log(this.state.bookArray[i].data[j].subheading);
      //  console.log(this.state.bookArray[i].data[j].subbestheading);
      //  console.log(this.state.bookArray[i].data[j].data);


console.log('insertDB Called');

// if (this.state.user_name) {
//  if (this.state.user_contact) {
//    if (this.state.user_address) {


     db.transaction((tx)=> {
        for (var i = 0; i < this.state.bookArray.length; i++) {
          for (var j = 0; j < this.state.bookArray[i].data.length; j++) {

            console.log('DB book length at location 1 is = ', this.state.bookArray[1].title);
            console.log('DB book data at location 1 is = ', this.state.bookArray[1].data);

            // console.log('DB book_name is = ', this.state.bookArray[i].title);
            // console.log('DB chapter_name is = ', this.state.bookArray[i].data[j].mainheading);
            // console.log('DB subheading is = ', this.state.bookArray[i].data[j].subheading);
            // console.log('DB subbestheading is = ', this.state.bookArray[i].data[j].subbestheading);
            // console.log('DB data is = ', this.state.bookArray[i].data[j].data);

       tx.executeSql(
         'INSERT INTO table_books (book_name, chapter_name, disease_name, prescription_name, prescription_detail) VALUES (?,?,?,?,?)',
         [this.state.bookArray[i].title, this.state.bookArray[i].data[j].mainheading, this.state.bookArray[i].data[j].subheading, this.state.bookArray[i].data[j].subbestheading, this.state.bookArray[i].data[j].data],
         (tx, results) => {
          //  console.log('Insert Results',results.rowsAffected);
           if(results.rowsAffected>0){
            //  Alert.alert( 'Success', 'Values Inserted successfully',
            //    [
            //      {text: 'Ok', onPress: () => this.props.navigation.navigate('HomeScreen')},
            //    ],
            //    { cancelable: false }
            //  );
           }else{
             alert('Updation Failed');
           }
         }
       );
     }
   }
});

//    } else {
//      alert('Please fill Address');
//    }
//  } else {
//    alert('Please fill Contact Number');
//  }
// } else {
//  alert('Please fill Name');
// }


    //  }
  //  }
 }

 horizontalrowselected(){

   console.log('Akhzar Nazir New Logic Shuru',this.state.bookArray);

   for (var u = 0; u < this.state.urduAlphabet.length; u++) {
   var letter=this.state.urduAlphabet[u].key;
   var finalArray=[];
   for (var x = 0; x < this.state.bookArray.length; x++) {
   var bookArray=this.state.bookArray[x].data;
   var searchedArray=[];
   var counter = 0;
   var flag = 0;

   for (var i = 0; i < bookArray.length; i++) {
     var mainHeading=bookArray[i].mainheading;
     var subHeading=bookArray[i].subheading;
     var subbestheading=bookArray[i].subbestheading.trim();
     var stringArray=subbestheading.split(")");
     var newString=stringArray[0];
     if (stringArray.length>0) {
       newString = stringArray[1];
    }

     if (newString == null) {
       continue;
     }
     newString=newString.trim();
     if (newString[0]==letter) {
       var ObjectToSaveInArray = {title:this.state.bookArray[x].title,data:bookArray[i],key:newString};
       finalArray.push(ObjectToSaveInArray)
       this.state.urduAlphabet[u].data = 1;
     }
   }
 }

 if (u == 0) {
   // 2 value is for selected item
   this.state.urduAlphabet[0].data = 2;
   this.setState({
     searchResultArray:finalArray,
   })
 }
}

console.log('final array is = ',this.state.searchResultArray);

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
  //  rollnumber:1,
  //  others:'Akhzar Nazir',
  //  data:obj,
  //  compare:1,

   sectionArray:finalArrayToCheckRepitition,

   });

    // this.props.navigator.push({
    //   screen:'RelatedWords',
    //   title:'Related Items',
    //   passProps:{finalArrayToCheckRepitition},
    //   navigatorStyle:{
    //     navBarHidden:true,
    //   },
    // })

  }else{

    // Alert.alert('Call some Function 2');

    var selectedRow = 0; //index
    var sectionArray = [];
    sectionArray.push(this.state.searchResultArray[index]);
    // var selectedItem = this.state.searchResultArray[index].data;
    // var selectedTitle = this.state.searchResultArray[index].title;

    console.log('section array before push is = ',sectionArray);
    console.log('selectedRow before push is = ',selectedRow);

    this.props.navigation.navigate('ReadingScreen',{
    sectionArray:sectionArray,
    selectedRow:selectedRow,
     });

    // this.props.navigator.push({
    //   screen:'ReadingScreen',
    //   passProps:{sectionArray,selectedRow},
    //   navigatorStyle:{
    //     navBarHidden:true,
    //   },
    // })

  }
}

render(){
   return(
     <View style={styles.outerContainer}>
     <ImageBackground source={backgroundImage} style={{width:window.width,height:window.height,backgroundColor:'gray'}}>

     <Header navigation={this.props.navigation} navigator={this.props.navigator} showMenu={true} title='طبی  کتب'/>

     <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}} enableOnAndroid={true}>
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

              <TouchableOpacity onPress={()=>this.actionCheckBox2()} style={{marginRight:20,width:120,height:40,alignItems:'flex-end',justifyContent:'center'}}>

              <View style={{flexDirection:'row',}}>
              <Text style={{alignSelf:'center',color:'white'}}>Title + Text</Text>
              <Image source={this.state.isBook2Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
              </View>

              </TouchableOpacity>

               <TouchableOpacity onPress={()=>this.actionCheckBox1()} style={{width:140,height:40,alignItems:'flex-end',justifyContent:'center'}}>

               <View style={{flexDirection:'row'}}>
               <Text style={{alignSelf:'center',color:'white'}}>Title</Text>
               <Image source={this.state.isBook1Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>

               </View>

               </TouchableOpacity>

     </View>

         <View style={{flexDirection:'row'}}>

                   <TouchableOpacity onPress={()=>this.actionCheckBox4()} style={{marginRight:20,width:120,height:40,alignItems:'flex-end',justifyContent:'center'}}>

                   <View style={{flexDirection:'row'}}>
                   <Text style={{alignSelf:'center',color:'white'}}> نسخہ جات یا علاج</Text>
                   <Image source={this.state.isBook4Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
                   </View>

                   </TouchableOpacity>

                   <TouchableOpacity onPress={()=>this.actionCheckBox3()} style={{width:140,height:40,alignItems:'flex-end',justifyContent:'center'}}>

                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:12,color:'white'}}>بیماریاں</Text>
                   <Image source={this.state.isBook3Selected?checkIcon:uncheckIcon} style={{width:30,height:30,marginLeft:10}}/>
                   </View>

                   </TouchableOpacity>
         </View>

    </View>

      <View style={styles.buttonView}>
      <TouchableOpacity onPress={()=>this.actionButtonSearch()} style={styles.buttonStyleOne}>
      <Text style={styles.textStyle}>{this.state.buttonSearchTitle}</Text>
      </TouchableOpacity>
      </View>

      {
     /*
      <View style={{flex:1,backgroundColor:'transparent',justifyContent:'flex-end'}}>
      <View style={{alignItems:'flex-start',marginBottom:isiPhone?10:30}}>
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
        */
      }

{
/*
        <View style={styles.buttonView}>
        <TouchableOpacity onPress={()=>this.actionButtonBooksList()} style={styles.buttonStyleTwo}>
        <Text style={styles.textStyle}>{this.state.booksListTitle}</Text>
        </TouchableOpacity>
        </View>
*/
}

        <View style={{marginTop:25,}}>
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
           fontFamily:isiPhone?'Nafees Web Naskh':'nafeeswebnaskh',
         }}> {item.data.subbestheading}</Text>
         </View>
         </TouchableOpacity>
       }
         />
       </View>

     <View style={{marginTop:30}}/>
     </View>
    <Loader showProgress={this.state.showProgress}/>
     </KeyboardAwareScrollView>
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
  marginTop:25,
  // alignItems:'center',
},

inputStyle:{
  // width:140,
  marginRight:40,
  marginLeft:40,
  height:50,
  borderWidth:1,
  borderRadius:10,
  paddingLeft:15,
  paddingRight:15,
  borderColor:'#E0E3E7',
  color:'#AEAEAE',
  // fontFamily:'Adobe Arabic',
  fontFamily:"NafeesWebNaskh",
  fontSize:22,
  backgroundColor:'white',
  // backgroundColor:'green',
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

// fontFamily:isiPhone?'NafeesWebNaskh-Regular':'nafeeswebnaskh',

textStyle:{
  color:'white',
  fontFamily:"NafeesWebNaskh",
  fontSize:25,
  // fontWeight:'bold',
},

textStyleNP:{
  color:'white',
  fontFamily:"NafeesWebNaskh",
  fontSize:25,
  backgroundColor:'transparent',
  // fontWeight:'bold',
},

logoStyle:{
  height:150,
  width:135,
},

logoView:{
  alignItems:'center',
  justifyContent:'center',
  marginTop:15,
  // backgroundColor:'gray',
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

module.exports=HomeScreen;
