
$(document).ready(function() {
	console.log("login called");
	var cookie = new CookieManager();
	var model = new LoginModel(cookie);
	var presenter = new LoginPresenter(model);
	var view = new LoginView(presenter);
	presenter.registerView(view);
	LoadNaviIcon();
	
	
	   // alert 설정
    setAlert({
        className : 'fade_modal_alert',
        title : 'Face ID 인증',
        accentMent : '식품 OMS',
        ment : '앱이 FACE ID인식을<br>사용하도록 허용 하시겠습니까?',
        okbtn : {
            active : () => ok_test(),
            text : '허용'
        },
        cancelbtn : {
            active : () => cancel_test(),
            text : '허용 안함'
        },
        confirm : true
    });

    $(".faceoffImg").click(function(e){
        $(this).hide();
        $(".faceonImg").css('display','block');
        $('.btn_add').addClass('btn_main_back');
    });

    $(".faceonImg").click(function(e){
        $(this).hide();
        $(".faceoffImg").css('display','block');
        $('.btn_add').removeClass('btn_main_back');
    });
});
        

/**
 * 데이터만 처리
 */
class LoginModel {
	
	constructor(cookie){
        this.cookie = cookie;
    }
	
	login(data) {
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
class LoginView{
    constructor(presenter){
        this.presenter = presenter;
        this.doc = document;
        this.initEvent();
    }
    
    // event 초기화
    initEvent() {
    	const btnLogin = this.doc.getElementById("btnLogin");
    	const tokenErr = this.doc.getElementById("tokenErr").value;
    	if(tokenErr == "Y") {
    		showMsg("토큰에 문제가 발생하였습니다. 재로그인이 필요합니다.");
    	}
    	
    	btnLogin.addEventListener("click", ()=>{this.login()}, false);
    	
    	const inputPw = this.doc.getElementById("login_main_pw");
    	inputPw.addEventListener("keyup", (key)=>{
    		if($('#login_main_id').val() != '' && $('#login_main_pw').val() != ''){
				$('.btn_main').addClass('btn_main_back');
			}
    		
    		if(key.keyCode == 13) {
    			this.login();
    		}
		}, false);
    	
    	
    	$('#login_main_id,#login_main_pw').keyup(function(key){
			if($('#login_main_id').val() != '' && $('#login_main_pw').val() != ''){
				$('.btn_main').addClass('btn_main_back');
			}else{
				$('.btn_main').removeClass('btn_main_back');
			}
			
			
		});

		$('input[type=search]').on('search', function () {
			$('.btn_main').removeClass('btn_main_back');
		});
		
		// common 함수
		if(setAlert) {
			setAlert({
	            className : 'login_modal_alert',
	            title : '[ID/PW]',
	            titleCheckImgYn : 'Y',
	            accentMent : '',
	            ment : 'ID / PW를 확인하세요.',
	            okbtn : {
	                active : () => $(".login_modal_alert").fadeOut(),
	                text : '확인'
	            },
	            confirm : false
	        });
		}
		
    }
    

    // login btn event
    login() {
    	this.presenter.login()
    	
    }
    
    // show valid modal dialog
    showValidModal() {
    	$(".login_modal").fadeIn();
    }
    
    // close valid modal dialog
    closeValidModal() {
    	$(".login_modal").fadeOut();
    }
    
    setSaveIdValue(val) {
    	this.doc.getElementById('saveId').checked = val;
    }
    
    setSaveLoginValue(val) {
    	this.doc.getElementById('saveLogin').checked = val;
    }
    
    setIdValue(val) {
    	this.doc.getElementById("login_main_id").value = val;
    }
    
    getIdValue() {
    	return this.doc.getElementById("login_main_id").value;
    }
    
    getPwValue() {
    	return this.doc.getElementById("login_main_pw").value;
    }
    
    getSaveIdValue() {
    	return this.doc.getElementById('saveId').checked;
    }
    
    getsaveLoginValue() {
    	return this.doc.getElementById('saveLogin').checked;
    }
    
    
    showAlert() {
    	$(".login_modal_alert").fadeIn();
    }
    
    // 권한체크 화면 이동
    postAuthCheck(bioType, pinType) {
    	if(bioType === "on") {
    		document.location.replace("/FingerPrint");
    	} else if(pinType === "on") {
    		document.location.replace("/EazyLogin?mode=check");
    	} else {
    		document.location.replace("/SelectLogin");
    	}
    }
    
    // mobile display none
    hideSaveLoginDiv() {
    	this.doc.getElementById('saveLoginDiv').style.display = 'none';
    }
   
}

/**
 * 로직만 처리
 */
class LoginPresenter {
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
    	
    	if(this.model.getCookieManager().getDeviceCookie() && this.model.getCookieManager().getUserIdCookie()) {
    		
    	}
    	
    	if(this.model.getCookieManager().getSaveIdCookie()) {
    		this.view.setIdValue(this.model.getCookieManager().getUserIdCookie());
    	}
    	
    	// 화면에 ID저장 표시
		this.view.setSaveIdValue(this.model.getCookieManager().getSaveIdCookie());
		
		// 화면에 로그인 유지 표시
		this.view.setSaveLoginValue(this.model.getCookieManager().getSaveLoginCookie());
		
		
		
		
		// 계정정보가 있으면 인증화면으로 
		if(this.model.getCookieManager().getSaveLoginCookie()
			&& this.model.getCookieManager().getSaveIdCookie()) {
			this.view.postAuthCheck(this.model.getCookieManager().getAuthBioTypeCookie(),this.model.getCookieManager().getAuthPinTypeCookie());
    	}
		
		// 단말이면 로그인 유지 안보이기
		if(this.model.getCookieManager().getDeviceCookie()) {
			//
//			this.model.getCookieManager().setSaveLoginCookie(true);
			this.view.hideSaveLoginDiv();
		}
		
		
    }

    // login process
	login() {
		// check validation 
		if(!this.view.getIdValue()
			|| !this.view.getPwValue()) {
			this.view.showValidModal();
			
			return;
		}
		
		// save checkbox value
		this.model.getCookieManager().setCheckBoxCookie(this.view.getSaveIdValue(),this.view.getIdValue());
		
		
		this.model.login({
			loginId : this.view.getIdValue()
			,loginPw : this.view.getPwValue()
		})
		.then(response => {
			if(response.status == 200) {
		    	response.json().then(result => {
		    		if(result.code == 0) {
		    			
		    			
		    			if(result.loginData
	    					&& result.authData
		    				&& result.loginData.length > 0
		    				&& result.authData.length > 0) {
		    				// 성공후 화면이동
			    			this.model.getCookieManager().setLoginCookie(result.loginData,result.authData,this.view.getIdValue(),this.view.getSaveIdValue(),this.view.getsaveLoginValue());
			    			$.cookie('token', result.token, {expires: 30});
			    			this.view.postAuthCheck(this.model.getCookieManager().getAuthBioTypeCookie(),this.model.getCookieManager().getAuthPinTypeCookie());
		    			} else {
		    				if(result.loginData.length > 0 && result.authData.length == 0) {
		    					showMsg("권한정보를 가져올 수 없습니다.");
		    				} else {
		    					this.view.showAlert("계정정보를 찾을 수 없습니다.");
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