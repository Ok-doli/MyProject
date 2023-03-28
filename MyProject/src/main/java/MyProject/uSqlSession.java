package MyProject;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


@Component
public class uSqlSession extends SqlSessionTemplate {
	protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	public uSqlSession(SqlSessionFactory sqlSessionFactory) {
		super(sqlSessionFactory);
		// TODO Auto-generated constructor stub
	}

    @Override 
    public int insert(String statement, Object parameter) {
    	//인서트시에 공통으로 넣을 값들을 parameter에 추가함
    	return super.insert(statement, parameter);
    }

    @Override
    public int update(String statement, Object parameter) {
      // 업데이트시에 공통으로 넣을 값들을 parameter에 추가함
      return super.update(statement, parameter);
    }
	  
    @Override
	public List<?> selectList(String statement, Object parameter) {
		HashMap<String, Object> param = (HashMap<String, Object>) parameter;
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
			.getRequest();
        List<?> result = super.selectList(statement, param);
        try {
        	if (param.containsKey("O_LIST")) {
        		return (List<?>) param.get("O_LIST");
        	} else {
        		return result;
        	}
        } catch (Exception e) {
        	return result;
        }
    }
  
	@Override
	public HashMap<String, Object>  selectOne(String statement, Object parameter) {
		HashMap<String, Object> param = (HashMap<String, Object>) parameter;
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
	    super.selectOne(statement, parameter);
	    LOGGER.info("result Param >> " + param);
	    // O_RESULT 유무 판단하고, 성공여부값이 0일떄 롤백처리
	    if(param.containsKey("O_RESULT")) {
	    	System.out.println("param O_RESULT >> " + param.get("O_RESULT") );
			System.out.println("param O_MSG >> " + param.get("O_MSG") );
	    	if(param.get("O_RESULT").toString().equals("0")) {
	    		TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
	    	}
	    } else {	
	    	// O_RESULT가 선언되어 있지 않을경우 강제생성
	    	// 20201111 chabh 수정
	    	param.put("O_RESULT","0");
	    	param.put("O_MSG","패키지에 O_RESULT가 선언되지 않았습니다.");
	    }
		return (HashMap<String, Object>) param;
	}
	
	public List<?> selectListNomal(String statement, Object parameter) {
    	return super.selectList(statement, parameter); 
    }
    

	public HashMap<String, Object> selectOneNomal(String statement, Object parameter) {
    	return super.selectOne(statement, parameter); 
    }
    
    
    
}
