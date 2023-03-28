<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<style>
.modal-body{
	padding: 0px 16px 16px 16px !important; 
}


</style>
<body ondragstart="return false">

	 <div class="div_load_image" id="div_load_image" style="position:absolute;width:100%;height:100vh; z-index:9999; background:#f7f7f78f; filter:alpha(opacity=50); opacity:alpha*0.5; margin:auto; padding:0; text-align:center;    display: flex;
    justify-content: space-around;
    align-items: center;">
      <img src="/images/loading2.gif" style="width:50px; height:50px;">
  </div>


<%@include file="/WEB-INF/include/header.jsp"%>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/css-element-queries/1.2.3/ResizeSensor.min.js"></script> -->
<%@include file="/WEB-INF/include/TopMenu.jsp"%>

<div class="main_div div-scroll-y" style="background-color: #E1E6EB;">

   <div class="waterhome_top">
   	<div class="btn-noti font_16px i_font_15px Body " id="noticeOne" onclick="postNotice('HomeClick')">[공지사항]</div>
    <p class="font_22px i_font_21px Header5" id="entrpsId" style="color:var(--Color-Blue-500);"></p>
    <p class="font_28px i_font_27px Header3" id="entrpsNm" style="color:var(--Color-Gray-800); width: 100%; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;padding: 0 16px;"></p>
    <p class="font_18px i_font_17px Header6" id="mgr" style="color:var(--Color-Gray-800);"></p>
    <div id="btn_w_check"  class="font_18px i_font_17px button2" data-bs-toggle="modal"  data-bs-target="#Modal1"  style="display: none" >매장정보 확인</div>
   </div>
   <div style="background-color:#E1E6EB;">
    <div id="water_home_time" >
      <p class="font_14px i_font_13px Body water_time" id="water_time"></p>
      <p class="font_14px i_font_13px Body water_time" id="water_timeDetail" hidden="" ></p>
      <div  class="svg_default water_refresh svg_default icon16" onclick="f_Reload(true)"></div>
    </div>
    
    <div class="mngmn_body_div4" style="overflow:hidden;">
	  <div style="display: flex; align-items: center; justify-content: flex-start; margin-bottom: 4px;">
	  	<p class="font_18px i_font_17px Header6 " style="margin: 0 6.5px 0 0; ">요청 및 배송 (금일)</p>
	  	<div class="icon20 info_unsel svg_default" data-info-type="infoHome" onclick="f_InfoModal(this)"></div>
	  </div>
	  
	  <div style="padding:15px 0">
		  <div class="home_new_all">
		  <div class="new_button_w"  >
		  	<p class="font_12px i_font_11px caption1 new_button" id="new_button1" style="display: none;">NEW</p>
		  </div>
		  <div class="new_button_w"  >
		  	<p class="font_12px i_font_11px caption1 new_button" id="new_button2" style="display: none;" >NEW</p>
		  </div>
		  <div class="new_button_w"  >
		  	<p class="font_12px i_font_11px caption1 new_button"  id="new_button3" style="display: none;">NEW</p>
		  </div>
		  </div>
	  <div class="water_content_01" onclick="postWaterRequest();">
	    <div style=" border-right:1px solid #E1E6EB;">
	    <div  class="svg_default water_icon_ship_check icon42"></div>
	    <p class="font_16px i_font_15px Subtitle ">배송요청</p>
	    <div class="float-center">
		    <p class="font_24px i_font_23px Header4" id="dlvyCfmCnt" style="color:var(--Color-Blue-300)">-</p>
		    <p class="font_24px i_font_23px Header4"  style="color:var(--Color-Blue-300)">/</p>
		    <p class="font_24px i_font_23px Header4" id="dlvyReqCnt" style="color:var(--Color-Blue-300)">-</p>
	    </div>
	    
	  </div>
	  </div>
	  <div class="water_content_01" onclick="postWaterManagement_NoConfirm();">
	    <div style=" border-right:1px solid #E1E6EB;">
	    <div  class="svg_default water_icon-ship-confirm icon42"></div>    
	    <p class="font_16px i_font_15px Subtitle">미처리배송</p>
	    <p class="font_24px i_font_23px Header4" id="unProcessedCnt" style="color:var(--Color-Blue-500)">-</p>
	  </div>
	  </div>
	  <div class="water_content_01" onclick="postWaterManagement();">
	    <div>    
	    <div  class="svg_default water_icon-ship-complete icon42"></div>
	    <p class="font_16px i_font_15px Subtitle">배송완료</p>
	    <div class="float-center">
		    <p class="font_24px i_font_23px Header4" id="dlvyComCnt" style="color:var(--Color-Blue-600)">-</p>
		    <p class="font_24px i_font_23px Header4" id="dlvyComCnt" style="color:var(--Color-Blue-600)">/</p>
		    <p class="font_24px i_font_23px Header4" id="dlvyComCfmCnt" style="color:var(--Color-Blue-600)">-</p>
	    </div>
	    
	  </div>
	  </div>
	</div>
	</div>
	
	<div class="mngmn_body_div4">
	  	<p id="cachTxt" class="font_18px i_font_17px Header6 float_center_t">배송취소 및 정산내역</p>
		
		<div class="Home_box" onclick="postWaterManagement_Cancel()" >
		<p class="font_16px i_font_15px Subtitle water_se_f">취소요청</p>
		 	<div>
		   		<p class="font_16px i_font_16px Subtitle water_se_r" id="cancelReq"></p>
				<div class="svg_default slide_home_right icon16"></div>
		   	</div>
		</div>
		<div class="Home_box" id="cashBox" style="display: none;">
		  	<p class="font_16px i_font_15px Subtitle water_se_f">정산내역</p>
		  	<div>
		    	<p class="font_16px i_font_16px Subtitle water_se_r" style="color: var(--Color-Blue-600);"> 
		    		&#x20a9;&nbsp;<span id="cashTotal" class="font_16px i_font_16px Subtitle" style="color: var(--Color-Blue-600); "> </span>
		    	</p>
		   	</div>
		</div>
	</div>
	
	<div class="mngmn_body_div4">
	  <p class="font_18px i_font_17px Header6 float_center_t">설정</p>
	    <div class="Home_box" onclick="postManagement()" id='postManagement'>
		    <div class="float-left" >
			    <p  class="svg_default home_people icon20"></p>
			    <p class="font_16px i_font_16px Subtitle water_se_f" style="margin-left:9px;">담당자 관리</p>
		    </div>
		    <div style="display:flex; align-items:center; float:right;">
			    <p id="delivery_cnt" class="font_16px i_font_16px Subtitle water_se_r"></p>
			    <div  class="svg_default slide_home_right icon16"></div>
			</div>
		</div>
	    <div class="Home_box" onclick="postSetting()">
	    	<div class="float-left"  >
			    <p  class="svg_default home_setting icon20"></p>
			    <p class="font_16px i_font_16px Subtitle water_se_f" style=" margin-left:9px;">설정</p>
		    </div>
		    <div style="display:flex; align-items:center; float:right;">
			    <p class="font_16px i_font_16px Subtitle water_se_r"></p>
			    <div  class="svg_default slide_home_right icon16"></div>
			</div>
	    </div>
	</div>
    
