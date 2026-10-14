package in.gabrulooks.api;

import com.mongodb.client.MongoDatabase;
import java.util.Map;
import org.bson.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
  private final MongoDatabase database;

  public HealthController(MongoDatabase database) {
    this.database = database;
  }

  @GetMapping("/api/health")
  public Map<String, String> health() {
    database.runCommand(new Document("ping", 1));
    return Map.of("status", "ok", "database", "reachable");
  }
}