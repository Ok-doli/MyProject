

$(document).ready(function() {
	var cookie = new CookieManager();
	var model = new NoticeModel(cookie);
	var presenter = new NoticePresenter(model);
	var view = new NoticeView(presenter);
	presenter.registerView(view);

	//setTitleNoneScroll('main_div','logo_area');
	new ResizeSensor($(".list_area"), function(){
		$('.list_blank').remove();
		var topArea = $('.logo_area').innerHeight();
		var blankArea = $('.gray_div').innerHeight();
		var listArea = $('.list_area').innerHeight();
		var winArea = $(window).innerHeight();
		if(winArea <=topArea+blankArea+listArea){
			$('.list_area').append('<div class="list_blank"style="width: 100%;height: '+(naviTopHeight+5)+'px; "><div>');
		}
		f_setUpIcon('div-scroll-y','div-scroll-y','div-scroll-y');
	});
});
        

/**
 * 데이터만 처리
 */
class NoticeModel {
	
	constructor(cookie){
        this.cookie = cookie;
        this.id = null;
        this.notices = null;
        this.totalCnt = 0;
        this.resultCnt = 0;
        this.startRownum = 1;
        this.pageSize = 20;
    }
	
	process(data) {
		return fetch("/api/notice_Select", {
	        method: 'POST', // *GET, POST, PUT, DELETE, etc.
	        mode: 'cors', // no-cors, cors, *same-origin
	        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	        credentials: 'same-origin', // include, *same-origin, omit
	        headers: {
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        },
	        redirect: 'follow', // manual, *follow, error
	        referrer: 'no-referrer', // no-referrer, *client
	        body: JSON.stringify(data), // body data type must match "Content-Type" header
	    });
	}
	
	getCookieManager() {
		return this.cookie;
	}
	
	setId(id) {
		this.id = id;
	}
	
	getId() {
		return this.id;
	}
	
	setNoticeList(notices) {
		this.notices = notices;
	}
	
	getNoticeList() {
		return this.notices;
	}
	
	addStartRownum() {
		this.startRownum += 1;
	}
	
	getStartRownum() {
		return this.startRownum;
	}
	
	setTotalCnt(totalCnt) {
		this.totalCnt = totalCnt;
	}
	
	getTotalCnt() {
		return this.totalCnt;
	}
	
	setResultCnt(resultCnt) {
		this.resultCnt = resultCnt;
	}
	
	getResultCnt() {
		return this.resultCnt;
	}
	
    
}

/**
 * view 만 처리
 */
class NoticeView{
    constructor(presenter){
        this.presenter = presenter;
        this.doc = document;
        this.div_main_height = $('.main_div').height();
        this.initEvent();
    }


    // event 초기화
    initEvent() {
    	setBottomNavi('home');
		f_chromeResize('main_div');
		$('.div-scroll-y').height($('body').height());
		var elem = $(".main_div");
		var isIos = '${fontBold}';
    	const scrollDiv = this.doc.getElementsByClassName("main_div")[0];
    	if(!isChrome) {
    		scrollDiv.addEventListener("scroll", ()=>{
    			var element = event.target;
				//크롬일 때
    			if (parseInt(element.scrollTop) + parseInt(element.clientHeight) == parseInt(element.scrollHeight)){
					this.presenter.scrollEnd();
				}
	    	}, false);
        } else {
        	scrollDiv.addEventListener("scroll", ()=>{
    			var element = event.target;
				//크롬일 때
				if(isChrome){
					var maxScrollTop = elem[0].scrollHeight - elem.outerHeight();
					if(parseInt(elem.scrollTop()) == maxScrollTop || (parseInt(elem.scrollTop())+56) == maxScrollTop){
						this.presenter.scrollEnd();
					}
				}
	    	}, false);
        }
    	
    	

    	const btnBack = this.doc.getElementById("btnBack");
    	btnBack.addEventListener("click", ()=>{this.postBack()}, false);
    }
    
    
    postBack() {
    	document.location.replace("/Home");
    }
    
