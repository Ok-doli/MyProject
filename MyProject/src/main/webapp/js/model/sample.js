
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