//$(document).ready(function() {
//	
//	var cookie = new CookieManager();
//	setBottomNavi('home');
//	var model = new HomeModel(cookie);
//	var presenter = new AuthPresenter(model);
//	var view = new AuthView(presenter);
//	presenter.registerView(view);
//	setTitleNoneScroll('home_div','top_navi_area');
//	addNaviBlank('add_blank');
//	f_chromeResize("home_div");
//	f_setUpIcon('home_div','home_div','home_div');
//
//	
//});
//
//
///**
// * 데이터만 처리
// */
//class HomeModel {
//	
//	constructor(cookie){
//        this.cookie = cookie;
//        this.dashboardSales = null;
//        this.dashboardOrders = null;
//        this.dashboardNotices = null;
//        
//        
//    }
//	
//	process(data) {
//		openLoadingBar();
//		return fetch("/api/dashboard_Sales_Select", {
//	        method: 'POST', // *GET, POST, PUT, DELETE, etc.
//	        mode: 'cors', // no-cors, cors, *same-origin
//	        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//	        credentials: 'same-origin', // include, *same-origin, omit
//	        headers: {
//	            'Content-Type': 'application/json',
//	            // 'Content-Type': 'application/x-www-form-urlencoded',
//	        },
//	        redirect: 'follow', // manual, *follow, error
//	        referrer: 'no-referrer', // no-referrer, *client
//	        body: JSON.stringify(data), // body data type must match "Content-Type" header
//	    });
//	}
//	
//	getCookieManager() {
//		return this.cookie;
//	}
//	
//	setDashBoardSales(dashboardSales) {
//		this.dashboardSales = dashboardSales;
//	}
//	setDashBoardOrders(dashboardOrders) {
//		this.dashboardOrders = dashboardOrders;
//	}
//	setDashBoardNotices(dashboardNotices) {
//		this.dashboardNotices = dashboardNotices;
//	}
//	
//	getDashBoardSales() {
//		return this.dashboardSales;
//	}
//	getDashBoardOrders() {
//		return this.dashboardOrders;
//	}
//	getDashBoardNotices() {
//		return this.dashboardNotices;
//	}
//	
//}
//
///**
// * view 만 처리
// */
//class AuthView{
//    constructor(presenter){
//        this.presenter = presenter;
//        this.doc = document;
//        this.initEvent();
//        this.chartHeight  = $('.home_middle_chart_left').height();
//        this.saleTabId = "monthSale";
//    }
//    
//    setSaleTab(id) {
//    	this.saleTabId = id;
//    }
//    
//    getSaleTab() {
//    	return this.saleTabId;
//    }
//    
//    // event 초기화
//    initEvent() {
//    	//월 일 탭 클릭
//    	let tabs = this.doc.getElementsByClassName("click-tab");
//    	
//    	for (var i=0; i<tabs.length; i++)
//    	{
//    		tabs[i].addEventListener("click", (e)=>{
//    			$('.home_middle_tab').find('.home_middle_tab_click').removeClass('home_middle_tab_click');
//    			e.target.classList.add('home_middle_tab_click');
//    			this.setSaleTab(e.target.id);
//    			this.setDashBoardSales();
//    		});
//    	}
//    	
//    	this.doc.getElementById('sasd').addEventListener("click", (e)=>{
//			this.postNoticeList();
//		});
//    	
//    	// 스크롤 이벤트
//    }
//    
//   
//    
//    // 매출현황 설정
//    setDashBoardSales() {
//    	let dashboardSales = this.presenter.model.getDashBoardSales();
//    	
//    	let targetAmt = 0;
//    	let performAmt = 0;
//    	let per = 0;
//    	// 월
//    	if(this.saleTabId == "monthSale") {
//    		targetAmt = dashboardSales[0].mPlan;
//    		performAmt = dashboardSales[0].sumOrderAmt;
//    		per = dashboardSales[0].sumRate;
//    	} else {
//    		targetAmt = dashboardSales[0].dPlan;
//    		performAmt = dashboardSales[0].dActual;
//    		per = dashboardSales[0].dRate;
//    	}
//    	
//    	targetAmt+=performAmt;
//    	
//    	// title
//		this.doc.getElementById("title").innerHTML = dashboardSales[0].nowDate;
//		// 목표금액
//		this.doc.getElementById("targetAmt").innerHTML = targetAmt.format();
//		// 실적금액
//		this.doc.getElementById("performAmt").innerHTML = performAmt.format();
//		// 시식
//		this.doc.getElementById("greenPer").innerHTML = dashboardSales[0].tasteRate;
//		// 증정
//		this.doc.getElementById("yellowPer").innerHTML = dashboardSales[0].serviceRate;
//		// 반품
//		this.doc.getElementById("redPer").innerHTML = dashboardSales[0].rateSum;
//		
//		
//		$('#percentText').text((per));
//		$('.percentChart').circleProgress({
//			value: (per*0.01),
//			size: this.chartHeight,
//			reverse:true,
//			lineCap:'round',
//			startAngle:  29.8,
//			thickness: 12,
//			emptyFill: 'rgba(115,136,169,0.35)',
//			fill: {
//				image : '/images/chartBack.png'
//			},
//		});
//    }
//    
//    // 매출현황 초기화
//    clearDashBoardSales() {
//    	
//    	// title
//		this.doc.getElementById("title").innerHTML = 0;
//		// 목표금액
//		this.doc.getElementById("targetAmt").innerHTML = 0;
//		// 실적금액
//		this.doc.getElementById("performAmt").innerHTML = 0;
//		// 시식
//		this.doc.getElementById("greenPer").innerHTML = 0;
//		// 정책회수
//		this.doc.getElementById("yellowPer").innerHTML = 0;
//		// 자사발주
//		this.doc.getElementById("redPer").innerHTML = 0;
//		
//		$('#percentText').text((0));
//		$('.percentChart').circleProgress({
//			value: (0),
//			size: this.chartHeight,
//			reverse:true,
//			lineCap:'round',
//			startAngle:  29.8,
//			thickness: 12,
//			emptyFill: 'rgba(115,136,169,0.35)',
//			fill: {
//				image : '/images/chartBack.png'
//			},
//		});
//    }
//    
//    // 주문현황 설정
//	setDashBoardOrders() {
//		let dashboardOrders = this.presenter.model.getDashBoardOrders();
//		
//		for(let i = 0; i < dashboardOrders.length; i++) {
//			let obj = dashboardOrders[i];
//			
//			let allBillToCnt = obj.allBillToCnt ?  obj.allBillToCnt : "-"; // 총매장
//			let allOrderToCnt = obj.allOrderToCnt ?  obj.allOrderToCnt : "-";	// 총주문수량
//			let allOrderAmount = obj.allOrderAmount ?  obj.allOrderAmount : "-";	// 총금액
//			
//			// 당일
//			if(obj.type == "today") {
//				$('#dayStoreAmt').text(allBillToCnt); // 당일 + 총매장
//				$('#dayOrderAmt').text(allOrderToCnt); // 당일 + 총 주문수량
//				$('#dayTotAmt').text(allOrderAmount); // 당일 + 총금액
//			} 
//			// 납품일
//			else if(obj.type == "delivery") {
//				$('#deliStoreAmt').text(allBillToCnt); // 납품일 + 총매장
//				$('#deliOrderAmt').text(allOrderToCnt); // 납품일 + 총 주문수량
//				$('#deliTotAmt').text(allOrderAmount); // 납품일 + 총금액
//			} 
//		}
//	}
//	
//	// 주문 현황 초기화
//	clearDashBoardOrders() {
//		$('#dayStoreAmt').text("-"); // 당일 + 총매장
//		$('#dayOrderAmt').text("-"); // 당일 + 총 주문수량
//		$('#dayTotAmt').text("-"); // 당일 + 총금액
//
//		$('#deliStoreAmt').text("-"); // 납품일 + 총매장
//		$('#deliOrderAmt').text("-"); // 납품일 + 총 주문수량
//		$('#deliTotAmt').text("-"); // 납품일 + 총금액
//	}
//	
//	// 공지사항 설정
//	setDashBoardNotices() {
//		let dashboardNotices = this.presenter.model.getDashBoardNotices();
//		let agent = window.navigator.userAgent.toLowerCase();
//
//		this.doc.getElementsByClassName("home_notice_div")[0].innerHTML = "";
//		for(let i = 0; i < dashboardNotices.length; i++) {
//			let newDiv = document.createElement("div");
//			newDiv.classList.add('home_notice_box');
//			newDiv.id = dashboardNotices[i].seq;
//			
//			let newPTitle = document.createElement("p");
//			newPTitle.classList.add('home_notice_title', 'font_color_dark', 'font_14px','i_font_14px');
//			newPTitle.innerText = dashboardNotices[i].title;
//			let newPDay = document.createElement("p");
//			newPDay.classList.add('home_notice_day', 'font_color_gray', 'font_12px','i_font_12px');
//			newPDay.innerText = dashboardNotices[i].regDt;
//			
//			newDiv.appendChild(newPTitle);
//			newDiv.appendChild(newPDay);
//			
//			
//			newDiv.addEventListener("click", (e)=>{
//				this.postNoticeList(e.currentTarget.id);
//    		});
//
//			this.doc.getElementsByClassName("home_notice_div")[0].appendChild(newDiv);
//		}
//		
//	}
//	
//	 // 전체 공지로 이동
//    postNoticeList(noticeId = "") {
//    	let form = this.doc.createElement("form");
//    	let input = new Array();
//
//    	let parm = new Array();
//        form.action = "/Notice";
//        form.method = "get";
//        
//        parm.push( ['id', noticeId] );
//        for (var i = 0; i < parm.length; i++) {
//            input[i] = document.createElement("input");
//            input[i].setAttribute("type", "hidden");
//            input[i].setAttribute('name', parm[i][0]);
//            input[i].setAttribute("value", parm[i][1]);
//            form.appendChild(input[i]);
//        }
//        
//        this.doc.body.appendChild(form);
//        form.submit();
//    }
//    
//	
//	clearDashBoardNotices() {
//		this.doc.getElementsByClassName("home_notice_div")[0].innerHTML = ""; 
//	}
//	
//}
//
///**
// * 로직만 처리
// */
//class AuthPresenter {
//	constructor(model){
//		this.model = model;
//	}
//	
//    registerView(view){
//    	this.view = view;
//    	this.initViewProcess();
//    }
//    
//    /**
//     * view 등록시 view 기능 초기화
//     */
//    initViewProcess() {
//		// 초기 조회
//    	this.process();
//    	
//    }
//
//    // login process
//    process() {
//    	
//		// clear
//    	this.model.setDashBoardSales(null);
//    	this.view.clearDashBoardSales();
//		this.model.setDashBoardOrders(null);
//		this.view.clearDashBoardOrders();
//		this.model.setDashBoardNotices(null);
//		this.view.clearDashBoardNotices();
//    	
//    	
//		// save checkbox value
//		
//		this.model.process({
//			//param
//		})
//		.then(response => {
//			closeLoadingBar();
//			if(response.status == 200) {
//		    	response.json().then(result => {
//		    		if(result.code == 0) {
//		    			// 성공후 처리
//		    			if(result.dashboardSales) {
//		    				this.model.setDashBoardSales(result.dashboardSales);
//		    				this.view.setDashBoardSales();
//		    			} else {
//		    				this.view.clearDashBoardSales();
//		    			}
//		    				
//		    			if(result.dashboardOrders) {
//		    				this.model.setDashBoardOrders(result.dashboardOrders);
//		    				this.view.setDashBoardOrders();
//		    			} else {
//		    				this.view.clearDashBoardOrders();
//		    			}
//		    			
//		    			if(result.dashboardNotices) {
//		    				this.model.setDashBoardNotices(result.dashboardNotices);
//		    				this.view.setDashBoardNotices();
//		    			} else {
//		    				this.view.clearDashBoardNotices();
//		    			}
//		    			
////		    			
//		    		}
//		    	});
//	    		
//			} else {
//				if(response instanceof Response) {
//					if(response.status == 404) {
//						this.view.showAlert("페이지를 찾을 수 없습니다.");
//					} else {
//						this.view.showAlert("처리중 문제가 발생하였습니다.\n[Response Code : "+response.status+"]")
//					}
//				} else {
//					const result = response.json();
//					result.then(e=>{
//						this.view.showAlert("처리중 문제가 발생하였습니다.\n[Response Code : "+response.status+"("+e.message+")]")
//					});
//				}
//				
//			}
//			closeLoadingBar();
//		});
//	}
//}