</div>
</div>


<!-- 모달1 -->
<div id="Modal1" class="modal store_modal" tabindex="-1"  style="">
  <div class="modal-dialog modal-fullscreen " style="padding-bottom: 0;">
    <div class="modal-content store_content">
      <div class="modal-header2">
        <div></div>
        <h2 class="modal-title font_20px i_font_19px Header6" id="topTitle" >가맹점 선택</h2>
        <div id='close'>
        	<div class="close-modal icon23"></div>
        </div>
      </div>
      <div class="modal-body-city">
        <h3 id="middleTitle" class="font_18px i_font_17px Button2 " >지역을 선택해주세요.</h3>
		  <input type="search" onkeyup="search(this);" onsearch="search(this);" class="store_search 
		  text_align_left icon-search svg_default  form-control form-control-lg font_16px i_font_16px Subtitle" 
		  id="formGroupExampleInput" placeholder="검색">
      	<div id="listGroup" class="text_align_left list-group div-scroll-y" style="height: 75%;overflow-y:auto; margin-bottom: 24px;" >	
		</div>
	    <div class="modal_btn_area2 font_18px i_font_17px Button1" id="store_yes"  >확인</div>
      </div>
    </div>
  </div>
</div>



<%@include file="/WEB-INF/include/BotMenu.jsp"%>

<script>

menuType ='home';

$(function () {
	/*가맹점 선택*/
	$(document).on("click","#store_yes",function () {
		 var storeText = $('.store-green').text();
		 if(storeText==''){
			 showMsg("가맹점을 선택해주세요.");
			 return false;
		 }
		 
		 $('#store').text(storeText);
		 var selStoreCd = $(".store-green").find('[data-store-code]').data('storeCode');
		 
		 /* 쿠키 수정 */		
		 loginData.dlvyEntrpsCd = selStoreCd;
		 cookie.setLoginData(loginData);
		 

		 f_TopVeiw();
		 f_back();
		
	});
	
	$(document).on("click",".store-body",function () {
		 var icon = $(this).children('div');
		 icon = icon[0];
		 
		 $('.store-body').each(function(index, item){ 
			 var selected = $(item).attr('class');
			 selectedIcon = $(item).children('div');
			 selectedIcon = selectedIcon[0];
			 selectedIcon = $(selectedIcon).attr('class');
			 
			 if (selected.includes('store-green')) {
				 $(this).removeClass('store-green');
				 $('.icon-check-green').remove();
				 $(this).children().removeClass('icon-store-green');
			 }
		 }); 
		 
		 $(this).addClass('store-green');
		 $(icon).addClass('icon-store-green');
		 $(this).append("<div style='width:10%' class='icon-check-green svg_default icon22'></div>");
		 showMsg($('.store-green').text()+"이 선택되었습니다.");
		
	});
	
	$(document).on("click","#close",function () {
		 $('#Modal1').modal('hide');
		
	});
	
	
	

});

