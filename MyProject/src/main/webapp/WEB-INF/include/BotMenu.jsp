<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%String first = request.getParameter("first"); %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
<div id="bot_navi" class="bot_navi">
    <div class="bot_navi_area">
        <div class="bot_navi_icon">
            <div id="navi_icon_home" data-menu-type='N' class="svg_default navi_icon_home_unsel bot_icon" onclick="clickEvent(this);" ></div>
        </div>
    </div>
    <div class="bot_navi_area">
        <div class="bot_navi_icon">
            <div id="navi_icon_request" data-menu-type='N' class="svg_default navi_icon_request_unsel bot_icon" onclick="clickEvent(this);"></div>
        </div>
    </div>
    <div class="bot_navi_area">
        <div class="bot_navi_icon">
            <div id="navi_icon_management" data-menu-type='N' class="svg_default navi_icon_management_unsel bot_icon" onclick="clickEvent(this);"></div>
        </div>
    </div>
   
</div>
</body>
<script>

var first = '<%=first%>';
$(function () {
	
	f_CssBot();
	

});

function clickEvent(target){
	
	if($(target).attr('class').indexOf('navi_icon_home_unsel') > -1){
		console.log('홈');
		$(target).removeClass('navi_icon_home_unsel');
		$(target).addClass('selected navi_icon_home_sel');
		$("#navi_icon_request").removeClass('navi_icon_request_sel');
		$("#navi_icon_request").addClass('navi_icon_request_unsel');
		$("#navi_icon_management").removeClass('navi_icon_management_sel');
		$("#navi_icon_management").addClass('navi_icon_management_unsel');
		$(target).data('menuType','Y');
		
		postWaterHome();
	}else if($(target).attr('class').indexOf('navi_icon_request_unsel') > -1){
		if(loginData.authCd === 'ROLE_DELIVERY'){
			permissionMsg();
			return false;
		}
		$(target).removeClass('navi_icon_request_unsel');
		$(target).addClass('selected navi_icon_request_sel');
		$("#navi_icon_home").removeClass('navi_icon_home_sel');
		$("#navi_icon_home").addClass('navi_icon_home_unsel');
		$("#navi_icon_management").removeClass('navi_icon_management_sel');
		$("#navi_icon_management").addClass('navi_icon_management_unsel');
		$(target).data('menuType','Y');
		postWaterRequest();
	}else if($(target).attr('class').indexOf('navi_icon_management_unsel') > -1){
		$(target).removeClass('navi_icon_management_unsel');
		$(target).addClass("navi_icon_management_sel");
		$("#navi_icon_home").removeClass('navi_icon_home_sel');
		$("#navi_icon_home").addClass('navi_icon_home_unsel');
		$("#navi_icon_request").removeClass('navi_icon_request_sel');
		$("#navi_icon_request").addClass('navi_icon_request_unsel');
		$(target).data('menuType','Y');
		postWaterManagement();

	}else{
		 var urlParams = new URL(location.href).searchParams;
		 var param = urlParams.get('menuType');
		 var type = urlParams.get('type');
		
		 
		 
		 if (param) {
		     menuType = param;
		     switch (menuType) {
		        case 'home':
		        	postWaterHome();
		          break;
		        case 'HomeClick':
		        	postWaterHome();
		          break;
		        case 'request':
		        	postWaterRequest();
		          break;
		        case 'management':
		        	postWaterManagement();
		          break;
		      }
		 }else if (type) {
			 postWaterManagement()
		 }else{
			 window.location.reload();
		 }

		
	}
	
	
	
	

}
function f_CssBot() {
	var botHeight = $("#bot_navi").outerHeight(true);  
	var buttonHeight = $("#allConfirm").height();    
	var menuY = $("#bot_navi").offset().top;
	
	menuY -= buttonHeight;
	menuY -= 16;
	
	
	if (mobile == 'ios' || mobile == 'ios_app') {
		if(first == 'ok'){
			botHeight = botHeight
			
		}else{
			botHeight = botHeight - 34;
		}
		$('.home_div').css({"padding-bottom": botHeight});
		$('.main_div').css({"padding-bottom": botHeight});
	}else{
		$('.allConfirm_div').css('top',menuY);
		$('.home_div').css({"padding-bottom": botHeight});
		$('.main_div').css({"padding-bottom": botHeight});
	}
	
	
		
	
	
	
	
}

</script>
</html>