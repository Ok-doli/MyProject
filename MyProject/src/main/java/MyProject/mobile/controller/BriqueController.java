package MyProject.mobile.controller;

import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.RandomStringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import MyProject.LogUtil;
import MyProject.RequestUtil;
import MyProject.mobile.AuthVO;
import MyProject.mobile.service.MobileService;

/**
 * @FileName : MyProject.mobile.controller |_ MobileController.java
 * 
 * @Project : MyProject
 * @Date : 2021. 3. 26.
 * @작성자 : cfeelg
 * @변경이력 :
 * @프로그램 설명 :
 */
@Controller
public class BriqueController extends LogUtil {

	final static Logger LOGGER = LoggerFactory.getLogger(BriqueController.class);

	BriqueController() {
		super(LOGGER);
	}

	//@Autowired
	//private MobileService mobileService;

	@RequestMapping(value = "/BriqueHome.do")
	public String postBriqueHome(HttpServletRequest request, ModelMap model) throws Exception {
		return "brique/BriqueHome";
	}
	@RequestMapping(value = "/test1.do")
	public String postTest1(HttpServletRequest request, ModelMap model) throws Exception {
		return "brique/test1";
	}
	@RequestMapping(value = "/test2.do")
	public String postTest2(HttpServletRequest request, ModelMap model) throws Exception {
		return "brique/test2";
	}
	@RequestMapping(value = "/test3.do")
	public String postTest3(HttpServletRequest request, ModelMap model) throws Exception {
		return "brique/test3";
	}
	@RequestMapping(value = "/test4.do")
	public String postTest4(HttpServletRequest request, ModelMap model) throws Exception {
		return "brique/test4";
	}
	@RequestMapping(value = "/test5.do")
	public String postTest5(HttpServletRequest request, ModelMap model) throws Exception {
		return "brique/test5";
	}
	@RequestMapping(value = "/test6.do")
	public String postTest6(HttpServletRequest request, ModelMap model) throws Exception {
		return "brique/test6S";
	}

	

}