$(function () {
	f_ViewJSLoad();
});
function f_ViewJSLoad() {	
	// INPUT 타입 지정
     $(".input-Number,.input-Price").keydown(function(e){
    	isNumberPress(e);
     });
	 $(".input-Number").keyup(function(){
		 this.value=this.value.replace(/[^0-9]/g,'');
	 });
	 $(".input-Number").blur(function(){
		 this.value=this.value.replace(/[^0-9]/g,'');
	 });
	 $(".input-Price").keyup(function(){
		 this.value=(this.value!="0")?this.value.replace(/-[^0-9]/g,'').replace(/^0/,""):"0";
	 });
	 $(".input-Price").blur(function(){
		 this.value=(this.value!="-")?numberWithCommas(this.value):"0";
	 });
	 
	 $(".input-HpNumber").keyup(function(){
		 this.value=this.value.replace(/[^0-9\-]/gi,'');
	 });
	 $(".input-HpNumber").blur(function(){
		 this.value=this.value.replace(/[^0-9\-]/gi,"");
	 });
	 
	 
	 // maxlength 한글입력관련 자르기 한글=3바이트계산
//	 $("input[type=text],textarea").keydown(function () {
//		 var maxLength = parseInt(this.getAttribute("maxlength"));
//		 validateMaxLength(this, maxLength);
//	 });
	 $("input[type=text],input[type=number],textarea").blur(function () {
		 var maxLength = parseInt(this.getAttribute("maxlength"));
		 validateMaxLength(this, maxLength);
	 });
	 
};

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }    
}


/**
 * MaxLength 체크
 * @param element
 * @param maxLength
 */
function validateMaxLength(element, maxLength) {
	var str = element.value;
    var strLength = 0;
    var strTitle = "";
    var strPiece = "";
    var check = false;
    for (var i = 0; i < str.length; i++){
        var code = str.charCodeAt(i);
        var ch = str.substr(i,1).toUpperCase();
        //체크 하는 문자를 저장
        strPiece = str.substr(i,1);
          
        code = parseInt(code);
          
        if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0))){
            strLength = strLength + 3; //UTF-8 3byte 로 계산
        }else{
            strLength = strLength + 1;
        }
          
        if(strLength>maxLength){ //제한 길이 확인
            check = true;
            break;
        }else{
            strTitle = strTitle+strPiece; //제한길이 보다 작으면 자른 문자를 붙여준다.
        }
          
    }
	
    element.value=strTitle;
}


$.fn.formatDate = function() {
	$(this).mask("9999-99-99");
}

$.fn.formatNumber = function() {
//	$(this).keyup(function () {
//		if($(this).val()!=''){
//			var n = parseFloat($(this).val().replace(/\,/g,''),10);
//		    $(this).val(n.toLocaleString());			
//		}
//	});
	$(this).keydown(function(e){
    	if(isNumberPress(e)) {
    		return false;
    	}
    });
	
	$(this).attr('maxlength','15');
	$(this).focus(function () {
		var value = $(this).val();
		value = value.replaceAll(",", "");
		$(this).val(value);
	});
	
	$(this).blur(function () {
		var value = $(this).val();
		value = value.format();
		$(this).val(value);
	});
}

var tuiCalArr = new Array();

$.fn.setCal = function(inDate,mm,dd) {
	// 2020-08-06 tui datepicker - cpg
	
	// 캘린더 컨테이너 생성, 추가로 필요한 항목들은 after로 자동생성함.
	var container = document.getElementById('tui-date-picker-container');
	var targetId = $(this).attr("id");
	if(typeof targetId == "undefined"){
		console.log("[view.js setCal] target undefined");
		 return false;
	}
	// 인스턴스 전역변수 중복체크
	for (var i = 0; i < tuiCalArr.length; i++) {
		var item = tuiCalArr[i];
		if(item.calId == targetId) {
			item.instance.destroy();
			tuiCalArr.splice(i, 1);
		}
	}
	var target = document.getElementById(targetId);
	var targetDate = new Date();

	
	$(this).after('<div id="'+targetId + '-container' + '" style="position: absolute; width: 100%;"></div>');
	var container = document.getElementById(targetId + '-container');
	$(this).addClass('tuiDatePicker');
	
	// 생성일자지정
	if(String(inDate) == "undefined")
		inDate = "";
	if(String(inDate) != "") {
		var outDate = '';
		if(String(inDate).length < 6 || inDate == 0){
			var date = new Date();
				date.setFullYear(date.getFullYear() + inDate);
				date.setMonth(date.getMonth() + mm);
				date.setDate(date.getDate() + dd);
			var year = date.getFullYear();
			var month = date.getMonth() + 1; 
			var day = date.getDate();
			if (("" + month).length == 1) { month = "0" + month;}
			if (("" + day).length == 1) { day = "0" + day;}
			outDate = year + "-" + month + "-" + day;
		}else if (String(inDate).length > 7 && String(inDate).length < 10){
			outDate = String(inDate).substr(0, 4) + "-" + String(inDate).substr(4, 2) + "-"	+ String(inDate).substr(6, 2);
		}else {
			outDate = inDate;
		}
			targetDate = new Date(outDate);
	}
	
	
	var instance = new tui.DatePicker(container, {
	    input: {
	        element: target,
            format: 'yyyy-MM-dd'
	    },
	    date: targetDate,
        language: 'ko'
	});
	$(this).mask("9999-99-99");
	
	// .val()로 값을 세팅했을떄 감지할수없음. 오픈시 자기자신의 값으로 달력현재날짜 세팅
	instance.on('open', function() {
		instance.getDate();
	    instance.setDate(new Date($("#"+targetId).val()));
	});

	instance.on('close', function() {
	    if (!document.getElementById(targetId).value.length) {
	    	instance.setDate(null);
	    }
	    $("#"+targetId).trigger('change');
	});
	
	
	// 엔터, 포커스 아웃시 검증 후, 닫기
	$(this).keyup(function(e) {
		if(e.keyCode == 13) {
			//$(this).chkCal();
			instance.close();
		}
		if($(this).val().length == 10){
			$(this).chkCal();
		}
	});
	$(this).blur(function(e) {
		if($(this).val().length == 10){
			$(this).chkCal();
		} else {
			$(this).val('');
		}
	});

	// 그리드가 그려진 이후 offset을 가져오기위해 setTimeout 사용
	setTimeout(function () {
		var thisLeft = $("#"+targetId).offset().left;
		var thisTop = $("#"+targetId).offset().top;
		// document wieth/height = 1840/820
		// calendar wieth/height = 276/355

		if(((1840-thisLeft)<=276)&&(820-thisTop)<=355){
			$("#"+targetId + '-container').addClass('cal-set-1');
		}else if(((1840-thisLeft)<=276)&&(820-thisTop)>355){
			$("#"+targetId + '-container').addClass('cal-set-2');
		}else if(((1840-thisLeft)>276)&&(820-thisTop)<=355){
			$("#"+targetId + '-container').addClass('cal-set-3');
		}
	}, 80);

	// 생성된 인스턴스를 화면 전역변수에 저장
	var tuiCalObj = new Object();
	tuiCalObj.calId= targetId;
	tuiCalObj.instance= instance;
	tuiCalArr.push(tuiCalObj);
}