$(document).ready(function(){
	 f_TopVeiw();
	
	 $(window).resize(function() {
			
			f_CssBot();	
			f_TopMargin();	
	});
	
});

function f_back(){
	$('#Modal1').modal('hide');
}
function f_TopVeiw() {
// 	if (mobile == 'ios' || mobile == 'ios_app') {
// 		$('.modal-body-city').css('padding', '0px 16px 40px 16px');
// 		$('.store_modal').addClass('store_modal_ios');
// 		$('.store_modal').removeClass('store_modal');
		
// 	}
	f_Setting();
	$('#navi_icon_home').removeClass('navi_icon_home_unsel');
	$('#navi_icon_home').addClass('navi_icon_home_sel');  

	
   
	if(loginData.authCd == 'ROLE_ADMIN' ||loginData.authCd =='ROLE_SUPERUSER' || loginData.authCd =='ROLE_USER') {
		$('#mgr').text('전사 관리자 : '+loginData.userNm);
		$('#btn_w_check').css('display','block'); // 매장정보 확인 버튼 나타내기
		$('#cashBox').css('display','flex');
	} else if (loginData.authCd == 'ROLE_FC') {
		$('#mgr').text('매장 관리자 : '+loginData.userNm);  
		$('#cashBox').css('display','flex');
	} else if (loginData.authCd == 'ROLE_DELIVERY') {
		$('#mgr').text('배송 담당자 : '+loginData.userNm);  
		$('#postManagement').hide();
		$('#cashBox').css('display','none');
	} else {
		$('#mgr').text('관리자 정보 없음');  
	}
	
	f_StoreGroup();
	//공지사항 한건 표출
	
	$.ajax({
		type : "POST",
		url : "/notiOneSelect.do",
		data : {},
		async : false,
		datatype : "json",
		success : function(json) {
			$('#noticeOne').text('[공지사항] '+json[0].noticeSj)
		}
	});
	$.ajax({
		type : "POST",
		url : "/cashTotalSelect.do",
		data : {
			dlvyEntrpsCd : loginData.dlvyEntrpsCd
		},
		async : false,
		datatype : "json",
		success : function(json) {
			$('#cashTotal').text(''+json[0].totalCnt)
		}
	});
	
	
	if(loginData.authCd == 'ROLE_DELIVERY'){
		$("#cashBox").css("display","none");
		$("#cachTxt").text("배송취소");
	}else{
		$("#cashBox").css("display","");
		$("#cachTxt").text("배송취소 및 정산내역");
		
	}
	
	
	
	$.ajax({
		type : "POST",
		url : "/EntrpsNm_Select.do",
		data : {
			dlvyEntrpsCd : loginData.dlvyEntrpsCd
		},
		async : false,
		datatype : "json",
		success : function(json) {
			
			EntrpsNm = json;
			
			$.each(EntrpsNm, function(index, item) {
				
				if(item) {
					$('#entrpsId').text('가맹점 ID ('+item.dlvyEntrpsCd+')');  // 가맹점 ID  
					$('#entrpsNm').text(item.dlvyEntrpsNm); // 가맹점 명
				} else if(item == '') {
					$('#entrpsId').text('가맹점 ID (없음)');  
					$('#entrpsNm').text('가맹점 정보가 없습니다.');  
				}
				
			});
			
		}
	});
	var dlvyMobile = '';
	if (loginData.authCd == 'ROLE_FC' || loginData.authCd == 'ROLE_ADMIN' || loginData.authCd == 'ROLE_SUPERUSER' || loginData.authCd == 'ROLE_USER') {
		dlvyMobile = '';
	}else{
		dlvyMobile = loginData.mobile
		
	}
	/* 요청 및 배송 조회(금일) */
	$.ajax({
		type : "POST",
		url : "/ReqDlvy_Select.do",
		data : {
			authCd : loginData.authCd,
			dlvyEntrpsCd : loginData.dlvyEntrpsCd,
			mobile : dlvyMobile
		},
		async : false,
		datatype : "json",
		success : function(json) {
			console.log(json);
			if(loginData.authCd == "ROLE_DELIVERY"){
				$("#dlvyReqCnt").text("-");	
				$('#dlvyCfmCnt').text("-");		//배송확정
			}else{
				var entrTrno_ReqDlvy = parseInt(json[0].reqDlvyCnt) + parseInt(json[0].entrTrnoCnt); //배송요청 전체건수
				$("#dlvyReqCnt").text(entrTrno_ReqDlvy);	//배송요청
				$('#dlvyCfmCnt').text(json[0].entrTrnoCnt);		//배송확정
			}
			
			
			$("#dlvyComCnt").text(json[0].leftCnt);			// 배송완료 
			$("#dlvyComCfmCnt").text(json[0].rightCnt);		// 배송완료
			$("#unProcessedCnt").text(json[0].notProcessCnt);	//미처리배송
			$("#cancelReq").text(json[0].reqCnclDlvyCnt);		//취소요청
			$("#delivery_cnt").text(json[0].deliveryCnt);		//담당자관리
		}	
	});
	
	
	
	

	 f_NewButton();
	 closeLoadingBar();

}
/*******************************************************************************
 * FUNCTION 명 : 시간 세팅값 
 * FUNCTION 기능설명 :
 *******************************************************************************/
