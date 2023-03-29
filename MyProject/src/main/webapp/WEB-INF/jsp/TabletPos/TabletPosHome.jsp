<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/include/headerPos.jsp"%>
<!DOCTYPE html>
<html>
<head>
<style type="text/css">
	body{
		padding: 16px;
		background-color: var(--Color-GrayCool-500);
	}
	header{
	    display: flex;
	    align-content: center;
	    justify-content: flex-start;
	    flex-direction: column;  
	    height: 20%;
	}
	header> article{
	    display: flex;
	    width: 100%;
	    padding: 16px 0;
	    background-color: var(--Color-GrayCool-700);
	    justify-content: space-between;
	}
	header> article >section {
	    display: flex;
	    width: 50%;
	}
	.btnList{
		display: flex;
	    justify-content: flex-end;
	}
	header .title{
	    font-size: calc(1.375rem + 1.5vw);
    	display: flex;
	    justify-content: center;
	    align-items: center;
	    align-content: center;
	    margin: 0 30px;
	    color: var(--Color-GrayCool-50);
	}
	header .tableTitle{
		display: flex;
	    justify-content: center;
	    align-items: center;
	    align-content: center;
	    padding: 16px;
	    border: solid 1px var(--Color-Alert-O);
	    border-radius: 20px;
	    background-color: var(--Color-AlertW-O);
	    font-size: 25px;
	}
	nav{
		width: 100%;
		padding: 0px 30px;
	    display: flex;
	    align-content: center;
	    align-items: center;
	    background-color: var(--Color-AlertLine-O);
	}
	li{
		float: left;
	    list-style: none;
	    margin: 1px;
	    width: 15%;
	    font-size: 24px;
	    padding: 20px 0;
	}
	ul{
		margin-top: 0;
	    display: flex;
	    align-items: center;
	    justify-content: flex-start;
	    width: 100%;
	    margin: 0;
	    padding: 0;
    }
    .MainBody{
        display: flex;
    	justify-content: space-between;
    	height: 80%
    }
    .MenyData{
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-between;
	    align-content: flex-start;
	    width: 80%;
	    overflow-y: scroll;   
    }
    .TempList{
    	width: 19%;
    	background: var(--Color-GrayCool-900);
    	color: var(--Color-GrayCool-50);
    	overflow-y: scroll;
    	
    }
    .TempList_Box{
        height: 90%;
            overflow-y: auto;
    }
    .MenyData > div{
        margin: 15px 0;
        padding: 16px;
	    background-color: burlywood;
    }
    .MenyData > div div{
    	font-size : 25px;
    	margin: 16px 0 0 0 ;
    }
    img{
    	width: 245px;
    }
    .tempList_header{
        font-size: 20px;
        padding: 16px 0;
        border-bottom: solid 3px var(--bs-orange);
    }
    .order_header{
        font-size: 20px;
        padding: 16px 0;
        background-color: var(--Color-Alert-R);
    }
    .tempData{
    	font-size: 25px;
	    padding: 16px 16px;
	    margin: 0 0 1px 0;
	    background-color: var(--bs-orange);
	    color: var(--Color-AlertLine-O);
	    width: 100%;
	    text-align: left;
    }
    .btnMngCall{
   	    padding: 16px;
	    margin: 0 16px;
	    background-color: var(--Color-Blue-500);
	    color: var(--Color-Blue-50);
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    border-radius: 50px;
	    font-size: 20px;
	    width: 20%;
	}
	.orderList{
		padding: 16px;
	    margin: 0 16px;
	    background-color: var(--Color-Blue-500);
	    color: var(--Color-Blue-50);
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    border-radius: 50px;
	    font-size: 20px;
	    width: 20%;
	}
	p{
	text-align: right;
    font-size: initial;
	}
	.comment{
		background-color: rgba( 0, 0, 0, 0 ) !important;
		color: var(--Color-GrayCool-50);
		font-size: 30px;
	}
</style>
</head>
<body ondragstart="return false">

    <header>
    	<article>
    		<section>
	        	<div class="title">유서브</div>
	        	<div class="tableTitle">테이블 1번</div>
        	</section>
        	<section class="btnList">
        		<div class="btnMngCall">직원호출</div>
        		<div class="orderList">영수증</div>
        	</section>
     	</article>
   		<nav>
            <ul id="MenuList"></ul>
        </nav>
	</header>
    <article class="MainBody">
        <section id="MenyData" class="MenyData"></section>
        <section class="TempList">
        	<div class="TempList_Box">
	        	<div class="tempList_header">장바구니</div>
	        	<div id="tempListData"></div>
        	</div>
        	<div class="order_header" onclick="OrderPostCilck();">주문하기</div>
        </section>
        
    </article>
    <footer>
        
    </footer>