$.fn.setCalOld = function(inDate,mm,dd) {
	$(this).datepicker(
			{
				showOn: "button",
				buttonImage : "/css/images/icon_calender.gif",
				buttonImageOnly : true,
				prevText : '이전 달',
				nextText : '다음 달',
				dayNames : [  '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ],
				dayNamesMin : [ '일','월', '화', '수', '목', '금', '토' ],
				monthNamesShort : [ '1', '2', '3', '4', '5', '6', '7',
						'8', '9', '10', '11', '12' ],
				monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
						'7월', '8월', '9월', '10월', '11월', '12월' ],
				dateFormat : "yy-mm-dd"
			});
	$(this).datepicker().on("input change", function (e) {
		$(this).focus();
	});	
			
	$(this).formatDate();
	
	if(String(inDate) == "undefined")
		inDate = "";
	if(String(inDate) != "") {
		if(String(inDate).length < 6 || inDate == 0){
			var date = new Date();
				date.setFullYear(date.getFullYear() + inDate);
				date.setMonth(date.getMonth() + mm);
				date.setDate(date.getDate() + dd);
			var year = date.getFullYear();
			var month = date.getMonth() + 1; 
			var day = date.getDate();
			if (("" + month).length == 1) { month = "0" + month;}
			if (("" + day).length == 1) { day = "0" + day;}
			outDate = year + "-" + month + "-" + day;
		}else if (String(inDate).length > 7 && String(inDate).length < 10){
			outDate = String(inDate).substr(0, 4) + "-" + String(inDate).substr(4, 2) + "-"	+ String(inDate).substr(6, 2);
		}else {
			outDate = inDate;
		}
			$(this).val(outDate);
	}
	else {
		$(this).val($.datepicker.formatDate('yy-mm-dd', new Date()));	
	}
	$(this).keyup(function() {
		if($(this).val().length == 10){
			$(this).chkCal();
		}
	});
}



