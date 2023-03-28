<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/include/headerPos.jsp"%>
<!DOCTYPE html>
<html>
<head>

</head>
<body ondragstart="return false">

    <header>
        <h1>유서브</h1>
        <div>테이블 1번</div>
    </header>
    <article>
   		<nav>
            <ul id="menu">
            </ul>
        </nav>
	</article>
    <aside>
        <section>
            <h1>트위터</h1>
            <blockquote>트위터내용</blockquote>
        </section>
    </aside>
    <aside>
        <section>
            <h1>트위터</h1>
            <blockquote>트위터내용</blockquote>
        </section>
    </aside>

    <footer>
    	<div>직원 호출</div>
    	<div>장바구니</div>
    </footer>



<script type="text/javascript">

const menuData = [
	  { header: "메뉴카테고리1" },
	  { header: "메뉴카테고리2" },
	  { header: "메뉴카테고리3" },
	  { header: "메뉴카테고리4" },
	  { header: "메뉴카테고리5" }
	];
	
	
	
$(document).ready(function() {
	
});


function menuTypeHtml() {
	let html: string = "";
	for(const menuType in menuData){
		html += "<li>"+menuData[menuType].header+"</li>"
	}
	$('#menu').append(html);
}
</script>

</body>
</html>
