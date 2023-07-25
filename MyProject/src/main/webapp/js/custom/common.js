var isTest = false;
let isToastShown=false;
var mobile = checkMobile();


function f_checkMenuOpen(id) {
	const menu = $("#menu").val();
	
	if(menu == "Y") {
		showMenu(id);
		$("#menu").val("N");
	} else {
		
	}
	
}

//ajax 통신시 표출
$(document).ajaxStart(function() {
		$(document).on('scroll touchmove mousewheel', function(event) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		});
	});

$(document).ajaxStop(function() {
		$(document).off('scroll touchmove mousewheel');
	});

//페이지 블락 관련
function pageBlock() {
	$.blockUI({ css: { 
        border: 'none', 
        padding: '15px', 
        backgroundColor: '#000', 
        '-webkit-border-radius': '10px', 
        '-moz-border-radius': '10px', 
        opacity: .5, 
        color: '#fff' 
    } });
}

function pageUnBlock() {
	$.unblockUI();
}

function showMsg(msg) {
	let toast = document.getElementById('toast');
	
	if(!toast) {
		let newDiv = document.createElement("div");
		newDiv.setAttribute("id", "toast");
		document.body.appendChild(newDiv);
	}
	
	
	var ment;
	var childDiv = document.createElement("div");
	var divBox = document.createElement("div");
		ment = msg.split('<br>');
		$.each(ment, function(i,item){
			var childContent = document.createTextNode(item);
			var br = document.createElement("br");
			childDiv.classList.add('Subtitle','font_16px','i_font_15px');
			childDiv.appendChild(childContent);
			childDiv.appendChild(br);
			
		});
		divBox.appendChild(childDiv);
		divBox.classList.add('toast_divBox');
	
	toast = document.getElementById('toast'); 
	toast.innerHTML = '';
	toast.appendChild(divBox);
    if (isToastShown) {
		console.log(isToastShown);
		return false;	
	}   
    isToastShown = true;
    toast.classList.remove('show');
    
    
    if(toast.classList[0] != 'show') {
		toast.classList.add('toast_font');
		toast.classList.add('show');  
//        if (mobile == 'ios' || mobile == 'ios_app') {
//			$('#toast').css('bottom','54px');
//		} 
        setTimeout(function () {
            toast.classList.remove('show');
            isToastShown = false; 
        }, 2500);
    }
    
    
}


function permissionMsg(){
	showMsg("접근권한이 없습니다.");
}

/**
 * 숫자 타입에서 쓸 수 있도록 format() 함수 추가
 */ 
Number.prototype.format = function(){
    if(this==0) return 0;
 
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
 
    return n;
};
 
//prototype 함수
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

/**
 * 문자열 타입에서 쓸 수 있도록 format() 함수 추가
 */ 
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.format();
};

/**
 * 문자열 타입에서 쓸 수 있도록 unformat() 함수 추가
 */ 
String.prototype.unformat = function(){
    var retVal = this;
    return retVal.replace(/,/g, '');
};



/**
 * 문자열 타입에서 쓸 수 있도록 trim() 함수 추가
 */ 
String.prototype.trim = function() {
  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};


// 엔터키로 함수 실행
// selector.enter(함수명); ex > $("#em_Date, #sEmpNo, #sEmpName").enter("f_Retrieve");
$.fn.enter = function(fnName, param) {
	$(this).keydown(function (key) {
	    if(key.keyCode == 13){
	    	if(param) eval(fnName+'('+param+')');
	    	else  eval(fnName+'()');
	    	return false;
	    }
	});
}

//엔터키로 함수 실행
//selector.popEnter(함수명); ex > $("#sUpjangName").popEnter(['sUpjangCode','sUpjangName'],'f_SearchUpjangCodePopup', 'f_Retrieve');
$.fn.popEnter = function(requiredParam, popFnName, resultFnName) {
	$(this).keydown(function (key) {
		
	    if(key.keyCode == 13){
	    	var flag = true;
	    	
	    	for (var i = 0; i < requiredParam.length; i++) {
	    		if($("#"+requiredParam[i]).val() == "") {
	    			flag = false;
	    			break;
	    		}
	    	}
	    	
	    	if(flag) {	// 필수값이 제대로 있으면 함수
    			if(resultFnName) {
    				(new Function(''+resultFnName+'()'))();
    				return false;
    			}
	    	} else {	// 없으면 팝업
	    		
	    		if(popFnName) {
	    			
	    			(new Function(''+popFnName+'()'))();
	    			return false;
	    		}
	    		
	    	}
	    }
	});
	
}

// 그리드 현재 데이터 엑셀출력
// selector.ToExcel(엑셀파일제목); ex > $("#list").ToExcel('엑셀'); or $("#list2").ToExcel();  
$.fn.toExcel = function(title,NoAlignArray,MergeArray) {
	if(!title)title="Excel"
	if(!NoAlignArray)NoAlignArray=new Array();
	if(!MergeArray)MergeArray=new Array();
	
	var ExcelTitle = title;
	var GridArray = new Array();
	var IdArray = new Array();
	var NameArray = new Array();

	var gridCount = $(this).getGridParam("records");
	var columnNames = $(this).jqGrid('getGridParam', 'colNames');
	var rowJson = $(this).getRowData(1);
	for (var i = 1; i <= gridCount; i++) {
		var data = new Object();
		data = $(this).getRowData(i);
		GridArray.push(data);
	}
	for (key in rowJson) {
		var colId = new Object();
		colId.key = key;
		IdArray.push(colId);
	}
	for ( var i in columnNames) {
		var colName = new Object();
		colName.name = columnNames[i];
		NameArray.push(colName);
	}
	var totalInfo = new Object();
	totalInfo.ExcelTitle = ExcelTitle;
	totalInfo.GridData = GridArray;
	totalInfo.IdData = IdArray;
	totalInfo.NameData = NameArray;
	totalInfo.NoAlignData = NoAlignArray;
	totalInfo.MergeData = MergeArray;
	totalInfo.MergeYN = "Y";
	var postData = JSON.stringify(totalInfo);
	var html = "<form id=\'excelform\' style=\'display:none\' action=\'exceldown.do\' method=\'post\'><input id=\'postData\' name=\'postData\' type=\'hidden\' /></form>";
	$("body").append(html);
	$("#postData").val(postData);
	$("#excelform").submit(); 
	$("#excelform").remove();
}



//오늘날짜 조회 (chk) 가 "-" 면 YYYY-MM-DD 아니면 YYYYMMDD
//today('-'); or today();
function getToday(chk){
 var date = new Date();
 var year  = date.getFullYear();
 var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
 var day   = date.getDate();
 if (("" + month).length == 1) { month = "0" + month; }
 if (("" + day).length   == 1) { day   = "0" + day;   }
 
 if(chk == "-") {
 	return "" + year +"-"+ month +"-"+ day;
	} else {
		return "" + year + month + day;	
	}
}

function getNowDate(chk){
	 var date = new Date();
	 var year  = date.getFullYear();
	 var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
	 var day   = date.getDate();

	 
	 if (("" + month).length == 1) { month = "0" + month; }
	 if (("" + day).length   == 1) { day   = "0" + day;   }
	 
	 if(chk == "-") {
 		return "" + year +"-"+ month +"-"+ day;
	}else if(chk == "none") {
		return "" + year +""+ month +""+ day;
	}else {
		return "" + year + month + day;	
	}
}

function getNowTime(chk){
	 var date = new Date();
	 var h = date.getHours();
	 var m = date.getMinutes();
	 var s = date.getSeconds();
	 
 	// 분,초가 10보다 작으면 0을 붙여준다.
	 if(m<10){
		 m = "0" + m;
	 }
	 if(s<10){
		 s = "0" + s;
	 }

	 
	 if(chk == "-") {
		 	return h +':'+ m;
	 }else if(chk == "none") {
		 	return h +''+ m;
	 }else {
			return h +''+ m;	
	 }
}

function getNow(chk){
 var date = new Date();
 var year  = date.getFullYear();
 var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
 var day   = date.getDate();
 var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	
	// 분,초가 10보다 작으면 0을 붙여준다.
	 if(m<10){
		 m = "0" + m;
		}
	 if(s<10){
		 s = "0" + s;
		}

 
 if (("" + month).length == 1) { month = "0" + month; }
 if (("" + day).length   == 1) { day   = "0" + day;   }
 
 if(chk == "-") {
 	return "" + year +"-"+ month +"-"+ day+ ' ' + h +':'+ m + ':' + s;
	}else if(chk == "none") {
 	return "" + year +""+ month +""+ day+ '' + h +''+ m + '' + s;
	}else {
		return "" + year + month + day+ ' ' + h +':'+ m + ':' + s;	
	}
}

function getHhMm(){
 var date = new Date();
 var h = date.getHours();
	var m = date.getMinutes();
	
	// 분이 10보다 작으면 0을 붙여준다.
	 if(m<10){
		 m = "0" + m;
		}
	return ""+h +''+ m;	
}


//지정 전후 날짜 조회 (chk) 가 "-" 면 YYYY-MM-DD 아니면 YYYYMMDD
//getDate('-',년,월,일); 예) 2년 후 3개월 전 getDate('',2,-3,0);
function getDate(chk, my, mm, md) {
	var date = new Date();
	if (my || mm || md) {
		date.setFullYear(date.getFullYear() + my);
		date.setMonth(date.getMonth() + mm);
		date.setDate(date.getDate() + md);
	}
	var year = date.getFullYear();
	var month = date.getMonth() + 1; // 0부터 시작하므로 1더함
	var day = date.getDate();
	if (("" + month).length == 1) {
		month = "0" + month;
	}
	if (("" + day).length == 1) {
		day = "0" + day;
	}
	if (chk == "-") {
		return "" + year + "-" + month + "-" + day;
	} else {
		return "" + year + month + day;
	}
}