$.fn.setYearCal = function(inDate,mm,dd) {
	
	// 2021-02-24 tui Yearpicker - jhk
	
	// 캘린더 컨테이너 생성, 추가로 필요한 항목들은 after로 자동생성함.
	var container = document.getElementById('tui-date-picker-container');
	var targetId = $(this).attr("id");
	if(typeof targetId == "undefined"){
		console.log("[view.js setMonthCal] target undefined");
		 return false;
	}
	// 인스턴스 전역변수 중복체크
	for (var i = 0; i < tuiCalArr.length; i++) {
		var item = tuiCalArr[i];
		if(item.calId == targetId) {
			item.instance.destroy();
			tuiCalArr.splice(i, 1);
		}
	}
	var target = document.getElementById(targetId);
	var targetDate = new Date();
	$(this).after('<div id="'+targetId + '-container' + '" style="position: absolute;"></div>');
	var container = document.getElementById(targetId + '-container');
	$(this).addClass('tuiDatePicker');
	$(this).addClass('yearPicker');
	
	// 생성일자지정
	if(String(inDate) == "undefined")
		inDate = "";
	if(String(inDate) != "") {
		if(String(inDate).length < 6 || inDate == 0){
			var date = new Date();
				date.setFullYear(date.getFullYear() + inDate);
				date.setMonth(date.getMonth() + mm);
				date.setDate(date.getDate() + dd);
			var year = date.getFullYear();
			var month = date.getMonth() + 1; 
			var day = date.getDate();
			if (("" + month).length == 1) { month = "0" + month;}
			if (("" + day).length == 1) { day = "0" + day;}
			outDate = year + "-" + month + "-" + day;
		}else if (String(inDate).length > 7 && String(inDate).length < 10){
			outDate = String(inDate).substr(0, 4) + "-" + String(inDate).substr(4, 2) + "-"	+ String(inDate).substr(6, 2);
		}else {
			outDate = inDate;
		}
			targetDate = new Date(outDate);
	}
	
	
	var instance = new tui.DatePicker(container, {
	    input: {
	        element: target,
            format: 'yyyy'
	    },
	    type: 'year',
	    date: targetDate,
        language: 'ko'
	});
	$(this).mask("9999");
	
	// .val()로 값을 세팅했을떄 감지할수없음. 오픈시 자기자신의 값으로 달력현재날짜 세팅
	instance.on('open', function() {
		instance.getDate();
	    instance.setDate(new Date($("#"+targetId).val()));
	});

	instance.on('close', function() {
	    if (!document.getElementById(targetId).value.length) {
	    	instance.setDate(null);
	    }
	    $("#"+targetId).trigger('change');
	});
	
	
	// 엔터, 포커스 아웃시 검증 후, 닫기
	$(this).keyup(function(e) {
		if($(this).val().length == 4){
			$(this).chkCalYear(); 
		}
	});
	$(this).blur(function(e) {
		if($(this).val().length == 4){
			$(this).chkCalYear();
		} else {
			$(this).val('');
		}
	});

	// 생성된 인스턴스를 화면 전역변수에 저장
	var tuiCalObj = new Object();
	tuiCalObj.calId= targetId;
	tuiCalObj.instance= instance;
	tuiCalArr.push(tuiCalObj);
	
}
$.fn.setMonthCal = function(inDate,mm,dd) {
	
	// 2020-08-12 tui monthpicker - cpg
	
	// 캘린더 컨테이너 생성, 추가로 필요한 항목들은 after로 자동생성함.
	var container = document.getElementById('tui-date-picker-container');
	var targetId = $(this).attr("id");
	if(typeof targetId == "undefined"){
		console.log("[view.js setMonthCal] target undefined");
		 return false;
	}
	// 인스턴스 전역변수 중복체크
	for (var i = 0; i < tuiCalArr.length; i++) {
		var item = tuiCalArr[i];
		if(item.calId == targetId) {
			item.instance.destroy();
			tuiCalArr.splice(i, 1);
		}
	}
	var target = document.getElementById(targetId);
	var targetDate = new Date();
	$(this).after('<div id="'+targetId + '-container' + '" style="position: absolute;"></div>');
	var container = document.getElementById(targetId + '-container');
	$(this).addClass('tuiDatePicker');
	$(this).addClass('monthPicker');
	
	// 생성일자지정
	if(String(inDate) == "undefined")
		inDate = "";
	if(String(inDate) != "") {
		if(String(inDate).length < 6 || inDate == 0){
			var date = new Date();
				date.setFullYear(date.getFullYear() + inDate);
				date.setMonth(date.getMonth() + mm);
				date.setDate(date.getDate() + dd);
			var year = date.getFullYear();
			var month = date.getMonth() + 1; 
			var day = date.getDate();
			if (("" + month).length == 1) { month = "0" + month;}
			if (("" + day).length == 1) { day = "0" + day;}
			outDate = year + "-" + month + "-" + day;
		}else if (String(inDate).length > 7 && String(inDate).length < 10){
			outDate = String(inDate).substr(0, 4) + "-" + String(inDate).substr(4, 2) + "-"	+ String(inDate).substr(6, 2);
		}else {
			outDate = inDate;
		}
			targetDate = new Date(outDate);
	}
	
	
	var instance = new tui.DatePicker(container, {
	    input: {
	        element: target,
            format: 'yyyy-MM'
	    },
	    type: 'month',
	    date: targetDate,
        language: 'ko'
	});
	$(this).mask("9999-99");
	
	// .val()로 값을 세팅했을떄 감지할수없음. 오픈시 자기자신의 값으로 달력현재날짜 세팅
	instance.on('open', function() {
		instance.getDate();
	    instance.setDate(new Date($("#"+targetId).val()));
	});

	instance.on('close', function() {
	    if (!document.getElementById(targetId).value.length) {
	    	instance.setDate(null);
	    }
	    $("#"+targetId).trigger('change');
	});
	
	
	// 엔터, 포커스 아웃시 검증 후, 닫기
	$(this).keyup(function(e) {
		if($(this).val().length == 7){
			$(this).chkCalMonth(); 
		}
	});
	$(this).blur(function(e) {
		if($(this).val().length == 7){
			$(this).chkCalMonth();
		} else {
			$(this).val('');
		}
	});

	// 생성된 인스턴스를 화면 전역변수에 저장
	var tuiCalObj = new Object();
	tuiCalObj.calId= targetId;
	tuiCalObj.instance= instance;
	tuiCalArr.push(tuiCalObj);
	
//	$(this).datepicker(
//			{
//				changeMonth: true,
//			    changeYear: true,
//				showOn : "both",
//				buttonImage : "/css/images/icon_calender.gif",
//				buttonImageOnly : true,
//				prevText : '이전 달',
//				nextText : '다음 달',
//				dayNames : [  '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ],
//				dayNamesMin : [ '일','월', '화', '수', '목', '금', '토' ],
//				monthNamesShort : [  '1월', '2월', '3월', '4월', '5월', '6월',
//							'7월', '8월', '9월', '10월', '11월', '12월' ],
//				monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
//						'7월', '8월', '9월', '10월', '11월', '12월' ],
//				dateFormat : "yy-mm",
//				onClose : function () {
//					var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
//					var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
//					$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
//					$(this).datepicker('setDate', new Date(year, month, 1));
//				}
//				
//			});
//	$(this).mask("9999-99");
//	if(String(inDate) == "undefined")
//		inDate = "";
//	if(String(inDate) != "") {
//		if(String(inDate).length < 6 || inDate == 0){
//			var date = new Date();
//				date.setFullYear(date.getFullYear() + inDate);
//				date.setMonth(date.getMonth() + mm);
//				date.setDate(date.getDate() + dd);
//			var year = date.getFullYear();
//			var month = date.getMonth() + 1; 
//			var day = date.getDate();
//			if (("" + month).length == 1) { month = "0" + month;}
//			if (("" + day).length == 1) { day = "0" + day;}
//			outDate = year + "-" + month + "-" + day;
//		}else if (String(inDate).length > 7 && String(inDate).length < 10){
//			outDate = String(inDate).substr(0, 4) + "-" + String(inDate).substr(4, 2) + "-"	+ String(inDate).substr(6, 2);
//		}else {
//			outDate = inDate;
//		}
//			$(this).val(outDate);
//	}
//	else {
//		$(this).val($.datepicker.formatDate('yy-mm', new Date()));	
//	}
//	$(this).keyup(function() {
//		if($(this).val().length == 7){
//			var year = $(this).val().substr(0,4);
//			var month = $(this).val().substr(5,7)-1;
//			$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
//			$(this).datepicker('setDate', new Date(year, month, 1));
//			$(this).chkCalMonth();
//		}
//	});
}

$.fn.setMonthCalOld = function(inDate,mm,dd) {
	$(this).datepicker(
			{
				changeMonth: true,
			    changeYear: true,
				showOn : "both",
				buttonImage : "/css/images/icon_calender.gif",
				buttonImageOnly : true,
				prevText : '이전 달',
				nextText : '다음 달',
				dayNames : [  '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ],
				dayNamesMin : [ '일','월', '화', '수', '목', '금', '토' ],
				monthNamesShort : [  '1월', '2월', '3월', '4월', '5월', '6월',
							'7월', '8월', '9월', '10월', '11월', '12월' ],
				monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
						'7월', '8월', '9월', '10월', '11월', '12월' ],
				dateFormat : "yy-mm",
				onClose : function () {
					var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
					var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
					$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
					$(this).datepicker('setDate', new Date(year, month, 1));
				}
				
			});
	$(this).mask("9999-99");
	if(String(inDate) == "undefined")
		inDate = "";
	if(String(inDate) != "") {
		if(String(inDate).length < 6 || inDate == 0){
			var date = new Date();
				date.setFullYear(date.getFullYear() + inDate);
				date.setMonth(date.getMonth() + mm);
				date.setDate(date.getDate() + dd);
			var year = date.getFullYear();
			var month = date.getMonth() + 1; 
			var day = date.getDate();
			if (("" + month).length == 1) { month = "0" + month;}
			if (("" + day).length == 1) { day = "0" + day;}
			outDate = year + "-" + month + "-" + day;
		}else if (String(inDate).length > 7 && String(inDate).length < 10){
			outDate = String(inDate).substr(0, 4) + "-" + String(inDate).substr(4, 2) + "-"	+ String(inDate).substr(6, 2);
		}else {
			outDate = inDate;
		}
			$(this).val(outDate);
	}
	else {
		$(this).val($.datepicker.formatDate('yy-mm', new Date()));	
	}
	$(this).keyup(function() {
		if($(this).val().length == 7){
			var year = $(this).val().substr(0,4);
			var month = $(this).val().substr(5,7)-1;
			$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
			$(this).datepicker('setDate', new Date(year, month, 1));
			$(this).chkCalMonth();
		}
	});
}






