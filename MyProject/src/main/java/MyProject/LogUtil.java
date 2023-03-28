package MyProject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

public class LogUtil {
	
	public Logger LOGGER = LoggerFactory.getLogger(LogUtil.class);
	
	@Value("${log.isPrintLog}")
	public boolean isPrintLog;
	
	
	public LogUtil(Logger childLogger) {
		if(childLogger != null) {
			LOGGER = childLogger;
		}
	}

	public void printlog(String txt) {
		if(isPrintLog) {
			LOGGER.info(txt);
		}
	}
	
	public void printlog(Object obj) {
		if(isPrintLog) {
			System.out.println(obj);
		}
	}
	
}