function getDateDay(searchDate) {
	var week = ['일', '월', '화', '수', '목', '금', '토'];

	var y = searchDate.substr(0,4);
	var m = searchDate.substr(4,2);
	var d = searchDate.substr(6,2);

	var date = new Date(y+'-'+m+'-'+d);

	var year = date.getFullYear();
	var month = date.getMonth() + 1; // 0부터 시작하므로 1더함
	var day = date.getDate();
	var days = date.getDay();
	if (("" + month).length == 1) {
		month = "0" + month;
	}
	if (("" + day).length == 1) {
		day = "0" + day;
	}

	return "" + year + "-" + month + "-" + day+"("+week[days]+")";
}

//날짜 텍스트 변경 YYYY-MM-DD <> YYYYMMDD
//dateRe(dateText);
function dateRe (inDate) {
	var outDate = "";
	if(inDate.length > 8){
		outDate = inDate.substr(0, 4) + inDate.substr(5, 2) + inDate.substr(8, 2);
	}else {
		outDate = inDate.substr(0, 4) + "-" + inDate.substr(4, 2) + "-"	+ inDate.substr(6, 2);
	}
	return outDate;		
}

function camelcase(input) {
 var patt = /([A-Za-z0-9]+_)/g;
 var array = input.match(patt);
 var output = "";
 for(var i=0; i<array.length; i++){
     array[i] = array[i].toLowerCase();
     if(i==0){
         output += array[i].substring(0, array[i].length-1);
     }else{
         output += array[i].substring(0, 1).toUpperCase() +
                   array[i].substring(1, array[i].length-1);
     }
 } // end of forloop
 patt = /(_[A-Z]+)/g;
 array = input.match(patt);
 var last = array[array.length-1].toLowerCase();
 output += last.substring(1, 2).toUpperCase() +
           last.substring(2, last.length);
 return output;
}


/**
* 해당 년, 월의 마지막 일 반환
* @param yy
* @param mm
*/
function getLastDayOfMonth(yy, mm) {
	 var date = new Date(yy, mm + 1, 0);
	 var lastDayOfMonth = date.getUTCDate();
	 
	 return lastDayOfMonth;
}
 
/************************************************************************************************
 * Function : Null 여부 확인
 * @param   : sValue - Null 여부 확인 값
 * @param   : e - GridClickEventInfo
 * Return   : boolean
************************************************************************************************/
function gfn_isNull(sValue)
{
	if(new String(sValue).valueOf() == "undefined" || new String(sValue).valueOf() == "[Undefined]") return true;
	if(sValue == null) return true;
	if(("x"+sValue == "xNaN") && (String(sValue.length).valueOf() == "undefined"))
		return true;
	if(String(sValue).length == 0) return true;
  
    //Trim 기능 추가  
    var sArg = new String(sValue);
	if (sArg.replace(/(^\s*)|(\s*$)/g, "").length == 0 ) return true;
	
 	return false;
}

/************************************************************************************************
 * Function : 입력된 날자에 nOffset 으로 지정된 만큼의 일을 증감한다.
 * @param   : sDate - yyyyMMdd 형식의 날짜 문자열
 * @param   : nOffset - 증감할 일수
 * Return   : yyyyMMdd 형태의 문자열
************************************************************************************************/
function gfn_addDate(sDate, iOffset)
{
	if(gfn_isNull(sDate) || gfn_isNull(iOffset)) return "";

	var nYear = parseInt(sDate.substr(0, 4));
	var nMonth = parseInt(sDate.substr(4, 2));
	var nDate = parseInt(sDate.substr(6, 2)) + iOffset;

	return gfn_makeDate(nYear, nMonth, nDate);
}

/************************************************************************************************
 * Function : yyyyMMdd 형태의 문자열 날짜 리턴 ( 예)gfn_makeDate("2010", "05", "01");
 * @param   : nYear - 년도 
 * @param   : nMonth - 월
 * @param   : nDate - 일
 * Return   : true/false(정합 여부)
************************************************************************************************/
function gfn_makeDate(nYear, nMonth, nDate)
{
	if(gfn_isNull(nYear) || gfn_isNull(nMonth) || gfn_isNull(nDate)) return "";
	var objDate = new Date(nYear, nMonth-1, nDate);
	var sYear   = objDate.getFullYear().toString();
	var sMonth  = gfn_padLeftB(String(objDate.getMonth() + 1),2,"0");
	var sDate   = gfn_padLeftB(String(objDate.getDate()),2,"0");
	return sYear + sMonth + sDate;
}

/************************************************************************************************
 * Function : 왼쪽 채우기 함수 (length를 byte로 계산)
 * @param   : sValue  - 대상문자열
              nLength - 자리수
              sChar    - 채울 문자
 * Return   : String - length
************************************************************************************************/
function gfn_padLeftB(sValue, nLength, sChar) 
{
    if(gfn_isNull(sValue)) return sValue;
    if(gfn_isNull(sChar)) sChar = " ";

    var sRetVal = new String(sValue);
    var nIteration 	= nLength - gfn_getLengthB(sRetVal);
    var sPadChar = (sChar.length > 1) ? sChar.charAt(0) : sChar;

    for(var i=0; i<nIteration; i++)
        sRetVal = sPadChar + sRetVal;

    return sRetVal;
}

/************************************************************************************************
 * Function : 입력받은 전체 길이를 계산 결과를 Number Type으로 반환
              문자, 숫자, 특수문자 : 1 로 Count
              그 외 한글/한자 : 3 로 count
 * @param   : 대상문자열
 * Return   : number - length
************************************************************************************************/
function gfn_getLengthB(sValue)
{
	if(gfn_isNull(sValue)) return 0;

	var sChk = sValue.toString();
	var iCnt = 0;

	for(var i=0; i<sChk.length; i++)
		(sChk.charCodeAt(i) > 127) ? iCnt += 3 : iCnt++;

	return iCnt;
}
function numberWithCommas(price) {
	price = price.replaceAll(',', '');
	var oPrice = price.replace(/[^\d]+/g, '');
	oPrice = oPrice.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	if(Number(price)<0)
		return "-"+oPrice;
	else
		return oPrice;
}

//kdj lpad
function lpad2(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

// from serialize > JSON object
jQuery.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }//if ( arr ) {
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }
 
    return obj;
};

// IE assign대응
if (typeof Object.assign != 'function') {
	  // Must be writable: true, enumerable: false, configurable: true
	  Object.defineProperty(Object, "assign", {
	    value: function assign(target, varArgs) { // .length of function is 2
	      'use strict';
	      if (target == null) { // TypeError if undefined or null
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      var to = Object(target);

	      for (var index = 1; index < arguments.length; index++) {
	        var nextSource = arguments[index];

	        if (nextSource != null) { // Skip over if undefined or null
	          for (var nextKey in nextSource) {
	            // Avoid bugs when hasOwnProperty is shadowed
	            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	              to[nextKey] = nextSource[nextKey];
	            }
	          }
	        }
	      }
	      return to;
	    },
	    writable: true,
	    configurable: true
	  });
	}

