package MyProject;

import java.util.Map;

import javax.sql.DataSource;

import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.wrapper.MapWrapper;
import org.apache.ibatis.reflection.wrapper.ObjectWrapper;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;

import com.google.common.base.CaseFormat;

@SpringBootApplication(exclude = {SessionAutoConfiguration.class})
@MapperScan(value = {"MyProject"})
public class MyProjectApplication extends SpringBootServletInitializer {
	
	public static final String APPLICATION_LOCATIONS = "spring.config.location="+ "classpath:application.yml"; // REAL + ",/nginx/application.yml";
	 
	@Autowired
	@Qualifier(value = "dataSourceOrg")
	private DataSource dataSourceOrg;

	@Autowired
	@Qualifier(value = "dataSourceTalk")
	private DataSource dataSourceTalk;

	
    public static String projectVersion;
	public static String getProjectVersion() {
		return projectVersion;
	}
    @Value("${userve.project-version}")
	public void setProjectVersion(String projectVersion) {
    	MyProjectApplication.projectVersion = projectVersion;
	}
	

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(MyProjectApplication.class);
	}
	   
	public static void main(String[] args) {
		 new SpringApplicationBuilder(MyProjectApplication.class)
         .properties(APPLICATION_LOCATIONS)
         .run(args);
	}

    @Bean
    public ApplicationListener<ContextRefreshedEvent> startupLoggingListener() {
        return new ApplicationListener<ContextRefreshedEvent>() {   
            public void onApplicationEvent(ContextRefreshedEvent event) {
				System.out.println("\n\n　Project : MyProject");
				System.out.println("　Version : "+projectVersion);
				System.out.println("　Copyright 2022. Userve. All rights Reserved.\n\n");
				
            }
        };
    }
	@Bean
	@Primary
    public SqlSessionFactory OrgSqlSessionFactory() throws Exception{
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setObjectWrapperFactory(new MapWrapperFactory());
        sessionFactory.setDataSource(dataSourceOrg);
        Resource myBatisConfig = new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml");
        sessionFactory.setConfigLocation(myBatisConfig);
        Resource[] res = new PathMatchingResourcePatternResolver().getResources("classpath:mappers/*/**/*SQL.xml");
        sessionFactory.setMapperLocations(res);
         
        return sessionFactory.getObject();
    }
	@Bean
	public SqlSessionFactory TalkSqlSessionFactory() throws Exception{
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setObjectWrapperFactory(new MapWrapperFactory());
		sessionFactory.setDataSource(dataSourceTalk);
		Resource myBatisConfig = new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml");
		sessionFactory.setConfigLocation(myBatisConfig);
		Resource[] res = new PathMatchingResourcePatternResolver().getResources("classpath:mappers/*/**/*SQL.xml");
		sessionFactory.setMapperLocations(res);
		
		return sessionFactory.getObject();
	}

	
	@Bean
	@Primary
	public SqlSession OrgSqlSession() throws Exception {
		return new SqlSessionTemplate(OrgSqlSessionFactory());
	}
	@Bean
	public SqlSession TalkSqlSession() throws Exception {
		return new SqlSessionTemplate(TalkSqlSessionFactory());
	}
	
	
	@Bean
	@Primary
	public PlatformTransactionManager OrgTransactionManager() {
		return new DataSourceTransactionManager(dataSourceOrg);
	}
	@Bean
	public PlatformTransactionManager TalkTransactionManager() {
		return new DataSourceTransactionManager(dataSourceTalk);
	}
	
	
//	@Bean
//	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) throws Exception {
//		final SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory);
//		return sqlSessionTemplate;
//	}

	@Bean
	public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
		return new ResourceUrlEncodingFilter();
	}
	
	public class MapWrapperFactory implements ObjectWrapperFactory {
	  @Override    
	  public boolean hasWrapperFor(Object object) {
		return object != null && object instanceof Map;    }
	   
	   @Override
	   public ObjectWrapper getWrapperFor(MetaObject metaObject, Object object) {
	   	return new CustomWrapper(metaObject,(Map)object);
	   }    
	   
		
		public class CustomWrapper extends MapWrapper{
			public CustomWrapper(MetaObject metaObject, Map<String, Object> map) {
				super(metaObject, map);
			}
			
			@Override
			public String findProperty(String name, boolean useCamelCaseMapping) {
				if(useCamelCaseMapping){
		            //CaseFormat is the referenced guava library, which has the conversion of the hump, so that you don't have to recreate the wheel yourself, add pom
		            /**
		             **         <dependency>
		                           <groupId>com.google.guava</groupId>
		                           <artifactId>guava</artifactId>
		                           <version>24.1-jre</version>
		                         </dependency>
		             **/
					return CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL,name);
				}
				return name;
			}
		}
	}
	
}
