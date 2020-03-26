import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,ScrollView,
  Dimensions,
  AsyncStorage,
  Platform,
  TextInput,
} from 'react-native';

var logoImage=require('./Icons/logo.png');
var Header=require('./Header');
var Loader=require('./Loader');
var Constants=require('./Constants');
var RNFS = require('react-native-fs');
const window = Dimensions.get('window');
const DEVICE_WIDTH=window.width;
const DEVICE_HEIGHT=window.height;
const buttonWidth=DEVICE_WIDTH/2-50;
const logoWidth=DEVICE_WIDTH/3+25;
var backArrow=require('./Icons/backArrow_2.png')

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation';



class Screen4 extends Component{

  constructor(props){
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent.bind(this));
    this.state={
      showProgress:true,
    }
}


onNavigationEvent(event) {
	// handle a deep link
		if (event.type == 'DeepLink') {
			const parts = event.link;
			if (parts=='Home') {
				// // // console.log(parts);
				return;
			}else{
    				this.props.navigator.resetTo({
    			  screen: 'Screen4',
    				navigatorStyle: {
    					navBarHidden:false,
    				},
    			});
			  }
		}
}

componentDidMount() { 
 

  AsyncStorage.getItem("booksData").then((value) => {

    var testVar = JSON.parse(value);
    if (testVar == null) {

      this.actionButtonLoadBook();

    }else{

    this.setState({
      bookArray:JSON.parse(value)
    });

    this.setState({showProgress:false});

  }
    }).done();
}