    setTotCnt(resultCnt,totCnt) {
    	let txt = resultCnt.format() + "/" + totCnt.format();
    	this.doc.getElementById("totCnt").innerHTML  = txt;
    }
    
    clearNoticeList() {
    	this.doc.getElementsByClassName("list_area")[0].innerHTML = ""; 
    }

    setNoticeList(){
    	return new Promise((resolve, reject) => {
	    	let notices = this.presenter.model.getNoticeList();
	
	
			for(let i = 0; i < notices.length; i++) {
				const selectedNotice = notices[i];
				const seq = selectedNotice.seq;
				
				// 부모
				let parentsDiv = this.doc.createElement("div");
				parentsDiv.classList.add('noitce_paddingdiv');
				parentsDiv.id = seq;
				
				// title 영역
				let noticeBorderBottom = this.doc.createElement("div");
				noticeBorderBottom.classList.add('notice_border_bottom');
				
				let noticeJustifyContent = this.doc.createElement("div");
				noticeJustifyContent.classList.add('notice_justify-content');
				
				let titleDiv = this.doc.createElement("div");
				titleDiv.classList.add('font_16px','i_font_16px', 'font_bold500', 'notice_info_title', 'title'+seq);
				titleDiv.innerHTML = selectedNotice.title || "[공지]제목없음";
				
				let dateDiv = this.doc.createElement("div");
				dateDiv.classList.add('font_12px', 'font_bold500', 'notice_info_sub','i_font_12px');
				dateDiv.innerHTML = selectedNotice.regDt;
				
				let fileDiv = this.doc.createElement("div");
				fileDiv.classList.add('padding-left2', 'svg_default', 'clip_icon', 'icon16');
				
				// file src 미적용
				if(selectedNotice.filePath) {
					dateDiv.appendChild(fileDiv);
				}
					
				let width90 = this.doc.createElement("div");
				width90.classList.add('width90');
				width90.appendChild(titleDiv);
				width90.appendChild(dateDiv);
				
				let arrowParent = this.doc.createElement("div");
				arrowParent.classList.add('notice_arrow_div');
	
				
				
				let arrowChild = this.doc.createElement("div");
				arrowChild.classList.add('svg_default', 'notice_arrow', 'down_icon2', 'icon11');
				arrowChild.id="noticeArrow"+seq;
				arrowParent.appendChild(arrowChild);
				
				noticeJustifyContent.appendChild(width90);
				noticeJustifyContent.appendChild(arrowParent);
				noticeBorderBottom.appendChild(noticeJustifyContent);
				
				
				// content 영역
				let contentParentsDiv = this.doc.createElement("div");
				contentParentsDiv.classList.add('notice');
				contentParentsDiv.id = "notice"+seq;
				
				let contentDiv = this.doc.createElement("div");
				contentDiv.classList.add('notice_detail');
				contentDiv.innerHTML = selectedNotice.contentTxt;
				
				contentParentsDiv.appendChild(contentDiv);
				
				
				noticeBorderBottom.appendChild(contentParentsDiv);
	
				parentsDiv.appendChild(noticeBorderBottom);
	

				this.doc.getElementsByClassName("list_area")[0].appendChild(parentsDiv);

				setTimeout(() => {
					let addHeight = $(parentsDiv).innerHeight();
					$(parentsDiv).height($(noticeJustifyContent).innerHeight());
					$(parentsDiv).data('orgHeight',$(parentsDiv).innerHeight());
					let orgHeight = $(parentsDiv).innerHeight();
	
					
					
					
					
					$(parentsDiv).data('click',false);
					parentsDiv.addEventListener("click", (e)=>{
						this.f_closeExpand(e.currentTarget.id,orgHeight);
						this.f_noticeExpand(e.currentTarget.id,addHeight,orgHeight);
					});
	
					resolve("y");
				}, 0);
					
			}
    	});
		
	}
    