$.fn.getCal = function(chk) {
	var text = $(this).val();
	if (text == undefined || text == null || text == '') return '';
	else if(chk == '-') {
		return text;
	}else {
		return text.replace(/-/g,"");
	}
	
}

$.fn.chkCal = function() {
	var strValue = $(this).val();
    var bDateCheck = true;
    var arrDate = strValue.split("-");
    var nYear = Number(arrDate[0]);
    var nMonth = Number(arrDate[1]);
    var nDay = Number(arrDate[2]);

    if (nYear < 1900 || nYear > 3000)
    { // 사용가능 하지 않은 년도 체크
        bDateCheck = false;
    }
    if (nMonth < 1 || nMonth > 12)
    { // 사용가능 하지 않은 달 체크
        bDateCheck = false;
    }
    // 해당달의 마지막 일자 구하기
    var nMaxDay = new Date(new Date(nYear, nMonth, 1) - 86400000).getDate();
    if (nDay < 1 || nDay > nMaxDay)
    { // 사용가능 하지 않은 날자 체크
        bDateCheck = false;
    }
    if(bDateCheck == false) 
    {
    	$(this).val("");
    	$(this).focus();
    	alert("존재하지 않은 년월일을 입력하셨습니다. 다시한번 확인해주세요");
    }
}


$.fn.chkCalMonth = function() {
	var strValue = $(this).val();
    var bDateCheck = true;
    var arrDate = strValue.split("-");
    var nYear = Number(arrDate[0]);
    var nMonth = Number(arrDate[1]);
    if (nYear < 1900 || nYear > 3000)
    { // 사용가능 하지 않은 년도 체크
        bDateCheck = false;
    }
    if (nMonth < 1 || nMonth > 12)
    { // 사용가능 하지 않은 달 체크
        bDateCheck = false;
    }
    if(bDateCheck == false) 
    {
    	$(this).val("");
    	$(this).focus();
    	alert("존재하지 않은 년월을 입력하셨습니다. 다시한번 확인해주세요");
    }
}
$.fn.chkCalYear = function() {
    var bDateCheck = true;
    var nYear = $(this).val();
    if (nYear < 1900 || nYear > 3000)
    { // 사용가능 하지 않은 년도 체크
        bDateCheck = false;
    }
    if(bDateCheck == false) 
    {
    	$(this).val("");
    	$(this).focus();
    	alert("존재하지 않은 년을 입력하셨습니다. 다시한번 확인해주세요");
    }
}

//콤보 조회
//setSelect(코드);
$.fn.setSelect = function(head,defaultChk) {
	var itemCode = "";
	var changeCode = "";
	
	var target = $(this).attr("id");
	if(!head) {
		if(defaultChk == "all") {
			$("#"+target).append('<option value="" selected >-- 전체 --</option>');
		} else if (defaultChk == "chk") {
			$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
		}
		return false;
	}
	
	if(head.length > 6) {
		itemCode = head.substr(5,2);
		changeCode = head.substr(7,1);
		head = head.substr(0,5);
		itemCode = itemCode*1;
	}
	
	$.ajax({
		type : "POST",
		url : "/getCommon.do",
		data : {
			"head" : head
		},
		datatype : "json",
		success : function(json) {
			if(defaultChk == "all") {
				$("#"+target).append('<option value="" selected >-- 전체 --</option>');
			} else if (defaultChk == "chk") {
				$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
			}
			var comboData = json.CommonData;
			if (comboData) {
				if(changeCode == "C") {
					$.each(comboData, function(i, item) {
						if(item["item"+itemCode] != " " && item["item"+itemCode] != "" && item["item"+itemCode] != null)
						$('<option>').val(item.dcode + " : " +item.dcodename).text(item["item"+itemCode]).appendTo("#"+target);
					});
				}else {
					if(itemCode) {
						$.each(comboData, function(i, item) {
							if(item["item"+itemCode] != " " && item["item"+itemCode] != "" && item["item"+itemCode] != null)
							$('<option>').val(item["item"+itemCode]).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
						});
					}else {
						$.each(comboData, function(i, item) {
							$('<option>').val(item.dcode).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
						});
					}
				}
			} else {
				alert("error");
			}
		}
	});
}

$.fn.setSelectDataSet = function(data,defaultChk) {
	var target = $(this).attr("id");
	if(defaultChk == "all") {
		$("#"+target).append('<option value="" selected >-- 전체 --</option>');
	} else if (defaultChk == "chk") {
		$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
	}else if (defaultChk == "nochk") {
		$("#"+target).append('<option value="" selected>-- 없음 --</option>');
	}
	
	$.each(JSON.parse(data), function(i, item) {
		$('<option>').val(item.dcode).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
	});
	
	$(this).select2();
	
}
//김정호 사원 수정
//셀렉박스 text에 디코드표출 X
$.fn.setSelectDataSetNodcode = function(data,defaultChk) {
	var target = $(this).attr("id");
	if(defaultChk == "all") {
		$("#"+target).append('<option value="" selected >-- 전체 --</option>');
	} else if (defaultChk == "chk") {
		$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
	}
	
	$.each(JSON.parse(data), function(i, item) {
		$('<option>').val(item.dcode).text(item.dcodename).appendTo("#"+target);
	});
	
	$(this).select2();
	
}