actionButtonLoadBook(){

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

  if (Platform.OS === 'ios') {

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

  var finalArray1=[];
  RNFS.readFile(path1)
      .then((contents) => {
        var contentString = contents.toString();
        // console.log('Content Of Complete Book' + contentString);
        var chaptersArray=[];
        // For Chapters Titles denoted by & Sign
        for (var i = 0; i < contentString.length; i++) {
          var firstIndex=contentString.indexOf('&',i);
          var secondIndex=contentString.indexOf('&',firstIndex+1);
          if (secondIndex==-1 || firstIndex==-1) {
            break;
          }

          // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
          chaptersArray.push(tempString);
          i=secondIndex;
        }

        // console.log('Chapters Array is ='+chaptersArray);

        var titlesArray=[];

        // For Main Titles denoted by @ Sign
        for (var i = 0; i < chaptersArray.length; i++) {
          var stringAtIndex = chaptersArray[i];
          var headingEndIndex = stringAtIndex.indexOf('\r',1);
          var testString=stringAtIndex.slice(0,headingEndIndex);
          // console.log('Akhzar is testing heading' + testString);

          for (var x = 0; x < stringAtIndex.length; x++) {

            var firstIndex=stringAtIndex.indexOf('@',x);
            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }

            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
            // Save String and Heading Both in Array
            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
            titlesArray.push(ObjectToSaveInArray);
            x=secondIndex;

          }
        }

        // console.log('Titles Array is ='+titlesArray);

        var tempArray=[];
        // For Nuskha Jaat denoted by $ Sign
        for (var i = 0; i < titlesArray.length; i++) {

          var mainHeading = titlesArray[i].heading;
          var stringAtIndex = titlesArray[i].data;
          // console.log('Main Heading is == ' + mainHeading);
          // console.log('stringAtIndex is == ' + stringAtIndex);
          var headingEndIndex = stringAtIndex.indexOf('\r',1);
          var testString=stringAtIndex.slice(0,headingEndIndex);
          // console.log('Mobeen Gainda is testing heading' + testString);
          for (var x = 0; x < stringAtIndex.length; x++) {
            var firstIndex=stringAtIndex.indexOf('$',x);
            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }
            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
            // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
            tempArray.push(ObjectToSaveInArray);
            x=secondIndex;

          }
        }

        // console.log('Main Temp Temp Array is ='+tempArray);
        // Extract Headings from Sub Content From $ Sign.
        // For Nuskha Jaat denoted by $ Sign
        for (var i = 0; i < tempArray.length; i++) {

          var mainHeading = tempArray[i].mainheading;
          var subHeading = tempArray[i].subheading;
          var stringAtIndex = tempArray[i].data;

          // console.log('Main Main Heading is == ' + mainHeading);
          // console.log('Sub Sub Heading is == ' + subHeading);
          // console.log('Main Main Data is == ' + stringAtIndex);

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

                                                                  })


      var mainArray=[];

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

      // For Permanent Storage Of Data

      // AsyncStorage.setItem('booksData', JSON.stringify(mainArray));

}else{

  // For Android Path is different

  var  path1='آرند.txt';
  var  path2='اندرائین.txt';
  var  path3='انگور.txt';
  var  path4='آم.txt';
  var  path5='خواص آک.txt';
  var  path6='بادام.txt';
  var  path7='برگد.txt';
  var  path8='دھتورہ.txt';
  var  path9='خواص شہد.txt';
  var  path10='دھنیہ.txt';
  var  path11='دودھ.txt';
  var  path12='گاجر.txt';
  var  path13='گھی کوار.txt';
  var  path14='گھی.txt';
  var  path15='دھی.txt';
  var  path16='گل سرک.txt';

  // Alert.alert('title')
  RNFS.readDirAssets('') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      // console.log('GOT RESULT', result);
    // stat the first file
      // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    });
    // console.log('End of File results');

  var finalArray1=[];
  RNFS.readFileAssets(path1)
      .then((contents) => {
        var contentString = contents.toString();
        // console.log('Content Of Complete Book' + contentString);
        var chaptersArray=[];
        // For Chapters Titles denoted by & Sign
        for (var i = 0; i < contentString.length; i++) {
          var firstIndex=contentString.indexOf('&',i);
          var secondIndex=contentString.indexOf('&',firstIndex+1);
          if (secondIndex==-1 || firstIndex==-1) {
            break;
          }

          // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
          chaptersArray.push(tempString);
          i=secondIndex;
        }

        // console.log('Chapters Array is ='+chaptersArray);

        var titlesArray=[];

        // For Main Titles denoted by @ Sign
        for (var i = 0; i < chaptersArray.length; i++) {
          var stringAtIndex = chaptersArray[i];
          var headingEndIndex = stringAtIndex.indexOf('\r',1);
          var testString=stringAtIndex.slice(0,headingEndIndex);
          // console.log('Akhzar is testing heading' + testString);

          for (var x = 0; x < stringAtIndex.length; x++) {

            var firstIndex=stringAtIndex.indexOf('@',x);
            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }

            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
            // Save String and Heading Both in Array
            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
            titlesArray.push(ObjectToSaveInArray);
            x=secondIndex;

          }

        }

        // console.log('Titles Array is ='+titlesArray);

        var tempArray=[];
        // For Nuskha Jaat denoted by $ Sign
        for (var i = 0; i < titlesArray.length; i++) {

          var mainHeading = titlesArray[i].heading;
          var stringAtIndex = titlesArray[i].data;
          // console.log('Main Heading is == ' + mainHeading);
          // console.log('stringAtIndex is == ' + stringAtIndex);

          var headingEndIndex = stringAtIndex.indexOf('\r',1);
          var testString=stringAtIndex.slice(0,headingEndIndex);
          // console.log('Akhzar is testing heading' + testString);

          for (var x = 0; x < stringAtIndex.length; x++) {

            var firstIndex=stringAtIndex.indexOf('$',x);
            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
            if (secondIndex==-1 || firstIndex==-1) {
              break;
            }

            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
            // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
            tempArray.push(ObjectToSaveInArray);
            x=secondIndex;

          }
        }
        // console.log('Main Temp Temp Array is ='+tempArray);

        // Extract Headings from Sub Content From $ Sign.

        // For Nuskha Jaat denoted by $ Sign
        for (var i = 0; i < tempArray.length; i++) {

          var mainHeading = tempArray[i].mainheading;
          var subHeading = tempArray[i].subheading;
          var stringAtIndex = tempArray[i].data;

          // console.log('Main Main Heading is == ' + mainHeading);
          // console.log('Sub Sub Heading is == ' + subHeading);
          // console.log('Main Main Data is == ' + stringAtIndex);

          var headingEndIndex = stringAtIndex.indexOf('\r',1);
          var testString=stringAtIndex.slice(0,headingEndIndex);
          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
          finalArray1.push(ObjectToSaveInArray);
        }
      })

      var finalArray2=[];

      RNFS.readFileAssets(path2)
          .then((contents) => {
            var contentString = contents.toString();
            // console.log('Content Of Complete Book' + contentString);
            var chaptersArray=[];
            // For Chapters Titles denoted by & Sign
            for (var i = 0; i < contentString.length; i++) {
              var firstIndex=contentString.indexOf('&',i);
              var secondIndex=contentString.indexOf('&',firstIndex+1);
              if (secondIndex==-1 || firstIndex==-1) {
                break;
              }

              // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
              chaptersArray.push(tempString);
              i=secondIndex;
            }

            // console.log('Chapters Array is ='+chaptersArray);

            var titlesArray=[];

            // For Main Titles denoted by @ Sign
            for (var i = 0; i < chaptersArray.length; i++) {
              var stringAtIndex = chaptersArray[i];
              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testString=stringAtIndex.slice(0,headingEndIndex);
              // console.log('Akhzar is testing heading' + testString);

              for (var x = 0; x < stringAtIndex.length; x++) {

                var firstIndex=stringAtIndex.indexOf('@',x);
                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                // Save String and Heading Both in Array
                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                titlesArray.push(ObjectToSaveInArray);
                x=secondIndex;

              }

            }

            // console.log('Titles Array is ='+titlesArray);

            var tempArray=[];
            // For Nuskha Jaat denoted by $ Sign
            for (var i = 0; i < titlesArray.length; i++) {

              var mainHeading = titlesArray[i].heading;
              var stringAtIndex = titlesArray[i].data;
              // console.log('Main Heading is == ' + mainHeading);
              // console.log('stringAtIndex is == ' + stringAtIndex);

              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testString=stringAtIndex.slice(0,headingEndIndex);
              // console.log('Akhzar is testing heading' + testString);

              for (var x = 0; x < stringAtIndex.length; x++) {

                var firstIndex=stringAtIndex.indexOf('$',x);
                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                if (secondIndex==-1 || firstIndex==-1) {
                  break;
                }

                // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                tempArray.push(ObjectToSaveInArray);
                x=secondIndex;

              }
            }
            // console.log('Main Temp Temp Array is ='+tempArray);

            // Extract Headings from Sub Content From $ Sign.

            // For Nuskha Jaat denoted by $ Sign
            for (var i = 0; i < tempArray.length; i++) {

              var mainHeading = tempArray[i].mainheading;
              var subHeading = tempArray[i].subheading;
              var stringAtIndex = tempArray[i].data;

              // console.log('Main Main Heading is == ' + mainHeading);
              // console.log('Sub Sub Heading is == ' + subHeading);
              // console.log('Main Main Data is == ' + stringAtIndex);

              var headingEndIndex = stringAtIndex.indexOf('\r',1);
              var testString=stringAtIndex.slice(0,headingEndIndex);
              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
              finalArray2.push(ObjectToSaveInArray);

            }
          })


          var finalArray3=[];

          RNFS.readFileAssets(path3)
              .then((contents) => {
                var contentString = contents.toString();
                // console.log('Content Of Complete Book' + contentString);
                var chaptersArray=[];
                // For Chapters Titles denoted by & Sign
                for (var i = 0; i < contentString.length; i++) {
                  var firstIndex=contentString.indexOf('&',i);
                  var secondIndex=contentString.indexOf('&',firstIndex+1);
                  if (secondIndex==-1 || firstIndex==-1) {
                    break;
                  }

                  // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                  var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                  chaptersArray.push(tempString);
                  i=secondIndex;
                }

                // console.log('Chapters Array is ='+chaptersArray);

                var titlesArray=[];

                // For Main Titles denoted by @ Sign
                for (var i = 0; i < chaptersArray.length; i++) {
                  var stringAtIndex = chaptersArray[i];
                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                  var testString=stringAtIndex.slice(0,headingEndIndex);
                  // console.log('Akhzar is testing heading' + testString);

                  for (var x = 0; x < stringAtIndex.length; x++) {

                    var firstIndex=stringAtIndex.indexOf('@',x);
                    var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                    if (secondIndex==-1 || firstIndex==-1) {
                      break;
                    }

                    // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                    // Save String and Heading Both in Array
                    var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                    titlesArray.push(ObjectToSaveInArray);
                    x=secondIndex;

                  }

                }

                // console.log('Titles Array is ='+titlesArray);

                var tempArray=[];
                // For Nuskha Jaat denoted by $ Sign
                for (var i = 0; i < titlesArray.length; i++) {

                  var mainHeading = titlesArray[i].heading;
                  var stringAtIndex = titlesArray[i].data;
                  // console.log('Main Heading is == ' + mainHeading);
                  // console.log('stringAtIndex is == ' + stringAtIndex);

                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                  var testString=stringAtIndex.slice(0,headingEndIndex);
                  // console.log('Akhzar is testing heading' + testString);

                  for (var x = 0; x < stringAtIndex.length; x++) {

                    var firstIndex=stringAtIndex.indexOf('$',x);
                    var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                    if (secondIndex==-1 || firstIndex==-1) {
                      break;
                    }

                    // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                    // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                    tempArray.push(ObjectToSaveInArray);
                    x=secondIndex;

                  }
                }
                // console.log('Main Temp Temp Array is ='+tempArray);

                // Extract Headings from Sub Content From $ Sign.

                // For Nuskha Jaat denoted by $ Sign
                for (var i = 0; i < tempArray.length; i++) {

                  var mainHeading = tempArray[i].mainheading;
                  var subHeading = tempArray[i].subheading;
                  var stringAtIndex = tempArray[i].data;

                  // console.log('Main Main Heading is == ' + mainHeading);
                  // console.log('Sub Sub Heading is == ' + subHeading);
                  // console.log('Main Main Data is == ' + stringAtIndex);

                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                  var testString=stringAtIndex.slice(0,headingEndIndex);
                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                  finalArray3.push(ObjectToSaveInArray);

                }
              })



              var finalArray4=[];

              RNFS.readFileAssets(path4)
                  .then((contents) => {
                    var contentString = contents.toString();
                    // console.log('Content Of Complete Book' + contentString);
                    var chaptersArray=[];
                    // For Chapters Titles denoted by & Sign
                    for (var i = 0; i < contentString.length; i++) {
                      var firstIndex=contentString.indexOf('&',i);
                      var secondIndex=contentString.indexOf('&',firstIndex+1);
                      if (secondIndex==-1 || firstIndex==-1) {
                        break;
                      }

                      // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                      chaptersArray.push(tempString);
                      i=secondIndex;
                    }

                    // console.log('Chapters Array is ='+chaptersArray);

                    var titlesArray=[];

                    // For Main Titles denoted by @ Sign
                    for (var i = 0; i < chaptersArray.length; i++) {
                      var stringAtIndex = chaptersArray[i];
                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                      var testString=stringAtIndex.slice(0,headingEndIndex);
                      // console.log('Akhzar is testing heading' + testString);

                      for (var x = 0; x < stringAtIndex.length; x++) {

                        var firstIndex=stringAtIndex.indexOf('@',x);
                        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                        if (secondIndex==-1 || firstIndex==-1) {
                          break;
                        }

                        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                        // Save String and Heading Both in Array
                        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                        titlesArray.push(ObjectToSaveInArray);
                        x=secondIndex;

                      }

                    }

                    // console.log('Titles Array is ='+titlesArray);

                    var tempArray=[];
                    // For Nuskha Jaat denoted by $ Sign
                    for (var i = 0; i < titlesArray.length; i++) {

                      var mainHeading = titlesArray[i].heading;
                      var stringAtIndex = titlesArray[i].data;
                      // console.log('Main Heading is == ' + mainHeading);
                      // console.log('stringAtIndex is == ' + stringAtIndex);

                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                      var testString=stringAtIndex.slice(0,headingEndIndex);
                      // console.log('Akhzar is testing heading' + testString);

                      for (var x = 0; x < stringAtIndex.length; x++) {

                        var firstIndex=stringAtIndex.indexOf('$',x);
                        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                        if (secondIndex==-1 || firstIndex==-1) {
                          break;
                        }

                        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                        // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                        tempArray.push(ObjectToSaveInArray);
                        x=secondIndex;

                      }
                    }
                    // console.log('Main Temp Temp Array is ='+tempArray);

                    // Extract Headings from Sub Content From $ Sign.

                    // For Nuskha Jaat denoted by $ Sign
                    for (var i = 0; i < tempArray.length; i++) {

                      var mainHeading = tempArray[i].mainheading;
                      var subHeading = tempArray[i].subheading;
                      var stringAtIndex = tempArray[i].data;

                      // console.log('Main Main Heading is == ' + mainHeading);
                      // console.log('Sub Sub Heading is == ' + subHeading);
                      // console.log('Main Main Data is == ' + stringAtIndex);

                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                      var testString=stringAtIndex.slice(0,headingEndIndex);
                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                      finalArray4.push(ObjectToSaveInArray);

                    }
                  })




                  var finalArray5=[];

                  RNFS.readFileAssets(path5)
                      .then((contents) => {
                        var contentString = contents.toString();
                        // console.log('Content Of Complete Book' + contentString);
                        var chaptersArray=[];
                        // For Chapters Titles denoted by & Sign
                        for (var i = 0; i < contentString.length; i++) {
                          var firstIndex=contentString.indexOf('&',i);
                          var secondIndex=contentString.indexOf('&',firstIndex+1);
                          if (secondIndex==-1 || firstIndex==-1) {
                            break;
                          }

                          // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                          chaptersArray.push(tempString);
                          i=secondIndex;
                        }

                        // console.log('Chapters Array is ='+chaptersArray);

                        var titlesArray=[];

                        // For Main Titles denoted by @ Sign
                        for (var i = 0; i < chaptersArray.length; i++) {
                          var stringAtIndex = chaptersArray[i];
                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                          var testString=stringAtIndex.slice(0,headingEndIndex);
                          // console.log('Akhzar is testing heading' + testString);

                          for (var x = 0; x < stringAtIndex.length; x++) {

                            var firstIndex=stringAtIndex.indexOf('@',x);
                            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                            if (secondIndex==-1 || firstIndex==-1) {
                              break;
                            }

                            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                            // Save String and Heading Both in Array
                            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                            titlesArray.push(ObjectToSaveInArray);
                            x=secondIndex;

                          }

                        }

                        // console.log('Titles Array is ='+titlesArray);

                        var tempArray=[];
                        // For Nuskha Jaat denoted by $ Sign
                        for (var i = 0; i < titlesArray.length; i++) {

                          var mainHeading = titlesArray[i].heading;
                          var stringAtIndex = titlesArray[i].data;
                          // console.log('Main Heading is == ' + mainHeading);
                          // console.log('stringAtIndex is == ' + stringAtIndex);

                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                          var testString=stringAtIndex.slice(0,headingEndIndex);
                          // console.log('Akhzar is testing heading' + testString);

                          for (var x = 0; x < stringAtIndex.length; x++) {

                            var firstIndex=stringAtIndex.indexOf('$',x);
                            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                            if (secondIndex==-1 || firstIndex==-1) {
                              break;
                            }

                            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                            // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                            tempArray.push(ObjectToSaveInArray);
                            x=secondIndex;

                          }
                        }
                        // console.log('Main Temp Temp Array is ='+tempArray);

                        // Extract Headings from Sub Content From $ Sign.

                        // For Nuskha Jaat denoted by $ Sign
                        for (var i = 0; i < tempArray.length; i++) {

                          var mainHeading = tempArray[i].mainheading;
                          var subHeading = tempArray[i].subheading;
                          var stringAtIndex = tempArray[i].data;

                          // console.log('Main Main Heading is == ' + mainHeading);
                          // console.log('Sub Sub Heading is == ' + subHeading);
                          // console.log('Main Main Data is == ' + stringAtIndex);

                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                          var testString=stringAtIndex.slice(0,headingEndIndex);
                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                          finalArray5.push(ObjectToSaveInArray);

                        }
                      })



                      var finalArray6=[];

                      RNFS.readFileAssets(path6)
                          .then((contents) => {
                            var contentString = contents.toString();
                            // console.log('Content Of Complete Book' + contentString);
                            var chaptersArray=[];
                            // For Chapters Titles denoted by & Sign
                            for (var i = 0; i < contentString.length; i++) {
                              var firstIndex=contentString.indexOf('&',i);
                              var secondIndex=contentString.indexOf('&',firstIndex+1);
                              if (secondIndex==-1 || firstIndex==-1) {
                                break;
                              }

                              // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                              chaptersArray.push(tempString);
                              i=secondIndex;
                            }

                            // console.log('Chapters Array is ='+chaptersArray);

                            var titlesArray=[];

                            // For Main Titles denoted by @ Sign
                            for (var i = 0; i < chaptersArray.length; i++) {
                              var stringAtIndex = chaptersArray[i];
                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                              var testString=stringAtIndex.slice(0,headingEndIndex);
                              // console.log('Akhzar is testing heading' + testString);

                              for (var x = 0; x < stringAtIndex.length; x++) {

                                var firstIndex=stringAtIndex.indexOf('@',x);
                                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                if (secondIndex==-1 || firstIndex==-1) {
                                  break;
                                }

                                // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                // Save String and Heading Both in Array
                                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                titlesArray.push(ObjectToSaveInArray);
                                x=secondIndex;

                              }

                            }

                            // console.log('Titles Array is ='+titlesArray);

                            var tempArray=[];
                            // For Nuskha Jaat denoted by $ Sign
                            for (var i = 0; i < titlesArray.length; i++) {

                              var mainHeading = titlesArray[i].heading;
                              var stringAtIndex = titlesArray[i].data;
                              // console.log('Main Heading is == ' + mainHeading);
                              // console.log('stringAtIndex is == ' + stringAtIndex);

                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                              var testString=stringAtIndex.slice(0,headingEndIndex);
                              // console.log('Akhzar is testing heading' + testString);

                              for (var x = 0; x < stringAtIndex.length; x++) {

                                var firstIndex=stringAtIndex.indexOf('$',x);
                                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                if (secondIndex==-1 || firstIndex==-1) {
                                  break;
                                }

                                // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                tempArray.push(ObjectToSaveInArray);
                                x=secondIndex;

                              }
                            }
                            // console.log('Main Temp Temp Array is ='+tempArray);

                            // Extract Headings from Sub Content From $ Sign.

                            // For Nuskha Jaat denoted by $ Sign
                            for (var i = 0; i < tempArray.length; i++) {

                              var mainHeading = tempArray[i].mainheading;
                              var subHeading = tempArray[i].subheading;
                              var stringAtIndex = tempArray[i].data;

                              // console.log('Main Main Heading is == ' + mainHeading);
                              // console.log('Sub Sub Heading is == ' + subHeading);
                              // console.log('Main Main Data is == ' + stringAtIndex);

                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                              var testString=stringAtIndex.slice(0,headingEndIndex);
                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                              finalArray6.push(ObjectToSaveInArray);

                            }
                          })



                          var finalArray7=[];

                          RNFS.readFileAssets(path7)
                              .then((contents) => {
                                var contentString = contents.toString();
                                // console.log('Content Of Complete Book' + contentString);
                                var chaptersArray=[];
                                // For Chapters Titles denoted by & Sign
                                for (var i = 0; i < contentString.length; i++) {
                                  var firstIndex=contentString.indexOf('&',i);
                                  var secondIndex=contentString.indexOf('&',firstIndex+1);
                                  if (secondIndex==-1 || firstIndex==-1) {
                                    break;
                                  }

                                  // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                  var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                  chaptersArray.push(tempString);
                                  i=secondIndex;
                                }

                                // console.log('Chapters Array is ='+chaptersArray);

                                var titlesArray=[];

                                // For Main Titles denoted by @ Sign
                                for (var i = 0; i < chaptersArray.length; i++) {
                                  var stringAtIndex = chaptersArray[i];
                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                  // console.log('Akhzar is testing heading' + testString);

                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                    var firstIndex=stringAtIndex.indexOf('@',x);
                                    var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                    if (secondIndex==-1 || firstIndex==-1) {
                                      break;
                                    }

                                    // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                    // Save String and Heading Both in Array
                                    var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                    titlesArray.push(ObjectToSaveInArray);
                                    x=secondIndex;

                                  }

                                }

                                // console.log('Titles Array is ='+titlesArray);

                                var tempArray=[];
                                // For Nuskha Jaat denoted by $ Sign
                                for (var i = 0; i < titlesArray.length; i++) {

                                  var mainHeading = titlesArray[i].heading;
                                  var stringAtIndex = titlesArray[i].data;
                                  // console.log('Main Heading is == ' + mainHeading);
                                  // console.log('stringAtIndex is == ' + stringAtIndex);

                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                  // console.log('Akhzar is testing heading' + testString);

                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                    var firstIndex=stringAtIndex.indexOf('$',x);
                                    var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                    if (secondIndex==-1 || firstIndex==-1) {
                                      break;
                                    }

                                    // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                    // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                    tempArray.push(ObjectToSaveInArray);
                                    x=secondIndex;

                                  }
                                }
                                // console.log('Main Temp Temp Array is ='+tempArray);

                                // Extract Headings from Sub Content From $ Sign.

                                // For Nuskha Jaat denoted by $ Sign
                                for (var i = 0; i < tempArray.length; i++) {

                                  var mainHeading = tempArray[i].mainheading;
                                  var subHeading = tempArray[i].subheading;
                                  var stringAtIndex = tempArray[i].data;

                                  // console.log('Main Main Heading is == ' + mainHeading);
                                  // console.log('Sub Sub Heading is == ' + subHeading);
                                  // console.log('Main Main Data is == ' + stringAtIndex);

                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                  finalArray7.push(ObjectToSaveInArray);

                                }
                              })




                              var finalArray8=[];

                              RNFS.readFileAssets(path8)
                                  .then((contents) => {
                                    var contentString = contents.toString();
                                    // console.log('Content Of Complete Book' + contentString);
                                    var chaptersArray=[];
                                    // For Chapters Titles denoted by & Sign
                                    for (var i = 0; i < contentString.length; i++) {
                                      var firstIndex=contentString.indexOf('&',i);
                                      var secondIndex=contentString.indexOf('&',firstIndex+1);
                                      if (secondIndex==-1 || firstIndex==-1) {
                                        break;
                                      }

                                      // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                      chaptersArray.push(tempString);
                                      i=secondIndex;
                                    }

                                    // console.log('Chapters Array is ='+chaptersArray);

                                    var titlesArray=[];

                                    // For Main Titles denoted by @ Sign
                                    for (var i = 0; i < chaptersArray.length; i++) {
                                      var stringAtIndex = chaptersArray[i];
                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                      // console.log('Akhzar is testing heading' + testString);

                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                        var firstIndex=stringAtIndex.indexOf('@',x);
                                        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                        if (secondIndex==-1 || firstIndex==-1) {
                                          break;
                                        }

                                        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                        // Save String and Heading Both in Array
                                        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                        titlesArray.push(ObjectToSaveInArray);
                                        x=secondIndex;

                                      }

                                    }

                                    // console.log('Titles Array is ='+titlesArray);

                                    var tempArray=[];
                                    // For Nuskha Jaat denoted by $ Sign
                                    for (var i = 0; i < titlesArray.length; i++) {

                                      var mainHeading = titlesArray[i].heading;
                                      var stringAtIndex = titlesArray[i].data;
                                      // console.log('Main Heading is == ' + mainHeading);
                                      // console.log('stringAtIndex is == ' + stringAtIndex);

                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                      // console.log('Akhzar is testing heading' + testString);

                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                        var firstIndex=stringAtIndex.indexOf('$',x);
                                        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                        if (secondIndex==-1 || firstIndex==-1) {
                                          break;
                                        }

                                        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                        // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                        tempArray.push(ObjectToSaveInArray);
                                        x=secondIndex;

                                      }
                                    }
                                    // console.log('Main Temp Temp Array is ='+tempArray);

                                    // Extract Headings from Sub Content From $ Sign.

                                    // For Nuskha Jaat denoted by $ Sign
                                    for (var i = 0; i < tempArray.length; i++) {

                                      var mainHeading = tempArray[i].mainheading;
                                      var subHeading = tempArray[i].subheading;
                                      var stringAtIndex = tempArray[i].data;

                                      // console.log('Main Main Heading is == ' + mainHeading);
                                      // console.log('Sub Sub Heading is == ' + subHeading);
                                      // console.log('Main Main Data is == ' + stringAtIndex);

                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                      finalArray8.push(ObjectToSaveInArray);

                                    }
                                  })



                                  var finalArray9=[];

                                  RNFS.readFileAssets(path9)
                                      .then((contents) => {
                                        var contentString = contents.toString();
                                        // console.log('Content Of Complete Book' + contentString);
                                        var chaptersArray=[];
                                        // For Chapters Titles denoted by & Sign
                                        for (var i = 0; i < contentString.length; i++) {
                                          var firstIndex=contentString.indexOf('&',i);
                                          var secondIndex=contentString.indexOf('&',firstIndex+1);
                                          if (secondIndex==-1 || firstIndex==-1) {
                                            break;
                                          }

                                          // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                          chaptersArray.push(tempString);
                                          i=secondIndex;
                                        }

                                        // console.log('Chapters Array is ='+chaptersArray);

                                        var titlesArray=[];

                                        // For Main Titles denoted by @ Sign
                                        for (var i = 0; i < chaptersArray.length; i++) {
                                          var stringAtIndex = chaptersArray[i];
                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                          // console.log('Akhzar is testing heading' + testString);

                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                            var firstIndex=stringAtIndex.indexOf('@',x);
                                            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                            if (secondIndex==-1 || firstIndex==-1) {
                                              break;
                                            }

                                            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                            // Save String and Heading Both in Array
                                            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                            titlesArray.push(ObjectToSaveInArray);
                                            x=secondIndex;

                                          }

                                        }

                                        // console.log('Titles Array is ='+titlesArray);

                                        var tempArray=[];
                                        // For Nuskha Jaat denoted by $ Sign
                                        for (var i = 0; i < titlesArray.length; i++) {

                                          var mainHeading = titlesArray[i].heading;
                                          var stringAtIndex = titlesArray[i].data;
                                          // console.log('Main Heading is == ' + mainHeading);
                                          // console.log('stringAtIndex is == ' + stringAtIndex);

                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                          // console.log('Akhzar is testing heading' + testString);

                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                            var firstIndex=stringAtIndex.indexOf('$',x);
                                            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                            if (secondIndex==-1 || firstIndex==-1) {
                                              break;
                                            }

                                            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                            // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                            tempArray.push(ObjectToSaveInArray);
                                            x=secondIndex;

                                          }
                                        }
                                        // console.log('Main Temp Temp Array is ='+tempArray);

                                        // Extract Headings from Sub Content From $ Sign.

                                        // For Nuskha Jaat denoted by $ Sign
                                        for (var i = 0; i < tempArray.length; i++) {

                                          var mainHeading = tempArray[i].mainheading;
                                          var subHeading = tempArray[i].subheading;
                                          var stringAtIndex = tempArray[i].data;

                                          // console.log('Main Main Heading is == ' + mainHeading);
                                          // console.log('Sub Sub Heading is == ' + subHeading);
                                          // console.log('Main Main Data is == ' + stringAtIndex);

                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                          finalArray9.push(ObjectToSaveInArray);

                                        }
                                      })



                                      var finalArray10=[];

                                      RNFS.readFileAssets(path10)
                                          .then((contents) => {
                                            var contentString = contents.toString();
                                            // console.log('Content Of Complete Book' + contentString);
                                            var chaptersArray=[];
                                            // For Chapters Titles denoted by & Sign
                                            for (var i = 0; i < contentString.length; i++) {
                                              var firstIndex=contentString.indexOf('&',i);
                                              var secondIndex=contentString.indexOf('&',firstIndex+1);
                                              if (secondIndex==-1 || firstIndex==-1) {
                                                break;
                                              }

                                              // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                              chaptersArray.push(tempString);
                                              i=secondIndex;
                                            }

                                            // console.log('Chapters Array is ='+chaptersArray);

                                            var titlesArray=[];

                                            // For Main Titles denoted by @ Sign
                                            for (var i = 0; i < chaptersArray.length; i++) {
                                              var stringAtIndex = chaptersArray[i];
                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                              // console.log('Akhzar is testing heading' + testString);

                                              for (var x = 0; x < stringAtIndex.length; x++) {

                                                var firstIndex=stringAtIndex.indexOf('@',x);
                                                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                if (secondIndex==-1 || firstIndex==-1) {
                                                  break;
                                                }

                                                // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                // Save String and Heading Both in Array
                                                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                titlesArray.push(ObjectToSaveInArray);
                                                x=secondIndex;

                                              }

                                            }

                                            // console.log('Titles Array is ='+titlesArray);

                                            var tempArray=[];
                                            // For Nuskha Jaat denoted by $ Sign
                                            for (var i = 0; i < titlesArray.length; i++) {

                                              var mainHeading = titlesArray[i].heading;
                                              var stringAtIndex = titlesArray[i].data;
                                              // console.log('Main Heading is == ' + mainHeading);
                                              // console.log('stringAtIndex is == ' + stringAtIndex);

                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                              // console.log('Akhzar is testing heading' + testString);

                                              for (var x = 0; x < stringAtIndex.length; x++) {

                                                var firstIndex=stringAtIndex.indexOf('$',x);
                                                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                if (secondIndex==-1 || firstIndex==-1) {
                                                  break;
                                                }

                                                // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                tempArray.push(ObjectToSaveInArray);
                                                x=secondIndex;

                                              }
                                            }
                                            // console.log('Main Temp Temp Array is ='+tempArray);

                                            // Extract Headings from Sub Content From $ Sign.

                                            // For Nuskha Jaat denoted by $ Sign
                                            for (var i = 0; i < tempArray.length; i++) {

                                              var mainHeading = tempArray[i].mainheading;
                                              var subHeading = tempArray[i].subheading;
                                              var stringAtIndex = tempArray[i].data;

                                              // console.log('Main Main Heading is == ' + mainHeading);
                                              // console.log('Sub Sub Heading is == ' + subHeading);
                                              // console.log('Main Main Data is == ' + stringAtIndex);

                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                              finalArray10.push(ObjectToSaveInArray);

                                            }
                                          })

                                          var finalArray11=[];

                                          RNFS.readFileAssets(path11)
                                              .then((contents) => {
                                                var contentString = contents.toString();
                                                // console.log('Content Of Complete Book' + contentString);
                                                var chaptersArray=[];
                                                // For Chapters Titles denoted by & Sign
                                                for (var i = 0; i < contentString.length; i++) {
                                                  var firstIndex=contentString.indexOf('&',i);
                                                  var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                    break;
                                                  }

                                                  // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                  var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                  chaptersArray.push(tempString);
                                                  i=secondIndex;
                                                }

                                                // console.log('Chapters Array is ='+chaptersArray);

                                                var titlesArray=[];

                                                // For Main Titles denoted by @ Sign
                                                for (var i = 0; i < chaptersArray.length; i++) {
                                                  var stringAtIndex = chaptersArray[i];
                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                  // console.log('Akhzar is testing heading' + testString);

                                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                                    var firstIndex=stringAtIndex.indexOf('@',x);
                                                    var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                      break;
                                                    }

                                                    // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                    // Save String and Heading Both in Array
                                                    var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                    titlesArray.push(ObjectToSaveInArray);
                                                    x=secondIndex;

                                                  }

                                                }

                                                // console.log('Titles Array is ='+titlesArray);

                                                var tempArray=[];
                                                // For Nuskha Jaat denoted by $ Sign
                                                for (var i = 0; i < titlesArray.length; i++) {

                                                  var mainHeading = titlesArray[i].heading;
                                                  var stringAtIndex = titlesArray[i].data;
                                                  // console.log('Main Heading is == ' + mainHeading);
                                                  // console.log('stringAtIndex is == ' + stringAtIndex);

                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                  // console.log('Akhzar is testing heading' + testString);

                                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                                    var firstIndex=stringAtIndex.indexOf('$',x);
                                                    var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                      break;
                                                    }

                                                    // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                    // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                    tempArray.push(ObjectToSaveInArray);
                                                    x=secondIndex;

                                                  }
                                                }
                                                // console.log('Main Temp Temp Array is ='+tempArray);

                                                // Extract Headings from Sub Content From $ Sign.

                                                // For Nuskha Jaat denoted by $ Sign
                                                for (var i = 0; i < tempArray.length; i++) {

                                                  var mainHeading = tempArray[i].mainheading;
                                                  var subHeading = tempArray[i].subheading;
                                                  var stringAtIndex = tempArray[i].data;

                                                  // console.log('Main Main Heading is == ' + mainHeading);
                                                  // console.log('Sub Sub Heading is == ' + subHeading);
                                                  // console.log('Main Main Data is == ' + stringAtIndex);

                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                  finalArray11.push(ObjectToSaveInArray);

                                                }
                                              })




                                              var finalArray12=[];

                                              RNFS.readFileAssets(path12)
                                                  .then((contents) => {
                                                    var contentString = contents.toString();
                                                    // console.log('Content Of Complete Book' + contentString);
                                                    var chaptersArray=[];
                                                    // For Chapters Titles denoted by & Sign
                                                    for (var i = 0; i < contentString.length; i++) {
                                                      var firstIndex=contentString.indexOf('&',i);
                                                      var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                        break;
                                                      }

                                                      // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                      chaptersArray.push(tempString);
                                                      i=secondIndex;
                                                    }

                                                    // console.log('Chapters Array is ='+chaptersArray);

                                                    var titlesArray=[];

                                                    // For Main Titles denoted by @ Sign
                                                    for (var i = 0; i < chaptersArray.length; i++) {
                                                      var stringAtIndex = chaptersArray[i];
                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                      // console.log('Akhzar is testing heading' + testString);

                                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                                        var firstIndex=stringAtIndex.indexOf('@',x);
                                                        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                          break;
                                                        }

                                                        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                        // Save String and Heading Both in Array
                                                        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                        titlesArray.push(ObjectToSaveInArray);
                                                        x=secondIndex;

                                                      }

                                                    }

                                                    // console.log('Titles Array is ='+titlesArray);

                                                    var tempArray=[];
                                                    // For Nuskha Jaat denoted by $ Sign
                                                    for (var i = 0; i < titlesArray.length; i++) {

                                                      var mainHeading = titlesArray[i].heading;
                                                      var stringAtIndex = titlesArray[i].data;
                                                      // console.log('Main Heading is == ' + mainHeading);
                                                      // console.log('stringAtIndex is == ' + stringAtIndex);

                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                      // console.log('Akhzar is testing heading' + testString);

                                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                                        var firstIndex=stringAtIndex.indexOf('$',x);
                                                        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                          break;
                                                        }

                                                        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                        // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                        tempArray.push(ObjectToSaveInArray);
                                                        x=secondIndex;

                                                      }
                                                    }
                                                    // console.log('Main Temp Temp Array is ='+tempArray);

                                                    // Extract Headings from Sub Content From $ Sign.

                                                    // For Nuskha Jaat denoted by $ Sign
                                                    for (var i = 0; i < tempArray.length; i++) {

                                                      var mainHeading = tempArray[i].mainheading;
                                                      var subHeading = tempArray[i].subheading;
                                                      var stringAtIndex = tempArray[i].data;

                                                      // console.log('Main Main Heading is == ' + mainHeading);
                                                      // console.log('Sub Sub Heading is == ' + subHeading);
                                                      // console.log('Main Main Data is == ' + stringAtIndex);

                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                      finalArray12.push(ObjectToSaveInArray);

                                                    }
                                                  })



                                                  var finalArray13=[];

                                                  RNFS.readFileAssets(path13)
                                                      .then((contents) => {
                                                        var contentString = contents.toString();
                                                        // console.log('Content Of Complete Book' + contentString);
                                                        var chaptersArray=[];
                                                        // For Chapters Titles denoted by & Sign
                                                        for (var i = 0; i < contentString.length; i++) {
                                                          var firstIndex=contentString.indexOf('&',i);
                                                          var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                          if (secondIndex==-1 || firstIndex==-1) {
                                                            break;
                                                          }

                                                          // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                          var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                          chaptersArray.push(tempString);
                                                          i=secondIndex;
                                                        }

                                                        // console.log('Chapters Array is ='+chaptersArray);

                                                        var titlesArray=[];

                                                        // For Main Titles denoted by @ Sign
                                                        for (var i = 0; i < chaptersArray.length; i++) {
                                                          var stringAtIndex = chaptersArray[i];
                                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                                          // console.log('Akhzar is testing heading' + testString);

                                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                                            var firstIndex=stringAtIndex.indexOf('@',x);
                                                            var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                              break;
                                                            }

                                                            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                            // Save String and Heading Both in Array
                                                            var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                            titlesArray.push(ObjectToSaveInArray);
                                                            x=secondIndex;

                                                          }

                                                        }

                                                        // console.log('Titles Array is ='+titlesArray);

                                                        var tempArray=[];
                                                        // For Nuskha Jaat denoted by $ Sign
                                                        for (var i = 0; i < titlesArray.length; i++) {

                                                          var mainHeading = titlesArray[i].heading;
                                                          var stringAtIndex = titlesArray[i].data;
                                                          // console.log('Main Heading is == ' + mainHeading);
                                                          // console.log('stringAtIndex is == ' + stringAtIndex);

                                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                                          // console.log('Akhzar is testing heading' + testString);

                                                          for (var x = 0; x < stringAtIndex.length; x++) {

                                                            var firstIndex=stringAtIndex.indexOf('$',x);
                                                            var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                            if (secondIndex==-1 || firstIndex==-1) {
                                                              break;
                                                            }

                                                            // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                            var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                            // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                            var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                            tempArray.push(ObjectToSaveInArray);
                                                            x=secondIndex;

                                                          }
                                                        }
                                                        // console.log('Main Temp Temp Array is ='+tempArray);

                                                        // Extract Headings from Sub Content From $ Sign.

                                                        // For Nuskha Jaat denoted by $ Sign
                                                        for (var i = 0; i < tempArray.length; i++) {

                                                          var mainHeading = tempArray[i].mainheading;
                                                          var subHeading = tempArray[i].subheading;
                                                          var stringAtIndex = tempArray[i].data;

                                                          // console.log('Main Main Heading is == ' + mainHeading);
                                                          // console.log('Sub Sub Heading is == ' + subHeading);
                                                          // console.log('Main Main Data is == ' + stringAtIndex);

                                                          var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                          var testString=stringAtIndex.slice(0,headingEndIndex);
                                                          var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                          finalArray13.push(ObjectToSaveInArray);

                                                        }
                                                      })




                                                      var finalArray14=[];

                                                      RNFS.readFileAssets(path14)
                                                          .then((contents) => {
                                                            var contentString = contents.toString();
                                                            // console.log('Content Of Complete Book' + contentString);
                                                            var chaptersArray=[];
                                                            // For Chapters Titles denoted by & Sign
                                                            for (var i = 0; i < contentString.length; i++) {
                                                              var firstIndex=contentString.indexOf('&',i);
                                                              var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                              if (secondIndex==-1 || firstIndex==-1) {
                                                                break;
                                                              }

                                                              // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                              var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                              chaptersArray.push(tempString);
                                                              i=secondIndex;
                                                            }

                                                            // console.log('Chapters Array is ='+chaptersArray);

                                                            var titlesArray=[];

                                                            // For Main Titles denoted by @ Sign
                                                            for (var i = 0; i < chaptersArray.length; i++) {
                                                              var stringAtIndex = chaptersArray[i];
                                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                                              // console.log('Akhzar is testing heading' + testString);

                                                              for (var x = 0; x < stringAtIndex.length; x++) {

                                                                var firstIndex=stringAtIndex.indexOf('@',x);
                                                                var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                if (secondIndex==-1 || firstIndex==-1) {
                                                                  break;
                                                                }

                                                                // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                // Save String and Heading Both in Array
                                                                var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                titlesArray.push(ObjectToSaveInArray);
                                                                x=secondIndex;

                                                              }

                                                            }

                                                            // console.log('Titles Array is ='+titlesArray);

                                                            var tempArray=[];
                                                            // For Nuskha Jaat denoted by $ Sign
                                                            for (var i = 0; i < titlesArray.length; i++) {

                                                              var mainHeading = titlesArray[i].heading;
                                                              var stringAtIndex = titlesArray[i].data;
                                                              // console.log('Main Heading is == ' + mainHeading);
                                                              // console.log('stringAtIndex is == ' + stringAtIndex);

                                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                                              // console.log('Akhzar is testing heading' + testString);

                                                              for (var x = 0; x < stringAtIndex.length; x++) {

                                                                var firstIndex=stringAtIndex.indexOf('$',x);
                                                                var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                if (secondIndex==-1 || firstIndex==-1) {
                                                                  break;
                                                                }

                                                                // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                tempArray.push(ObjectToSaveInArray);
                                                                x=secondIndex;

                                                              }
                                                            }
                                                            // console.log('Main Temp Temp Array is ='+tempArray);

                                                            // Extract Headings from Sub Content From $ Sign.

                                                            // For Nuskha Jaat denoted by $ Sign
                                                            for (var i = 0; i < tempArray.length; i++) {

                                                              var mainHeading = tempArray[i].mainheading;
                                                              var subHeading = tempArray[i].subheading;
                                                              var stringAtIndex = tempArray[i].data;

                                                              // console.log('Main Main Heading is == ' + mainHeading);
                                                              // console.log('Sub Sub Heading is == ' + subHeading);
                                                              // console.log('Main Main Data is == ' + stringAtIndex);

                                                              var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                              var testString=stringAtIndex.slice(0,headingEndIndex);
                                                              var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                              finalArray14.push(ObjectToSaveInArray);

                                                            }
                                                          })





                                                          var finalArray15=[];

                                                          RNFS.readFileAssets(path15)
                                                              .then((contents) => {
                                                                var contentString = contents.toString();
                                                                // console.log('Content Of Complete Book' + contentString);
                                                                var chaptersArray=[];
                                                                // For Chapters Titles denoted by & Sign
                                                                for (var i = 0; i < contentString.length; i++) {
                                                                  var firstIndex=contentString.indexOf('&',i);
                                                                  var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                  if (secondIndex==-1 || firstIndex==-1) {
                                                                    break;
                                                                  }

                                                                  // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                  var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                  chaptersArray.push(tempString);
                                                                  i=secondIndex;
                                                                }

                                                                // console.log('Chapters Array is ='+chaptersArray);

                                                                var titlesArray=[];

                                                                // For Main Titles denoted by @ Sign
                                                                for (var i = 0; i < chaptersArray.length; i++) {
                                                                  var stringAtIndex = chaptersArray[i];
                                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                  // console.log('Akhzar is testing heading' + testString);

                                                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                                                    var firstIndex=stringAtIndex.indexOf('@',x);
                                                                    var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                                      break;
                                                                    }

                                                                    // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                    // Save String and Heading Both in Array
                                                                    var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                    titlesArray.push(ObjectToSaveInArray);
                                                                    x=secondIndex;

                                                                  }

                                                                }

                                                                // console.log('Titles Array is ='+titlesArray);

                                                                var tempArray=[];
                                                                // For Nuskha Jaat denoted by $ Sign
                                                                for (var i = 0; i < titlesArray.length; i++) {

                                                                  var mainHeading = titlesArray[i].heading;
                                                                  var stringAtIndex = titlesArray[i].data;
                                                                  // console.log('Main Heading is == ' + mainHeading);
                                                                  // console.log('stringAtIndex is == ' + stringAtIndex);

                                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                  // console.log('Akhzar is testing heading' + testString);

                                                                  for (var x = 0; x < stringAtIndex.length; x++) {

                                                                    var firstIndex=stringAtIndex.indexOf('$',x);
                                                                    var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                    if (secondIndex==-1 || firstIndex==-1) {
                                                                      break;
                                                                    }

                                                                    // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                    var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                    // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                    var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                    tempArray.push(ObjectToSaveInArray);
                                                                    x=secondIndex;

                                                                  }
                                                                }
                                                                // console.log('Main Temp Temp Array is ='+tempArray);

                                                                // Extract Headings from Sub Content From $ Sign.

                                                                // For Nuskha Jaat denoted by $ Sign
                                                                for (var i = 0; i < tempArray.length; i++) {

                                                                  var mainHeading = tempArray[i].mainheading;
                                                                  var subHeading = tempArray[i].subheading;
                                                                  var stringAtIndex = tempArray[i].data;

                                                                  // console.log('Main Main Heading is == ' + mainHeading);
                                                                  // console.log('Sub Sub Heading is == ' + subHeading);
                                                                  // console.log('Main Main Data is == ' + stringAtIndex);

                                                                  var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                  var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                  var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                  finalArray15.push(ObjectToSaveInArray);

                                                                }
                                                              })





                                                              var finalArray16=[];

                                                              RNFS.readFileAssets(path16)
                                                                  .then((contents) => {
                                                                    var contentString = contents.toString();
                                                                    // console.log('Content Of Complete Book' + contentString);
                                                                    var chaptersArray=[];
                                                                    // For Chapters Titles denoted by & Sign
                                                                    for (var i = 0; i < contentString.length; i++) {
                                                                      var firstIndex=contentString.indexOf('&',i);
                                                                      var secondIndex=contentString.indexOf('&',firstIndex+1);
                                                                      if (secondIndex==-1 || firstIndex==-1) {
                                                                        break;
                                                                      }

                                                                      // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                      var tempString=contentString.slice(firstIndex+1,secondIndex-1);
                                                                      chaptersArray.push(tempString);
                                                                      i=secondIndex;
                                                                    }

                                                                    // console.log('Chapters Array is ='+chaptersArray);

                                                                    var titlesArray=[];

                                                                    // For Main Titles denoted by @ Sign
                                                                    for (var i = 0; i < chaptersArray.length; i++) {
                                                                      var stringAtIndex = chaptersArray[i];
                                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                      // console.log('Akhzar is testing heading' + testString);

                                                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                                                        var firstIndex=stringAtIndex.indexOf('@',x);
                                                                        var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
                                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                                          break;
                                                                        }

                                                                        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                        // Save String and Heading Both in Array
                                                                        var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
                                                                        titlesArray.push(ObjectToSaveInArray);
                                                                        x=secondIndex;

                                                                      }

                                                                    }

                                                                    // console.log('Titles Array is ='+titlesArray);

                                                                    var tempArray=[];
                                                                    // For Nuskha Jaat denoted by $ Sign
                                                                    for (var i = 0; i < titlesArray.length; i++) {

                                                                      var mainHeading = titlesArray[i].heading;
                                                                      var stringAtIndex = titlesArray[i].data;
                                                                      // console.log('Main Heading is == ' + mainHeading);
                                                                      // console.log('stringAtIndex is == ' + stringAtIndex);

                                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                      // console.log('Akhzar is testing heading' + testString);

                                                                      for (var x = 0; x < stringAtIndex.length; x++) {

                                                                        var firstIndex=stringAtIndex.indexOf('$',x);
                                                                        var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
                                                                        if (secondIndex==-1 || firstIndex==-1) {
                                                                          break;
                                                                        }

                                                                        // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
                                                                        var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
                                                                        // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());

                                                                        var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
                                                                        tempArray.push(ObjectToSaveInArray);
                                                                        x=secondIndex;

                                                                      }
                                                                    }
                                                                    // console.log('Main Temp Temp Array is ='+tempArray);

                                                                    // Extract Headings from Sub Content From $ Sign.

                                                                    // For Nuskha Jaat denoted by $ Sign
                                                                    for (var i = 0; i < tempArray.length; i++) {

                                                                      var mainHeading = tempArray[i].mainheading;
                                                                      var subHeading = tempArray[i].subheading;
                                                                      var stringAtIndex = tempArray[i].data;

                                                                      // console.log('Main Main Heading is == ' + mainHeading);
                                                                      // console.log('Sub Sub Heading is == ' + subHeading);
                                                                      // console.log('Main Main Data is == ' + stringAtIndex);

                                                                      var headingEndIndex = stringAtIndex.indexOf('\r',1);
                                                                      var testString=stringAtIndex.slice(0,headingEndIndex);
                                                                      var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
                                                                      finalArray16.push(ObjectToSaveInArray);

                                                                    }

                                                                    this.setState({showProgress:false});
                                                                    AsyncStorage.setItem('booksData', JSON.stringify(this.state.bookArray));

                                                                  })


      var mainArray=[];

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

      // For Permanent Storage Of Data

