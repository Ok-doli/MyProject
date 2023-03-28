<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<body ondragstart="return false">

<%@include file="/WEB-INF/include/header.jsp"%>

<div>
 <div>CSV 파일 구분 하기</div>

</div>

<script type="text/javascript">

var objList = { "p0": ["가",40,3,97,67,1,22,98,15,88,1,9,60,42,90,72,23], "p1": ["49",65,69,26,72,53,66,81,94,23,97,31,57,65,31,98,6], "p2": [73,92,9,12,93,8,49,35,29,5,71,45,94,82,38,95,13], "p3": [58,42,57,67,36,44,24,13,1,82,28,75,8,52,57,19,70], "p4": [30,87,60,10,85,68,1,65,17,52,37,35,95,67,16,54,38], "p5": [72,3,33,33,45,90,53,14,95,66,58,98,68,21,90,23,94], "p6": [44,27,99,79,28,24,77,63,5,16,77,42,13,95,40,89,20], "p7": [78,29,78,49,91,96,8,36,4,37,97,99,30,12,79,60,44], "p8": [23,40,16,79,94,30,28,25,51,38,94,68,6,71,35,5,66], "p9": [9,12,35,21,57,3,33,69,98,44,4,12,62,1,6,26,34] };
var objCnt = Object.keys(objList).length;		

var objResult = {};
$(document).ready(function() {
	for(var i=0; i < objCnt; i++){
		var Array = objList["p"+i];
		var arrayResult = [];
		if(NumerInclude(Array)){ // 숫자에 해당하는 값만 계산 결과를 출력
			var MIN = min(Array);  //최소값
			var MAX = max(Array);  //최대값
			var SUM = sum(Array); //합계
			var AVG = avg(Array); //평균
			var STD = std(Array); //표준편차
			var MEDIAN = median(Array); //중간값
			arrayResult.push(MIN);
			arrayResult.push(MAX);
			arrayResult.push(SUM);
			arrayResult.push(AVG);
			arrayResult.push(STD);
			arrayResult.push(MEDIAN);
			
		}else{//숫자가 아닌 값들만 모아서 출력
			console.log("숫자가 아닌 값들만 모아서 출력");
		}
		objResult["p"+i] = arrayResult;
		console.log(arrayResult);
	}
	
	
});
// const NumerInclude = arr => arr.some(item => !/^\d+$/.test(item))
// 숫자가 아닌 값이 하나라도 존재 하는지 체크
function NumerInclude(arr) { 
	var chkStyle = /[0-9]/;      //체크 방식(숫자)
	var type;
	for(var i=0; i < arr.length; i++){
		let data = arr[i]
		
		if(chkStyle.test(data)){
			type = true;
		}else{
			type = false;
			break;

		}
	} 
 return type;
}

//최소값
const min = arr => Math.min(...arr);

// 최대값
const max = arr => Math.max(...arr);

// 합계
const sum = arr => arr.reduce((a, b) => a + b, 0);

// 평균
const avg = arr => sum(arr) / arr.length;

// 표준편차
const std = arr => {
  const mu = avg(arr);
  const diffArr = arr.map(x => x - mu);
  const sqrArr = diffArr.map(x => x ** 2);
  const variance = sum(sqrArr) / arr.length;
  return Math.sqrt(variance);
};

// 중간값
const median = arr => {
  const sorted = arr.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}
</script>

</body>
</html>
