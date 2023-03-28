<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head content='#fff'>
<meta name="format-detection" content="telephone=no" />
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>

<body>

<div class="top_navi_area none" id="home_menu_box" style="padding: 16px;">
   	<div class="top_area">
       <div class="top_icon">
           <div id="navi_icon_menu" class="svg_default icon_top_nav icon23"  onclick="f_MenuBarOpen()"></div>
       </div>
   </div>
   <div class="float-center" style="width: 50%; display:flex;">
  		<div  class="svg_default icon_top_logo top_logo" id="menuClose" onclick="postWaterHome()" ></div>
<!--    	<span class="top_navi_title font_color_white font_20px i_font_20px" id="title">Lastmile</span> -->
   </div>
   <div class="bot_navi_area">
   </div>
</div>

     <div class="home_menu_box" style="display: none;">
        <div class="home_menu_box_div" >
        <div class="home_menu_slide"  onclick="f_MenuBarClose()">
          <div class="slide_menu_close icon25"></div>
        </div>
        <div class="home_menu_slide1" id="notice" onclick="f_Menuclick(this)" style="margin-top: 18px;">
          <p class="font_20px i_font_19px Header6">라스트 마일 공지사항</p>
          <div class="slide_arrow_right icon25" ></div>
        </div>
        <div class="slide_line"></div>
       <div class="menu_slide2_all_real" id="customerCenter" onclick="f_Call()">
	     <div class="menu_slide2_all"> 
		    <div class="home_menu_slide2">
		        <p class="font_20px i_font_19px Header6">라스트 마일 고객센터</p>
		        <a target="_parent" href="tel:1566-1566" id="telNo"><div class="slide_call_img icon25"></div></a>
      		</div>
	        <p class="font_18px i_font_17px Button2 menu_slide_font" id="telVisible">1566-1566</p>
	        <p class="font_18px i_font_17px Button2 menu_slide_font">오전 9시 ~ 오후 6시</p>
	      </div>
          <div class="slide_arrow_right icon25"  ></div>
       </div>
        <div class="slide_line1"></div>
	      
	   	<div class="home_menu_slide1" id="WaterRequest" onclick="f_Menuclick(this)">
          <p class="font_20px i_font_19px Header6">배송요청 관리</p>
          <div class="slide_arrow_right icon25"></div>
        </div>
        <div class="home_menu_slide1" id="WaterManagement" onclick="f_Menuclick(this)">
          <p class="font_20px i_font_19px Header6">배송관리</p>
          <div class="slide_arrow_right icon25"></div> 
        </div>
        <div class="slide_line"></div>
        
        <div class="home_menu_slide1" id="Management" onclick="f_Menuclick(this)">
          <p class="font_20px i_font_19px Header6">담당자 관리</p>
          <div class="slide_arrow_right icon25"></div>
        </div>
        <div class="home_menu_slide1" id="Setting" onclick="f_Menuclick(this)">
          <p class="font_20px i_font_19px Header6">설정</p>
          <div class="slide_arrow_right icon25"></div>
        </div>
        <div class="slide_line"></div>

        <p class="font_16px i_font_15px Body slide_logout_font" id="btnLogout" >로그아웃</p>
		
        </div>
        <div class="home_menu_box_side" onclick="f_modal_side_click();"></div>
       </div>

<script type="text/javascript" src="/js/model/menu.js?ver=7"></script>
<script type="text/javascript">
var menuType;
const cookie = new CookieManager();
var loginData = cookie.getLoginDataCookie();

$(document).ready(function() {
	f_MenuBarClose();
	f_TopMargin();
	f_tel();
	
	
	if (loginData.authCd == 'ROLE_DELIVERY' ) {
		 $('#Management').hide();
	}

});

function f_Menuclick(taget) {
	
	$(".home_menu_box_div").css('left','-100%');
	$(".home_menu_box").fadeOut(function (){ });
	
	 setTimeout(function () {
       
		 var urlParams = new URL(location.href).searchParams;
		    var param = urlParams.get('menuType');
		    if (param) {
		        menuType = param;
		    }
		    //공지사항
		    if ($(taget).attr('id') == 'notice') {
		        postNotice(menuType);
		    }

		    //배송요청관리
		    if ($(taget).attr('id') == 'WaterRequest') {
		    	if(loginData.authCd === 'ROLE_DELIVERY'){
					permissionMsg();
					return false;
				}
		        postWaterRequest();
		    }
		    //배송 관리
		    if ($(taget).attr('id') == 'WaterManagement') {
		        postWaterManagement();
		    }
		    //담당자 관리
		    if ($(taget).attr('id') == 'Management') {
		    	if(loginData.authCd === 'ROLE_DELIVERY'){
					permissionMsg();
					return false;
				}
		        postManagement(menuType);
		    }
		    //설정
		    if ($(taget).attr('id') == 'Setting') {
		        postSetting(menuType);
		    }
		 
		 
		 
     }, 500);
	
   
 	//로그아웃
//     if ($(taget).attr('id') == 'btnLogout') {
//     	$(".loginOut_comfirm_alert").fadeIn(); 
//     }
}



//모달 열기
function f_MenuBarOpen(){
	
	$(".home_menu_box").fadeIn(function (){});
	$(".home_menu_box_div").css('left','0%');
// 	$(".home_menu_box_div").show().animate({left:"0%"},"fast","linear");
// 	$(".home_menu_box").css("display","block").animate("linear");
// 	$(".home_menu_box").show();
	var status = "open";
	if(mobile =="android_app"){
		 Android.popupChk("open");
	}
};

//모달 닫기
function f_MenuBarClose(){
	$(".home_menu_box_div").css('left','-100%');
	$(".home_menu_box").fadeOut(function (){ });
	if(mobile =="android_app"){
		 Android.popupChk("close");
	}
};


function f_TopMargin() {
	var height = $('#home_menu_box').outerHeight(true);
	$('.home_div').css({"padding-top": height});
	$('.main_div').css({"padding-top": height});
}

function f_modal_side_click(){
	f_MenuBarClose();
}

function f_tel(){
	$.ajax({
		type : "POST",
		url : "/CscenterTel_Select.do",
		data : {
			
		},
		async : false,
		datatype : "json",
		success : function(json) {
			$("#telVisible").text(json[0].telNo);
			
		}
	});
}

function f_Call() {
	var tel_no = $("#telVisible").text();
	document.location.href='tel:'+tel_no;
	
}
	
</script>
</body>

</html>