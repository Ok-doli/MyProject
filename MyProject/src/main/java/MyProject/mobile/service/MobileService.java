package MyProject.mobile.service;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import MyProject.CommonUtil;
import MyProject.RequestUtil;
import MyProject.mobile.mapper.MobileMapper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


/**
  * @FileName : MyProject.mobile.service
                  |_ MobileService.java
  * 
  * @Project : MyProject
  * @Date : 2021. 3. 26. 
  * @작성자 : cfeelg
  * @변경이력 :
  * @프로그램 설명 :
  */
@Service
public class MobileService {
	protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
    private MobileMapper mobileMapper;

	
	

	//공지사항
	public List<?> notice_Select(HashMap<String, Object> param) throws Exception {
		
//		List<?> noiceList = mobileMapper.notice_Select(param);
		
		return mobileMapper.notice_Select(param);
	}
	

	//	로그인 가맹점명 조회 
	public List<?> EntrpsNm_Select(HashMap<String, Object> param) throws Exception {
		return mobileMapper.EntrpsNm_Select(param);
	}
	
}