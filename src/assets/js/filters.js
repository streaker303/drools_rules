/**
 * 给商品价格加补0
 * @param {*} value 
 */
const addZero=function(value){
    var value=Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
        value=value.toString()+".00";
        return value;
    }
    if(xsd.length>1){
        if(xsd[1].length<2){
            value=value.toString()+"0";
        }
        return value;
    }
}
const NullStr=function(str){
	if((str+'' === '')||(str == null)||(str == undefined)){
		return '--';
	}else{
		return str;
	}
}

export default {
    addZero,
    NullStr
}