// readFileAssets
}
}


















NavigateToScreen(ScreenName,flag){

  var object={isOption1:true}
  this.props.navigator.resetTo({
  screen: ScreenName,
  passProps:{object},
  navigatorStyle: {
    navBarHidden:true,
  }
});
  // Navigation.startSingleScreenApp({
  //   screen: {
  //     screen: 'HomeScreen',
  //     title: 'Home',
  //     navigatorStyle: {
  //       navBarHidden:true,
  //         },
  //   },
  //   appStyle: {
  //       statusBarColor: 'black',
  //     },
  //       drawer: {
  //           right: {
  //             screen: 'SideMenu',
  //           },
  //         style:{ // ( iOS only )
  //           drawerShadow: true, // optional, add this if you want a side menu drawer shadow
  //           contentOverlayColor: 'rgba(0,0,0,0.30)', // optional, add this if you want a overlay color when drawer is open
  //           leftDrawerWidth: 80 ,// optional, add this if you want a define left drawer width (50=percent)
  //           rightDrawerWidth: 80 // optional, add this if you want a define right drawer width (50=percent)
  //         },
  //         disableOpenGesture: true ,
  //         }
  // });



}

actButton1(){
// Alert.alert('1')
//this.NavigateToScreen('BookCatagoryScreen',false);
this.props.navigator.push({
  screen: "BookCatagoryScreen",
  navigatorStyle: {
    navBarHidden:true,
  },
});
}

