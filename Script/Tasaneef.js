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
          dataArray:[
            {bookName:'خواص ارنڈ',key:0,cover:require('./Icons/arind.jpg'),description:''},
            {bookName:'خواص اندرائن',key:1,cover:require('./Icons/indrain.jpg'),description:''},
            {bookName:'خواص انگور',key:2,cover:require('./Icons/angoor.jpg'),description:''},
            {bookName:'خواص آم',key:3,cover:require('./Icons/aam.jpg'),description:''},
            {bookName:'خواص آک',key:4,cover:require('./Icons/aak.jpg'),description:''},
            {bookName:'خواص بادام',key:5,cover:require('./Icons/badam.jpg'),description:''},
            {bookName:'خواص برگد',key:6,cover:require('./Icons/bargad.jpg'),description:''},
            {bookName:'خواص دھتورہ',key:7,cover:require('./Icons/dhatoora.jpg'),description:''},
            {bookName:'خواص شہد',key:8,cover:require('./Icons/bargad.jpg'),description:''},
            {bookName:'دھنیہ',key:9,cover:require('./Icons/bargad.jpg'),description:''},
            {bookName:'دودھ',key:10,cover:require('./Icons/bargad.jpg'),description:''},
            {bookName:'گاجر',key:11,cover:require('./Icons/bargad.jpg'),description:''},
            {bookName:'گھی کوار',key:12,cover:require('./Icons/bargad.jpg'),description:''},
            {bookName:'گھی',key:13,cover:require('./Icons/bargad.jpg'),description:''},
            {bookName:'دھی',key:14,cover:require('./Icons/bargad.jpg'),description:''},
            {bookName:'گل سرک',key:15,cover:require('./Icons/bargad.jpg'),description:''},
          ],
          BookNameArray:[ 'ارنڈ','اندرائین','انگور','آم','خواص آک','بادام','برگد','دھتورہ','خواص شہد','دھنیہ','دودھ','گاجر','گھی کوار','گھی','دھی','گل سرک'],
          bookArray:[],
      }
    }

    // onNavigationEvent(event) {
    //       // handle a deep link
    //         if (event.type == 'DeepLink') {
    //           const parts = event.link;
    //           if (parts=='Home') {
    //             // console.log(parts);
    //             return;
    //           }else{
    //                 this.props.navigator.resetTo({
    //                 screen: parts,
    //                 navigatorStyle: {
    //                   navBarHidden:true,
    //                 },
    //               });
    //             }
    //       }
    // }

    componentDidMount() {
      // Alert.alert('Tasaneef');
      AsyncStorage.getItem("booksData").then((value) => {
      // console.log('value = ',value);
      var testVar = JSON.parse(value);
      // console.log('testVar = ',testVar);
      if (testVar == null) {
        // this.actionButtonLoadBook();
      }else{
      this.setState({
        bookArray:JSON.parse(value)
      });
      // console.log('Book Listing state array is = ',this.state.bookArray.count);
  }
      }).done();
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
        console.log('Final Dict is = ',bookName);
        // console.log('Final Array is = ',bookName.chapter_name);
        // Alert.alert(this.state.bookArray[item.key].data);

        this.props.navigation.navigate('ChaptersListComponent',{
          finalArray:this.state.bookArray[item.key].data,
          finalDict:this.state.bookArray[item.key],
        });

        // this.fetchDataFromDB(bookName);

        // Old Logic
        // var bookNameWithoutExtension = bookName;
        // bookName = bookName+".txt";
        // var finalArray=[];
        // var bookArray;
        // console.log('Book Array Length is ',this.state.bookArray.length);
        //
        // for (var x = 0; x < this.state.bookArray.length; x++) {
        //   if (this.state.bookArray[x].title == bookNameWithoutExtension) {
        //     console.log('BookArray Title is = ' + this.state.bookArray[x].title);
        //     var searchedArray=[];
        //     var bookArray=this.state.bookArray[x].data;
        //     console.log('BookArray Data is =',bookArray);
        //     for (var i = 0; i < bookArray.length; i++) {
        //       var object={key:i,data:bookArray[i]}
        //       searchedArray.push(object);
        //       // Alert.alert('searchedArray Length');
        //     }
        //     break;
        //   }
        // }
        //
        // console.log('searchedArray Data is =',searchedArray);
        //
        // var searchResult;
        // var flag = 0;
        // for (var i = flag; i < searchedArray.length; i++) {
        //   var title;
        //   var arrayForSections=[];
        //   for (var j = flag; j < searchedArray.length; j++) {
        //     if (searchedArray[i].data.mainheading == searchedArray[j].data.mainheading) {
        //       console.log('آئین');
        //        arrayForSections.push(searchedArray[j]);
        //        title = searchedArray[j].data.mainheading;
        //     }else{
        //       flag = j;
        //       break;
        //     }
        //   }
        //
        //   if (arrayForSections.length>0) {
        //     searchResult={'word':'Testing','searchedArray':arrayForSections,bookname:title};
        //     finalArray.push(searchResult);
        //   }
        // }
        //
        // console.log('arrayForSections',arrayForSections);
        //
        // var book={bookName:bookName,
        //           bookNameWithoutExtension:bookNameWithoutExtension};
        // this.props.navigation.navigate('ChaptersListScreen',{
        //   finalArray:finalArray,
        //   book:book,
        // });

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