/************************************************************************************************
 풀무원 추가
************************************************************************************************/
// 2021-07-01  김정호선임 추가  달력슬라이더폼
// ex) f_datePickerSlide(".yearSwiper",".monthSwiper",".daySwiper",3,2);
var isSlideMove = false;
function f_datePickerSlide(year,month,day,monthRange,defualtDay){
	//현재 날짜 가저오기
	var date = new Date();
	if(defualtDay !=undefined){
		date.setDate(date.getDate() + defualtDay);
	}
	var NowYear = date.getFullYear();
	var NowMonth = date.getMonth();
	//date 함수의 월은 0~11
	NowMonth +=1;
	var NowDay = date.getDate();
	var EndDay = new Date(NowYear,NowMonth,0).getDate();
	//swiper 생성함수
	var yearSwiper = new Swiper(year, {
		//보여주는 슬라이드수
		slidesPerView: 3,
      	centeredSlides: true,
      	//수직슬라이드
	    direction: "vertical",
	    //마우스휠로 작동  invert true는 상하반전
	    mousewheel: {
	        invert: false,
	      },
      	//클릭으로 슬라이드 넘기기
      	slideToClickedSlide:true
	  });
		
	var monthSwiper = new Swiper(month, {
		slidesPerView: 3,
      	centeredSlides: true,
	    direction: "vertical",
	    mousewheel: {
	        invert: false,
	      },
	      slideToClickedSlide:true
	  });
	  
	var daySwiper = new Swiper(day, {
	  	freeMode: true,
		slidesPerView: 3,
      	centeredSlides: true,
	    direction: "vertical",
	    mousewheel: {
	        invert: false,
      },
      slideToClickedSlide:true,
      on: {
    	    slideChange: function () {
//    	    	isSlideMove = true;
    	    },
    	    slideChangeTransitionStart: function () {
//    	    	console.log("s");
//    	    	isSlideMove = true;
      	  	},
    	    slideChangeTransitionEnd: function () {
//    	    	console.log("e : " + isSlideMove);
    	    	if(isSlideMove) {
	    			daySwiper.slideTo(daySwiper.activeIndex);
    	    		
    	    		isSlideMove = false;
    	    	}
      	  	},
      	  sliderMove:function() {
      		  isSlideMove = true;
      	  },touchEnd:function() {
      		if(isSlideMove) {
      			console.log("touch end called");
      			
      			setTimeout(() => {
      				daySwiper.slideTo(daySwiper.activeIndex);
				}, 100);
    			
	    		
//	    		isSlideMove = false;
	    	}
      	  }
    	  },
    	  
	  });
	  
	//범위개월수가 전년도까지일때
	if(NowMonth<(1+monthRange)){
		var yearArr = new Array();
		for (var i = NowYear-1;i <=NowYear;i++){
			var yearSlide = '<div class="swiper-slide">'+i+'</div>'
			yearArr.push(yearSlide); 
		}
		yearSwiper.appendSlide(yearArr);
		yearSwiper.slideTo(1);
		
		
		var monthArr = new Array();
		for (var i = 1;i <=NowMonth+monthRange;i++){
			var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
			monthArr.push(monthSlide); 
		}
		monthSwiper.appendSlide(monthArr);
		monthSwiper.slideTo(NowMonth-1);
		
	//범위개월수가 다음년도까지일때
	}else if(NowMonth>(12-monthRange)){
		var yearArr = new Array();
		for (var i = NowYear;i <=NowYear+1;i++){
			var yearSlide = '<div class="swiper-slide">'+i+'</div>'
			yearArr.push(yearSlide); 
		}
		yearSwiper.appendSlide(yearArr);
		
		var monthArr = new Array();
		for (var i = NowMonth-monthRange;i <=12;i++){
			var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
			monthArr.push(monthSlide); 
		}
		monthSwiper.appendSlide(monthArr);
		monthSwiper.slideTo(monthRange);
		
	}else{
	
	
		yearSwiper.appendSlide('<div class="swiper-slide">'+NowYear+'</div>');
		
		var monthArr = new Array();
		for (var i = NowMonth-monthRange;i <=NowMonth+monthRange;i++){
			var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
			monthArr.push(monthSlide); 
		}
		monthSwiper.appendSlide(monthArr);
		monthSwiper.slideTo(monthRange);
		
		
	}
	
	
	var dayArr = new Array();
	for (var i = 1;i <=EndDay;i++){
		var daySlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
		dayArr.push(daySlide); 
	}
	
	daySwiper.appendSlide(dayArr);

	//년도 바꼇을때 함수
	yearSwiper.on('slideChange', function () {
			
		var changeYear = $(yearSwiper.slides[yearSwiper.activeIndex]).text();
		monthSwiper.removeAllSlides();
		//원년과 같은지 비교
		if(NowYear!=changeYear){
		
			if(NowMonth<(1+monthRange)){
			
				var monthArr = new Array();
				for (var i = 12-(monthRange-NowMonth);i <=12;i++){
					var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
					monthArr.push(monthSlide); 
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);
					
			}else if(NowMonth>(12-monthRange)){
				
				var monthArr = new Array();
				for (var i = 1;i <=(monthRange+NowMonth-12);i++){
					var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
					monthArr.push(monthSlide); 
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);
			}
		
		//원년일경우 
		}else if(NowYear==changeYear){
			if(NowMonth<(1+monthRange)){
				
				var monthArr = new Array();
				for (var i = 1;i <=NowMonth+monthRange;i++){
					var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
					monthArr.push(monthSlide); 
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);
				
				
			}else if(NowMonth>(12-monthRange)){
				
				var monthArr = new Array();
				for (var i = NowMonth-monthRange;i <=12;i++){
					var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
					monthArr.push(monthSlide); 
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);
				
			}else{
			
			
				var monthArr = new Array();
				for (var i = NowMonth-monthRange;i <=NowMonth+monthRange;i++){
					var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
					monthArr.push(monthSlide); 
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);
				
				
			}
		
		}

		var changeMonth = $(monthSwiper.slides[monthSwiper.activeIndex]).text();
		var changeMonthDay = new Date(changeYear,changeMonth,0).getDate();
		var beforeMonthDay = daySwiper.wrapperEl.childElementCount;
		//바뀌는 월의 일수가 더많을경우
		if(changeMonthDay>beforeMonthDay){
		
			var dayArr = new Array();
			for (var i = beforeMonthDay+1;i <=changeMonthDay;i++){
				var daySlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
				dayArr.push(daySlide); 
			}
			
			daySwiper.appendSlide(dayArr);
		//바뀌는 월의 일수가 더적을경우	
		}else if(changeMonthDay<beforeMonthDay){
		
			var delDayArr = new Array();
			for (var i = changeMonthDay;i <beforeMonthDay;i++){
			delDayArr.push(i)

			}
			daySwiper.removeSlide(delDayArr);
		}
	  
	});
	
	
	monthSwiper.on('slideChange', function () {
		var changeYear = $(yearSwiper.slides[yearSwiper.activeIndex]).text();
		var changeMonth = $(monthSwiper.slides[monthSwiper.activeIndex]).text();
		var changeMonthDay = new Date(changeYear,changeMonth,0).getDate();
		var beforeMonthDay = daySwiper.wrapperEl.childElementCount;

		if(changeMonthDay>beforeMonthDay){
		
			var dayArr = new Array();
			for (var i = beforeMonthDay+1;i <=changeMonthDay;i++){
				var daySlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
				dayArr.push(daySlide); 
			}
			
			daySwiper.appendSlide(dayArr);
			
		}else if(changeMonthDay<beforeMonthDay){
		
			var delDayArr = new Array();
			for (var i = changeMonthDay;i <beforeMonthDay;i++){
			delDayArr.push(i)

			}
			daySwiper.removeSlide(delDayArr);
		}
	  
	});
	daySwiper.slideTo(NowDay-1);
	
	
 }
function f_TimePickerSlide(hour,minute,timeRange,setH,setM){
	
	var hourSwiper = new Swiper(hour, {
		slidesPerView: 3,
      	centeredSlides: true,
	    direction: "vertical",
	    mousewheel: {
	        invert: false,
	      },
	      slideToClickedSlide:true
	});
		
	var minuteSwiper = new Swiper(minute, {
		slidesPerView: 3,
      	centeredSlides: true,
	    direction: "vertical",
	    mousewheel: {
	        invert: false,
	      },
	      slideToClickedSlide:true
	});
	
	var hourArr = new Array();
	for (var i = 0;i <=23;i++){
		var hourSlide = '<div class="swiper-slide">'+i+'</div>'
		hourArr.push(hourSlide); 
	}
	hourSwiper.appendSlide(hourArr);
	hourSwiper.slideTo(setH || 0);


	var minuteArr = new Array();
	for (var i = 0;i <=59;i+=timeRange){
		var monthSlide = '<div class="swiper-slide">'+lpad2(i,2,'0')+'</div>'
		minuteArr.push(monthSlide); 
	}
	minuteSwiper.appendSlide(minuteArr);
	minuteSwiper.slideTo(setM || 0);

}
//년월 달력폼  f(년,월,개월범위(최대6))
function f_datePickerSlideYM(year,month,monthRange) {

	var date = new Date();
	var NowYear = date.getFullYear();
	var NowMonth = date.getMonth();
	NowMonth += 1;

	var yearSwiper = new Swiper(year, {
		slidesPerView: 3,
		centeredSlides: true,
		direction: "vertical",
		mousewheel: {
			invert: false,
		},
		slideToClickedSlide: true
	});

	var monthSwiper = new Swiper(month, {
		slidesPerView: 3,
		centeredSlides: true,
		direction: "vertical",
		mousewheel: {
			invert: false,
		},
		slideToClickedSlide: true
	});

	if (NowMonth < (1 + monthRange)) {
		var yearArr = new Array();
		for (var i = NowYear - 1; i <= NowYear; i++) {
			var yearSlide = '<div class="swiper-slide">' + i + '</div>'
			yearArr.push(yearSlide);
		}
		yearSwiper.appendSlide(yearArr);
		yearSwiper.slideTo(1);


		var monthArr = new Array();
		for (var i = 1; i <= NowMonth + monthRange; i++) {
			var monthSlide = '<div class="swiper-slide">' + lpad2(i, 2, '0') + '</div>'
			monthArr.push(monthSlide);
		}
		monthSwiper.appendSlide(monthArr);
		monthSwiper.slideTo(NowMonth - 1);


	} else if (NowMonth > (12 - monthRange)) {
		var yearArr = new Array();
		for (var i = NowYear; i <= NowYear + 1; i++) {
			var yearSlide = '<div class="swiper-slide">' + i + '</div>'
			yearArr.push(yearSlide);
		}
		yearSwiper.appendSlide(yearArr);

		var monthArr = new Array();
		for (var i = NowMonth - monthRange; i <= 12; i++) {
			var monthSlide = '<div class="swiper-slide">' + lpad2(i, 2, '0') + '</div>'
			monthArr.push(monthSlide);
		}
		monthSwiper.appendSlide(monthArr);
		monthSwiper.slideTo(monthRange);

	} else {


		yearSwiper.appendSlide('<div class="swiper-slide">' + NowYear + '</div>');

		var monthArr = new Array();
		for (var i = NowMonth - monthRange; i <= NowMonth + monthRange; i++) {
			var monthSlide = '<div class="swiper-slide">' + lpad2(i, 2, '0') + '</div>'
			monthArr.push(monthSlide);
		}
		monthSwiper.appendSlide(monthArr);
		monthSwiper.slideTo(monthRange);


	}


	//년도 바꼇을때 함수
	yearSwiper.on('slideChange', function () {

		var changeYear = $(yearSwiper.slides[yearSwiper.activeIndex]).text();
		monthSwiper.removeAllSlides();
		//원년과 같은지 비교
		if (NowYear != changeYear) {

			if (NowMonth < (1 + monthRange)) {

				var monthArr = new Array();
				for (var i = 12 - (monthRange - NowMonth); i <= 12; i++) {
					var monthSlide = '<div class="swiper-slide">' + lpad2(i, 2, '0') + '</div>'
					monthArr.push(monthSlide);
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);

			} else if (NowMonth > (12 - monthRange)) {

				var monthArr = new Array();
				for (var i = 1; i <= (monthRange + NowMonth - 12); i++) {
					var monthSlide = '<div class="swiper-slide">' + lpad2(i, 2, '0') + '</div>'
					monthArr.push(monthSlide);
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);
			}


		} else if (NowYear == changeYear) {
			if (NowMonth < (1 + monthRange)) {

				var monthArr = new Array();
				for (var i = 1; i <= NowMonth + monthRange; i++) {
					var monthSlide = '<div class="swiper-slide">' + lpad2(i, 2, '0') + '</div>'
					monthArr.push(monthSlide);
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);


			} else if (NowMonth > (12 - monthRange)) {

				var monthArr = new Array();
				for (var i = NowMonth - monthRange; i <= 12; i++) {
					var monthSlide = '<div class="swiper-slide">' + lpad2(i, 2, '0') + '</div>'
					monthArr.push(monthSlide);
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);

			} else {


				var monthArr = new Array();
				for (var i = NowMonth - monthRange; i <= NowMonth + monthRange; i++) {
					var monthSlide = '<div class="swiper-slide">' + lpad2(i, 2, '0') + '</div>'
					monthArr.push(monthSlide);
				}
				monthSwiper.appendSlide(monthArr);
				monthSwiper.slideTo(0);


			}

		}

	});
}

