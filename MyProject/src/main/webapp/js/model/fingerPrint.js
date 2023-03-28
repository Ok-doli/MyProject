
$(document).ready(function() {
	var cookie = new CookieManager();
	var model = new FingerPrintModel(cookie);
	var presenter = new FingerPrintPresenter(model);
	var view = new FingerPrintView(presenter);
	presenter.registerView(view);
});
        

/**
 * 데이터만 처리
 */
class FingerPrintModel {
	
	constructor(cookie){
        this.cookie = cookie;
    }
	
	process(data) {
		return fetch("/api/login", {
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
	
}

/**
 * view 만 처리
 */
class FingerPrintView{
    constructor(presenter){
        this.presenter = presenter;
        this.doc = document;
        this.initEvent();
        
    }
    
    // event 초기화
    initEvent() {
    	$(".fingeroffImg").hide();
		$(".fingeronImg").css('display','block');
		$('.btn_add').addClass('btn_main_back');
		this.doc.getElementById("btnAuth").addEventListener("click", ()=>{this.bioAuth()}, false);
    }
    
    modal_confirm_open(){
		$(".fade_modal_alert_confirm").fadeIn();
	};
	modal_confirm_close(){
		$(".fade_modal_alert_confirm").fadeOut();
	};
	modal_alert_open(){
		$(".fade_modal_alert").fadeIn();
	};
	modal_alert_close(){
		$(".fade_modal_alert").fadeOut();
	};
    
	bioAuth(){
    	this.presenter.checkBioAuth();
	}
   
}

/**
 * 로직만 처리
 */
class FingerPrintPresenter {
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
    	// 공통기능
//    	checkOnLoad();
    	
    	this.checkBioAuth();
    }

    // login process
    process() {
		// check validation 
		
		// save checkbox value
		
		this.model.process({
			//param
		})
		.then(response => {
			if(response.status == 200) {
		    	response.json().then(result => {
		    		if(result.code == 0) {
		    			// 성공후 처리
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
    
    postLoginInfo() {
    	return fetch("/api/updateLoginCount", {
	        method: 'POST', // *GET, POST, PUT, DELETE, etc.
	        mode: 'cors', // no-cors, cors, *same-origin
	        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	        credentials: 'same-origin', // include, *same-origin, omit
	        headers: {
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        },
	        redirect: 'follow', // manual, *follow, error
	        referrer: 'no-referrer'
	    });
    }
    
    checkBioAuth() {
    	this.postLoginInfo().then(response => {
    		response.json().then(result => {
    			this.model.getCookieManager().setAuthDataCookie(result.authData);
    			
    			let deviceInfo = this.model.getCookieManager().getDeviceCookie();
    			if(deviceInfo == "android") {
    				Android.checkBioAuth();
    			} else if(deviceInfo == "ios") {
    				window.webkit.messageHandlers.authCheck.postMessage('');
    			} else {
    				alert("잘못된 접근입니다.");
    			}
    		});
    	});
    	
	    	
    }
}