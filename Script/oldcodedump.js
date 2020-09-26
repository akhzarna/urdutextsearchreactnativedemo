
// HomeScreen Code for Android to Get All Books Data

// }else{
//
//   // isAndroid
//   // For Android Path is different
//
//   var  articles='Articles.txt';
//   var  arind='ارنڈ.txt';
//   var  indrain='اندرائین.txt';
//   var  angoor='انگور.txt';
//   var  aam='ام.txt';
//   var  khawasaak='خواص اک.txt';
//   var  badaam='بادام.txt';
//   var  bargad='برگد.txt';
//   var  dhatoora='دھتورہ.txt';
//   var  khawasshehad='خواص شہد.txt';
//   var  dhania='دھنیہ.txt';
//   var  doodh='دودھ.txt';
//   var  gajar='گاجر.txt';
//   var  gheekawar='گھی کوار.txt';
//   var  ghee='گھی.txt';
//   var  dahi='دھی.txt';
//   var  gulsarak='گل سرک.txt';
//
//   // Alert.alert('title')
//   RNFS.readDirAssets('') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//     .then((result) => {
//     // stat the first file
//       // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//     });
//
//
//     // For Articles
//     var mainArray=[];
//     var finalArray0=[];
//     RNFS.readFileAssets(articles)
//         .then((contents) => {
//           var contentString = contents.toString();
//           var articlesNameArray=[];
//           var articlesHeadingArray=[];
//           var articlesDetailArray=[];
//           for (var i = 0; i < contentString.length; i++) {
//             // Main Heading denoted by & Sign
//             var firstIndexname=contentString.indexOf('&',i);
//             var secondIndexname=contentString.indexOf('&',firstIndexname+1);
//             if (secondIndexname==-1 || firstIndexname==-1) {
//               break;
//             }
//
//             var tempString=contentString.slice(firstIndexname+1,secondIndexname-1);
//             articlesNameArray.push(tempString);
//             i=secondIndexname;
//             }
//
//             for (var i = 0; i < contentString.length; i++) {
//             // ArticleHeading denoted by @ Sign
//             var firstIndexheading=contentString.indexOf('@',i);
//             var secondIndexheading=contentString.indexOf('@',firstIndexheading+1);
//             if (secondIndexheading==-1 || firstIndexheading==-1) {
//               break;
//             }
//
//             var tempString=contentString.slice(firstIndexheading+1,secondIndexheading-1);
//             articlesHeadingArray.push(tempString);
//             i=secondIndexheading;
//           }
//
//           for (var i = 0; i < contentString.length; i++) {
//             // ArticleDetail denoted by $ Sign
//             var firstIndexdetail=contentString.indexOf('$',i);
//             var secondIndexdetail=contentString.indexOf('$',firstIndexdetail+1);
//             if (secondIndexdetail==-1 || firstIndexdetail==-1) {
//               break;
//             }
//
//             var tempString=contentString.slice(firstIndexdetail+1,secondIndexdetail-1);
//             articlesDetailArray.push(tempString);
//             i=secondIndexdetail;
//
//           }
//
//           for (var x = 0; x < articlesDetailArray.length; x++) {
//             var ObjectToSaveInArray = {key:x,mainheading:articlesNameArray[0],subheading:articlesHeadingArray[x],subbestheading:articlesHeadingArray[x],data:articlesDetailArray[x].trim()};
//             finalArray0.push(ObjectToSaveInArray);
//           }
//
//         })
//
//   var finalArray1=[];
//   RNFS.readFileAssets(arind)
//       .then((contents) => {
//         console.log('Arind Book is = ',contents);
//         var contentString = contents.toString();
//         var chaptersArray=[];
//         // For Chapters Titles denoted by & Sign
//         for (var i = 0; i < contentString.length; i++) {
//           var firstIndex=contentString.indexOf('&',i);
//           var secondIndex=contentString.indexOf('&',firstIndex+1);
//           if (secondIndex==-1 || firstIndex==-1) {
//             break;
//           }
//
//           var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//           chaptersArray.push(tempString);
//           i=secondIndex;
//         }
//
//         var titlesArray=[];
//
//         // For Main Titles denoted by @ Sign
//         for (var i = 0; i < chaptersArray.length; i++) {
//           var stringAtIndex = chaptersArray[i];
//           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//           var testString=stringAtIndex.slice(0,headingEndIndex);
//           // // // // console.log('Akhzar is testing heading' + testString);
//
//           for (var x = 0; x < stringAtIndex.length; x++) {
//
//             var firstIndex=stringAtIndex.indexOf('@',x);
//             var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//             if (secondIndex==-1 || firstIndex==-1) {
//               break;
//             }
//
//             // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//             // Save String and Heading Both in Array
//             var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//             titlesArray.push(ObjectToSaveInArray);
//             x=secondIndex;
//
//           }
//
//         }
//
//         // // // // console.log('Titles Array is ='+titlesArray);
//
//         var tempArray=[];
//         // For Nuskha Jaat denoted by $ Sign
//         for (var i = 0; i < titlesArray.length; i++) {
//
//           var mainHeading = titlesArray[i].heading;
//           var stringAtIndex = titlesArray[i].data;
//           // // // // console.log('Main Heading is == ' + mainHeading);
//           // // // // console.log('stringAtIndex is == ' + stringAtIndex);
//
//           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//           var testString=stringAtIndex.slice(0,headingEndIndex);
//           // // // // console.log('Akhzar is testing heading' + testString);
//
//           for (var x = 0; x < stringAtIndex.length; x++) {
//
//             var firstIndex=stringAtIndex.indexOf('$',x);
//             var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//             if (secondIndex==-1 || firstIndex==-1) {
//               break;
//             }
//
//             // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//             // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
//
//             var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//             tempArray.push(ObjectToSaveInArray);
//             x=secondIndex;
//
//           }
//         }
//         // // // // console.log('Main Temp Temp Array is ='+tempArray);
//
//         // Extract Headings from Sub Content From $ Sign.
//
//         // For Nuskha Jaat denoted by $ Sign
//         for (var i = 0; i < tempArray.length; i++) {
//
//           var mainHeading = tempArray[i].mainheading;
//           var subHeading = tempArray[i].subheading;
//           var stringAtIndex = tempArray[i].data;
//
//           // // // // console.log('Main Main Heading is == ' + mainHeading);
//           // // // // console.log('Sub Sub Heading is == ' + subHeading);
//           // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//           var testString=stringAtIndex.slice(0,headingEndIndex);
//           var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//           finalArray1.push(ObjectToSaveInArray);
//         }
//       })
//
//       var finalArray2=[];
//
//       RNFS.readFileAssets(indrain)
//           .then((contents) => {
//             console.log('Indrain Book is = ',contents);
//             var contentString = contents.toString();
//
//             var chaptersArray=[];
//             // For Chapters Titles denoted by & Sign
//             for (var i = 0; i < contentString.length; i++) {
//               var firstIndex=contentString.indexOf('&',i);
//               var secondIndex=contentString.indexOf('&',firstIndex+1);
//               if (secondIndex==-1 || firstIndex==-1) {
//                 break;
//               }
//
//               // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//               var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//               chaptersArray.push(tempString);
//               i=secondIndex;
//             }
//
//             // // // // console.log('Chapters Array is ='+chaptersArray);
//
//             var titlesArray=[];
//
//             // For Main Titles denoted by @ Sign
//             for (var i = 0; i < chaptersArray.length; i++) {
//               var stringAtIndex = chaptersArray[i];
//               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//               var testString=stringAtIndex.slice(0,headingEndIndex);
//               // // // // console.log('Akhzar is testing heading' + testString);
//
//               for (var x = 0; x < stringAtIndex.length; x++) {
//
//                 var firstIndex=stringAtIndex.indexOf('@',x);
//                 var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                 if (secondIndex==-1 || firstIndex==-1) {
//                   break;
//                 }
//
//                 // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                 // Save String and Heading Both in Array
//                 var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                 titlesArray.push(ObjectToSaveInArray);
//                 x=secondIndex;
//
//               }
//
//             }
//
//             // // // // console.log('Titles Array is ='+titlesArray);
//
//             var tempArray=[];
//             // For Nuskha Jaat denoted by $ Sign
//             for (var i = 0; i < titlesArray.length; i++) {
//
//               var mainHeading = titlesArray[i].heading;
//               var stringAtIndex = titlesArray[i].data;
//               // // // // console.log('Main Heading is == ' + mainHeading);
//               // // // // console.log('stringAtIndex is == ' + stringAtIndex);
//
//               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//               var testString=stringAtIndex.slice(0,headingEndIndex);
//               // // // // console.log('Akhzar is testing heading' + testString);
//
//               for (var x = 0; x < stringAtIndex.length; x++) {
//
//                 var firstIndex=stringAtIndex.indexOf('$',x);
//                 var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                 if (secondIndex==-1 || firstIndex==-1) {
//                   break;
//                 }
//
//                 // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                 // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
//
//                 var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                 tempArray.push(ObjectToSaveInArray);
//                 x=secondIndex;
//
//               }
//             }
//             // // // // console.log('Main Temp Temp Array is ='+tempArray);
//
//             // Extract Headings from Sub Content From $ Sign.
//
//             // For Nuskha Jaat denoted by $ Sign
//             for (var i = 0; i < tempArray.length; i++) {
//
//               var mainHeading = tempArray[i].mainheading;
//               var subHeading = tempArray[i].subheading;
//               var stringAtIndex = tempArray[i].data;
//
//               // // // // console.log('Main Main Heading is == ' + mainHeading);
//               // // // // console.log('Sub Sub Heading is == ' + subHeading);
//               // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//               var testString=stringAtIndex.slice(0,headingEndIndex);
//               var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//               finalArray2.push(ObjectToSaveInArray);
//
//             }
//           })
//
//
//           var finalArray3=[];
//
//           RNFS.readFileAssets(angoor)
//               .then((contents) => {
//                 var contentString = contents.toString();
//                 var chaptersArray=[];
//                 // For Chapters Titles denoted by & Sign
//                 for (var i = 0; i < contentString.length; i++) {
//                   var firstIndex=contentString.indexOf('&',i);
//                   var secondIndex=contentString.indexOf('&',firstIndex+1);
//                   if (secondIndex==-1 || firstIndex==-1) {
//                     break;
//                   }
//
//                   var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                   chaptersArray.push(tempString);
//                   i=secondIndex;
//                 }
//
//                 // // // // console.log('Chapters Array is ='+chaptersArray);
//
//                 var titlesArray=[];
//
//                 // For Main Titles denoted by @ Sign
//                 for (var i = 0; i < chaptersArray.length; i++) {
//                   var stringAtIndex = chaptersArray[i];
//                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                   var testString=stringAtIndex.slice(0,headingEndIndex);
//                   // // // // console.log('Akhzar is testing heading' + testString);
//
//                   for (var x = 0; x < stringAtIndex.length; x++) {
//
//                     var firstIndex=stringAtIndex.indexOf('@',x);
//                     var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                     if (secondIndex==-1 || firstIndex==-1) {
//                       break;
//                     }
//
//                     // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                     var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                     // Save String and Heading Both in Array
//                     var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                     titlesArray.push(ObjectToSaveInArray);
//                     x=secondIndex;
//
//                   }
//
//                 }
//
//                 // // // // console.log('Titles Array is ='+titlesArray);
//
//                 var tempArray=[];
//                 // For Nuskha Jaat denoted by $ Sign
//                 for (var i = 0; i < titlesArray.length; i++) {
//
//                   var mainHeading = titlesArray[i].heading;
//                   var stringAtIndex = titlesArray[i].data;
//                   // // // // console.log('Main Heading is == ' + mainHeading);
//                   // // // // console.log('stringAtIndex is == ' + stringAtIndex);
//
//                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                   var testString=stringAtIndex.slice(0,headingEndIndex);
//                   // // // // console.log('Akhzar is testing heading' + testString);
//
//                   for (var x = 0; x < stringAtIndex.length; x++) {
//
//                     var firstIndex=stringAtIndex.indexOf('$',x);
//                     var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                     if (secondIndex==-1 || firstIndex==-1) {
//                       break;
//                     }
//
//                     // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                     var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                     // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
//
//                     var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                     tempArray.push(ObjectToSaveInArray);
//                     x=secondIndex;
//
//                   }
//                 }
//                 // // // // console.log('Main Temp Temp Array is ='+tempArray);
//
//                 // Extract Headings from Sub Content From $ Sign.
//
//                 // For Nuskha Jaat denoted by $ Sign
//                 for (var i = 0; i < tempArray.length; i++) {
//
//                   var mainHeading = tempArray[i].mainheading;
//                   var subHeading = tempArray[i].subheading;
//                   var stringAtIndex = tempArray[i].data;
//
//                   // // // // console.log('Main Main Heading is == ' + mainHeading);
//                   // // // // console.log('Sub Sub Heading is == ' + subHeading);
//                   // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                   var testString=stringAtIndex.slice(0,headingEndIndex);
//                   var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                   finalArray3.push(ObjectToSaveInArray);
//
//                 }
//               })
//
//
//               var finalArray4=[];
//
//               RNFS.readFileAssets(aam)
//                   .then((contents) => {
//                     console.log('Aam Book is = ',contents);
//                     var contentString = contents.toString();
//                     var chaptersArray=[];
//                     // For Chapters Titles denoted by & Sign
//                     for (var i = 0; i < contentString.length; i++) {
//                       var firstIndex=contentString.indexOf('&',i);
//                       var secondIndex=contentString.indexOf('&',firstIndex+1);
//                       if (secondIndex==-1 || firstIndex==-1) {
//                         break;
//                       }
//
//                       var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                       chaptersArray.push(tempString);
//                       i=secondIndex;
//                     }
//
//                     var titlesArray=[];
//
//                     // For Main Titles denoted by @ Sign
//                     for (var i = 0; i < chaptersArray.length; i++) {
//                       var stringAtIndex = chaptersArray[i];
//                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                       var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                       for (var x = 0; x < stringAtIndex.length; x++) {
//
//                         var firstIndex=stringAtIndex.indexOf('@',x);
//                         var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                         if (secondIndex==-1 || firstIndex==-1) {
//                           break;
//                         }
//
//                         var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                         // Save String and Heading Both in Array
//                         var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                         titlesArray.push(ObjectToSaveInArray);
//                         x=secondIndex;
//
//                       }
//
//                     }
//
//                     var tempArray=[];
//                     // For Nuskha Jaat denoted by $ Sign
//                     for (var i = 0; i < titlesArray.length; i++) {
//
//                       var mainHeading = titlesArray[i].heading;
//                       var stringAtIndex = titlesArray[i].data;
//
//                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                       var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                       for (var x = 0; x < stringAtIndex.length; x++) {
//
//                         var firstIndex=stringAtIndex.indexOf('$',x);
//                         var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                         if (secondIndex==-1 || firstIndex==-1) {
//                           break;
//                         }
//
//                         var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//
//                         var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                         tempArray.push(ObjectToSaveInArray);
//                         x=secondIndex;
//
//                       }
//                     }
//
//                     // Extract Headings from Sub Content From $ Sign.
//
//                     // For Nuskha Jaat denoted by $ Sign
//                     for (var i = 0; i < tempArray.length; i++) {
//
//                       var mainHeading = tempArray[i].mainheading;
//                       var subHeading = tempArray[i].subheading;
//                       var stringAtIndex = tempArray[i].data;
//
//                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                       var testString=stringAtIndex.slice(0,headingEndIndex);
//                       var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                       finalArray4.push(ObjectToSaveInArray);
//
//                     }
//                   })
//
//
//                   var finalArray5=[];
//
//                   RNFS.readFileAssets(khawasaak)
//                       .then((contents) => {
//                         console.log('Khawas Aak Book is = ',contents);
//                         var contentString = contents.toString();
//                         var chaptersArray=[];
//                         // For Chapters Titles denoted by & Sign
//                         for (var i = 0; i < contentString.length; i++) {
//                           var firstIndex=contentString.indexOf('&',i);
//                           var secondIndex=contentString.indexOf('&',firstIndex+1);
//                           if (secondIndex==-1 || firstIndex==-1) {
//                             break;
//                           }
//
//                           var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                           chaptersArray.push(tempString);
//                           i=secondIndex;
//                         }
//
//                         var titlesArray=[];
//
//                         // For Main Titles denoted by @ Sign
//                         for (var i = 0; i < chaptersArray.length; i++) {
//                           var stringAtIndex = chaptersArray[i];
//                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                           var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                           for (var x = 0; x < stringAtIndex.length; x++) {
//
//                             var firstIndex=stringAtIndex.indexOf('@',x);
//                             var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                             if (secondIndex==-1 || firstIndex==-1) {
//                               break;
//                             }
//
//                             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                             // Save String and Heading Both in Array
//                             var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                             titlesArray.push(ObjectToSaveInArray);
//                             x=secondIndex;
//
//                           }
//
//                         }
//
//                         var tempArray=[];
//                         // For Nuskha Jaat denoted by $ Sign
//                         for (var i = 0; i < titlesArray.length; i++) {
//
//                           var mainHeading = titlesArray[i].heading;
//                           var stringAtIndex = titlesArray[i].data;
//
//                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                           var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                           for (var x = 0; x < stringAtIndex.length; x++) {
//
//                             var firstIndex=stringAtIndex.indexOf('$',x);
//                             var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                             if (secondIndex==-1 || firstIndex==-1) {
//                               break;
//                             }
//
//                             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//
//                             var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                             tempArray.push(ObjectToSaveInArray);
//                             x=secondIndex;
//
//                           }
//                         }
//
//                         // Extract Headings from Sub Content From $ Sign.
//
//                         // For Nuskha Jaat denoted by $ Sign
//                         for (var i = 0; i < tempArray.length; i++) {
//
//                           var mainHeading = tempArray[i].mainheading;
//                           var subHeading = tempArray[i].subheading;
//                           var stringAtIndex = tempArray[i].data;
//
//                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                           var testString=stringAtIndex.slice(0,headingEndIndex);
//                           var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                           finalArray5.push(ObjectToSaveInArray);
//
//                         }
//                       })
//
//
//
//                       var finalArray6=[];
//
//
//                       RNFS.readFileAssets(badaam)
//                           .then((contents) => {
//                             console.log('Aik aur Book is = ',contents);
//                             var contentString = contents.toString();
//                             var chaptersArray=[];
//                             // For Chapters Titles denoted by & Sign
//                             for (var i = 0; i < contentString.length; i++) {
//                               var firstIndex=contentString.indexOf('&',i);
//                               var secondIndex=contentString.indexOf('&',firstIndex+1);
//                               if (secondIndex==-1 || firstIndex==-1) {
//                                 break;
//                               }
//
//                               var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                               chaptersArray.push(tempString);
//                               i=secondIndex;
//                             }
//
//                             var titlesArray=[];
//
//                             // For Main Titles denoted by @ Sign
//                             for (var i = 0; i < chaptersArray.length; i++) {
//                               var stringAtIndex = chaptersArray[i];
//                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                               var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                               for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                 var firstIndex=stringAtIndex.indexOf('@',x);
//                                 var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                 if (secondIndex==-1 || firstIndex==-1) {
//                                   break;
//                                 }
//
//                                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                 // Save String and Heading Both in Array
//                                 var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                 titlesArray.push(ObjectToSaveInArray);
//                                 x=secondIndex;
//
//                               }
//
//                             }
//
//                             var tempArray=[];
//                             // For Nuskha Jaat denoted by $ Sign
//                             for (var i = 0; i < titlesArray.length; i++) {
//
//                               var mainHeading = titlesArray[i].heading;
//                               var stringAtIndex = titlesArray[i].data;
//
//                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                               var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                               for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                 var firstIndex=stringAtIndex.indexOf('$',x);
//                                 var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                 if (secondIndex==-1 || firstIndex==-1) {
//                                   break;
//                                 }
//
//                                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//
//                                 var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                 tempArray.push(ObjectToSaveInArray);
//                                 x=secondIndex;
//
//                               }
//                             }
//
//                             // Extract Headings from Sub Content From $ Sign.
//
//                             // For Nuskha Jaat denoted by $ Sign
//                             for (var i = 0; i < tempArray.length; i++) {
//
//                               var mainHeading = tempArray[i].mainheading;
//                               var subHeading = tempArray[i].subheading;
//                               var stringAtIndex = tempArray[i].data;
//
//                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                               var testString=stringAtIndex.slice(0,headingEndIndex);
//                               var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                               finalArray6.push(ObjectToSaveInArray);
//
//                             }
//                           })
//
//
//
//                           var finalArray7=[];
//
//
//                           RNFS.readFileAssets(bargad)
//                               .then((contents) => {
//                                 var contentString = contents.toString();
//                                 var chaptersArray=[];
//                                 // For Chapters Titles denoted by & Sign
//                                 for (var i = 0; i < contentString.length; i++) {
//                                   var firstIndex=contentString.indexOf('&',i);
//                                   var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                   if (secondIndex==-1 || firstIndex==-1) {
//                                     break;
//                                   }
//
//                                   var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                   chaptersArray.push(tempString);
//                                   i=secondIndex;
//                                 }
//
//                                 var titlesArray=[];
//
//                                 // For Main Titles denoted by @ Sign
//                                 for (var i = 0; i < chaptersArray.length; i++) {
//                                   var stringAtIndex = chaptersArray[i];
//                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                   for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                     var firstIndex=stringAtIndex.indexOf('@',x);
//                                     var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                     if (secondIndex==-1 || firstIndex==-1) {
//                                       break;
//                                     }
//
//                                     var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                     // Save String and Heading Both in Array
//                                     var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                     titlesArray.push(ObjectToSaveInArray);
//                                     x=secondIndex;
//
//                                   }
//
//                                 }
//
//                                 var tempArray=[];
//                                 // For Nuskha Jaat denoted by $ Sign
//                                 for (var i = 0; i < titlesArray.length; i++) {
//
//                                   var mainHeading = titlesArray[i].heading;
//                                   var stringAtIndex = titlesArray[i].data;
//
//                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                   for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                     var firstIndex=stringAtIndex.indexOf('$',x);
//                                     var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                     if (secondIndex==-1 || firstIndex==-1) {
//                                       break;
//                                     }
//
//                                     var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//
//                                     var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                     tempArray.push(ObjectToSaveInArray);
//                                     x=secondIndex;
//
//                                   }
//                                 }
//
//                                 // Extract Headings from Sub Content From $ Sign.
//
//                                 // For Nuskha Jaat denoted by $ Sign
//                                 for (var i = 0; i < tempArray.length; i++) {
//
//                                   var mainHeading = tempArray[i].mainheading;
//                                   var subHeading = tempArray[i].subheading;
//                                   var stringAtIndex = tempArray[i].data;
//
//                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//                                   var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                   finalArray7.push(ObjectToSaveInArray);
//
//                                 }
//                               })
//
//                               var finalArray8=[];
//
//
//                               RNFS.readFileAssets(dhatoora)
//                                   .then((contents) => {
//                                     var contentString = contents.toString();
//                                     var chaptersArray=[];
//                                     // For Chapters Titles denoted by & Sign
//                                     for (var i = 0; i < contentString.length; i++) {
//                                       var firstIndex=contentString.indexOf('&',i);
//                                       var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                       if (secondIndex==-1 || firstIndex==-1) {
//                                         break;
//                                       }
//
//                                       var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                       chaptersArray.push(tempString);
//                                       i=secondIndex;
//                                     }
//
//                                     var titlesArray=[];
//
//                                     // For Main Titles denoted by @ Sign
//                                     for (var i = 0; i < chaptersArray.length; i++) {
//                                       var stringAtIndex = chaptersArray[i];
//                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                       for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                         var firstIndex=stringAtIndex.indexOf('@',x);
//                                         var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                         if (secondIndex==-1 || firstIndex==-1) {
//                                           break;
//                                         }
//
//                                         var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                         // Save String and Heading Both in Array
//                                         var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                         titlesArray.push(ObjectToSaveInArray);
//                                         x=secondIndex;
//
//                                       }
//
//                                     }
//
//                                     var tempArray=[];
//                                     // For Nuskha Jaat denoted by $ Sign
//                                     for (var i = 0; i < titlesArray.length; i++) {
//
//                                       var mainHeading = titlesArray[i].heading;
//                                       var stringAtIndex = titlesArray[i].data;
//                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                       for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                         var firstIndex=stringAtIndex.indexOf('$',x);
//                                         var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                         if (secondIndex==-1 || firstIndex==-1) {
//                                           break;
//                                         }
//
//                                         var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                         var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                         tempArray.push(ObjectToSaveInArray);
//                                         x=secondIndex;
//
//                                       }
//                                     }
//
//                                     // Extract Headings from Sub Content From $ Sign.
//
//                                     // For Nuskha Jaat denoted by $ Sign
//                                     for (var i = 0; i < tempArray.length; i++) {
//
//                                       var mainHeading = tempArray[i].mainheading;
//                                       var subHeading = tempArray[i].subheading;
//                                       var stringAtIndex = tempArray[i].data;
//
//                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//                                       var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                       finalArray8.push(ObjectToSaveInArray);
//
//                                     }
//                                   })
//
//
//
//                                   var finalArray9=[];
//
//                                   RNFS.readFileAssets(khawasshehad)
//                                       .then((contents) => {
//                                         var contentString = contents.toString();
//                                         var chaptersArray=[];
//                                         // For Chapters Titles denoted by & Sign
//                                         for (var i = 0; i < contentString.length; i++) {
//                                           var firstIndex=contentString.indexOf('&',i);
//                                           var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                           if (secondIndex==-1 || firstIndex==-1) {
//                                             break;
//                                           }
//
//                                           var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                           chaptersArray.push(tempString);
//                                           i=secondIndex;
//                                         }
//
//                                         var titlesArray=[];
//
//                                         // For Main Titles denoted by @ Sign
//                                         for (var i = 0; i < chaptersArray.length; i++) {
//                                           var stringAtIndex = chaptersArray[i];
//                                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                           var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                           for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                             var firstIndex=stringAtIndex.indexOf('@',x);
//                                             var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                             if (secondIndex==-1 || firstIndex==-1) {
//                                               break;
//                                             }
//
//                                             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                             // Save String and Heading Both in Array
//                                             var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                             titlesArray.push(ObjectToSaveInArray);
//                                             x=secondIndex;
//
//                                           }
//
//                                         }
//
//                                         var tempArray=[];
//                                         // For Nuskha Jaat denoted by $ Sign
//                                         for (var i = 0; i < titlesArray.length; i++) {
//
//                                           var mainHeading = titlesArray[i].heading;
//                                           var stringAtIndex = titlesArray[i].data;
//
//                                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                           var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                           for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                             var firstIndex=stringAtIndex.indexOf('$',x);
//                                             var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                             if (secondIndex==-1 || firstIndex==-1) {
//                                               break;
//                                             }
//
//                                             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//
//                                             var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                             tempArray.push(ObjectToSaveInArray);
//                                             x=secondIndex;
//
//                                           }
//                                         }
//
//                                         // Extract Headings from Sub Content From $ Sign.
//
//                                         // For Nuskha Jaat denoted by $ Sign
//                                         for (var i = 0; i < tempArray.length; i++) {
//
//                                           var mainHeading = tempArray[i].mainheading;
//                                           var subHeading = tempArray[i].subheading;
//                                           var stringAtIndex = tempArray[i].data;
//
//                                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                           var testString=stringAtIndex.slice(0,headingEndIndex);
//                                           var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                           finalArray9.push(ObjectToSaveInArray);
//
//                                         }
//                                       })
//
//
//
//                                       var finalArray10=[];
//
//
//
//                                       RNFS.readFileAssets(dhania)
//                                           .then((contents) => {
//                                             var contentString = contents.toString();
//                                             var chaptersArray=[];
//                                             // For Chapters Titles denoted by & Sign
//                                             for (var i = 0; i < contentString.length; i++) {
//                                               var firstIndex=contentString.indexOf('&',i);
//                                               var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                               if (secondIndex==-1 || firstIndex==-1) {
//                                                 break;
//                                               }
//
//                                               var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                               chaptersArray.push(tempString);
//                                               i=secondIndex;
//                                             }
//
//
//                                             var titlesArray=[];
//
//                                             // For Main Titles denoted by @ Sign
//                                             for (var i = 0; i < chaptersArray.length; i++) {
//                                               var stringAtIndex = chaptersArray[i];
//                                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                               var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                               for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                 var firstIndex=stringAtIndex.indexOf('@',x);
//                                                 var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                                 if (secondIndex==-1 || firstIndex==-1) {
//                                                   break;
//                                                 }
//
//                                                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                 // Save String and Heading Both in Array
//                                                 var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                                 titlesArray.push(ObjectToSaveInArray);
//                                                 x=secondIndex;
//
//                                               }
//
//                                             }
//
//                                             // // // // console.log('Titles Array is ='+titlesArray);
//
//                                             var tempArray=[];
//                                             // For Nuskha Jaat denoted by $ Sign
//                                             for (var i = 0; i < titlesArray.length; i++) {
//
//                                               var mainHeading = titlesArray[i].heading;
//                                               var stringAtIndex = titlesArray[i].data;
//
//                                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                               var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                               for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                 var firstIndex=stringAtIndex.indexOf('$',x);
//                                                 var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                                 if (secondIndex==-1 || firstIndex==-1) {
//                                                   break;
//                                                 }
//
//                                                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//
//                                                 var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                                 tempArray.push(ObjectToSaveInArray);
//                                                 x=secondIndex;
//
//                                               }
//                                             }
//
//                                             // Extract Headings from Sub Content From $ Sign.
//
//                                             // For Nuskha Jaat denoted by $ Sign
//                                             for (var i = 0; i < tempArray.length; i++) {
//
//                                               var mainHeading = tempArray[i].mainheading;
//                                               var subHeading = tempArray[i].subheading;
//                                               var stringAtIndex = tempArray[i].data;
//
//                                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                               var testString=stringAtIndex.slice(0,headingEndIndex);
//                                               var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                               finalArray10.push(ObjectToSaveInArray);
//
//                                             }
//                                           })
//
//                                           var finalArray11=[];
//
//
//                                           RNFS.readFileAssets(doodh)
//                                               .then((contents) => {
//                                                 var contentString = contents.toString();
//                                                 var chaptersArray=[];
//                                                 // For Chapters Titles denoted by & Sign
//                                                 for (var i = 0; i < contentString.length; i++) {
//                                                   var firstIndex=contentString.indexOf('&',i);
//                                                   var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                                   if (secondIndex==-1 || firstIndex==-1) {
//                                                     break;
//                                                   }
//
//                                                   var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                                   chaptersArray.push(tempString);
//                                                   i=secondIndex;
//                                                 }
//
//
//                                                 var titlesArray=[];
//
//                                                 // For Main Titles denoted by @ Sign
//                                                 for (var i = 0; i < chaptersArray.length; i++) {
//                                                   var stringAtIndex = chaptersArray[i];
//                                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                                   for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                     var firstIndex=stringAtIndex.indexOf('@',x);
//                                                     var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                                     if (secondIndex==-1 || firstIndex==-1) {
//                                                       break;
//                                                     }
//
//                                                     var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                     // Save String and Heading Both in Array
//                                                     var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                                     titlesArray.push(ObjectToSaveInArray);
//                                                     x=secondIndex;
//
//                                                   }
//
//                                                 }
//
//
//                                                 var tempArray=[];
//                                                 // For Nuskha Jaat denoted by $ Sign
//                                                 for (var i = 0; i < titlesArray.length; i++) {
//
//                                                   var mainHeading = titlesArray[i].heading;
//                                                   var stringAtIndex = titlesArray[i].data;
//
//                                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//
//                                                   for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                     var firstIndex=stringAtIndex.indexOf('$',x);
//                                                     var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                                     if (secondIndex==-1 || firstIndex==-1) {
//                                                       break;
//                                                     }
//
//                                                     var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//
//                                                     var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                                     tempArray.push(ObjectToSaveInArray);
//                                                     x=secondIndex;
//
//                                                   }
//                                                 }
//
//                                                 // Extract Headings from Sub Content From $ Sign.
//
//                                                 // For Nuskha Jaat denoted by $ Sign
//                                                 for (var i = 0; i < tempArray.length; i++) {
//
//                                                   var mainHeading = tempArray[i].mainheading;
//                                                   var subHeading = tempArray[i].subheading;
//                                                   var stringAtIndex = tempArray[i].data;
//
//                                                   // // // // console.log('Main Main Heading is == ' + mainHeading);
//                                                   // // // // console.log('Sub Sub Heading is == ' + subHeading);
//                                                   // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//                                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                   var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                                   finalArray11.push(ObjectToSaveInArray);
//
//                                                 }
//                                               })
//
//
//
//
//                                               var finalArray12=[];
//
//
//                                               RNFS.readFileAssets(gajar)
//                                                   .then((contents) => {
//                                                     var contentString = contents.toString();
//                                                     // // // // console.log('Content Of Complete Book' + contentString);
//                                                     var chaptersArray=[];
//                                                     // For Chapters Titles denoted by & Sign
//                                                     for (var i = 0; i < contentString.length; i++) {
//                                                       var firstIndex=contentString.indexOf('&',i);
//                                                       var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                                       if (secondIndex==-1 || firstIndex==-1) {
//                                                         break;
//                                                       }
//
//                                                       // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                       var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                                       chaptersArray.push(tempString);
//                                                       i=secondIndex;
//                                                     }
//
//                                                     // // // // console.log('Chapters Array is ='+chaptersArray);
//
//                                                     var titlesArray=[];
//
//                                                     // For Main Titles denoted by @ Sign
//                                                     for (var i = 0; i < chaptersArray.length; i++) {
//                                                       var stringAtIndex = chaptersArray[i];
//                                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                       // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                       for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                         var firstIndex=stringAtIndex.indexOf('@',x);
//                                                         var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                                         if (secondIndex==-1 || firstIndex==-1) {
//                                                           break;
//                                                         }
//
//                                                         // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                         var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                         // Save String and Heading Both in Array
//                                                         var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                                         titlesArray.push(ObjectToSaveInArray);
//                                                         x=secondIndex;
//
//                                                       }
//
//                                                     }
//
//                                                     // // // // console.log('Titles Array is ='+titlesArray);
//
//                                                     var tempArray=[];
//                                                     // For Nuskha Jaat denoted by $ Sign
//                                                     for (var i = 0; i < titlesArray.length; i++) {
//
//                                                       var mainHeading = titlesArray[i].heading;
//                                                       var stringAtIndex = titlesArray[i].data;
//                                                       // // // // console.log('Main Heading is == ' + mainHeading);
//                                                       // // // // console.log('stringAtIndex is == ' + stringAtIndex);
//
//                                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                       // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                       for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                         var firstIndex=stringAtIndex.indexOf('$',x);
//                                                         var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                                         if (secondIndex==-1 || firstIndex==-1) {
//                                                           break;
//                                                         }
//
//                                                         // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                         var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                         // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
//
//                                                         var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                                         tempArray.push(ObjectToSaveInArray);
//                                                         x=secondIndex;
//
//                                                       }
//                                                     }
//                                                     // // // // console.log('Main Temp Temp Array is ='+tempArray);
//
//                                                     // Extract Headings from Sub Content From $ Sign.
//
//                                                     // For Nuskha Jaat denoted by $ Sign
//                                                     for (var i = 0; i < tempArray.length; i++) {
//
//                                                       var mainHeading = tempArray[i].mainheading;
//                                                       var subHeading = tempArray[i].subheading;
//                                                       var stringAtIndex = tempArray[i].data;
//
//                                                       // // // // console.log('Main Main Heading is == ' + mainHeading);
//                                                       // // // // console.log('Sub Sub Heading is == ' + subHeading);
//                                                       // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//                                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                       var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                                       finalArray12.push(ObjectToSaveInArray);
//
//                                                     }
//                                                   })
//
//
//
//                                                   var finalArray13=[];
//
//                                                   RNFS.readFileAssets(gheekawar)
//                                                       .then((contents) => {
//                                                         var contentString = contents.toString();
//                                                         // // // // console.log('Content Of Complete Book' + contentString);
//                                                         var chaptersArray=[];
//                                                         // For Chapters Titles denoted by & Sign
//                                                         for (var i = 0; i < contentString.length; i++) {
//                                                           var firstIndex=contentString.indexOf('&',i);
//                                                           var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                                           if (secondIndex==-1 || firstIndex==-1) {
//                                                             break;
//                                                           }
//
//                                                           // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                           var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                                           chaptersArray.push(tempString);
//                                                           i=secondIndex;
//                                                         }
//
//                                                         // // // // console.log('Chapters Array is ='+chaptersArray);
//
//                                                         var titlesArray=[];
//
//                                                         // For Main Titles denoted by @ Sign
//                                                         for (var i = 0; i < chaptersArray.length; i++) {
//                                                           var stringAtIndex = chaptersArray[i];
//                                                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                           var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                           // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                           for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                             var firstIndex=stringAtIndex.indexOf('@',x);
//                                                             var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                                             if (secondIndex==-1 || firstIndex==-1) {
//                                                               break;
//                                                             }
//
//                                                             // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                             // Save String and Heading Both in Array
//                                                             var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                                             titlesArray.push(ObjectToSaveInArray);
//                                                             x=secondIndex;
//
//                                                           }
//
//                                                         }
//
//                                                         // // // // console.log('Titles Array is ='+titlesArray);
//
//                                                         var tempArray=[];
//                                                         // For Nuskha Jaat denoted by $ Sign
//                                                         for (var i = 0; i < titlesArray.length; i++) {
//
//                                                           var mainHeading = titlesArray[i].heading;
//                                                           var stringAtIndex = titlesArray[i].data;
//                                                           // // // // console.log('Main Heading is == ' + mainHeading);
//                                                           // // // // console.log('stringAtIndex is == ' + stringAtIndex);
//
//                                                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                           var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                           // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                           for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                             var firstIndex=stringAtIndex.indexOf('$',x);
//                                                             var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                                             if (secondIndex==-1 || firstIndex==-1) {
//                                                               break;
//                                                             }
//
//                                                             // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                             var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                             // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
//
//                                                             var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                                             tempArray.push(ObjectToSaveInArray);
//                                                             x=secondIndex;
//
//                                                           }
//                                                         }
//                                                         // // // // console.log('Main Temp Temp Array is ='+tempArray);
//
//                                                         // Extract Headings from Sub Content From $ Sign.
//
//                                                         // For Nuskha Jaat denoted by $ Sign
//                                                         for (var i = 0; i < tempArray.length; i++) {
//
//                                                           var mainHeading = tempArray[i].mainheading;
//                                                           var subHeading = tempArray[i].subheading;
//                                                           var stringAtIndex = tempArray[i].data;
//
//                                                           // // // // console.log('Main Main Heading is == ' + mainHeading);
//                                                           // // // // console.log('Sub Sub Heading is == ' + subHeading);
//                                                           // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//                                                           var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                           var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                           var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                                           finalArray13.push(ObjectToSaveInArray);
//
//                                                         }
//                                                       })
//
//
//
//
//                                                       var finalArray14=[];
//
//                                                       RNFS.readFileAssets(ghee)
//                                                           .then((contents) => {
//                                                             var contentString = contents.toString();
//                                                             // // // // console.log('Content Of Complete Book' + contentString);
//                                                             var chaptersArray=[];
//                                                             // For Chapters Titles denoted by & Sign
//                                                             for (var i = 0; i < contentString.length; i++) {
//                                                               var firstIndex=contentString.indexOf('&',i);
//                                                               var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                                               if (secondIndex==-1 || firstIndex==-1) {
//                                                                 break;
//                                                               }
//
//                                                               // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                               var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                                               chaptersArray.push(tempString);
//                                                               i=secondIndex;
//                                                             }
//
//                                                             // // // // console.log('Chapters Array is ='+chaptersArray);
//
//                                                             var titlesArray=[];
//
//                                                             // For Main Titles denoted by @ Sign
//                                                             for (var i = 0; i < chaptersArray.length; i++) {
//                                                               var stringAtIndex = chaptersArray[i];
//                                                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                               var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                               // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                               for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                                 var firstIndex=stringAtIndex.indexOf('@',x);
//                                                                 var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                                                 if (secondIndex==-1 || firstIndex==-1) {
//                                                                   break;
//                                                                 }
//
//                                                                 // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                                 // Save String and Heading Both in Array
//                                                                 var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                                                 titlesArray.push(ObjectToSaveInArray);
//                                                                 x=secondIndex;
//
//                                                               }
//
//                                                             }
//
//                                                             // // // // console.log('Titles Array is ='+titlesArray);
//
//                                                             var tempArray=[];
//                                                             // For Nuskha Jaat denoted by $ Sign
//                                                             for (var i = 0; i < titlesArray.length; i++) {
//
//                                                               var mainHeading = titlesArray[i].heading;
//                                                               var stringAtIndex = titlesArray[i].data;
//                                                               // // // // console.log('Main Heading is == ' + mainHeading);
//                                                               // // // // console.log('stringAtIndex is == ' + stringAtIndex);
//
//                                                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                               var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                               // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                               for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                                 var firstIndex=stringAtIndex.indexOf('$',x);
//                                                                 var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                                                 if (secondIndex==-1 || firstIndex==-1) {
//                                                                   break;
//                                                                 }
//
//                                                                 // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                                 var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                                 // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
//
//                                                                 var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                                                 tempArray.push(ObjectToSaveInArray);
//                                                                 x=secondIndex;
//
//                                                               }
//                                                             }
//                                                             // // // // console.log('Main Temp Temp Array is ='+tempArray);
//
//                                                             // Extract Headings from Sub Content From $ Sign.
//
//                                                             // For Nuskha Jaat denoted by $ Sign
//                                                             for (var i = 0; i < tempArray.length; i++) {
//
//                                                               var mainHeading = tempArray[i].mainheading;
//                                                               var subHeading = tempArray[i].subheading;
//                                                               var stringAtIndex = tempArray[i].data;
//
//                                                               // // // // console.log('Main Main Heading is == ' + mainHeading);
//                                                               // // // // console.log('Sub Sub Heading is == ' + subHeading);
//                                                               // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//                                                               var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                               var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                               var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                                               finalArray14.push(ObjectToSaveInArray);
//
//                                                             }
//                                                           })
//
//
//
//
//
//                                                           var finalArray15=[];
//
//                                                           RNFS.readFileAssets(dahi)
//                                                               .then((contents) => {
//                                                                 var contentString = contents.toString();
//                                                                 // // // // console.log('Content Of Complete Book' + contentString);
//                                                                 var chaptersArray=[];
//                                                                 // For Chapters Titles denoted by & Sign
//                                                                 for (var i = 0; i < contentString.length; i++) {
//                                                                   var firstIndex=contentString.indexOf('&',i);
//                                                                   var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                                                   if (secondIndex==-1 || firstIndex==-1) {
//                                                                     break;
//                                                                   }
//
//                                                                   // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                                   var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                                                   chaptersArray.push(tempString);
//                                                                   i=secondIndex;
//                                                                 }
//
//                                                                 // // // // console.log('Chapters Array is ='+chaptersArray);
//
//                                                                 var titlesArray=[];
//
//                                                                 // For Main Titles denoted by @ Sign
//                                                                 for (var i = 0; i < chaptersArray.length; i++) {
//                                                                   var stringAtIndex = chaptersArray[i];
//                                                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                                   // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                                   for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                                     var firstIndex=stringAtIndex.indexOf('@',x);
//                                                                     var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                                                     if (secondIndex==-1 || firstIndex==-1) {
//                                                                       break;
//                                                                     }
//
//                                                                     // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                                     var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                                     // Save String and Heading Both in Array
//                                                                     var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                                                     titlesArray.push(ObjectToSaveInArray);
//                                                                     x=secondIndex;
//
//                                                                   }
//
//                                                                 }
//
//                                                                 // // // // console.log('Titles Array is ='+titlesArray);
//
//                                                                 var tempArray=[];
//                                                                 // For Nuskha Jaat denoted by $ Sign
//                                                                 for (var i = 0; i < titlesArray.length; i++) {
//
//                                                                   var mainHeading = titlesArray[i].heading;
//                                                                   var stringAtIndex = titlesArray[i].data;
//                                                                   // // // // console.log('Main Heading is == ' + mainHeading);
//                                                                   // // // // console.log('stringAtIndex is == ' + stringAtIndex);
//
//                                                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                                   // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                                   for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                                     var firstIndex=stringAtIndex.indexOf('$',x);
//                                                                     var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                                                     if (secondIndex==-1 || firstIndex==-1) {
//                                                                       break;
//                                                                     }
//
//                                                                     // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                                     var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                                     // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
//
//                                                                     var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                                                     tempArray.push(ObjectToSaveInArray);
//                                                                     x=secondIndex;
//
//                                                                   }
//                                                                 }
//                                                                 // // // // console.log('Main Temp Temp Array is ='+tempArray);
//
//                                                                 // Extract Headings from Sub Content From $ Sign.
//
//                                                                 // For Nuskha Jaat denoted by $ Sign
//                                                                 for (var i = 0; i < tempArray.length; i++) {
//
//                                                                   var mainHeading = tempArray[i].mainheading;
//                                                                   var subHeading = tempArray[i].subheading;
//                                                                   var stringAtIndex = tempArray[i].data;
//
//                                                                   // // // // console.log('Main Main Heading is == ' + mainHeading);
//                                                                   // // // // console.log('Sub Sub Heading is == ' + subHeading);
//                                                                   // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//                                                                   var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                                   var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                                   var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                                                   finalArray15.push(ObjectToSaveInArray);
//
//                                                                 }
//                                                               })
//
//
//
//
//
//                                                               var finalArray16=[];
//
//
//
//                                                               RNFS.readFileAssets(gulsarak)
//                                                                   .then((contents) => {
//                                                                     var contentString = contents.toString();
//                                                                     // // // // console.log('Content Of Complete Book' + contentString);
//                                                                     var chaptersArray=[];
//                                                                     // For Chapters Titles denoted by & Sign
//                                                                     for (var i = 0; i < contentString.length; i++) {
//                                                                       var firstIndex=contentString.indexOf('&',i);
//                                                                       var secondIndex=contentString.indexOf('&',firstIndex+1);
//                                                                       if (secondIndex==-1 || firstIndex==-1) {
//                                                                         break;
//                                                                       }
//
//                                                                       // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                                       var tempString=contentString.slice(firstIndex+1,secondIndex-1);
//                                                                       chaptersArray.push(tempString);
//                                                                       i=secondIndex;
//                                                                     }
//
//                                                                     // // // // console.log('Chapters Array is ='+chaptersArray);
//
//                                                                     var titlesArray=[];
//
//                                                                     // For Main Titles denoted by @ Sign
//                                                                     for (var i = 0; i < chaptersArray.length; i++) {
//                                                                       var stringAtIndex = chaptersArray[i];
//                                                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                                       // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                                       for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                                         var firstIndex=stringAtIndex.indexOf('@',x);
//                                                                         var secondIndex=stringAtIndex.indexOf('@',firstIndex+1);
//                                                                         if (secondIndex==-1 || firstIndex==-1) {
//                                                                           break;
//                                                                         }
//
//                                                                         // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                                         var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                                         // Save String and Heading Both in Array
//                                                                         var ObjectToSaveInArray = {heading:testString,data:tempString.trim()};
//                                                                         titlesArray.push(ObjectToSaveInArray);
//                                                                         x=secondIndex;
//
//                                                                       }
//
//                                                                     }
//
//                                                                     // // // // console.log('Titles Array is ='+titlesArray);
//
//                                                                     var tempArray=[];
//                                                                     // For Nuskha Jaat denoted by $ Sign
//                                                                     for (var i = 0; i < titlesArray.length; i++) {
//
//                                                                       var mainHeading = titlesArray[i].heading;
//                                                                       var stringAtIndex = titlesArray[i].data;
//                                                                       // // // // console.log('Main Heading is == ' + mainHeading);
//                                                                       // // // // console.log('stringAtIndex is == ' + stringAtIndex);
//
//                                                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                                       // // // // console.log('Akhzar is testing heading' + testString);
//
//                                                                       for (var x = 0; x < stringAtIndex.length; x++) {
//
//                                                                         var firstIndex=stringAtIndex.indexOf('$',x);
//                                                                         var secondIndex=stringAtIndex.indexOf('$',firstIndex+1);
//                                                                         if (secondIndex==-1 || firstIndex==-1) {
//                                                                           break;
//                                                                         }
//
//                                                                         // // // // console.log('FirstIndex and SecondIndex' + firstIndex +'   '+ secondIndex);
//                                                                         var tempString=stringAtIndex.slice(firstIndex+1,secondIndex-1);
//                                                                         // // // // console.log('What About main Heading = ' + mainHeading +' And What about Sub Heading  '+ testString +' And What About Subbest Heading  '+tempString.trim());
//
//                                                                         var ObjectToSaveInArray = {mainheading:mainHeading,subheading:testString,data:tempString.trim()};
//                                                                         tempArray.push(ObjectToSaveInArray);
//                                                                         x=secondIndex;
//
//                                                                       }
//                                                                     }
//                                                                     // // // // console.log('Main Temp Temp Array is ='+tempArray);
//
//                                                                     // Extract Headings from Sub Content From $ Sign.
//
//                                                                     // For Nuskha Jaat denoted by $ Sign
//                                                                     for (var i = 0; i < tempArray.length; i++) {
//
//                                                                       var mainHeading = tempArray[i].mainheading;
//                                                                       var subHeading = tempArray[i].subheading;
//                                                                       var stringAtIndex = tempArray[i].data;
//
//                                                                       // // // // console.log('Main Main Heading is == ' + mainHeading);
//                                                                       // // // // console.log('Sub Sub Heading is == ' + subHeading);
//                                                                       // // // // console.log('Main Main Data is == ' + stringAtIndex);
//
//                                                                       var headingEndIndex = stringAtIndex.indexOf('\r',1);
//                                                                       var testString=stringAtIndex.slice(0,headingEndIndex);
//                                                                       var ObjectToSaveInArray = {mainheading:mainHeading,subheading:subHeading,subbestheading:testString,data:stringAtIndex.trim()};
//                                                                       finalArray16.push(ObjectToSaveInArray);
//
//                                                                     }
//
//                                                                     this.setState({showProgress:false});
//                                                                     AsyncStorage.setItem('booksData', JSON.stringify(this.state.bookArray));
//                                                                     this.horizontalrowselected();
//                                                                     this.dumpIntoDB();
//
//                                                                   })
//
//
//
//       var mainArray=[];
//
//       // First Array is for Articles and Other is for Books
//       var Object0ToSaveInMainArray = {title:'مضامین',data:finalArray0};
//       var Object1ToSaveInMainArray = {title:'آرنڈ',data:finalArray1};
//       var Object2ToSaveInMainArray = {title:'اندرائین',data:finalArray2};
//       var Object3ToSaveInMainArray = {title:'انگور',data:finalArray3};
//       var Object4ToSaveInMainArray = {title:'آم',data:finalArray4};
//       var Object5ToSaveInMainArray = {title:'خواص آک',data:finalArray5};
//       var Object6ToSaveInMainArray = {title:'بادام',data:finalArray6};
//       var Object7ToSaveInMainArray = {title:'برگد',data:finalArray7};
//       var Object8ToSaveInMainArray = {title:'دھتورہ',data:finalArray8};
//       var Object9ToSaveInMainArray = {title:'خواص شہد',data:finalArray9};
//       var Object10ToSaveInMainArray = {title:'دھنیہ',data:finalArray10};
//       var Object11ToSaveInMainArray = {title:'دودھ',data:finalArray11};
//       var Object12ToSaveInMainArray = {title:'گاجر',data:finalArray12};
//       var Object13ToSaveInMainArray = {title:'گھی کوار',data:finalArray13};
//       var Object14ToSaveInMainArray = {title:'گھی',data:finalArray14};
//       var Object15ToSaveInMainArray = {title:'دھی',data:finalArray15};
//       var Object16ToSaveInMainArray = {title:'گل سرک',data:finalArray16};
//
//       mainArray.push(Object0ToSaveInMainArray);
//       mainArray.push(Object1ToSaveInMainArray);
//       mainArray.push(Object2ToSaveInMainArray);
//       mainArray.push(Object3ToSaveInMainArray);
//       mainArray.push(Object4ToSaveInMainArray);
//       mainArray.push(Object5ToSaveInMainArray);
//       mainArray.push(Object6ToSaveInMainArray);
//       mainArray.push(Object7ToSaveInMainArray);
//       mainArray.push(Object8ToSaveInMainArray);
//       mainArray.push(Object9ToSaveInMainArray);
//       mainArray.push(Object10ToSaveInMainArray);
//       mainArray.push(Object11ToSaveInMainArray);
//       mainArray.push(Object12ToSaveInMainArray);
//       mainArray.push(Object13ToSaveInMainArray);
//       mainArray.push(Object14ToSaveInMainArray);
//       mainArray.push(Object15ToSaveInMainArray);
//       mainArray.push(Object16ToSaveInMainArray);
//
//       Constants.BookArray=mainArray;
//       Constants.isBookLoaded=true;
//       this.setState({
//         bookArray:mainArray
//       })
//
// }