$.fn.setSelectDataSetSetval = function(data,defaultChk,defaultValue) {
	var target = $(this).attr("id");
	if(defaultChk == "all") {
		$("#"+target).append('<option value="" selected >-- 전체 --</option>');
	} else if (defaultChk == "chk") {
		$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
	}
	
	$.each(JSON.parse(data), function(i, item) {
		var tmp = "";
		if(defaultValue == item.dcode) {
			tmp = '<option selected>';
		} else {
			tmp = '<option>';
		}
		$(tmp).val(item.dcode).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
	});
	
	$(this).select2();
	
}

//배열 중복제거 2019.07.23 김동진
//사용법  setSelectItemDataSet 참조
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

$.fn.setSelectItemDataSet = function(data,defaultChk) {
	var target = $(this).attr("id");
	if(defaultChk == "all") {
		$("#"+target).append('<option value="" selected >-- 전체 --</option>');
	} else if (defaultChk == "chk") {
		$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
	}
	
	
	var orgData = new Array();
	$.each(JSON.parse(data), function(i, item) {
		if(!contains.call(orgData,item.item1)) //중복되지 않은값만 select box로
			$('<option>').val(item.item1).text(item.item1 + " : " +item.item2).appendTo("#"+target);
		
		orgData.push(item.item1);
	});
	
	$(this).select2();
	
}

//item3 그룹권한이 포함된 아이템만 표출
$.fn.setSelectHotelDataSet = function(data,authGroupCode,defaultChk) {
	var target = $(this).attr("id");
	if(defaultChk == "all") {
		$("#"+target).append('<option value="" selected >-- 전체 --</option>');
	} else if (defaultChk == "chk") {
		$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
	}
	
	$.each(JSON.parse(data), function(i, item) {
		var useCodeList = item.item3;
		if(useCodeList.length != 0){
			
			if(useCodeList.length == 1 && useCodeList == authGroupCode){
				$('<option>').val(item.dcode).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
			}
			
			if(useCodeList.length > 1){
				var useCode = useCodeList.split(',');
				for(var i=0;i<useCode.length;i++){
					if(authGroupCode == useCode[i]){
						$('<option>').val(item.dcode).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
					}
				}
			}
			
		}
	});
	
	$(this).select2();
	
}

$.fn.setSelectKioskDataSet = function(data,defaultChk) {
	var target = $(this).attr("id");
	if(defaultChk == "all") {
		$("#"+target).append('<option value="" selected >-- 전체 --</option>');
	} else if (defaultChk == "chk") {
		$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
	}
	
	
	
	$.each(JSON.parse(data), function(i, item) {
		
		if(item.item2 == "Y"){
			$('<option>').val(item.dcode).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
		}
	});
	
	$(this).select2();
	
}


$.fn.setSelectYN = function(Yvalue,Nvalue,defaultChk) {
	var target = $(this).attr("id");
	
	if(defaultChk == "all") {
		$("#"+target).append('<option value="" selected>-- 전체 --</option>');
	}
	if(defaultChk == "chk") {
		$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
	}
	$("#"+target).append('<option value="Y">'+Yvalue+'</option>');
	if(defaultChk =="N"){
		$("#"+target).append('<option value="N" selected>'+Nvalue+'</option>');
	} else {
		$("#"+target).append('<option value="N">'+Nvalue+'</option>');
	} 
			
	$(this).select2();
}


//콤보 조회
//setQuerySelect(해당쿼리.do);
$.fn.setQuerySelect = function(sUrl,defaultChk) {
	var itemCode = "";
	var changeCode = "";
	
	var target = $(this).attr("id");
	$.ajax({
		type : "POST",
		url : sUrl,
		datatype : "json",
		success : function(json) {
			if(defaultChk == "all") {
				$("#"+target).append('<option value="" selected >-- 전체 --</option>');
			} else if (defaultChk == "chk") {
				$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
			}else if (defaultChk == "none") {
				$("#"+target).append('<option value="" selected>-- 없음 --</option>');
			}
			var comboData = json.CommonData;
			if (comboData) {
				if(changeCode == "C") {
					$.each(comboData, function(i, item) {
						if(item["item"+itemCode] != " " && item["item"+itemCode] != "" && item["item"+itemCode] != null)
						$('<option>').val(item.dcode + " : " +item.dcodename).text(item["item"+itemCode]).appendTo("#"+target);
					});
				}else {
					if(itemCode) {
						$.each(comboData, function(i, item) {
							if(item["item"+itemCode] != " " && item["item"+itemCode] != "" && item["item"+itemCode] != null)
							$('<option>').val(item["item"+itemCode]).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
						});
					}else {
						$.each(comboData, function(i, item) {
							$('<option>').val(item.dcode).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
						});
					}
				}
			} else {
				alert("error");
			}
		}
	});
	
	$(this).select2();
}

//콤보 조회
//setQuerySelect(해당쿼리.do);
$.fn.setQueryParamSelect = function(sUrl,defaultChk,param) {
	var itemCode = "";
	var changeCode = "";
	
	var target = $(this).attr("id");
	$.ajax({
		type : "POST",
		url : sUrl,
		datatype : "json",
		data : 
			param
		,
		success : function(json) {
			if(defaultChk == "all") {
				$("#"+target).append('<option value="" selected >-- 전체 --</option>');
			} else if (defaultChk == "chk") {
				$("#"+target).append('<option value="" selected disabled>-- 선택 --</option>');
			}
			var comboData = json.CommonData;
			if (comboData) {
				if(changeCode == "C") {
					$.each(comboData, function(i, item) {
						if(item["item"+itemCode] != " " && item["item"+itemCode] != "" && item["item"+itemCode] != null)
						$('<option>').val(item.dcode + " : " +item.dcodename).text(item["item"+itemCode]).appendTo("#"+target);
					});
				}else {
					if(itemCode) {
						$.each(comboData, function(i, item) {
							if(item["item"+itemCode] != " " && item["item"+itemCode] != "" && item["item"+itemCode] != null)
							$('<option>').val(item["item"+itemCode]).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
						});
					}else {
						$.each(comboData, function(i, item) {
							$('<option>').val(item.dcode).text(item.dcode + " : " +item.dcodename).appendTo("#"+target);
						});
					}
				}
			} else {
				alert("error");
			}
		}
	});
}