function setMenuModal(){
	$('body').append(
		'<div class="menu_modal div-scroll-y first_modal">'
		+'	<div class="menu_list_area">'
		+'		<div class="menu_header">'
		+'			<div class="svg_default menu_icon_setting icon22" id="btnSetting"></div>'
		+'			<div class="svg_default menu_icon_x icon16" id="btnClose"></div>'
		+'		</div>'
		+'		<div class="menu_name_title">'
		+'			<p id="userName" class="font_color_dark ${fontBold} font_22px i_font_22px"></p>'
		+'			<p class="font_color_gray font_bold500 font_16px i_font_16px" style="letter-spacing: -0.4px;">님 안녕하세요!</p>'
		+'		</div>'
		+'		<div class="gray_div"></div>'
		+'		<div class="menu_main_div">'
		+'			<p class="font_14px i_font_14px font_bold500 Menu_title" id="menuMainOrder">'
		+'				주문 관리'
		+'			</p>'
		+'			<p class="font_18px i_font_18px font_bold500 Menu_sub" id="menuSubOrder">'
		+'				주문조회 세부사항'
		+'			</p>'
		+'			<p class="font_18px i_font_18px font_bold500 Menu_sub" id="menuSubOrderRegister">'
		+'				통합 주문등록'
		+'			</p>'
		+'			<p class="font_18px i_font_18px font_bold500 Menu_sub" id="menuSubVMI">'
		+'				VMI 주문확정'
		+'			</p>'
		+'			<p class="font_18px i_font_18px font_bold500 Menu_sub_last" id="menuSubSales">'
		+'				매출실적조회'
		+'			</p>'
		+'			<p class="font_14px i_font_14px font_bold500 Menu_title" id="menuMainPromotion">'
		+'				프로모션 관리'
		+'			</p>'
		+'			<p class="font_18px i_font_18px font_bold500 Menu_sub" id="menuSubPromotion">'
		+'				프로모션 조회'
		+'			</p>'
		+'			<p class="font_18px i_font_18px font_bold500 Menu_sub_last" id="menuSubPromotionSearch">'
		+'				프로모션 예산조회'
		+'			</p>'
		+'			<p class="font_14px i_font_14px font_bold500 Menu_title" id="menuMainStand">'
		+'				기준 관리'
		+'			</p>'
		+'			<p class="font_18px i_font_18px font_bold500 Menu_sub" id="menuSubDairyOrder">'
		+'				일일주문 생성현황'
		+'			</p>'
		+'			<p class="font_18px i_font_18px font_bold500 Menu_sub_last" id="menuSubClose">'
		+'				마감관리'
		+'			</p>'
		+'		</div>'
		+'		<div class="gray_div"></div>'
		+'		<div class="menu_bottom_div">'
		+'			<p class="font_14px i_font_14px font_bold500 text_align_left font_color_gray" id="btnLogout">'
		+'				로그아웃'
		+'			</p>'
		+'		</div>'
		+'	</div>'
		+'</div>'
	);
	$('.menu_blank_div').remove();
	var navi_blank_div = '<div class="menu_blank_div" style="height: '+naviTopHeight+'px"></div>';
	$('.menu_list_area').append(navi_blank_div);
	$('.menu_modal').removeClass('first_modal');
}




var lastPosition = 0;
var didScroll;
var naviTopHeight;
let beforeNavi;
var topBtnVisibility = false;
function setBottomNavi(defaultClick){
	// 공통기능
	checkOnLoad();
	
	lastPosition = 0;
	didScroll = null;
	naviTopHeight = null;
	$('.bot_navi').remove();
	var defaultName = 'navi_icon_'+defaultClick || '';
	beforeNavi = defaultName;
	$('body').append('<div id="bot_navi" class="bot_navi" >' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_home" class="svg_default navi_icon_home icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_home_text" class="bot_navi_text">' +
		'            <p class="font_12px i_font_12px font_bold500 font_color_gray">홈</p>' +
		'        </div>' +
		'    </div>' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_search" class="svg_default navi_icon_search icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_search_text" class="bot_navi_text">' +
		'            <p class="font_12px i_font_12px font_bold500 font_color_gray">주문조회</p>' +
		'        </div>' +
		'    </div>' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_add" class="svg_default navi_icon_add icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_add_text" class="bot_navi_text">' +
		'            <p class="font_12px i_font_12px font_bold500 font_color_gray">주문등록</p>' +
		'        </div>' +
		'    </div>' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_pro" class="svg_default navi_icon_pro icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_pro_text" class="bot_navi_text">' +
		'            <p class="font_12px i_font_12px font_bold500 font_color_gray">프로모션</p>' +
		'        </div>' +
		'    </div>' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_menu" class="svg_default navi_icon_menu icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_menu_text" class="bot_navi_text">' +
		'            <p class="font_12px i_font_12px font_bold500 font_color_gray">전체메뉴</p>' +
		'        </div>' +
		'    </div>' +
		'</div>');


	var $scrollDiv = $('.div-scroll-y');
	var $listDiv = $('.list_area');
	var $navi = $('.bot_navi');

	var listBottomPoint = $listDiv.height() + $listDiv.offset().top;

	var naviTopPoint = $navi.offset().top;
	let temp = getComputedStyle(document.documentElement).getPropertyValue("--sab").replace("px", "");
	naviTopHeight = $navi.innerHeight() + parseInt(temp);

	if(listBottomPoint > (naviTopPoint-4)){
		//$listDiv.css('height',$listDiv.height()+(naviTopHeight+15));
	}
	setInterval(function() { if (didScroll) {  hasScrolled($scrollDiv); didScroll = false; } }, 250);
	$scrollDiv.scroll(function(){
		didScroll = true; });

	
	
	$('.bot_navi_area').bind('touchstart click', function(e) {
		var id =$(this).find('.svg_default').attr('id');
		
		$('#'+beforeNavi).removeClass(beforeNavi+'_click');
		$('#'+beforeNavi+'_text').removeClass('bot_navi_text_click');
		
		if(id != 'navi_icon_menu'){
		}

		$(this).find('.bot_navi_text').addClass('bot_navi_text_click');
		$('#'+id).addClass(id+'_click');
		if(id == 'navi_icon_home') {
			postHome();
		}
		else if(id == 'navi_icon_search') {
			postOrderSearch();
		}
		else if(id == 'navi_icon_add') {
			postOrderRegister();
		}
		else if(id == 'navi_icon_pro') {
			postPromotion();
		}
		else if(id == 'navi_icon_menu') {
			if($('.menu_modal').hasClass('menu_modal_show')){
				return false;
			}
			
			const pathName = window.location.pathname;
			if(pathName == "/OrderTotalAdd") {
				openMenu();
	    	}
			
			topBtnVisibility = $('.ota_add_btn').is(':visible'); 
			
			$('.menu_modal').addClass('menu_modal_show');
			$('.ota_add_btn').hide();
			$('#'+id).addClass(id+'_click');
			$('#'+id+'_text').addClass('bot_navi_text_click');
			
			
		}
	});

	
	let menu = $("#menu").val();
	if(menu == "Y") {
		if($('.menu_modal').hasClass('menu_modal_show')){
			return false;
		}
		
		setTimeout(function () {
			$('.menu_modal').addClass('menu_modal_show');
			$("#menu").val("N");
			// 파라미터 제거
			history.replaceState({}, null, location.pathname);
        }, 0);
		
		$('.ota_add_btn').hide();
		$('#'+defaultName).addClass(defaultName+'_click');
		console.log($('#'+defaultName));
		$('#'+defaultName+'_text').addClass('bot_navi_text_click');
		
		
		
	}

	if(defaultName != ''){
		$('#'+defaultName).addClass(defaultName+'_click');
		$('#'+defaultName+'_text').addClass('bot_navi_text_click');
	}
	

}


function LoadNaviIcon(){
	$('body').append('<div id="bot_navi" class="bot_navi">' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_home" class="svg_default navi_icon_home icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_home_text" class="bot_navi_text">' +
		'            <p class="font_12px font_bold500 font_color_gray">홈</p>' +
		'        </div>' +
		'    </div>' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_search" class="svg_default navi_icon_search icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_search_text" class="bot_navi_text">' +
		'            <p class="font_12px font_bold500 font_color_gray">주문조회</p>' +
		'        </div>' +
		'    </div>' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_add" class="svg_default navi_icon_add icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_add_text" class="bot_navi_text">' +
		'            <p class="font_12px font_bold500 font_color_gray">주문등록</p>' +
		'        </div>' +
		'    </div>' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_pro" class="svg_default navi_icon_pro icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_pro_text" class="bot_navi_text">' +
		'            <p class="font_12px font_bold500 font_color_gray">프로모션</p>' +
		'        </div>' +
		'    </div>' +
		'    <div class="bot_navi_area">' +
		'        <div class="bot_navi_icon">' +
		'            <div id="navi_icon_menu" class="svg_default navi_icon_menu icon22"></div>' +
		'        </div>' +
		'        <div id="navi_icon_menu_text" class="bot_navi_text">' +
		'            <p class="font_12px font_bold500 font_color_gray">전체메뉴</p>' +
		'        </div>' +
		'    </div>' +
		'</div>');
	$(".bot_navi").css('opacity',0);
	$.each($('.bot_navi').find('.svg_default'),function (index,item) {
		$(item).addClass($(item).attr('id')+'_click');
	});
	$(".bot_navi").css('bottom',-9999);
}


