<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<body ondragstart="return false">
<%@include file="/WEB-INF/include/header.jsp"%>
<input type="hidden" value="${device}" id="device_ck"/>
<div class="home_div div-scroll-y">
	
	<div class="font_15px" >가데이터 만들기</div>
	<div id="testList"></div>
</div>


<script type="text/javascript">
let objSmall = new Object();

// let array = [];
//let resultArray = [];

$(document).ready(function() {
	let cpnCd = 19800200;
	let tseq = 5050100; 
	let orderNo = 15000100;
	let resultArray = [];
	
	for(let i=0; i<5; i++ ){
		let objList = new Object();
		let array = [];
		cpnCd += 1;
		orderNo += 1;
		let turn = 0;
		
		for(let j=0; j < 2 ; j++){
			let objSmall =  new Object();
			tseq += 1;
			objSmall['CPN_CD'] = String(cpnCd);
			objSmall['TSEQ'] = String(tseq);
			objSmall['GOODS_CODE'] = "2214";
			objSmall['RESERVE_DAY'] = "2023-03-08";
			objSmall['TURN'] = String(turn);
			turn += 1;
			objSmall['OPT_QTY'] = "1";
			array.push(objSmall);
		}
		objList['OPT_LIST'] = array;
		objList['NAME'] = "강다현";
		objList['COM_CODE'] = "NAVER";
		objList['SEASON_TICKET_YN'] = "N";
		objList['SMS_SEND_YN'] = "N";
		objList['ORDER_NO'] = 'E20230300804913_'+String(orderNo);
		objList['B2B_COM_IDX'] = "32";
		objList['MDN'] = "01012341234";
		
		objList['CMS_ORDER_NO'] = 'E20230300804913_'+String(orderNo);
		
		resultArray.push(objList); 
	}
	console.log(resultArray[0]);
	const json = JSON.stringify(resultArray[0]);
	document.write(json);
	
});
</script>

</body>
</html>
