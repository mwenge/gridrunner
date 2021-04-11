if(typeof(console)=="undefined")console={debug:function(){},log:function(){}};if(console.log===undefined)console.log=function(x){};if(console.debug===undefined)console.debug=function(x){console.log(x);};function getURLParameter(name){return decodeURI((RegExp(name+'='+'(.+?)(&|$)').exec(location.search)||[,null])[1]);}
if(window.console&&window.console.firebug){alert("You have firebug enabled, this will make the emulation particularly slow");}
function styleMenubar(){$.each($('ul#menubar > li > ul > li > a + ul'),function(index,value){$.each($('> a',$(value).closest('li')),function(index2,value2){$(value2).html($(value2).text()+"<span style='float:right'>&gt;</span>");})});}
function binToArray(data){var v=0,cnt=0,out=[],ii=0;for(var i=0;i<data.length;i++){v+=bincodes.indexOf(data[i])<<cnt;cnt+=6;if(cnt>=8){out[ii++]=(v&255);cnt-=8;v>>=8;}}
return out;}
function toHex2(num){var r=num.toString(16);return "$"+("00"+r).substring(r.length).toUpperCase();}
function toHex4(num){var r=num.toString(16);return "$"+("0000"+r).substring(r.length).toUpperCase();}
function toHex6(num){var r=num.toString(16);return "$"+("000000"+r).substring(r.length).toUpperCase();}
function toHexColour(num){var r=num.toString(16);return("000000"+r).substring(r.length).toUpperCase();}
function toBin8(num){var r=num.toString(2);return "%"+("00000000"+r).substring(r.length);}
function bin2String(array,start,length){var result="";for(var i=start;i<start+length;i++){result+=String.fromCharCode(array[i]);}
return result;}