// setting
function postSetting() {
	let url = window.location.pathname;
	location.href = "/Setting?reffer="+url;
}

// 홈
function postWaterHome() {
	location.href="/WaterHome.do?first=no"
}


// 배송 요청 관리
function postWaterRequest() {
	if(loginData.authCd === 'ROLE_DELIVERY'){
		permissionMsg();
		console.log('배송담당자 권한없음');
		return false;
//		setTimeout(function() {
//			postWaterHome();
//		}, 1500);
		
	}else{
		location.href="/WaterRequest.do"
		
	}
}

// 배송 관리
function postWaterManagement() {
	location.href="/WaterManagement.do"
}

// 배송 관리 - 미처리 배송
function postWaterManagement_NoConfirm() {
	location.href="/WaterManagement.do?type=NoConfirm"
}
// 배송 관리 - 취소요청 
function postWaterManagement_Cancel() {
	location.href="/WaterManagement.do?type=Cancel"
}


// 담당자 추가
function postManagementAdd() {
	if(loginData.authCd == 'ROLE_FC'){
		location.href="/ManagementAdd.do"
	}else{
		permissionMsg();
		console.log('권한없음');
		return false;
	}
}

// 담당자 관리
function postManagement2() {
	location.href="/Management2.do"
}

// 고객센터
function postCenter() {
	location.href="#"
}

// 로그아웃
function logOut() {
	location.href="/Login"
}



/**
 * 공지사항 이동
 *
 * @param {menuType} taget 하단 메뉴바 표시 
 * @return {location.href} 페이지 이동
 */
function postNotice(taget) {
	location.href="/Notice.do?menuType="+taget;
}

//담당자 관리 이동
function postManagement(taget) {
	if(loginData.authCd === 'ROLE_DELIVERY'){
		permissionMsg();
		console.log('배송담당자 권한없음');
		return false;
//		setTimeout(function() {
//			postWaterHome();
//		}, 1500);
		
	}else{
		location.href="/Management.do?menuType="+taget;
		
	}
}
//설정 이동
function postSetting(taget) {
	location.href="/Setting.do?menuType="+taget;
}





//매출실적조회
function postSales() {
	document.location.replace("/OrderSalesList");
}

// 프로모션 예산조회
function postPromotionAmt() {
	document.location.replace("/SearchPromotionAmt");
}

function back(taget){
	
	if(taget){
		if(taget == 'navi_icon_home'){
			postHome();
		}

	 }else{
		
		history.back();
	}


}


//일일주문 생성현황
function postDayOrderList() {
	document.location.replace("/DayOrderList");
}

// 마감관리
function postCloseMngm() {
	document.location.replace("/CloseMngm");
}

// 로그아웃
function f_logout() {
	document.location.replace("/CloseMngm");
}

let orgWindowsSize = $('body').innerHeight();
let isChrome = false;
let maxScrollTop = 0;
function hasScrolled(scrollDiv) {

	
	var scrollY = scrollDiv.scrollTop();
	//console.log(scrollY);

	if(scrollY<0){
		return false;
	}

	if(scrollY > lastPosition){
		$(".bot_navi").css('bottom',-naviTopHeight-1);
	}else{
		$(".bot_navi").css('bottom',0);
	}


	//var elem = $(".div-scroll-y");
	var elem = scrollDiv;
	maxScrollTop = elem[0].scrollHeight - elem.outerHeight();

	// $('.top_navi_area h1').text(scrollDiv[0].scrollHeight+'/'+parseInt(orgWindowsSize)+'/'+parseInt(scrollDiv.scrollTop())+'/'+maxScrollTop);
	//
	// $('#greenPer').text(orgWindowsSize);
	// $('#yellowPer').text($('.blank_title').position().top);
	// $('#redPer').text($('.blank_title').offset().top);

	//마지막 스크롤 이벤트
	if (
		scrollDiv[0].scrollHeight - parseInt(scrollDiv.scrollTop()) == scrollDiv.outerHeight()
		//parseInt(scrollDiv[0].scrollHeight) <= parseInt(orgWindowsSize)+parseInt(scrollDiv.scrollTop())
	)
	{
		$(".bot_navi").css('bottom',0);
	}

	//크롬일 때
	if(isChrome){
		if(parseInt(scrollDiv.scrollTop()) == maxScrollTop || (parseInt(scrollDiv.scrollTop())+56) == maxScrollTop
			||parseInt(scrollDiv.scrollTop()+1) == maxScrollTop || (parseInt(scrollDiv.scrollTop())+56+1) == maxScrollTop
		){
			$(".bot_navi").css('bottom',0);
		}
	}

	lastPosition = scrollY;
}

function addNaviBlank(cls){
	$('.navi_blank_div').remove();

	var navi_blank_div = '<div class="navi_blank_div" style="height: '+naviTopHeight+'px"></div>';

	$('.'+cls).append(navi_blank_div);
}


function setAlert(data) {
	var HtmlAlert = '';
	var oktext = data.okbtn.text || '확인';
	var canceltext = data.confirm === true ? data.cancelbtn.text || '취소' : '';
	var className = data.className;

	var addbtn = data.confirm === true  ?
		'	<div id="'+className+'_no"  class="alert_modal_btn_confirm_no_new font_18px i_font_17px Button1">'+canceltext+'</div>'
		+'	<div id="'+className+'_yes" class="alert_modal_btn_confirm_ok_new font_18px i_font_17px Button1">'+oktext+'</div>'
		
		:'	<div id="'+className+'_yes" class="alert_modal_btn_confirm_ok font_18px i_font_17px Button1">'+oktext+'</div>'

	HtmlAlert += '<div class="fade_modal '+className+'" style="z-index: 99;">'
	HtmlAlert +='	<input id="'+className+'_yes_input" hidden="" />'
	HtmlAlert +='	<input id="'+className+'_yes_type" hidden="" />'
	HtmlAlert += '	<div class="modal_alert_area">    '
	HtmlAlert += '		<div class="modal_alert_body">'
	HtmlAlert += '			<div class="alert_modal_ment_area">'
	HtmlAlert += '        		<span id="login_modal_alert modal_ment" class="font_16px i_font_15px Subtitle">'+data.ment+'</span>'
	HtmlAlert += '			</div>'
	HtmlAlert += '		</div>'
	HtmlAlert += '		<div class="modal_btn_area">'
	HtmlAlert += addbtn        
	HtmlAlert += '      </div>'            
	HtmlAlert += '</div>'            
	$('.'+className).remove();                                                                                                                                                                                                                                                                                  
	$('body').append(HtmlAlert);
	
//	$('.'+className).css('display','flex');
	
	$("#"+className+"_yes").click(function(e){
		if(data.okbtn.active){
			data.okbtn.active();
		}
		$('.'+className).css('display','none');
	});

	$("#"+className+"_no").click(function(e){
		if(data.cancelbtn.active){
			data.cancelbtn.active();
		}
		$('.'+className).css('display','none');
	});
}

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

function openLoadingBar(){

	$('.div_load_image').remove();
	
	// 콘솔 출력
	$('body').append(
		 '<div class="div_load_image" id="div_load_image" style="position:absolute;width:100%;height:100vh; z-index:9999; background:#f7f7f78f; filter:alpha(opacity=50); opacity:alpha*0.5; margin:auto; padding:0; text-align:center;display: flex;justify-content: space-around;align-items: center;">'
      	+'<img src="/images/loading2.gif" style="width:50px; height:50px;">'
  		+'</div>'
	);
		
	
	
	$(".div_load_image").fadeIn();


}

function closeLoadingBar(){
	
	setTimeout(function () {
		$(".div_load_image").fadeOut();
 }, 300);
	
}


function openBlockPage(){

	$('.modal_block').remove();
	
	// 콘솔 출력
	$('body').append(
			'<div class="fade_modal modal_block">'
			+'</div>');
		
	
	
	$(".modal_block").fadeIn();
}

function closeBlockPage(){
	$(".modal_block").fadeOut();
}

function f_SetIphoneFont(cookie){
	var agent = window.navigator.userAgent.toLowerCase();
	var pass = false;
	// 브라우저가 사파리 일 경우
	if (agent.indexOf("safari") != -1) {
		pass = true;
		if (agent.indexOf("chrome") != -1) {
			pass = false;
		}
	}
	// 아이폰일 경우
	if (cookie != null && cookie !='' && cookie != undefined){
		if( cookie.getDeviceCookie() == 'ios'){
			pass = true;
		}
	}

	if(pass){

		$('.font_bold').addClass('iphone_bold');

		$.each($('p,h1,span'),function (index,item){

			var currentSize = $(item).css("fontSize");
			var num = parseFloat(currentSize, 10);
			var unit = currentSize.slice(-2);

			if(!$(item).hasClass('iphone_size_up_font')){
				$(item).addClass('iphone_size_up_font');
				$(item).css("fontSize", (Number(num)+1) + unit);
			}

		});

	}

}