//라디오버튼 조회
//setRadio(코드);
$.fn.setRadio = function(head,defaultChk) {
	var target = $(this).attr("id");
	$.ajax({
		type : "POST",
		url : "/getCommon.do",
		data : {
			"head" : head
		},
		datatype : "json",
		success : function(json) {
			
			var chkData = json.CommonData;
			if (chkData) {
				// 타겟이 div일경우 구분하여 radio 생성
				if($("#"+target).prop('nodeName') == "DIV" ) {
					if(defaultChk == "all")
						$("#"+target).append("<label style='width:200px;'><input type='radio' name='"+target+"Name' value="+'all'+">"+"전체"+"</label>");
					$.each(chkData,function(i, item) {$("#"+target)
						.append("<label style='width:200px;'><input type='radio' name='"+target+"Name' value="+
								chkData[i].dcode+">"+chkData[i].dcode + " : " +chkData[i].dcodename+"</label>");
									});
					$("input[name='"+target+"Name']").eq(0).attr("checked", true);	
				} else {
					alert('RADIO생성 대상은 DIV로 선언해주세요.');
				}
			} else {
				alert("error");
			}
		}
	});
}

/**
 * 'Y', 'N' 라디오 버튼 셋팅
 */
$.fn.setRadioYN = function() {
	// 타겟이 div일경우 구분하여 radio 생성
	var target = $(this).attr("id");
	if($(this).prop('nodeName') == "DIV" ) {
		$(this).append("<label><input type='radio' name='"+target+"Name' value="+'Y'+">"+"Y"+"</label>");
		$(this).append("<label><input type='radio' name='"+target+"Name' value="+'N'+">"+"N"+"</label>");
	} else {
		$(this).parent().append("<label><input type='radio' name='"+target+"Name' value="+'N'+">"+"N"+"</label>");
		$(this).replaceWith("<label><input type='radio' name='"+target+"Name' value="+'Y'+">"+"Y"+"</label>");
	}
	
	$("input[name='"+target+"Name']").eq(0).attr("checked", true);
}

/**
 * Value, Text 지정 라디오 버튼 셋팅
 */
$.fn.setRadioValueYN = function(yVal,yText,nVal,nText) {
	var target = $(this).attr("id");
	// 타겟이 div일경우 구분하여 radio 생성
	if($(this).prop('nodeName') == "DIV" ) {
		$(this).append("<label class='col-md-4 radio radio-primary'><input type='radio' name='"+target+"Name' value="+yVal+"><span>"+yText+"</span><span class='checkmark'></span></label>");
		$(this).append("<label class='col-md-4 radio radio-primary'><input type='radio' name='"+target+"Name' value="+nVal+"><span>"+nText+"</span><span class='checkmark'></span></label>");
	} else {
		$(this).parent().append("<label class='col-md-4 radio radio-primary'><input type='radio' name='"+target+"Name' value="+nVal+"><span>"+nText+"</span><span class='checkmark'></span></label>");
		$(this).replaceWith("<label class='col-md-4 radio radio-primary'><input type='radio' name='"+target+"Name' value="+yVal+"><span>"+yText+"</span><span class='checkmark'></span></label>");
		
	}
	
	$("input[name='"+target+"Name']").eq(0).attr("checked", true);
}


/**
 * Radio
 */
$.fn.setRadioValue = function(val) {
	var target = $(this).attr("id");
	
	$('input:radio[name='+target+'Name]:input[value='+val+']').prop("checked", true);
}

//체크박스 조회
//setRadio(코드);
$.fn.setCheck = function(head) {
	var target = $(this).attr("id");
	$.ajax({
		type : "POST",
		url : "/getCommon.do",
		data : {
			"head" : head
		},
		datatype : "json",
		success : function(json) {
			
			var chkData = json.CommonData;
			if (chkData) {
			$.each(chkData,function(i, item) {$("#"+target)
				.append("<label><input type='checkbox' name='"+target+"Name'  value="+
						+chkData[i].dcode+">"+chkData[i].dcode + " : " +chkData[i].dcodename+"</label>");});
			//$("input[name='"+target+"Name']").eq(0).attr("checked", true);
			} else {
				alert("error");
			}
		}
	});
}

//체크박스 조회
//setRadio(코드);
$.fn.setCheckDataSet = function(data) {
	var target = $(this).attr("id");
	var chkData = JSON.parse(data);
	$.each(chkData,function(i, item) {
		$("#"+target).append("<label style='width: auto;'><input type='checkbox' name='"+target+"Name'  value="
			+chkData[i].dcode+">"+chkData[i].dcode + " : " +chkData[i].dcodename+"</label>&nbsp;");});
}












//체크박스 조회 ( Text 코드 제거 )
//setRadio(코드);
$.fn.setCheckDataSet2 = function(data,cnt) {
	var target = $(this).attr("id");
	var chkData = data;
	
		$.each(chkData,function(i, item) {
			$("#"+target).append("<label>" 
								 +"	<div style='width:140px; display:inline-block;'>"
								 +"		<input type='checkbox' id='check"+chkData[i].dcode+"' name='"+target+"Name' style='width: 20px; height: 20px;' value="+chkData[i].dcode+">" 
								 +"		<span style='position: absolute; margin-top: 5px;'>"+chkData[i].dcodename+"</span>"
								 +"	</div>" 
								 +"</label>");
			
			if((i+1)%cnt == 0){
				$("#"+target).append("<br/>");
			}
			
		});
		
		//$("input[name='"+target+"Name']").eq(0).attr("checked", true);
}

/**
 * 체크박스 조회 타입 3 추가
 *  
 * 변경사항 : 	cnt 추가 > cnt만큼 뿌린 후 Br로 줄바꿈, 줄맞춤 추가, 체크박스 크기 상향
 * 적용 예 : 	RoomBlockCodeReg.jsp
 * 2018-12-27 김동진
 * 
*/
$.fn.setCheckDataSet3 = function(data,cnt) {
	var target = $(this).attr("id");
	var chkData = JSON.parse(data);
	
		$.each(chkData,function(i, item) {
			$("#"+target).append("<label class='checkbox checkbox-primary' style='width: auto; padding-right: 15px;'>"
								 +"		<input type='checkbox' id='check"+chkData[i].dcode+"' style='width: 20px; height: 20px;' value="+chkData[i].dcode+">" 
								 +"		<span>"+chkData[i].dcodename+"</span><span class=\"checkmark\"></span>"
								 +"</label>");
			
			if((i+1)%cnt == 0){
				$("#"+target).append("<br/>");
			}
			
		});
		
		//$("input[name='"+target+"Name']").eq(0).attr("checked", true);
}
Date.prototype.yyyymmdd = function()
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
 
    return yyyy + (mm[1] ? mm : '0'+mm[0]) + (dd[1] ? dd : '0'+dd[0]);
}


