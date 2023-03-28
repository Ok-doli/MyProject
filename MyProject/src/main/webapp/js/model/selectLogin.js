
$(document).ready(function() {
	var cookie = new CookieManager();
	var model = new AuthModel(cookie);
	var presenter = new AuthPresenter(model);
	var view = new AuthView(presenter);
	presenter.registerView(view);
});
        




/**
 * 데이터만 처리
 */
class AuthModel {
	
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
class AuthView{
	
    constructor(presenter){
        this.presenter = presenter;
        this.doc = document;
        let device = this.presenter.model.getCookieManager().getDeviceCookie();
        this.native = new NativeViewManager(device);
        this.initEvent();
    }
    
    // event 초기화
    initEvent() {
    	let selectedId = "";
    	
    	const selectLoginBtn = this.doc.getElementsByClassName("select_login_box");
    	
    	for(let i = 0; i < selectLoginBtn.length; i++) {
    		selectLoginBtn[i].addEventListener("click", (e)=>{
    			
    			// 선택된 이펙트 없애기
//    			$.each($('.select_login_box'),function (index,item){
//    				var id = $(item).attr('id');
//    				$(item).find('.svg_default').removeClass(id+'_on');
//    				$(item).removeClass('select_login_box_click');
//    			});

    			selectedId = selectLoginBtn[i].id;
				const svgList = selectLoginBtn[i].querySelectorAll('.svg_default');
				for(let j = 0; j < svgList.length; j++) {
					svgList[j].classList.add(selectedId+'_on');
				}

    			selectLoginBtn[i].classList.add('select_login_box_click');
				//console.log(selectLoginBtn[i].querySelectorAll('.svg_default').classList);

				setTimeout(() => {
					this.auth(selectedId);
				}, 100);

        	});
    	}
    	
    	
    	const btn = this.doc.getElementById("btnAuth");
    	btn.addEventListener("click", ()=>{
    		if(btn.classList.contains("btn_main_back")) {
    			this.auth(selectedId);
    		}
    	});
    }
    
    // 인증
    auth(selectedItem) {
    	this.presenter.auth(selectedItem);
    }
    
    hideBioDiv() {
    	this.doc.getElementById('bio_div').style.display = 'none';
    }
    
    showBioDiv() {
    	this.doc.getElementById('bio_div').style.display = 'block';
    }
    
    // 핀코드 div id
    getAuthPinCodeId() {
    	return "select_num";
    }
   
    // Bio div id
    getAuthBioId() {
    	return "icon_skin";
    }
    
    postPinCode(mode) {
    	
    	let form = this.doc.createElement("form");
    	let input = new Array();

    	let parm = new Array();
        form.action = "/EazyLogin";
        form.method = "get";
        
        parm.push( ['mode', mode] );
        for (var i = 0; i < parm.length; i++) {
            input[i] = document.createElement("input");
            input[i].setAttribute("type", "hidden");
            input[i].setAttribute('name', parm[i][0]);
            input[i].setAttribute("value", parm[i][1]);
            form.appendChild(input[i]);
        }
        
        this.doc.body.appendChild(form);
        form.submit();
    }
    
    getMode() {
    	return this.doc.getElementById("mode").value;
    }
    
}

/**
 * 로직만 처리
 */
class AuthPresenter {
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
    	const mode = this.view.getMode();
    	
    	
    	// 모바일이 아니면 생체인증 숨김
		if(!this.model.getCookieManager().getDeviceCookie()) {
			this.view.hideBioDiv();
			
			// pincode가 있으면 핀코드 확인 화면으로
			if(this.model.getCookieManager().getPinCodeCookie()) {
				if(!mode) {
					this.view.postPinCode('check');
		    	}
			}
		} else { // 모바일이고
			// pincode가 있으면 핀코드 확인 화면으로
			if(this.model.getCookieManager().getAuthPinTypeCookie() == "on"
				&& this.model.getCookieManager().getPinCodeCookie()) {
				if(!mode) {
					this.view.postPinCode('check');
		    	}
				
			}
		}
		
    }
    
    hideBioDiv() {
    	this.view.hideBioDiv();
    }
    
    showeBioDiv() {
    	this.view.showBioDiv();
    }
    
    // 인증 처리
    auth(selectedItem) {
    	let deviceInfo = this.model.getCookieManager().getDeviceCookie();
    	if(selectedItem == this.view.getAuthPinCodeId()) {
    		this.view.postPinCode('add');
    	} else if(selectedItem == this.view.getAuthBioId()) {
    		if(deviceInfo == "android") {
    			Android.checkBioAuth();
    		} else if(deviceInfo == "ios") {
    			window.webkit.messageHandlers.authRegist.postMessage('');
    		} else {
    			alert("디바이스 정보를 가져올 수 없습니다.");
    		}
    	} else {
    		this.view.postPinCode('add');
    	}
    		
    }

}