// 인증 모달
function f_openLoginCheck(type){
	
	document.activeElement.blur();
	
	const cookie = new CookieManager();
	
	const bioType = cookie.getAuthBioTypeCookie();
	const pinType = cookie.getAuthPinTypeCookie();
	const pinCode = cookie.getPinCodeCookie();
	const deviceInfo = cookie.getDeviceCookie();
	
	
	setDeviceHead("green");
	$('.modal_login_check').remove();
	setDeviceHead("white");

	if(bioType == "on") {
		type = "skin";
	} else if(pinType == "on"){
		type = "easy";
	}


	let append_easy = '<div class="modal_login_check_type1">'
		+'		<div class="mlc_num_area">'
		+'			<div class="eazy_login_inputNums">'
		+'				<div class="eazy_login_inputNum_area eazy_login_inputNum"  id="num_line0">'
		+'					<div class="svg_default" id="num0"></div>'
		+'              </div>'
		+'				<div class="eazy_login_blank"></div>'
		+'				<div class="eazy_login_inputNum_area eazy_login_inputNum" id="num_line1">'
		+'					<div class="svg_default" id="num1"></div>'
		+'              </div>'
		+'				<div class="eazy_login_blank"></div>'
		+'				<div class="eazy_login_inputNum_area eazy_login_inputNum" id="num_line2">'
		+'					<div class="svg_default" id="num2"></div>'
		+'              </div>'
		+'				<div class="eazy_login_blank"></div>'
		+'				<div class="eazy_login_inputNum_area eazy_login_inputNum"id="num_line3">'
		+'					<div class="svg_default" id="num3"></div>'
		+'              </div>'
		+'				<input type=hidden value="" id="easyPw">'
		+'					<input type=hidden value="" id="easyPwCh">'
		+'			</div>'
		+'		</div>'
		+'		<div class="mmc_keyboard" id="mlc_keyboard">'
		+'			<div class="mmc_keyboard_line">'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">1</p>'
		+'					</div>'
		+'				</div>'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">2</p>'
		+'					</div>'
		+'				</div>'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">3</p>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'			<div class="mmc_keyboard_line">'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">4</p>'
		+'					</div>'
		+'				</div>'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">5</p>'
		+'					</div>'
		+'				</div>'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">6</p>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'			<div class="mmc_keyboard_line">'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">7</p>'
		+'					</div>'
		+'				</div>'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">8</p>'
		+'					</div>'
		+'				</div>'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">9</p>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'			<div class="mmc_keyboard_line">'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'					</div>'
		+'				</div>'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<p class="font_26px i_font_26px font_color_dark">0</p>'
		+'					</div>'
		+'				</div>'
		+'				<div class="mmc_key_reck">'
		+'					<div class="mmc_key_area_reck">'
		+'						<div class="svg_default icon_back_text icon16"></div>'
		+'						<p style="display: none;">del</p>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'		</div>'
		+'	</div>';

	let chkFailCnt = 0;
	let append_skin = '<div class="modal_login_check_type2">'
					+'	<div class="">'
					+'		<div id="icon_skin" class="select_login_box" style="border: none;">'
					+'			<div class="svg_default icon_skin_on icon117"></div>'
					+'			<p class="font_14px I_font_14px font_color_gray">생체인증</p>'
					+'		</div>'
					+'	</div>'
					+'</div>'
					+'	<div class="login_btn_content">'
					+'	<button class="btn_add btn_main_back" id="btnAuth" onClick=checkBioAuth()>'
					+'	<h1 class="font_color_white font_18px i_font_18px">인증</h1>'
					+'	</button>'
					+'	</div>';


	$('body').append(
		'<div class="modal_login_check">'
		+'	<div class="modal_login_check_body">'
		+'		<div class="modal_login_check_title">'
		+'			<p class="font_24px i_font_24px fontBold font_color_dark"'
		+'			   style="letter-spacing: -0.96px; line-height: 1;">간편번호 입력</p>'
		+'		</div>'
		+'		<div class="login_sub_title font_14px i_font_14px modal_login_check_sub_title">등록한 간편번호를 입력해주세요.</div>'
		+'	</div>'
		+'</div>'
	);

	if(type == 'easy'){
		
		$('.modal_login_check_title p').text('간편번호 입력');
		$('.modal_login_check_sub_title').text('등록한 간편번호를 입력해주세요.');

		$('.modal_login_check_body').append(append_easy);

		var baseHeight = $('.mmc_key_area_reck').find('p').height();

		if($('.modal_login_check').innerHeight() <=500){
			baseHeight= baseHeight-13;
		}

		$('.mmc_key_area_reck').height(baseHeight+5);
		$('.mmc_key_area_reck').width(baseHeight+5);
		$('.mmc_key_area_reck').css('padding',(baseHeight/3));
		$('#mlc_keyboard').addClass('mlc_add_position');

		$('#num_line0').addClass('eazy_login_inputNum_ck');

		$('.mmc_key_reck').click(function (){
			var btnVal =  f_UnSetComma($(this).find('.mmc_key_area_reck').find('p').text());
			var $pw = $('#easyPw');

			if($pw.val().length > 3){
				return false;
			}

			if(!isNaN(btnVal)){

				$pw.val($pw.val()+''+btnVal);

				var pwSize = $pw.val().length;

				$('#num_line'+pwSize).addClass('eazy_login_inputNum_ck');
				$('#num_line'+(pwSize-1)).removeClass('eazy_login_inputNum');
				$('#num_line'+(pwSize-1)).removeClass('eazy_login_inputNum_ck');
				$('#num'+(pwSize-1)).addClass('eazy_login_inputVal');


				if($pw.val().length == 4){ 
					if(pinCode == $pw.val()) {
						f_removeLoginCheck();
					} else {
						showMsg("간편번호가 일치하지 않습니다. 다시 시도해주세요.");
						
						$pw.val("");
						$.each($('.eazy_login_inputNum_area') ,function (index,item){
							$(item).removeClass('eazy_login_inputNum_ck');
							$(item).addClass('eazy_login_inputNum');
						});
						$('.eazy_login_inputNum_area').find('.eazy_login_inputVal').removeClass('eazy_login_inputVal');
						$('#num_line0').addClass('eazy_login_inputNum_ck');

						
						chkFailCnt++;
						if(chkFailCnt == 5) {
							showMsg("간편번호가 일치하지 않습니다. 처음부터 다시 시도해주세요.");
							cookie.clearLoginCookie();
			    			
			    			setTimeout(function () {
			    				document.location.replace("/Login");
				            }, 1000);
						}
					}
				}
				

			}else if(btnVal == 'del'){

				$pw.val($pw.val().substr(0,$pw.val().length-1));

				var pwSize = $pw.val().length;

				$('#num_line'+pwSize).addClass('eazy_login_inputNum');
				$('#num_line'+pwSize).addClass('eazy_login_inputNum_ck');
				$('#num'+(pwSize)).removeClass('eazy_login_inputVal');

				$('#num_line'+(pwSize+1)).addClass('eazy_login_inputNum');
				$('#num_line'+(pwSize+1)).removeClass('eazy_login_inputNum_ck');


			}else{
				return false;
			}
		});

	}else if(type == 'skin'){

		$('.modal_login_check_title p').text('생채인증');
		$('.modal_login_check_sub_title').text('등록된 인증을 진행해주세요.');

		$('.modal_login_check_body').append(append_skin);

		if(deviceInfo == "android") {
			Android.checkBioAuth();
		} else if(deviceInfo == "ios") {
			window.webkit.messageHandlers.authRegist.postMessage('');
		} else {
			alert("디바이스 정보를 가져올 수 없습니다.");
		}
	}

}

function checkAuthDialog() {
	
	return ($('.modal_login_check_body').length)>0?true:false;
}


function checkBioAuth() {
	var cookie = new CookieManager();
	let deviceInfo = cookie.getDeviceCookie();
	if(deviceInfo == "android") {
		Android.checkBioAuth();
	} else if(deviceInfo == "ios") {
		window.webkit.messageHandlers.authCheck.postMessage('');
	} else {
		alert("잘못된 접근입니다.");
	}
}


function f_removeLoginCheck(){
	fetch("/api/updateLoginCount", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer'
    }).then(response => {
    	setDeviceHead("green");
    	$('.modal_login_check').remove();
    })
    ;
	
	
	
	
}



function hideBioIos() {
	$('#bio_div').hide();
	//document.getElementById('bio_div').style.display = 'none';
}

function showBioIos() {
	$('#bio_div').show();
	//document.getElementById('bio_div').style.display = 'none';
}


function checkOnLoad() {
	const cookie = new CookieManager();
	let loginData = cookie.getLoginDataCookie();
	
	
	if(!loginData) {
		showMsg("잘못된 접근 입니다.");
//		clearLoginCookie();
		$.cookie('saveLoginValue', null);
		
		setTimeout(function () {
			
			document.location.replace("/Login");
	    }, 1000);
	}
	
	
}

const modalList = [
	"modal_day_select"
	,"fade_modal"
	,"modal_loading"
	,"modal_day_select"
	,"menu_modal"
	,"ordal_modal"
	,"day_modal"
	,"promotion_modal"
];

const searchModalIssueList = [
	 '/OrderSearchList'
	,'/OrderTotalAdd'
	,'/OrderVmi'
	,'/SearchPromotion'
	,'/SearchPromotionAmt'
	,'/DayOrderList'
	,'/CloseMngm'
];

let ckWindowsSize = $('body').innerHeight();
let searchModalIssue = false;
//크롬 상단 바 이슈
function f_chromeResize(maindiv){
	let agent = window.navigator.userAgent.toLowerCase();
	let url = window.location.pathname;
	let $main = $("."+maindiv);

	if (agent.indexOf("chrome") != -1) {
		isChrome = true;

		$.each(searchModalIssueList,function (index,item){
			if(item == url){
				searchModalIssue = true;
				return;
			}
		});

		new ResizeSensor($main, function(){

			orgWindowsSize = $main.innerHeight();

			//$(".main_div").prepend('<div>'+orgWindowsSize+'</div>');
			$.each(modalList,function (index,item){
				$('.'+item).innerHeight(orgWindowsSize);
			});

			if(searchModalIssue){
				if(ckWindowsSize != $main.innerHeight()){
					if(ckWindowsSize > $main.innerHeight()){
						addItemHeight = 0;
						if(org_drop_search_list_height != 0){
							$('.drop_scroll_list').innerHeight(org_drop_search_list_height-56);
						}
						if(opgModalBody !=0){
							setSearchModalPosition(false);
						}
					}else if(ckWindowsSize < $main.innerHeight()){
						addItemHeight = 56;
						if(org_drop_search_list_height != 0){
							$('.drop_scroll_list').innerHeight(org_drop_search_list_height+56);
						}
						if(opgModalBody !=0){
							setSearchModalPosition(false);
						}
					}
				}else{
					addItemHeight = 0;
					if(org_drop_search_list_height != 0){
						$('.drop_scroll_list').innerHeight(org_drop_search_list_height);
					}
					if(opgModalBody !=0){
						setSearchModalPosition(false);
					}
				}
			}

		});
	}

}