function calFromTo(from,to) {
	
	//stDate,eDdate.addclass ('req');
	addClass(document.getElementById(from),"fromto-"+from+"-"+to);
	addClass(document.getElementById(to),"fromto-"+from+"-"+to);
	
	// 전역변수에 저장된 인스턴스 기준으로 제어함.
	// from, to 인스턴스 취득
	var from_instance,to_instance;
	for (var i = 0; i < tuiCalArr.length; i++) {
		var item = tuiCalArr[i];
		if(item.calId == from) {
			from_instance = item.instance;
		}
		if(item.calId == to) {
			to_instance = item.instance;
		}
	}
	// 시작,종료 날짜 변경시 이벤트로 자동조정
	if(from_instance && from_instance) {

		from_instance.on('close', function() {
		    if (!document.getElementById(from).value.length) {
		    	from_instance.setDate(null);
		    }
		    if($("#"+to).val() < $("#"+from).val()  ) {
		    	to_instance.setDate(from_instance.getDate());
		    	to_instance.getDate();
	    	} 
		});
	
		to_instance.on('close', function() {
		    if (!document.getElementById(to).value.length) {
		    	to_instance.setDate(null);
		    }
			if($("#"+to).val() < $("#"+from).val() ) {
	    		from_instance.setDate(to_instance.getDate());
	    		from_instance.getDate();
	    	} 
		});

	}
}

/**
 * 필수여부 셋팅
 */
$.fn.setRequired = function(flag) {
	if(flag) {
		$(this).attr('required', 'required');
	} else {
		$(this).removeAttr('required');
	}
}


/**
 * 사용여부 셋팅
 */
$.fn.setEnabled = function(flag) {
	// tui데이트피커 처리
	if($(this).hasClass("tuiDatePicker")){
		var targetId = $(this).attr("id");
		var calInstance;
		if(typeof targetId == "undefined"){
			console.log("[view.js setEnabled] target undefined");
			 return false;
		}
		// 인스턴스 전역변수 체크
		for (var i = 0; i < tuiCalArr.length; i++) {
			var item = tuiCalArr[i];
			if(item.calId == targetId) {
				calInstance = item.instance;
			}
		}
		if(flag) calInstance.enable();
		else calInstance.disable();
	}
	if($(this).prop('nodeName') == "BUTTON" || $(this).prop('nodeName') == "IMG") {
		$(this).button({disabled: !flag});	
	} else {
		$(this).prop("readonly",!flag);
		$(this).prop("disabled",!flag);
		if(!flag) {
			// 20171016 ie에서 readonly css사용불가 >> 배경색 지정
			$(this).css("background-color",'#EAE9E9');
			$(this).prop("tabindex",'-1');
		} else {
			$(this).css("background-color",'#FFFFFF');
			$(this).prop("tabindex",'');
		}
	}
	
}

function JSBindData(data,rowJson) {
	
	$.each(data, function(i,item){
		//console.log(i);
		if(item.type=="text") {
			$("#"+item.view).val(rowJson[""+item.key]).text(rowJson[""+item.key]);
		}
		if(item.type=="date") {
			var bindDate = rowJson[""+item.key];
			var result=bindDate.indexOf('-');
			if(result>0)
				bindDate = bindDate.replaceAll('-','');
			$("#"+item.view).val(bindDate.substr(0, 4)+"-"+bindDate.substr(4, 2)+"-"+bindDate.substr(6, 2));
		}
		if(item.type=="time") {
			$("#"+item.view).val(rowJson[""+item.key].substr(0, 2)+":"+rowJson[""+item.key].substr(2, 2));
		}
		if(item.type=="select") {
			$("#"+item.view).val(rowJson[""+item.key]).trigger("change");
		}
		if(item.type=="select2") { // 삭제예정
			$("#"+item.view).val(rowJson[""+item.key]).trigger("change");
		}
		if(item.type=="radio") {
			$('input:radio[name='+item.view+'Name]:input[value='+rowJson[""+item.key]+']').prop("checked", true);
		}
		if(item.type=="check") {
			$('input:checkbox[name='+item.view+']:input[value='+rowJson[""+item.key]+']').prop("checked", true);
		}
		if(item.type=="number") {
			var value = rowJson[""+item.key];
			value = value.format();
			$("#"+item.view).val(value).text(value);
		}
		if(item.type=="zipCode") {
			$("#"+item.view).val(rowJson[""+item.key].substr(0, 3)+"-"+rowJson[""+item.key].substr(3, 3));
		}
	});	
	


}

//서버에서 yyyymmdd 형태로 가져왔을때 yyyy-mm-dd 형식으로 바꾸기 위한 formatter, unformat
function f_SetDate(value) { 
	if( typeof(value) == 'object') value = value.value;
    if (value == undefined || value == null || value == '' ) return '';
    else if (value.indexOf('-') != -1) return value;
    else if (isNaN(Number(value))) return value;
    else return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6,8);
}
function f_UnSetDate(value) {
    if (value == undefined || value == null || value == '') return '';
    else return value.replace(/-/g,'');
}
// YYYY-MM-DD HH:MM:SS
function f_SetTimeStamp(value) { 
	if (value == undefined || value == null || value == '') return '';
    else if (value.indexOf('-') != -1) return value;
    else if (isNaN(Number(value))) return value;
    else return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6,8) + ' ' + value.substring(8,10) + ':' + value.substring(10,12) + ":" + value.substring(12,14);
}

function f_UnSetTimeStamp(value) { 
	if (value == undefined || value == null || value == '') return '';
    else return value.replace(/-/|/:/g,'');
}

//0730 -> 07:30 시간 형식으로 바꾸기 위한 formatter, unformat
function f_SetTime(value) {
	if( typeof(value) == 'object') value = value.value;
	if (value == undefined || value == null || value == '') return '';
	else if (value.indexOf(':') != -1) return value;
	else return value.substring(0,2) + ':' + value.substring(2,4);
}
function f_UnSetTime(value) {
    if (value == undefined || value == null || value == '') return '';
    else return value.replace(/:/g,'');
}

