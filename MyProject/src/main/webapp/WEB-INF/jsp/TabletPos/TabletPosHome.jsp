<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/include/headerPos.jsp"%>
<!DOCTYPE html>
<html>
<head>
<style type="text/css">
 #menuMenu> li:hover{
	background-color: var(--Main-DarkOrange);
	border-radius: 0 0 20px 20px;
	color: var(--W); 
} 

.main_menu .sub_menu {
	background-color: var(--Main-DarkOrange);
	display: none;
}
ul{
	width: 100%;
}
ul > .main_menu{
	text-align: left;
    word-break: break-all;
    padding: 8px;
    border-bottom: solid 2px var(--Gray-400);
}
.main_menu >ul{
	margin-top: 8px;
}
.sub_menu > li{
	padding: 8px 0;
}
.sub_menu > li:hover {
	background-color: var(--Main-CoolBrown) !important;
	color: var(--W);
}

nav {
	padding: 16px 0;
	border-radius: 0 20px 20px 0;
	background-color: var(--Main-Color);
	color: var(--W);
	width: 13%;
}
ul{
  	list-style:none;
}
section{
	background-color: var(--W);
	color: var(--B);
	padding: 0 16px;
	width: 57%
}
aside{
	width: 30%;
	background-color: var(--Gray-50);
}
header{
	display: flex;
}
.menu_content{
	 padding: 16px;
	 width: 40%;
}
.price{
	color: var(--Main-Coral);
}
.main_content > header{
	padding: 54px 0 16px 0;
	background-color: var(--W);
	border-bottom: solid 1px var(--Gray-300);
	margin: 0 0 1px 0;
	position: sticky;
    top: 0;
}
.menu_box{
	padding: 16px 0 0 0 ;
}
.main_content  img{
	width: 60%;
}
</style>
</head>
<body ondragstart="return false">
<div>
	<nav class="flex_between_row">
		<div class="flex_left_col">
			<div class="logo"></div>
			<ul id="menuMenu" class=" font_H6">
				<li class="main_menu ">BEST
					<ul class="sub_menu font_Sub1">
						<li>카테고리1</li>
						<li>카테고리2</li>
						<li>카테고리3</li>
						<li>카테고리4</li>
					</ul>
				</li>
				<li class="main_menu ">주류
					<ul class="sub_menu font_Sub1">
						<li>카테고리1</li>
						<li>카테고리2</li>
						<li>카테고리3</li>
						<li>카테고리4</li>
					</ul>
				</li>
				<li class="main_menu ">안주
					<ul class="sub_menu font_Sub1">
						<li>카테고리1</li>
						<li>카테고리2</li>
						<li>카테고리3</li>
						<li>카테고리4</li>
					</ul>
				</li>
				<li class="main_menu ">사이드
					<ul class="sub_menu font_Sub1">
						<li>카테고리1</li>
						<li>카테고리2</li>
						<li>카테고리3</li>
						<li>카테고리4</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="btn_defalt bck_darkOrange font_Sub1">직원호출</div>
	</nav>
	<section class="main_content scroll_y">
		<header class="flex_left_col">
			<div class="font_H5">BEST</div>
			<div class="font_H5">/</div>
			<div class="font_H5">카테1</div>
		</header>
		<article>
			<div class="flex menu_box">
				<img src="https://picsum.photos/450/310" alt="image 1">
				<div class="flex_between_row menu_content">
					<div class="flex_left_row ">
						<div class="font_H5">스페셜 메뉴</div>
						<div class="font_H6">랍스타 짱</div>
					</div>
					<div class="price flex_left_col font_H5">38,000</div>
				</div>
			</div>
			<div class="flex menu_box">
				<img src="https://picsum.photos/450/310" alt="image 2">
				<div class="flex_between_row menu_content">
					<div class="flex_left_row ">
						<div class="font_H5">스페셜 메뉴</div>
						<div class="font_H6">랍스타 짱</div>
					</div>
					<div class="price flex_left_col font_H5">38,000</div>
				</div>
			</div>
			<div class="flex menu_box">
				<img src="https://picsum.photos/450/310" alt="image 3">
				<div class="flex_between_row menu_content">
					<div class="flex_left_row ">
						<div class="font_H5">스페셜 메뉴</div>
						<div class="font_H6">랍스타 짱</div>
					</div>
					<div class="price flex_left_col font_H5">38,000</div>
				</div>
			</div>
			<div class="flex menu_box">
				<img src="https://picsum.photos/450/310" alt="image 4">
				<div class="flex_between_row menu_content">
					<div class="flex_left_row ">
						<div class="font_H5">스페셜 메뉴</div>
						<div class="font_H6">랍스타 짱</div>
					</div>
					<div class="price flex_left_col font_H5">38,000</div>
				</div>
			</div>
			<div class="flex menu_box">
				<img src="https://picsum.photos/450/310" alt="image 5">
				<div class="flex_between_row menu_content">
					<div class="flex_left_row ">
						<div class="font_H5">스페셜 메뉴</div>
						<div class="font_H6">랍스타 짱</div>
					</div>
					<div class="price flex_left_col font_H5">38,000</div>
				</div>
			</div>
			<div class="flex menu_box">
				<img src="https://picsum.photos/450/310" alt="image 6">
				<div class="flex_between_row menu_content">
					<div class="flex_left_row ">
						<div class="font_H5">스페셜 메뉴</div>
						<div class="font_H6">랍스타 짱</div>
					</div>
					<div class="price flex_left_col font_H5">38,000</div>
				</div>
			</div>
			
		</article>
	</section>
	<aside class="main_aside">
		<header></header>
		<article></article>
	</aside>
