package MyProject.mobile.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {
	@Override
	public String getErrorPath() {
		return null;
	}

	@RequestMapping(value = "/error")
	public String handleError(HttpServletRequest request) {
		// http의 에러 상태 코드 받아오기
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
		// 만약 에러 코드가 있다면
		if (status != null) {
			return "errors/error";
		}
		return "errors/error";

	}
	
}