//돈 형식 formatter, unformat
function f_SetComma(value) {
	if( typeof(value) == 'object') value = value.value;
	var retVal = value + ''; //toString
	return retVal.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function f_UnSetComma(value) {
	if( typeof(value) == 'object') value = value.value;
	var retVal = value + ''; //toString
	return retVal.replace(/,/g, '');
}

//조우리 제작 : 010100101(유형A), 020304(유형B) 형식의 취미 코드를 파싱함.
//예시 : f_parseHobby('${cmmnObj.CR062}', '01010101')
function f_parseHobby(strfiedJSONArray, hobbyCode) {
	var jsonArr = JSON.parse(strfiedJSONArray);
	var hobbyArr     = [];
	var dcodeArr     = [];
	var dcodenameArr = [];
	var parseRst     = [];
	for (var i = 0 ; i < jsonArr.length ; i++) {
		hobbyArr[i]     = jsonArr[i].dcode + ':' + jsonArr[i].dcodename;
		dcodeArr[i]     = jsonArr[i].dcode;
		dcodenameArr[i] = jsonArr[i].dcodename;
	}
	//유형검사
	var type = 'A';
	for (var i = 0 ; i < hobbyCode.length ; i++) {
		if (hobbyCode[i] != '0' && hobbyCode[i] != '1') {
			type = 'B';
			break;
		}
	}
	//파싱 시작: parseRst = [01,03,05] 형식으로 담김.
	if (type == 'A') { //유형A: 010101000 형식
		for (var i = 0 ; i < hobbyCode.length / 2 ; i++) {
			var start = 2*i;    
			var end   = 2*(i+1); 
	 		var temp = hobbyCode.substring(start, end);
	 		console.log('[' + start + ', ' + end + '] and temp is ' + temp);
	 		if (temp == '01') 
	 			parseRst.push('0' + (i+1));
	 	}
	}
	else if (type == 'B') { //유형B: 010205 형식
		for (var i = 0 ; i < hobbyCode.length / 2 ; i++) {
	 		var temp = hobbyCode.substr(0 + 2*i, 2*(i+1));
	 		parseRst.push(temp);
	 	}
	}
	var resultStr = '' //01:골프 03:수영 형식의 문자열 반환.
	for (var i = 0 ; i < parseRst.length ; i++) {
		for (var j = 0 ; j < hobbyArr.length ; j++) {
			if (hobbyArr[j].indexOf(parseRst[i]) != -1)
				resultStr += ', ' + hobbyArr[j];    
		}
	}
	return resultStr.substring(2, resultStr.length);	
}


// makeReportDownBtn 리포트 다운로드용 형식별 버튼 생성
// param (pAreaObj : 리포트 뷰 AreaDiv객체) 
function makeReportDownBtn(pAreaObj) {

	var downloadExts = ['pdf', 'xlsx', 'docx', 'pptx'];
	var makeHtml = ''; // '<div class="row btn-row" id="pdfBtn"  style="text-align: left; margin-left: 45px; ">';
	downloadExts.forEach(function(item){
		makeHtml += '<button onclick="$(this).downReportView();" data="'+item+'" type="button" class="btn btn-secondary" style="padding: 0px; border: none;"><img src="/images/mini_'+item+'_icon.png" alt="'+item+'_Download"/></button>';
	});
	makeHtml += ''; // '</div>';
	$(pAreaObj).parent().append(makeHtml);
}

// $('#divID').setReportView 리포트 뷰 생성
// param (data : 리포트 뷰 파라미터)
// 호출예시 
//		$("#reportArea").setReportView({     			-- reportArea 라는 Div를 지정하여 리포트뷰 생성
//	 		"CON_ReportPath": "/test/Leaf_Green" 		-- 디자인파일 위치 ("/resources/report/" 디렉토리기준으로 하위.
//   		,"CON_ReportName": "Leaf_Green"				-- 뷰적용시 리포트 명 / 다운로드 파일 명 
//			,"pAccUserName": $("#pAccUserName").val()	-- 하위파라미터 지정가능
//		});

$.fn.setReportView = function(data) {

	var frmSrc = "/sys/reportView.do";
	pageBlock();
	
	$(this).empty();
	data.width==null?data.width="100%":data.width+'px';
	data.height==null?data.height="75vh":data.height+'px';
	$(this).pdf( {
			title : '',
			disableZoom : true,
			disableSwipe : true,
			disableLinks : true,
			loadingHeight : 1024, 
			loadingWidth : 768, 
			source : frmSrc+"?"+$.param(data),
			loaded : function () {
				pageUnBlock();
			}
		} );
	
	// 파라미터 갱신 (다운로드용)
	$(this).parent().children('input[name="postData"]').remove();
	$(this).parent().append("<input name='postData' type='hidden' value='"+JSON.stringify(data)+"' />");

}


//$('btnObvj').downReportView 리포트 뷰 다운로드
//param (없음)
$.fn.downReportView = function() {
	// 조회된 리포트 생성시 사용했던 파라미터 재사용	
	var pPostData = JSON.parse($(this).parent().parent().parent().children('input[name="postData"]').val());
	// 해당 버튼에 지정된 파일형식
	var pDownType = $(this).attr("data");
	pPostData["pDownloadExt"] = pDownType;
	// json 형식데이터를 stringParameter 형식으로 변환
	var convertPostData = $.param(pPostData);
	// 1회성 폼생성,전송,삭세
	var tempFrm = $("<form id=\'frmTempdownReportView\' style=\'display:none\' action=\'/sys/reportDown.do?"+convertPostData+"\' method=\'post\'></form>");
	$("body").append(tempFrm);
	$(tempFrm).submit(); 
	$(tempFrm).remove();
	   
}


//2020-11-26 김대성 추가
//컴포넌트 값 읽어오기
$.fn.getValue = function() {
	var target = $(this).attr("id");
	var dom = $(this).get(0).nodeName;
	if (dom == "SELECT") {
		var text = $("#"+target).val();
		return text;		
	} else {
		 var elements = $(this).children().children().first();
	     elements.each(function(){ elements =$(this).attr("type"); });
	    	 if (elements == "radio") {
				var text = $("input[name='"+target+"Name']:checked").val();
				return text;
			} else if (elements == "checkbox") {
				var text = "";
				$("input[name='"+target+"Name']:checked").each(function() {
					if(text == '') text += $(this).val();
					else text += ", " + $(this).val(); 
				});
				return text;
			} 
	}
}

// class 추가
function addClass(element, className) {
	element.className += " " + className; 
}

//class 포함확인
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

// class 삭제
function removeClass(element, className) { 
	var check = new RegExp("(\\s|^)" + className + "(\\s|$)"); 
	element.className = element.className.replace(check, " ").trim(); 
};