function f_Setting() {
    var dd = new Date();
    var Y = dd.getFullYear();
    var MM = dd.getMonth();
    MM = MM + 1;
	var H = dd.getHours();
	var M = dd.getMinutes();
	var S = dd.getSeconds();
	$('#water_time').html('최근 '+lpad2(H,2,'0')+':'+lpad2(M,2,'0'));
	$('#water_timeDetail').html(Y+''+lpad2(MM,2,'0')+''+lpad2(H,2,'0')+''+lpad2(M,2,'0')+''+lpad2(S,2,'0'));
	
	setInterval(f_Reload,1800000); //30분 뒤의 자동 실행 
	
	
	
		
}

function f_Reload(target) {
	
	if (target) {
		f_TopVeiw();
		openLoadingBar();
	}else{
		f_TopVeiw();
		
	}
	
	
	var dd = new Date();
	var Y = dd.getFullYear();
 	var MM = dd.getMonth();
    MM = MM + 1;
	var H = dd.getHours();
	var M = dd.getMinutes();
	var S = dd.getSeconds();
	$('#water_time').html('최근 '+lpad2(H,2,'0')+':'+lpad2(M,2,'0'));
	$('#water_timeDetail').html(Y+''+lpad2(MM,2,'0')+''+lpad2(H,2,'0')+''+lpad2(M,2,'0')+''+lpad2(S,2,'0'));
	f_NewButton();
	
	
}

/*******************************************************************************
 * FUNCTION 명 : 매장 정보 셀렉트
 * FUNCTION 기능설명 :
 *******************************************************************************/
function f_StoreGroup() {
	$.ajax({
		type : "POST",
		url : "/StoreList.do",
		data : {
			
		},
		async : false,
		datatype : "json",
		success : function(json) {
			storeList = json;
			var html='';
			$.each(storeList, function(i,item){
				if (loginData.dlvyEntrpsCd == item.storeCd) {
					html +='<div class="store-body store-green">'
					html +='<div class="icon-store svg_default icon22" style="width:10%"></div>'
					html +='<div class="font_16px i_font_16px" style="width:80% ;text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" data-store-code="'+item.storeCd+'">'+item.storeNm+'</div>'
					html +='</div>'
				}else{
					html +='<div class="store-body" style="border-bottom: 1px solid var(--Color-GrayCool-50);">'
					html +='<div class="icon-store svg_default icon22" style="width:10%"></div>'
					html +='<div class="font_16px i_font_16px Subtitle" style="width:80% ;text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" data-store-code="'+item.storeCd+'">'+item.storeNm+'</div>'
					html +='</div>'
				}
				
				
				
			});
			$("#listGroup").empty();	
			$("#listGroup").append(html);	
			
		}
	});
	
}



closeLoadingBar();

function f_NewButton() {
	
	if(Number($("#dlvyReqCnt").text()) > 0){
		$('#new_button1').css('display','flex');
	}else{
		$('#new_button1').css('display','none');
		
	}
	if(Number($("#dlvyCfmCnt").text()) > 0){
		$('#new_button2').css('display','flex');
	}else{
		$('#new_button2').css('display','none');
		
	}
	if(Number($("#dlvyComCnt").text()) > 0){
		$('#new_button3').css('display','flex');
	}else{
		$('#new_button3').css('display','none');
		
	}
	if(Number($("#unProcessedCnt").text()) > 0){
		$('#new_button3').css('display','flex');
	}else{
		$('#new_button3').css('display','none');
		
	}
	
	
}

function search(target){
	 var value = $(target).val().toLowerCase();
	 
	 $("#listGroup div").filter(function() { // 일치하는 tr 요소만 보여 줘.

	      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1) // 일치하는 글자 있으면
	 });
}




</script>

</body>
</html>
