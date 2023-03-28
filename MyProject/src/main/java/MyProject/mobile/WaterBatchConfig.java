package MyProject.mobile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import MyProject.LogUtil;
import MyProject.mobile.service.MobileService;


@Component
@Configuration
@EnableScheduling
public class WaterBatchConfig extends LogUtil{
	final static Logger LOGGER = LoggerFactory.getLogger(WaterBatchConfig.class);
	WaterBatchConfig() {
		super(LOGGER);
	}
	
	@Autowired
	private MobileService mobileService;
	/**
	   * 매일 17시 알림톡
	   * @throws Exception
	   */
	@Scheduled(cron = "55 59 16 * * *")
	  public void WaterRequest_Auto_talk() throws Exception { 
			HttpStatus status = HttpStatus.OK;
			try {
				mobileService.WaterRequest_Auto_talk();
			} catch (Exception e) {
				status = HttpStatus.EXPECTATION_FAILED;
				e.printStackTrace();
			}
			
	  }

	/**
	   * 매일 17시 자동 확정, 반려 처리	  -- > 웹에서 송장 입력으로 바꿈
	   * @throws Exception
	   */
	@Scheduled(cron = "0 0 17 * * *")
	  public void WaterRequest_Auto_Process() throws Exception { 
			HttpStatus status = HttpStatus.OK;
			try {
				mobileService.WaterRequest_Auto_Process();
			} catch (Exception e) {
				status = HttpStatus.EXPECTATION_FAILED;
				e.printStackTrace();
			}
			
	  }
	
	
	
	/**
	 * 매일 23시 59분 59초에 3일이 지난 배송완료, 취소건 비노출 처리
	 * @throws Exception
	 */
//	@Scheduled(cron = "59 59 23 * * *")
//	public void WaterManagement_Auto_Process() throws Exception { 
//		HttpStatus status = HttpStatus.OK;
//		try {
//			mobileService.WaterManagement_Auto_Process();
//			
//		} catch (Exception e) {
//			status = HttpStatus.EXPECTATION_FAILED;
//			e.printStackTrace();
//		}
//		
//	}
	
	/**
	 * 매일 08시 도착 예정일 하루 지난 미배송 건 독촉 알림
	 * @throws Exception
	 */
	@Scheduled(cron = "0 0 08 * * *")
	public void talk_Remittance() throws Exception { 
		HttpStatus status = HttpStatus.OK;
		try {
			mobileService.talk_Remittance();
			
		} catch (Exception e) {
			status = HttpStatus.EXPECTATION_FAILED;
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 매일 07시 이전 배송완료 건 07시에 일괄 알림톡 발송
	 * @throws Exception
	 */
	@Scheduled(cron = "0 0 07 * * *")
	public void talk_All_Dlvy_Success() throws Exception { 
		HttpStatus status = HttpStatus.OK;
		try {
			mobileService.talk_All_Dlvy_Success();
			
		} catch (Exception e) {
			status = HttpStatus.EXPECTATION_FAILED;
			e.printStackTrace();
		}
		
	}
	/**
	 * 매일 00시 도착예정일 2일 지난 건 일괄 배송완료 처리
	 * 기획서 1.0.5 기능 X
	 * @throws Exception
	 */
//	@Scheduled(cron = "0 0 0 * * *")
//	public void Auto_Dlvy_Complete() throws Exception { 
//		HttpStatus status = HttpStatus.OK;
//		try {
//			mobileService.Auto_Dlvy_Complete();
//			
//		} catch (Exception e) {
//			status = HttpStatus.EXPECTATION_FAILED;
//			e.printStackTrace();
//		}
//		
//	}
	
	/**
	 * 매일 19시 도착예정일 알림톡 발송
	 * @throws Exception
	 */
//	@Scheduled(cron = "0 0 19 * * *")
	public void Dlvy_Schedule_Talk() throws Exception { 
		HttpStatus status = HttpStatus.OK;
		try {
			mobileService.Dlvy_Schedule_Talk();
			
		} catch (Exception e) {
			status = HttpStatus.EXPECTATION_FAILED;
			e.printStackTrace();
		}
		
	}
	
}
