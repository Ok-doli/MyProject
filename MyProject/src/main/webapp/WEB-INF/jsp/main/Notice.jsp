<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<style>
.none{
	display: none !important;
}
</style>
<body ondragstart="return false">
<%@include file="/WEB-INF/include/header.jsp"%>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/css-element-queries/1.2.3/ResizeSensor.min.js"></script> -->
<div class="main_div  newNotice" >
<%@include file="/WEB-INF/include/TopMenu.jsp"%>
<div class="manage_top" id="menuBox">
   <div class="manage_top_area width_35"  >
       <div class="manage_top_icon">
           <div class="svg_default mange_arrow_left icon23" onclick="f_back();"></div>
       </div>
   </div> 
   <div class="float-center width_30">
   	<span class="font_20px i_font_19px Header6">공지사항</span>
   </div>
   <div class="manage_navi_area width_35 font_14px i_font_13px Body"></div>
</div>



<div id="noticeList" class="list_area new_list_area div-scroll-y" style="padding-top: 0px;padding-bottom: 56px;height: 90%">
			


</div>
	
</div>
<%@include file="/WEB-INF/include/BotMenu.jsp"%>
<!-- <script type="text/javascript" src="/js/model/notice.js?ver=2"></script> -->
<!-- <script type="text/javascript" src="/js/model/menu.js?ver=2"></script> -->
<script type="text/javascript">
openLoadingBar();
var noticeData ;
var chk ='';
var pageCnt = 1;
var next ='Y';
$(function () {
	
	
	$(document).on("click",".noitce_paddingdiv",function () {
			var idName = $(this).attr('id');
			var className = $(this).attr('class');
			var heightContent = $("#notice"+idName).outerHeight(true);
			heightContent = heightContent + 55; // 내용높이+제목높이
			if (chk) {
				if (chk == idName) {
					chk = '';
					$('.noitce_paddingdiv').css('height','');
					$('#'+idName).removeClass('heightAdd');
					$('#icon_'+idName).removeClass('down_icon2');
				}else if(chk != idName){
					$('.noitce_paddingdiv').css('height','55px');
					$('.noitce_paddingdiv').removeClass('heightAdd');
					$('.icon14').removeClass('down_icon2');
					$('#'+idName).css('height',heightContent);
					$('#'+idName).addClass('heightAdd');
					$('#icon_'+idName).addClass('down_icon2');
					chk = idName;
				}
			}else{
				openLoadingBar();
				$('#'+idName).css('height',heightContent);
				$('#'+idName).addClass('heightAdd');
				$('#icon_'+idName).addClass('down_icon2');
				chk = idName;
				closeLoadingBar();
			}
			
			
			
		});
	});

$(document).ready(function(){
	
	
	data={pageNumber : '',pageSize : ''};
	

	f_Select();
	
	$(".div-scroll-y").scroll( function() {
	    var scrollTop = $(this).scrollTop();
        var innerHeight = $(this).innerHeight();
        var scrollHeight = $(this).prop('scrollHeight');
        var outerHeight = $(this).outerHeight();
        var botHeight = $("#bot_navi").outerHeight(true);
	        if (scrollTop + innerHeight >= scrollHeight - botHeight) {
	        	if(next == 'Y'){
		  		  	pageCnt += 1;
		        	f_Select(pageCnt);
	        		
	        	}
	        } 
	        

	});
	

		
	var urlParams = new URL(location.href).searchParams;
	var param = urlParams.get('menuType');
	if (param) {
		$('#navi_icon_'+param).removeClass('navi_icon_'+param+'_unsel');
		$('#navi_icon_'+param).addClass('navi_icon_'+param+'_sel');
		
		if(param == 'HomeClick'){
			 $(".0_cilck").trigger("click");
			 $('#navi_icon_home').removeClass('navi_icon_home_unsel');
			 $('#navi_icon_home').addClass('navi_icon_home_sel');
		}
	}
	
	
	
});


