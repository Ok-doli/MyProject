package MyProject;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class DataSourceConfig {
	
	  @Bean
	    @ConfigurationProperties(prefix = "spring.datasource-org.hikari")
	    public DataSource dataSourceOrg() {
	        return DataSourceBuilder.create().type(HikariDataSource.class).build();
	    }

	    @Bean
	    @ConfigurationProperties(prefix = "spring.datasource-talk.hikari")
	    public DataSource dataSourceTalk() {
	        return DataSourceBuilder.create().type(HikariDataSource.class).build();
	    }


}