//헤더 제외 영역 스크롤 추가 이슈 해결
function setTitleNoneScroll(mainDiv,titleArea){
	let titleHeight = $('.'+titleArea).innerHeight();
	$('.'+mainDiv).prepend('<div class="blank_title" style="height: '+titleHeight+'px; "></div>');
}

//스크롤 업 아이콘 셋
function f_setUpIcon(className,main,scroll){
	$('.ota_add_btn').remove();
	var scrollHeight = $('.'+scroll).prop('scrollHeight');
	var windowHeight = $('.'+main).height();

	if(scrollHeight > windowHeight){
		const pathName = window.location.pathname;
		$('.bot_navi').prepend(
			'<div class="ota_add_btn">'
			+'    <div class="svg_default icon_up icon20"></div>'
			+'</div>');
		
		
		let temp = getComputedStyle(document.documentElement).getPropertyValue("--sab").replace("px", "");
		var size = (naviTopHeight - (parseInt(temp)*2)); 
		
		if(pathName == "/OrderTotalAdd") {
			size = size+parseInt(temp);
    	}
		
		var $otaBtn = $('.ota_add_btn');
		$otaBtn.height(size);
		$otaBtn.width(size);
//		$otaBtn.css('margin-bottom',parseInt(temp));
		$otaBtn.css('bottom',naviTopHeight+10);

		$otaBtn.click(function (){
			$('.'+className).scrollTop(0);
		});
		
		const scrollDiv = document.getElementsByClassName(scroll+" div-scroll-y")[0];
		if(scrollDiv.scrollTop > 0) {
			$('.ota_add_btn').show();
		} else {
			$('.ota_add_btn').hide();
		}
		
		
		scrollDiv.addEventListener("scroll", ()=>{
    		var element = event.target;
            var elem = $(".div-scroll-y");
            var maxScrollTop = elem[0].scrollHeight - elem.outerHeight();
	            if(element.scrollTop > 0) {
	            	$('.ota_add_btn').show();
	            } else {
	            	$('.ota_add_btn').hide();
	            }
	            if(pathName == "/OrderTotalAdd") {
            		setItemAddBtnLocation();
            	}
	    	}
    	, false);
	}
	
	

}

function loadScriptSync (src) {
    var s = document.createElement('script');
    s.src = src;
    s.type = "text/javascript";
    s.async = false;                                 // <-- this is important
    document.getElementsByTagName('head')[0].appendChild(s);
}

function onBioDiv() {
let cookie = new CookieManager();
	
	document.getElementById('chkBioType').checked = true;
	cookie.setAuthBioTypeCookie("on");
}

function disableBioDiv() {
	let cookie = new CookieManager();
	
	document.getElementById('chkBioType').checked = false;
	cookie.setAuthBioTypeCookie("off");
}

function disableIosBioDiv() {
	let cookie = new CookieManager();
	
	
	cookie.setAuthBioTypeCookie("off");
	document.getElementById('chkBioType').checked = false;
	document.getElementById('chkBioType').disabled = true;
	
	
	
}

function enableBioDiv() {
	document.getElementById('chkBioType').disabled = false;
}

function shuffleRandom(){
	let n = 4; 
    let rnum = Math.floor(Math.random() *n); //난수발생

    return getNow("none")+rnum;
}


const AUTH_DAYORDER = 'mBS001';		// 일일주문 
const AUTH_CLOSE = 'mBS002';		// 마감관리
const AUTH_ORDER = 'mOM001';		// 주문조회
const AUTH_ORDER_TOT = 'mOM002';		// 통합주문
const AUTH_VMI = 'mOM003';		// VMI 주문확정
const AUTH_SALES = 'mOM004';		// 매출실적조회
const AUTH_PROMOTION = 'mTM001';		// 프로모션 조회
const AUTH_PROMOTION_AMT = 'mTM002';		// 프로모션 예산조회

function getAuthList() {
	const cookie = new CookieManager();
	
	return cookie.getAuthDataCookie();
}

// 일일주문생성현황 권한가져오기
function getAuth(type) {
	let authCode = "";
	const authList = getAuthList();
	for(i = 0; i < authList.length; i++) {
		if(authList[i].cd == type) {
			authCode = authList[i].authCd; 
			break;
		}
	}
	
	return authCode;
}

//매출실적 수량변경 권한(관리자:조회, 유통본부:조회, MT영업사원:없음, GT영업사원:없음)
function getSaleInputAuth() {
	const auth = getAuth(AUTH_ORDER);
	let flag = true;
	if(auth == "OM_ADMIN") {
		flag = true;
	} else if(auth == "OM_CENTER") {
		flag = true;
	} else if(auth == "OM_SALES") {
		flag = false;
	} else if(auth == "OM_GTSALES") {
		flag = false;
	} else {
		flag = false;
	}
	
	return flag;
}

//주문조회세부사항(관리자:입력, 유통본부:입력, MT영업사원:조회, GT영업사원:권한없음)
function getVmiInputAuth() {
	const auth = getAuth(AUTH_VMI);
	let flag = true;
	if(auth == "OM_ADMIN") {
		flag = true;
	} else if(auth == "OM_CENTER") {
		flag = true;
	} else if(auth == "OM_SALES") {
		flag = false;
	} else if(auth == "OM_GTSALES") {
		flag = false;
	} else {
		flag = false;
	}
	
	return flag;
}


// 일일주문 권한(관리자:조회, 유통본부:조회, MT영업사원:권한없음, GT영업사원:권한없음)
function getDayOrderAuth() {
	const auth = getAuth(AUTH_DAYORDER);
	let flag = true;
	if(auth == "OM_ADMIN") {
		flag = true;
	} else if(auth == "OM_CENTER") {
		flag = true;
	} else if(auth == "OM_SALES") {
		flag = false;
	} else if(auth == "OM_GTSALES") {
		flag = false;
	} else {
		flag = false;
	}
	
	return flag;
}

//마감관리(관리자:조회, 유통본부:권한없음, MT영업사원:권한없음, GT영업사원:권한없음)
function getCloseAuth() {
	const auth = getAuth(AUTH_CLOSE);
	let flag = true;
	if(auth == "OM_ADMIN") {
		flag = true;
	} else if(auth == "OM_CENTER") {
		flag = false;
	} else if(auth == "OM_SALES") {
		flag = false;
	} else if(auth == "OM_GTSALES") {
		flag = false;
	} else {
		flag = false;
	}
	
	return flag;
}

//vmi(관리자:입력, 유통본부:입력, MT영업사원:조회, GT영업사원:권한없음)
function getVmiAuth() {
	const auth = getAuth(AUTH_VMI);
	let flag = true;
	if(auth == "OM_ADMIN") {
		flag = true;
	} else if(auth == "OM_CENTER") {
		flag = true;
	} else if(auth == "OM_SALES") {
		flag = true;
	} else if(auth == "OM_GTSALES") {
		flag = false;
	} else {
		flag = false;
	}
	
	return flag;
}

//vmi(관리자:입력, 유통본부:입력, MT영업사원:조회, GT영업사원:권한없음)
function getVmiInputAuth() {
	const auth = getAuth(AUTH_VMI);
	let flag = true;
	if(auth == "OM_ADMIN") {
		flag = true;
	} else if(auth == "OM_CENTER") {
		flag = true;
	} else if(auth == "OM_SALES") {
		flag = false;
	} else if(auth == "OM_GTSALES") {
		flag = false;
	} else {
		flag = false;
	}
	
	return flag;
}

// 통합주문등록 승인요청 권한(관리자:없음, 나머지 있음)
function getOrderTotApproveAuth() {
	const auth = getAuth(AUTH_ORDER_TOT);
	let flag = true;
	if(auth == "OM_ADMIN") {
		flag = false;
	} else if(auth == "OM_CENTER") {
		flag = true;
	} else if(auth == "OM_SALES") {
		flag = true;
	} else if(auth == "OM_GTSALES") {
		flag = true;
	} else {
		flag = true;
	}
	
	return flag;
}

//통합주문등록 일반주문 권한(관리자:없음, 나머지 있음)
function getOrderTotNormalOrderAuth() {
	const auth = getAuth(AUTH_ORDER_TOT);
	let flag = true;
	if(auth == "OM_ADMIN") {
		flag = true;
	} else if(auth == "OM_CENTER") {
		flag = true;
	} else if(auth == "OM_SALES") {
		flag = true;
	} else if(auth == "OM_GTSALES") {
		flag = false;
	} else {
		flag = false;
	}
	
	return flag;
}

function returnAuth() {
	
	
	showMsg("잘못된 접근 입니다.");
	
	setTimeout(function () {
		history.back();
    }, 1000);
	
	
}

function getLoginInfo() {
	const cookie = new CookieManager();
	
	return cookie.getLoginDataCookie();
}

function setDeviceHead(color) {
	const cookie = new CookieManager();
	const deviceInfo = cookie.getDeviceCookie();
	if(deviceInfo == "android") {
		if(color == "white") {
			Android.headWhite();
		}else if(color == "green") {
			Android.headGreen();
		}
			
	} else if(deviceInfo == "ios") {
		if(color == "white")
			window.webkit.messageHandlers.headWhite.postMessage('');
		else if(color == "green")
			window.webkit.messageHandlers.headGreen.postMessage('');
	} 
}

function setSearchCommentAlert() {
	setAlert({
        className : 'search_comment_alert',
        title : '',
        titleCheckImgYn : 'Y',
        accentMent : '',
        ment : '검색어를 입력하세요.',
        okbtn : {
            active : () => this.closeSearchCommentAlert(),
            text : '확인'
        },
        confirm : false
    });
}

