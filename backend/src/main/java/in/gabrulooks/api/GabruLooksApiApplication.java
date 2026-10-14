package in.gabrulooks.api;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GabruLooksApiApplication {
  public static void main(String[] args) {
    SpringApplication.run(GabruLooksApiApplication.class, args);
  }

  @Bean
  MongoClient mongoClient(@Value("${app.mongodb-uri}") String uri) {
    return MongoClients.create(uri);
  }

  @Bean
  MongoDatabase mongoDatabase(
      MongoClient client,
      @Value("${app.mongodb-database}") String databaseName) {
    return client.getDatabase(databaseName);
  }
}