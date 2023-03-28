package MyProject.mobile.mapper;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import MyProject.uSqlSession;

/**
  * @FileName : MyProject.mobile.mapper
                  |_ MobileMapper.java
  * 
  * @Project : MyProject
  * @Date : 2021. 3. 26. 
  * @작성자 : cfeelg
  * @변경이력 :
  * @프로그램 설명 :
  */
@Component
public class MobileMapper {
	@Autowired
	private uSqlSession mobile;
	
	
	//공지사항
	public List<?> notice_Select(HashMap<String, Object> param) throws Exception {
		return mobile.selectList("Notice.Select",param);
	}

	
//	로그인 가맹점명 조회 
	public List<?> EntrpsNm_Select(HashMap<String, Object> param) throws Exception {
		return mobile.selectList("WaterHome.EntrpsNm_Select",param);
	}
	
		
}
