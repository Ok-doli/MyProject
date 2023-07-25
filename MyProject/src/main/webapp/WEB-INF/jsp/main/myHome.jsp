<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<body ondragstart="return false">
<%@include file="/WEB-INF/include/header.jsp"%>
<input type="hidden" value="${device}" id="device_ck"/>
<div class="home_div div-scroll-y">
	<div id="brique" class="btn_box font_15px">브릭으로 이동</div>
	<div id="bluOne" class="btn_box font_15px">블루원으로 이동</div>
	<div id="TabletPos" class="btn_box font_15px">내부프로젝트 이동</div>
	
	<div id="ReactPos" class="btn_box font_15px">리액트프로젝트 이동</div>	
</div>


<script type="text/javascript">
$(document).ready(function() {
	
	
	$("#brique").click(function name() {;
		postBriqueHome();
	});
	$("#bluOne").click(function name() {;
		postBlueOneHome();
	});
	$("#TabletPos").click(function name() {;
		postTabletPosHome();
	});
	$("#ReactPos").click(function name() {;
		ReactPosHome();
	});

});
</script>

</body>
</html>
