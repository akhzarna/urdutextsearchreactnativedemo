
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
  SectionList,
} from 'react-native';

var Header=require('./Header');
var arrow_left=require('./Icons/arrow_left.png');
import HTMLView from 'react-native-htmlview';
var isiPhone=Platform.OS === 'ios';

class DisplayResultScreen extends Component{
  constructor(props){
    super(props);

          Alert.alert('DisplayResultScreen');

          var finalArray=[];
          for (var x = 0; x < this.props.navigation.state.params.finalArray.length; x++) {
          var arrayList=[];
          for (var i = 0; i < this.props.navigation.state.params.finalArray[x].searchedArray.length; i++) {
            var paragraph=''+this.props.navigation.state.params.finalArray[x].searchedArray[i].data.data;
            var searchWord=this.props.navigation.state.params.finalArray[x].word;
            var index=paragraph.indexOf(searchWord);
            // // console.log('Index to HightLight is = '+index);
            var data='';
            var firstIndex=-1;
            var secondIndex=-1;
            if (index-15>0) {
              var tempIndex=index-15;
              firstIndex=paragraph.indexOf(' ',tempIndex);
            }else{
              firstIndex=0;
            }
            secondIndex=paragraph.indexOf(' ',index+100);
            if (secondIndex==-1) {
              secondIndex==paragraph.length;
            }
            data=paragraph.slice(firstIndex,secondIndex);
            data=data.replace(/\r|\n/g,' ');
            data=data.replace(/#/g,' ');
            // data=data.replace(searchWord,'<b>'+searchWord+'</b>');
            // data='<p>'+data+'</p>';
            var frequency=this.findFrequencyOfSearchWord(paragraph)

            // // console.log('paragraph is = ' + paragraph);
            // // console.log('data is = ' + data);
            // // console.log('key is = ' + i);
            // // console.log('frequency is = ' + frequency);

            var object={data:data,key:i,frequency:frequency};
            arrayList.push(object)
            arrayList.sort(function(a,b){
              return parseInt(b.frequency)-parseInt(a.frequency);
            })

        }

            finalArray.push(arrayList);

      }

      var tempNewArray=[];
      for (var i = 0; i < finalArray.length; i++) {
        var data=finalArray[i];
        var title=this.props.navigation.state.params.finalArray[i].bookname
        var key=i;
        var object={data:data,key:key,title:title};
        tempNewArray.push(object);
      }

      this.state={dataArray:tempNewArray}
      // console.log('Final Data Array for Section LIST is = ' + this.state.dataArray);
}

findFrequencyOfSearchWord(paragraph){

    var searchWord=this.props.navigation.state.params.finalArray[0].word;
    var freqCounter = 0;
    var headingEndIndex = paragraph.indexOf('\r',1);

    for (var j = 0; j <paragraph.length; j++) {
            var index=paragraph.indexOf(searchWord,j);
            if (index == -1) {
              break;
            }
            else{
              freqCounter++;
            }
            if (index<headingEndIndex) {
              freqCounter=1000;
            }
            j=index+1;
    }
    return freqCounter;
}

rowSelected(item,section){

var bookName= section.title;
var dataSelected=this.props.navigation.state.params.finalArray[section.key].searchedArray[item.key].data;
var searchWord=this.props.navigation.state.params.finalArray[0].word;
var selectedItem={key:item.key,data:dataSelected,searchWord:searchWord,bookName:bookName};

  this.props.navigation.navigate('DescriptionScreen',{
    selectedItem:selectedItem,
  });

}

  render(){

    return(

      <View style={styles.outerContainer}>
      <Header title='نتائج ' navigator={this.props.navigator} navigation={this.props.navigation}/>
      <SectionList
      renderItem={({item,section}) => <TouchableOpacity onPress={()=>this.rowSelected(item,section)}>
                    <View style={styles.textView}>
                    <View style={{flex:1}}>
                    <Image source={arrow_left} style={styles.iconDimention}/>
                    </View>
                    <View style={{flex:8}}>
                    <Text numberOfLines={1} style={styles.textStyle}>{item.data}</Text>
                    </View>
                    </View>
                    <View style={styles.lineView}/>
                    </TouchableOpacity>}
      renderSectionHeader={({section}) =>
      <View style={{height:40,backgroundColor:'#38803B',justifyContent:'center'}}>
      <Text style={{color:'white',textAlign:'right',
      paddingLeft:15,paddingRight:15,
      fontSize:20,
      fontFamily:'Jameel-Noori-Nastaleeq',
        }}>
        {section.title}
        </Text>
      </View>
      }
      sections={this.state.dataArray}
      />

      {
      //
      // <Header title='نتائج' navigator={this.props.navigator}/>
      //         <FlatList
      //               data={this.state.dataArray}
      //               renderItem={({item}) =>
      //               <TouchableOpacity onPress={()=>this.rowSelected(item)}>
      //               <View style={styles.textView}>
      //               <View style={{flex:1}}>
      //               <Image source={arrow_left} style={styles.iconDimention}/>
      //               </View>
      //               <View style={{flex:8}}>
      //               <Text numberOfLines={1} style={styles.textStyle}>{item.data}</Text>
      //               </View>
      //               </View>
      //               <View style={styles.lineView}/>
      //               </TouchableOpacity>
      //             }
      //             />
      }
      </View>
    );
  }
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
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  b:{
    fontWeight:'bold',
    color:'red',
  }
});

module.exports=DisplayResultScreen;