</div>

<script type="text/javascript">

	
let OrderList = new Array();	
let TempList = new Array();	

$(document).ready(() => {
	
	$(".main_menu").mouseover(function(){
		$(this).children(".sub_menu").stop().slideDown();
	});
	$(".main_menu").mouseleave(function(){
		$(this).children(".sub_menu").stop().slideUp();
	});
	
// 	menuListHtml();
// 	$('li:first-child').trigger('click');
});

// const menuListHtml = () => {
//   let html = '';
//   menuList.forEach(menu => {
//     html += '<li onclick="menuDataHtml(this)" id='+menu.type+'>'+menu.header+'</li>';
//   });
//   $('#MenuList').append(html);
// };

// const menuDataHtml = (target) => {
//   $('li').css('border-bottom', 'none');
//   $(target).css('border-bottom', 'solid 3px var(--bs-orange)');
//   let html = '';
//   menuData.forEach(menu => {
//     if (menu.type === $(target).attr('id')) {
//       html += '<div onclick="menuTempList(this)" id='+menu.code+'><img src='+menu.imgUrl+'></img><div>'+menu.name+'</div><div>'+menu.price+'</div></div>';
//     }
//   });
//   html = (html == '') ? '<div class="comment">메뉴 준비 중...</div>' : html ;
//   $('#MenyData').empty();
//   $('#MenyData').append(html);
// };

// const menuTempList = (target) => {
//   let code = $(target).attr('id');
//   TempList = [...new Set(TempList)];
// //   let cntList = {};
// //   TempList.filter(function(item) {
// // 	  cntList[item] = (cntList[item] || 0) + 1;
// //   });
// //   let result = Object.keys(cntList).map(function(key) {
// // 	  return { [key]: cntList[key] };
// //   });
//   const clickData = menuData.filter((elem) => elem.code === code)[0];
// //   menuData.forEach(Temp => {
// // 	  if(Temp == code){
// 		  $('#tempListData').append('<div class="tempData" id=MenuList_'+code+'>'+clickData.name+'<p>'+clickData.price+'</div>');
// // 	  }else{
// // 		  $('#MenuList_'+code).html('<div class="tempData" id=MenuList_'+code+'>'+clickData.name+'<p>'+clickData.price+'2개</p></div>')
// // 	  }
// //   });
  
// };
// const OrderPostCilck = () => {
// 	 $('.tempData').css({'background-color': 'var(--Color-GrayCool-50)', 'color': 'var(--Color-GrayCool-900)' });
// 	 alert('주문 완료~');
	
// }



</script>

</body>
</html>