    f_closeExpand(num,orgHeight) {
    	
    	const noticelist = this.doc.getElementsByClassName("noitce_paddingdiv");
    	orgHeight
    	for(let i = 0; i < noticelist.length; i++) {
    		const selectedId = noticelist[i].id;
    		const noticeBox = this.doc.getElementById(selectedId);
    		
    		let click = $(noticeBox).data('click');
    		
    		if(num != selectedId && click){
    			$(noticeBox).innerHeight(orgHeight);
    			$(noticeBox).css('border-bottom','0.5px solid #d0d6de');
    			$(".title"+selectedId).css("color","black");
    			
    			const box = this.doc.getElementById('notice'+selectedId);
    			box.classList.toggle('notice-act');


    			const box2 = this.doc.getElementById("noticeArrow"+selectedId);
    			box2.classList.toggle('notice_arrow-act');
    			$(noticeBox).data('click',!click);
    		}
    	}
    	
    }
    
    // 공지 확장
    f_noticeExpand(num,addHeight,orgHeight){

		const box = this.doc.getElementById('notice'+num);
		box.classList.toggle('notice-act');


		const box2 = this.doc.getElementById("noticeArrow"+num);
		box2.classList.toggle('notice_arrow-act');

		const noticeBox = this.doc.getElementById(num);
		let click = $(noticeBox).data('click');

		if(click){
			$(noticeBox).innerHeight(orgHeight);
			$(noticeBox).css('border-bottom','0.5px solid #d0d6de');
		}else{
			$(noticeBox).height(addHeight);
			$(noticeBox).css('border-bottom','none');
		}
		$(noticeBox).data('click',!click);



		if($("#notice"+num).hasClass('notice-act')){
			$(".title"+num).css("color","var(--Color-Green)");
		}else{
			$(".title"+num).css("color","black");
		};

	}
    
    noticeClick(noticeId) {
    	if(noticeId)
    		this.doc.getElementById(noticeId).click();
    }
}

/**
 * 로직만 처리
 */
class NoticePresenter {
	constructor(model){
      this.model = model;
	}
	
    registerView(view){
    	this.view = view;
    	this.initViewProcess();
    }
    
    /**
     * view 등록시 view 기능 초기화
     */
    initViewProcess() {
    	
		this.process();
		
		let id = document.getElementById("id").value;
    	if(id) {
    		this.model.setId(id);
    	}
    }

    // 스크롤 end 이벤트
    scrollEnd() {
    	if(this.model.getTotalCnt() 
			!= this.model.getResultCnt()) {
    		// 화면 넘어올때 notice id를 초기화해줌
    		this.model.setId(null);
    		// 페이지번호 증가
    		this.model.addStartRownum();
        	this.process();
    	}
    }

    process() {
    	openLoadingBar();
    	
		this.model.process({
			//param
			pageNumber : this.model.getStartRownum()
		})
		.then(response => {
			closeLoadingBar();
			if(response.status == 200) {
		    	response.json().then(result => {
		    		if(result.code == 0) {
		    			// 성공후 처리
		    			
		    			if(result.Notices) {
		    				this.model.setNoticeList(result.Notices);
		    				
		    				this.view.setNoticeList().then((msg) => {
		    					let noticeId = this.model.getId();
		    					this.view.noticeClick(noticeId);
	    					});
		    				
		    				let leng = result.Notices.length;
		    				if(leng > 0) {
		    					let info = result.Notices[leng-1];
		    					let resultCnt = info.resultCount.format();
		    					let totCnt = info.totCount.format();
		    					this.view.setTotCnt(resultCnt,totCnt);
		    					this.model.setResultCnt(resultCnt);
		    					this.model.setTotalCnt(totCnt);
		    				}
		    			}
		    		}
		    	});
	    		
			} else {
				if(response instanceof Response) {
					if(response.status == 204) {
						this.view.showAlert("계정정보를 찾을 수 없습니다.");
					} else if(response.status == 404) {
						this.view.showAlert("페이지를 찾을 수 없습니다.");
					} else {
						this.view.showAlert("처리중 문제가 발생하였습니다.\n[Response Code : "+response.status+"]")
					}
				} else {
					const result = response.json();
					result.then(e=>{
						this.view.showAlert("처리중 문제가 발생하였습니다.\n[Response Code : "+response.status+"("+e.message+")]")
					});
				}
			}
		});
	}
}