actButton2(){
// Alert.alert('2')
this.props.navigator.push({
  screen: "BooksChapters",
  navigatorStyle: {
    navBarHidden:true,
  },
});
//this.NavigateToScreen('HomeScreen',true);
}

actButton3(){
// Alert.alert('3')
this.props.navigator.push({
  screen: "HomeScreen",
  navigatorStyle: {
    navBarHidden:true,
  },
});
//this.NavigateToScreen('HomeScreen',false);

}

actButton4(){
// Alert.alert('4')
this.props.navigator.push({
  screen: "HomeScreen",
  navigatorStyle: {
    navBarHidden:true,
  },
});
//this.NavigateToScreen('HomeScreen',false);
}




render(){
  return(
    <ScrollView style={styles.outerContainer}>

    <KeyboardAwareScrollView>


          <View style={{
            marginTop:80,
            alignItems:'center',
            justifyContent:'center',
          }}>

            <View style={{
              width:140,
              height:140,
              borderRadius:50,
            
            }}>
            <Image source={logoImage} resizeMode={'contain'}
                  style={{
                    width:140,
                   height:140,
                   borderRadius:50,
              
                  }}/>


            </View>

            <Text style={{
              marginTop:10,
              fontSize:19,
              color:'black',
              fontWeight:'bold',

            }}>ادارہ مطبوعات سلیمانی</Text>

          </View>



          <View style={{
            marginTop:40,
            alignItems:'center',
            justifyContent:'center',
          }}>
          <TouchableOpacity onPress={()=>this.actButton1()} style={{
           // borderWidth:1,
            borderRadius:20,
            height:40,
            width:150,
            backgroundColor:'#38803B',
            alignItems:'center',
            justifyContent:'center',
          }}>
          <Text style={{ color:'white', fontWeight:'bold',

          }}>طبی کتب</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.actButton2()} style={{
           // borderWidth:1,
            borderRadius:20,
            backgroundColor:'#38803B',
            marginTop:20,
            height:40,
            width:150,
            alignItems:'center',
            justifyContent:'center', 
          }}>
          <Text style={{ color:'white', fontWeight:'bold',

          }}>امراض اور علاج</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>this.actButton3()} style={{
           // borderWidth:1,
            borderRadius:20,
            backgroundColor:'#38803B',
            marginTop:20,
            height:40,
            width:150,
            alignItems:'center',
            justifyContent:'center',
          }}>
          <Text style={{ color:'white', fontWeight:'bold',

          }}>نسخہ جات</Text>
          </TouchableOpacity>


          </View>


              <View style={{
              marginTop:80,
              backgroundColor:'#38803B',
              // borderBottomWidth:10,
              // borderTopWidth:100,
              // height:20,
              // borderRightWidth:40,

              borderTopColor:'blue',
              // borderBottomWidth:20,
              flex:1,
              height:DEVICE_HEIGHT/4,
              }}>

              <View style={{
                borderTopWidth:80,
                borderLeftWidth:DEVICE_WIDTH,
                borderLeftColor:'white',
                borderTopColor:'#38803B',
                borderBottomColor:'#38803B',
             //    backgroundColor:'orange',
                transform: [
                  {rotate: '180deg'}
                  ]
              }}
              
              />
              <View style={{
                position:'absolute',

                left:'43%',
                top:'5%',
              }}>

                <TouchableOpacity onPress={()=>this.actButton4()} style={{
                  width:60,
                  height:60,
                  borderWidth:1,
                  borderColor:'white',
                  backgroundColor:'#38803B',
                  alignItems:'center',
                  justifyContent:'center',
                  borderRadius:50,
                }}>
                <Image source={backArrow} style={{width:30,height:22}}/>
                </TouchableOpacity>
              </View>

              </View>

                        <Loader showProgress={this.state.showProgress}/>

      </KeyboardAwareScrollView>

    </ScrollView>
  )

}


}


const styles=StyleSheet.create({
outerContainer:{
  flex:1,
  height:DEVICE_HEIGHT,
 // backgroundColor:'#85C226',
 // backgroundColor:'transparent',
 
},
inputStyle:{
  backgroundColor:'#B4B4B4',
  marginLeft:50,
  marginRight:50,
  height:45,
  borderWidth:1,
  borderColor:'#BBBBBB',
  paddingLeft:10,
  paddingRight:10,
  marginTop:20,

}
})




module.exports=Screen4;