function f_List() {
	
	var html = '';
	if (noticeData) {
	$.each(noticeData, function(i,item){	
		 html += '<div class="noitce_paddingdiv '+i+'_cilck" id="'+item.noticeSeq+'">';
		 html += '				    <div class="notice_border_bottom">';
		 html += '				        <div class="notice_justify-content" id="notice_'+item.noticeSeq+'">';
		 html += '				            <div class="width90">';
		 html += '				                <div class="Subtitle font_16px i_font_15px  notice_info_title" >'+item.noticeSj+'</div>';
		 html += '				                <div class="Subtitle font_14px i_font_13px  notice_info_sub">'+item.showDt+'</div>';
		 html += '				            </div>';
		 html += '				            <div class="notice_arrow_div">';
		 html += '				                <div class="svg_default icon14" id="icon_'+item.noticeSeq+'"></div>';
		 html += '				            </div>';
		 html += '				        </div>';
		 html += '				        <div class="notice" id="notice'+item.noticeSeq+'">';
		 html += '				            <div class="notice_detail">';
		 html += 								item.contentTxt;
		
		 html +='						<div class="float-column-center">';
			
		  	if(nowactive == "dev"){
		  		
		  	    if (item.fileDispNm1Yn == 'Y') {
	                 html +=                                 '<img src="/imagePath/'+item.filePath1+'" style="width: 100%; margin-top: 10px;">';        
				} 
				if (item.fileDispNm2Yn == 'Y') {
	                 html +=                                 '<img src="/imagePath/'+item.filePath2+'" style="width: 100%; margin-top: 10px;">';        
				}
				if (item.fileDispNm3Yn == 'Y') {
	                 html +=                                 '<img src="/imagePath/'+item.filePath3+'" style="width: 100%; margin-top: 10px;">';        
				}
				if (item.fileDispNm4Yn == 'Y') {
	                 html +=                                 '<img src="/imagePath/'+item.filePath4+'" style="width: 100%; margin-top: 10px;">';        
				}
				if (item.fileDispNm5Yn == 'Y') {
	                 html +=                                 '<img src="/imagePath/'+item.filePath5+'" style="width: 100%; margin-top: 10px;">';        
				}
		  		
		  		
		  		
		  	}else{
		  		
		  	    if (item.fileDispNm1Yn == 'Y') {
	 				 html += 								'<img src="https://lms.pulmuone.com/atchmnflDownload/'+item.filePath1+'" style="width: 100%; margin-top: 10px;">';		
				} 
				if (item.fileDispNm2Yn == 'Y') {
	 				 html += 								'<img src="https://lms.pulmuone.com/atchmnflDownload/'+item.filePath2+'" style="width: 100%; margin-top: 10px;">';		
				}
				if (item.fileDispNm3Yn == 'Y') {
	 				 html += 								'<img src="https://lms.pulmuone.com/atchmnflDownload/'+item.filePath3+'" style="width: 100%; margin-top: 10px;">';		
				}
				if (item.fileDispNm4Yn == 'Y') {
	 				 html += 								'<img src="https://lms.pulmuone.com/atchmnflDownload/'+item.filePath4+'" style="width: 100%; margin-top: 10px;">';		
				}
				if (item.fileDispNm5Yn == 'Y') {
	 				 html += 								'<img src="https://lms.pulmuone.com/atchmnflDownload/'+item.filePath5+'" style="width: 100%; margin-top: 10px;">';		
				}
		  		
		  		
		  	}
		 

		 html +='						</div>';
		 html += '				            </div>';
		 html += '				        </div>';
		 html += '				    </div>';
		 html += '				</div>';

	});


	$('.list_area').append(html);

	}
	
	
	
}

function f_Select(page){
	openLoadingBar();
	data.pageNumber = page;
	$.ajax({
		type : "POST",
		url : "/notice_Select.do",
		data :  JSON.stringify(data),
		async : false,
		datatype : "json",
		success : function(json) {
			if(json.Notices){
			 	noticeData = json;
				noticeData = noticeData.Notices;
				f_List();
			}
			if(json.Notices.length < 20){
				next = 'N';
			}
		}
	}); 
	closeLoadingBar();
	
	
	
	
	
}


function f_back(){
	//뒤로갈 히스토리가 있으면,
	if ( history.length > 1 ) { 
		// 뒤로가기
		window.history.back();
	}

	// 히스토리가 없으면,
	else { 
		// 메인 페이지로
		location.href = "/";
	}

}

</script>


</body>
</html>