function showSearchCommentAlert() {
	$(".search_comment_alert").fadeIn();
}

function closeSearchCommentAlert() {
	$(".search_comment_alert").fadeOut();
}



window.addEventListener("keyup", e => {
	  const key = e.key;
	  
	  if(key == 'Escape') {
		  keyBack();
	  }
	  
	});

function keyBack() {
	const pathName = window.location.pathname;
	let conditionModal = $('.modal_white').is(':visible');
	let modal_day_select = $('.modal_day_select').is(':visible');
	let modal_div = $('.modal_div').is(':visible');
	let menu_modal = $('.menu_modal').find('.menu_modal_show');
	let drop_fade_modal = $('.drop_fade_modal').is(':visible');
	let drop_modal_add_bot = $('.drop_modal_add_bot').is(':visible');
	let modal_change_count = $('.modal_change_count').is(':visible');
	
	
	console.log(menu_modal);
	
	if(conditionModal) {
		if(drop_fade_modal) {
			drop_modal_close();
		} else {
			$('.modal_white').fadeOut();
		}
		
	} else if(modal_day_select) {
		drop_day_close();
	} else if(modal_div) {
		modalBackClick();
	} else if(pathName == "/OrderTotalAdd") {
		let modal2 = $('.modal_add_item_step2').is(':visible');
		let modal1 = $('.modal_add_item_step1').is(':visible');
		let modalApprov = $('.modal_approval').is(':visible');
		let dropFileModal = $('.drop_file_modal').is(':visible');
		
		
		if($('.menu_modal').hasClass('menu_modal_show')){
			closeOpenMenu();
		}
		if(modal2) {
			modal_add_item_step2_close();
		} else if(modal1){
			modal_add_item_step1_close();
		} else if(modalApprov) {
			if(dropFileModal) {
				modal_file_close();
			} 
			modal_approval_close();
		} else {
			document.location.replace("/Home");
		}
		
		
	} else if($('.menu_modal').hasClass('menu_modal_show')){
		closeOpenMenu();
	} else if(pathName == "/Notice") {
		document.location.replace("/Home");
	} else if(drop_modal_add_bot) {
		drop_modal_close();
	} else if(modal_change_count) {
		modal_change_count_close();
	} else if(pathName == "/OrderSearchList"
		|| pathName == "/OrderVmi"
		|| pathName == "/SearchPromotion"
		|| pathName == "/SearchPromotionAmt"
		|| pathName == "/DayOrderList"
		|| pathName == "/CloseMngm") {
		document.location.replace("/Home");
	}
	
	console.log("pathName : " + pathName);
}

function closeOpenMenu() {
	const pathName = window.location.pathname;
	// 통합주문등록에서만 이용
	if(pathName == "/OrderTotalAdd") {
		closeMenu();
	}
    
	if(topBtnVisibility) {
		$(".ota_add_btn").show();
	} else {
		$(".ota_add_btn").hide();
	}
	
	$('.menu_modal').removeClass('menu_modal_show');
	$('#navi_icon_menu').removeClass('navi_icon_menu_click');
	$('#navi_icon_menu_text').removeClass('bot_navi_text_click');
	$('#'+beforeNavi).addClass(beforeNavi+'_click');
	$('#'+beforeNavi+'_text').addClass('bot_navi_text_click');
}

function setCurrentVersion(ver) {
	let currentVer = document.getElementById('currentVer');  
	currentVer.innerHTML += ver;
}


/*******************************************************************************
 * FUNCTION 명 : f_Today
 * FUNCTION 기능설명 : f_Today() => '2022. 09. 10'' 
*******************************************************************************/
function f_Today() {
	var date = new Date();
	var yyyy = date.getFullYear();
	var mm = date.getMonth()+1;
	var mm = mm > 9 ? mm : '0' + mm ;
	var dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
	var todate = yyyy+'. '+mm+'. '+dd;
	return todate;
}

/*******************************************************************************
 * FUNCTION 명 : f_NowDate
 * FUNCTION 기능설명 : f_NowDate('/') => '2022/09/10'' 
*******************************************************************************/	
function f_NowDate(str) {
	let today = new Date();
 
	// 년도 getFullYear()
	let year = today.getFullYear(); 
	// 월 getMonth() (0~11로 1월이 0으로 표현되기 때문에 + 1을 해주어야 원하는 월을 구할 수 있다.)
	let month = today.getMonth() + 1
	// 일 getDate()
	let date = today.getDate(); // 일
	var tt = year + str + lpad2(month, 2, 0) + str + lpad2(date, 2, 0);
	return tt;
}    

/*******************************************************************************
 * FUNCTION 명 : lpad2
 * FUNCTION 기능설명 : lpad2('5', 2, 0) => '05' 
*******************************************************************************/		
function lpad2(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
    str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}
/*******************************************************************************
 * FUNCTION 명 : maskingName()
 * FUNCTION 기능설명 : 홍길동 => 홍*동
*******************************************************************************/	
var maskingName = function(strName) {
	  if (strName.length > 2) {
	    var originName = strName.split('');
	    originName.forEach(function(name, i) {
	      if (i === 0 || i === originName.length - 1) return;
	      originName[i] = '*';
	    });
	    var joinName = originName.join();
	    return joinName.replace(/,/g, '');
	  } else {
	    var pattern = /.$/; // 정규식
	    return strName.replace(pattern, '*');
	  }
	};
	
	
function checkMobile(){
 
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
 	var value = "";
 	
    if ( varUA.indexOf('android') > -1) {
        //안드로이드
        value = "android";
       	// 앱일때
        if(varUA.indexOf('android_app') > -1){
			value = "android_app";	
		}
		return value;
    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
        value = "ios";
        if(varUA.indexOf("ios_app") > -1){
			value = "ios_app";
		}
        
        //IOS
        return value;
    } else {
        //아이폰, 안드로이드 외
        return "other";
    }
    
}

function f_InfoModal(target){
	var HtmlAlert = '';
	var ment ='';
	var infoType = $(target).data('infoType');
	var top =  $('.info_unsel').offset().top;
	var heigth = $('.info_unsel ').height();
	var marginTop;
	
	
	if(infoType == 'infoHome'){
		ment = '금일 처리해야 할 배송 목록입니다.'
		marginTop =  top + heigth+4;
	}else if(infoType == 'infoRequest'){
		ment = '17:00 기준, 확정되지 않은 <br> 리스트는 자동 반려됩니다.'
		marginTop =  top + heigth+4;
	}else if(infoType == 'infoManagement'){
		ment = '배송 완료 내역은 최대 3일간 확인 가능하며, 이후에는 삭제됩니다.'
		marginTop =  top + heigth+20;
	}

	
	
	HtmlAlert += '<div class="info_modal" style="z-index: 99; width: 100%; height: 100%;">'
	HtmlAlert += '	<div class="modal_alert_area2"  >    '
	HtmlAlert += '		<div class="modal_alert_body2" id="infoDiv" style="margin-top:'+marginTop+'px;">'
	HtmlAlert += '			<div class="after_div"></div>'
	HtmlAlert += '			<div class="alert_modal_ment_area2">'
	HtmlAlert += '        		<span id="login_modal_alert modal_ment" class="font_16px i_font_15px Body">'+ment+'</span>'
	HtmlAlert += '			</div>'
	HtmlAlert += '		</div>'            
	HtmlAlert += '</div>'  
	HtmlAlert += '</div>'       
	                                                                                                                                                                                                                                                                             
	$('.info_modal').remove();
	$('body').append(HtmlAlert);

	$(".info_modal").click(function(e){
		$('.info_modal').css('display','none');
	});
	var divY = $('#infoDiv').offset().top;	
	
	
	console.log('divY '+divY);
	if ( mobile == 'ios_app') {
		divY -= (infoType == 'infoRequest') ?  21 : 6;
		$('.after_div').css('top',divY);
 	}else{
		$('.after_div').css('top','-7px');
	}
	
//	$("#"+className+"_no").click(function(e){
//		if(data.cancelbtn.active){
//			data.cancelbtn.active();
//		}
//		$('.'+className).css('display','none');
//	});
}


function popupClose(){
	var url = window.location.href;
	
	
	if(url.indexOf("Login") == -1){
		f_MenuBarClose();
		
	}
	if(url.indexOf("WaterRequest.do") > -1){
		f_Modal4Close();
		f_ModalClose();
		$("#close").click();	//지역선택 팝업 닫기
		$('.datepicker-dropdown').remove();	// 달력 닫기
	}else if(url.indexOf("WaterManagement.do") > -1){
		f_Modal4Close();
		f_ModalClose();
		$('.datepicker-dropdown').remove();
	}
	
	
	console.log("닫음");

}


function settingPage(){
	location.href="/Setting.do";
}


function f_SetUTCdate(setDateVal){
	var curr; 
	if(setDateVal.includes('. ')){
		var yyyy = setDateVal.split('. ')[0];
		var mm = setDateVal.split('. ')[1];
		var dd = setDateVal.split('. ')[2];
		curr = new Date(yyyy,mm-1,dd);
		
	}else{
		curr = new Date();
	}
	

	// 2. UTC 시간 계산
	const utc =  curr.getTime() +  (curr.getTimezoneOffset() * 60 * 1000);
	      
	// 3. UTC to KST (UTC + 9시간)
	const KR_TIME_DIFF = 9 * 60 * 60 * 1000;  //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
	const kr_curr = new Date(utc + (KR_TIME_DIFF));  //UTC 시간을 한국 시간으로 변환하기 위해 utc 밀리초 값에 9시간을 더함.
	kr_curr.setHours(kr_curr.getHours()+9);

	return kr_curr;
}



// 홈
function postBlueOneHome() {
	location.href="/BlueOneHome.do"
}

// 홈
function postBriqueHome() {
	location.href="/BriqueHome.do"
}
// 홈
function postTabletPosHome() {
	location.href="/TabletPosHome.do"
}
 