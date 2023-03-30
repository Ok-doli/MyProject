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
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0, viewport-fit=cover">

    
    <link rel="stylesheet" type="text/css" href="/css/main.css?ver=38"/>

    <link rel="stylesheet" type="text/css" href="<c:url value='/css/Native.css?ver=15'/>"/>
<%--    <link rel="stylesheet" type="text/css" href="<c:url value='/css/sweetalert2.min.css'/>"/>--%>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/swiper-bundle-6.5.4.min.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/bootstrap.min.css?ver=5'/>"/>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/bootstrap-datepicker.css?ver=8'/>"/>
    
    
    
    <script> var nowactive = '<%=nowProfile%>';</script>
    <script type="text/javascript" src="<c:url value='/js/core/jquery-1.12.4.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/core/jquery-3.2.1.min.js'/>"></script>

    <script type="text/javascript" src="<c:url value='/js/core/jquery.cookie-1.4.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/core/qrcode.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/core/swiper-bundle-6.5.4.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/core/sockjs-1.4.0.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/core/stomp-2.3.3.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/core/jquery.blockUI-2.70.0.min.js'/>"></script>
<%-- 	<script type="text/javascript" src="<c:url value='/js/core/bootstrap.bundle.js'/>"></script> --%>
	<script src="/js/core/jquery-ui.js"></script>
	<script  type="text/javascript" src="<c:url value='/js/core/xlsx.full.min.js'/>"> </script>  
	
	<!-- 달력 -->
<%-- 	<script type="text/javascript" src="<c:url value='/js/core/jquery-3.4.1.js'/>"></script> --%>
	<script type="text/javascript" src="<c:url value='/js/core/datepicker.js?ver=6'/>"></script>
	
	
	
	<script type="text/javascript" src="<c:url value='/js/custom/common.js?ver=15'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/custom/view.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/custom/inobounce.js?ver=1'/>"></script>
	
<%--    <script type="text/javascript" src="<c:url value='/js/custom/sweetalert2.min.js'/>"></script>--%>

    <%--    차트--%>
    <script type="text/javascript" src="<c:url value='/js/custom/circle-progress.js'/>"></script>

<!--     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->

<!--     <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script> -->
    <script type="text/javascript" src="/js/model/cookieManager.js?ver=5"></script>
<!--     <script type="text/javascript" src="/js/model/nativeViewManager.js"></script> -->
<!--     <script type="text/javascript" src="/js/custom/commoncode.js?ver=2"></script> -->
<!--     <script src="https://cdnjs.cloudflare.com/ajax/libs/css-element-queries/1.2.3/ResizeSensor.min.js"></script> -->

    <c:if test="${device eq 'Iphone'}"><link rel="stylesheet" type="text/css" href="/css/IphoneSizeUp.css?ver=3"/></c:if>

</head>



<%
%>
<script>
	
</script>


<input type="hidden" value="${menu}" id="menu"/>
