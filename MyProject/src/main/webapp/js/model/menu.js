


$(document).ready(function() {
//	setMenuModal();
	var cookie = new CookieManager();
	var model = new MenuModel(cookie);
	var presenter = new MenuPresenter(model);
	var view = new MenuView(presenter);
	presenter.registerView(view);


});

        

/**
 * 데이터만 처리
 */
class MenuModel {
	
	constructor(cookie){
        this.cookie = cookie;
    }
	
	getCookieManager() {
		return this.cookie;
	}
	
}

/**
 * view 만 처리
 */
class MenuView{
    constructor(presenter){
        this.presenter = presenter;
        this.doc = document;
        this.initEvent();
        
        // 디바이스 정보를 가져와서 각 native 모듈 구분하여 이용
//        let device = this.presenter.model.getCookieManager().getDeviceCookie();
//        this.native = new NativeViewManager(device);
    }
    
    // event 초기화
    initEvent() {
	
	    // 로그아웃
    	this.doc.getElementById("btnLogout").addEventListener("click", (e)=>{
    		this.presenter.logout();
    	});
    	
    	
    }
    
    setUserName(name) {
    	this.doc.getElementById("userName").innerHTML = name+"";
    }
    
    showMsg(msg){
//    	this.native.showMsg(msg);
    	showMsg(msg);
    }
}

/**
 * 로직만 처리
 */
class MenuPresenter {
	constructor(model){
      this.model = model;
	}
	
    registerView(view){
    	this.view = view;
//    	this.initViewProcess();
    }
    
    
    logout() {
	
		var target = this.model;
		
		setAlert({
	     className : 'loginOut_comfirm_alert',
	     ment : '라스트 마일에서 로그아웃합니다.<br>진행 하시겠습니까?',
	     okbtn : {
	         active : () =>  $(".loginOut_comfirm_alert").fadeOut(function(){
	        	 showMsg("로그아웃 됩니다.");
				 target.getCookieManager().clearLoginCookie();
				  setTimeout(function () {
					document.location.replace("/");
			    }, 1000)
			    
				 if(mobile == "android_app"){
					 Android.popupChk("close");
					  Android.simpleAuthReset()
				}else if(mobile == "ios_app"){
					window.webkit.messageHandlers.logout.postMessage('ok');
				}
       	  }),
	         text : '확인'
	     },
	     cancelbtn : {
	         active : () => '',
	         text : '취소'
	     },
	     confirm : true
		});
	
	
		$(".loginOut_comfirm_alert").fadeIn(); 

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
}