
$(document).ready(function() {
	var cookie = new CookieManager();
	var model = new SettingModel(cookie);
	var presenter = new SettingPresenter(model);
	var view = new SettingView(presenter);
	presenter.registerView(view);
});
        


/**
 * 데이터만 처리
 */
class SettingModel {
	
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
	
	setChkBioType(flag) {
		this.cookie.setAuthBioTypeCookie(flag ? "on":"off");
	}
	
	setChkPinType(flag) {
		this.cookie.setAuthPinTypeCookie(flag ? "on":"off");
	}
}

/**
 * view 만 처리
 */
class SettingView{
    constructor(presenter){
        this.presenter = presenter;
        this.doc = document;
        let device = this.presenter.model.getCookieManager().getDeviceCookie();
        this.native = new NativeViewManager(device);
        this.initEvent();
        
        this.setAuthAlert();
        this.setNoDeviceAlert();
    }
    
    // event 초기화
    initEvent() {
    	const bioType = this.doc.getElementById("chkBioType");
    	bioType.addEventListener("click", (e)=>{
    		if(!this.presenter.checkAuthValidate()){
    			bioType.checked = true;
    			this.modal_alert_open();
    			return;
    		}
    		
    		const cookie = new CookieManager();
    		if(bioType.checked) {
    			if( cookie.getDeviceCookie() == 'ios'){
    				window.webkit.messageHandlers.authRegist.postMessage('');
    			} else if (cookie.getDeviceCookie() == 'android'){
    				Android.checkBioAuth();
    			}
    		} else {
    			// 체크박스 푼후 바로 끄면 동기화 안되서 추가로직
    			if (cookie.getDeviceCookie() == 'android'){
    				Android.disableBioAuth();
    			}
    		}
    		this.presenter.setChkBioType(bioType.checked);
    	});
    	
    	const pinType = this.doc.getElementById("chkPinType");
    	pinType.addEventListener("click", (e)=>{
    		if(!this.presenter.checkAuthValidate()){
    			pinType.checked = true;
    			this.modal_alert_open();
    			return;
    		}

    		this.presenter.setChkPinType(pinType.checked)
    		if(pinType.checked) {
    			this.postSelectLogin('addSetting');
    		} else {
    			this.presenter.model.getCookieManager().removePinCodeCookie();
    		}
    	});
    	
    	const btnSetting = this.doc.getElementById("btnSetting");
    	btnSetting.addEventListener("click", (e)=>{
    		this.postSelectLogin('setting');
    	});
    	
    	const btnBack = this.doc.getElementById("btnBack");
    	btnBack.addEventListener("click", (e)=>{
    		const reffer = this.doc.getElementById("reffer").value
//    		console.log(document.referrer);
//    		return;
//    		console.log(document.referrer.indexOf("?"));
//    		if(document.referrer.indexOf("?") == -1) {
//    			window.location = document.referrer + '?menu=Y';
//    		} else {
    			window.location = reffer + '?menu=Y';;
//			}
    	});
    }
    
    // 간편번호 재설정
    postSelectLogin(type) {
    	
    	
    	if(!this.getChkPinType()) {
    		showMsg("간편번호 설정이 필요합니다.");
    		return;
    	}
    	
    	let form = document.createElement("form");
    	let input = new Array();

    	let parm = new Array();
        form.action = "/EazyLogin";
        form.method = "get";
        
        const reffer = this.doc.getElementById("reffer").value;
        
        parm.push( ['mode', type] );
        parm.push( ['reffer', reffer] );
        for (var i = 0; i < parm.length; i++) {
            input[i] = document.createElement("input");
            input[i].setAttribute("type", "hidden");
            input[i].setAttribute('name', parm[i][0]);
            input[i].setAttribute("value", parm[i][1]);
            form.appendChild(input[i]);
        }
        
        document.body.appendChild(form);
        form.submit();
    	
    }
    
    setAuthAlert() {
    	setAlert({
            className : 'fade_modal_alert',
            title : '인증 설정 알림',
            accentMent : '',
            ment : '생체인증/간편번호 중</br> 하나이상은 ON상태여야 합니다.',
            okbtn : {
                active : () => this.modal_alert_close(),
                text : '확인'
            },
            confirm : false
        });
    }
    
    setNoDeviceAlert() {
    	setAlert({
            className : 'fade_device_alert',
            title : '미지원 기기 알림',
            accentMent : '',
            ment : '생체인증 기능을</br> 제공하지 않는 디바이스입니다.',
            okbtn : {
                active : () => this.device_alert_close(),
                text : '확인'
            },
            confirm : false
        });
    }
    
    device_alert_open(){
        $(".fade_device_alert").fadeIn();
    }
    device_alert_close(){
        $(".fade_device_alert").fadeOut();
    }
    
    modal_alert_open(){
        $(".fade_modal_alert").fadeIn();
    }
    modal_alert_close(){
        $(".fade_modal_alert").fadeOut();
    }

    setBioTypeChecked(flag) {
    	this.doc.getElementById("chkBioType").checked = flag; 
    }
    
    setPinTypeChecked(flag) {
    	this.doc.getElementById("chkPinType").checked = flag; 
    }
    
    initAuthView(bioTypeOn, pinTypeOn) {
    	this.doc.getElementById("chkBioType").checked = bioTypeOn == "on" ? true : false;
    	this.doc.getElementById("chkPinType").checked = pinTypeOn == "on" ? true : false;
    }
    
    getChkBioType() {
    	return this.doc.getElementById("chkBioType").checked;
    }
    
    getChkPinType() {
    	return this.doc.getElementById("chkPinType").checked;
    }
    
    alertNoDevice() {
    	this.device_alert_open();
    }
    
}

/**
 * 로직만 처리
 */
class SettingPresenter {
	constructor(model){
      this.model = model;
	}
	
    registerView(view){
    	this.view = view;
    	this.initViewProcess();
    }

    checkAuthValidate() {
    	const isBioOn = this.view.getChkBioType();
    	const isPinOn = this.view.getChkPinType();
    	
    	console.log("isBioOn : " + isBioOn);
    	console.log("isPinOn : " + isPinOn);
    	if(isBioOn || isPinOn) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    /**
     * view 등록시 view 기능 초기화
     */
    initViewProcess() {
    	setBottomNavi('');
    	addNaviBlank('div_main');
		f_setUpIcon('div_main','div_main','div_main');

    	const bioTypeOn = this.model.getCookieManager().getAuthBioTypeCookie();
    	const pinTypeOn = this.model.getCookieManager().getAuthPinTypeCookie();
    	
    	
    	console.log(bioTypeOn);
    	console.log(pinTypeOn);
    	this.view.initAuthView(bioTypeOn, pinTypeOn);
    }

    setChkBioType(flag) {
    	if(!this.model.getCookieManager().getDeviceCookie()
			&& flag) {
    		this.view.setBioTypeChecked(false);
    		this.view.alertNoDevice();
    		return;
    	}
    	
    	this.model.setChkBioType(flag);
    }
    
    setChkPinType(flag) {
    	this.model.setChkPinType(flag);
    }
}