<script type="text/javascript">

const menuList = [
	  { header: "메뉴카테고리1" , type : "category1"},
	  { header: "메뉴카테고리2" , type : "category2"},
	  { header: "메뉴카테고리3" , type : "category3"},
	  { header: "메뉴카테고리4" , type : "category4"},
	  { header: "메뉴카테고리5" , type : "category5"}
	];
	
const menuData = [{imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨1" ,type:"category1",code:"chicken1" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨2" ,type:"category1",code:"chicken2" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨3" ,type:"category1",code:"chicken3" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨4" ,type:"category1",code:"chicken4" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨5" ,type:"category1",code:"chicken5" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨6" ,type:"category1",code:"chicken6" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨7" ,type:"category1",code:"chicken7" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨8" ,type:"category1",code:"chicken8" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨9" ,type:"category1",code:"chicken9" ,price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨10",type:"category1",code:"chicken10",price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨11",type:"category1",code:"chicken11",price:"17000"},
				  {imgUrl:"https://m.ifwellmall.com/web/product/big/202107/2f9138b76bb42883dd1a543991ef1514.jpg",name:"치킨12",type:"category1",code:"chicken12",price:"17000"},
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술1" ,type:"category2",code:"soju1" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술2" ,type:"category2",code:"soju2" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술3" ,type:"category2",code:"soju3" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술4" ,type:"category2",code:"soju4" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술5" ,type:"category2",code:"soju5" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술6" ,type:"category2",code:"soju6" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술7" ,type:"category2",code:"soju7" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술8" ,type:"category2",code:"soju8" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술9" ,type:"category2",code:"soju9" ,price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술10",type:"category2",code:"soju10",price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술11",type:"category2",code:"soju11",price:"7000"},    
				  {imgUrl:"https://dimg.donga.com/wps/NEWS/IMAGE/2012/11/21/50990541.4.jpg",name:"술12",type:"category2",code:"soju12",price:"7000"}]
	
	
let OrderList = new Array();	
let TempList = new Array();	

$(document).ready(() => {
	menuListHtml();
	$('li:first-child').trigger('click');
});

const menuListHtml = () => {
  let html = '';
  menuList.forEach(menu => {
    html += '<li onclick="menuDataHtml(this)" id='+menu.type+'>'+menu.header+'</li>';
  });
  $('#MenuList').append(html);
};

const menuDataHtml = (target) => {
  $('li').css('border-bottom', 'none');
  $(target).css('border-bottom', 'solid 3px var(--bs-orange)');
  let html = '';
  menuData.forEach(menu => {
    if (menu.type === $(target).attr('id')) {
      html += '<div onclick="menuTempList(this)" id='+menu.code+'><img src='+menu.imgUrl+'></img><div>'+menu.name+'</div><div>'+menu.price+'</div></div>';
    }
  });
  html = (html == '') ? '<div class="comment">메뉴 준비 중...</div>' : html ;
  $('#MenyData').empty();
  $('#MenyData').append(html);
};

const menuTempList = (target) => {
  let code = $(target).attr('id');
  TempList = [...new Set(TempList)];
//   let cntList = {};
//   TempList.filter(function(item) {
// 	  cntList[item] = (cntList[item] || 0) + 1;
//   });
//   let result = Object.keys(cntList).map(function(key) {
// 	  return { [key]: cntList[key] };
//   });
  const clickData = menuData.filter((elem) => elem.code === code)[0];
//   menuData.forEach(Temp => {
// 	  if(Temp == code){
		  $('#tempListData').append('<div class="tempData" id=MenuList_'+code+'>'+clickData.name+'<p>'+clickData.price+'</div>');
// 	  }else{
// 		  $('#MenuList_'+code).html('<div class="tempData" id=MenuList_'+code+'>'+clickData.name+'<p>'+clickData.price+'2개</p></div>')
// 	  }
//   });
  
};
const OrderPostCilck = () => {
	 $('.tempData').css({'background-color': 'var(--Color-GrayCool-50)', 'color': 'var(--Color-GrayCool-900)' });
	 alert('주문 완료~');
	
}



</script>

</body>
</html>
