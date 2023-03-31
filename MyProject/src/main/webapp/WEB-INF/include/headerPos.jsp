<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%@ page import="net.sf.json.JSONObject"%>
<%
String nowProfile = MyProject.ConfigUtil.getActiveMode();
%>
<head>
	<title>MyProject</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.5/mobile-detect.min.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0, viewport-fit=cover">

    <link rel="stylesheet" type="text/css" href="/css/mainPos.css?ver=1"/>

    <link rel="stylesheet" type="text/css" href="<c:url value='/css/Native.css?ver=15'/>"/>
<%--     <link rel="stylesheet" type="text/css" href="<c:url value='/css/swiper-bundle-6.5.4.min.css'/>"/> --%>
<%--     <link rel="stylesheet" type="text/css" href="<c:url value='/css/bootstrap.min.css?ver=5'/>"/> --%>
<%--     <link rel="stylesheet" type="text/css" href="<c:url value='/css/bootstrap-datepicker.css?ver=8'/>"/> --%>
    
    
    
    <script> var nowactive = '<%=nowProfile%>';</script>
    <script type="text/javascript" src="<c:url value='/js/core/jquery-3.2.1.min.js'/>"></script>

    <script type="text/javascript" src="<c:url value='/js/core/jquery.cookie-1.4.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/core/qrcode.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/core/swiper-bundle-6.5.4.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/core/sockjs-1.4.0.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/core/stomp-2.3.3.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/core/jquery.blockUI-2.70.0.min.js'/>"></script>
	<script src="/js/core/jquery-ui.js"></script>
	<script  type="text/javascript" src="<c:url value='/js/core/xlsx.full.min.js'/>"> </script>  
		<script type="text/javascript" src="<c:url value='/js/core/datepicker.js?ver=6'/>"></script>
	
	
	
	<script type="text/javascript" src="<c:url value='/js/custom/common.js?ver=15'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/custom/view.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/custom/inobounce.js?ver=1'/>"></script>
	

    <script type="text/javascript" src="<c:url value='/js/custom/circle-progress.js'/>"></script>

    <script type="text/javascript" src="/js/model/cookieManager.js?ver=5"></script>

</head>



<%
%>
<script>
let DEVICE_MODE = ''; 
$(document).ready(() => {
	var md = new MobileDetect(navigator.userAgent);
	DEVICE_MODE = (md.tablet()) ? 'TABLET' 
				 :(md.phone()) ? 'PHONE'
			     : 'PC' ;
	if(DEVICE_MODE == 'PHONE'){
		$('body >div').addClass('phone_default');
	}else if(DEVICE_MODE == 'TABLET'){
		$('body>div').addClass('tablet_default');
	}else{
		$('body>div').addClass('pc_default');
	}
	
// 	if(checkPlatform(window.navigator.userAgent) == "mobile"){//모바일  진입
		
// 	}else{//PC  진입
// 	}
// 	console.log( md.mobile() );          // 'Sony'
// 	console.log( md.phone() );           // 'Sony'
// 	console.log( md.tablet() );          // null
// 	console.log( md.userAgent() );       // 'Safari'
// 	console.log( md.os() );              // 'AndroidOS'
// 	console.log( md.is('iPhone') );      // false
// 	console.log( md.is('bot') );         // false
// 	console.log( md.version('Webkit') );         // 534.3
// 	console.log( md.versionStr('Build') );       // '4.1.A.0.562'
// 	console.log( md.match('playstation|xbox') ); // false
	
});


function checkPlatform(ua) {
	if(ua === undefined) {
		ua = window.navigator.userAgent;
	}
	
	ua = ua.toLowerCase();
	var platform = {};
	var matched = {};
	var userPlatform = "pc";
	var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) 
		|| /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) 
		|| /(kindle)/.exec(ua) || /(silk)/.exec(ua) || /(android)/.exec(ua) 
		|| /(win)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua)
		|| /(cros)/.exec(ua) || /(playbook)/.exec(ua)
		|| /(bb)/.exec(ua) || /(blackberry)/.exec(ua)
		|| [];
	
	matched.platform = platform_match[0] || "";
	
	if(matched.platform) {
		platform[matched.platform] = true;
	}
	
	if(platform.android || platform.bb || platform.blackberry
			|| platform.ipad || platform.iphone 
			|| platform.ipod || platform.kindle 
			|| platform.playbook || platform.silk
			|| platform["windows phone"]) {
		userPlatform = "mobile";
	}
	
	if(platform.cros || platform.mac || platform.linux || platform.win) {
		userPlatform = "pc";
	}
	
	return userPlatform;
}

</script>


<input type="hidden" value="${menu}" id="menu"/>
