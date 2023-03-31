<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/include/headerPos.jsp"%>
<!DOCTYPE html>
<html>
<head>
<style></style>
</head>
<body ondragstart="return false">
	<button onclick="gridView()">Grid View</button>
	<button onclick="listView()">List View</button>

	<div class="container">
		<div class="box">
			<img src="https://picsum.photos/200/200" alt="image 1">
		</div>
		<div class="box">
			<img src="https://picsum.photos/200/201" alt="image 2">
		</div>
		<div class="box">
			<img src="https://picsum.photos/200/202" alt="image 3">
		</div>
		<div class="box">
			<img src="https://picsum.photos/200/203" alt="image 4">
		</div>
		<div class="box">
			<img src="https://picsum.photos/200/204" alt="image 5">
		</div>
		<div class="box">
			<img src="https://picsum.photos/200/205" alt="image 6">
		</div>
		<div class="box">
			<img src="https://picsum.photos/200/206" alt="image 7">
		</div>
		<div class="box">
			<img src="https://picsum.photos/200/207" alt="image 8">
		</div>
	</div>

<script type="text/javascript">
function gridView() {
	document.querySelector('.container').classList.remove('list');
}

function listView() {
	document.querySelector('.container').classList.add('list');
}
$(document).ready(() => {
	
});

</script>

</body>
</html>
