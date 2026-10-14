package in.gabrulooks.api;

import com.mongodb.MongoWriteException;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(MongoWriteException.class)
  ResponseEntity<Map<String, String>> handleMongoWrite(MongoWriteException exception) {
    if (exception.getError().getCode() == 11000) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body(Map.of("error", "A product with this slug already exists."));
    }
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of("error", "The catalog could not be saved."));
  }
}