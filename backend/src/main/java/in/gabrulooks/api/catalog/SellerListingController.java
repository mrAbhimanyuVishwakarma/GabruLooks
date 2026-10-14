package in.gabrulooks.api.catalog;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SellerListingController {
  private final ProductRepository repository;

  public SellerListingController(ProductRepository repository) {
    this.repository = repository;
  }

  @PostMapping("/api/seller/listings")
  public ResponseEntity<Map<String, String>> submit(@Valid @RequestBody SellerListingInput input) {
    Product product = repository.submitPreloved(input);
    return ResponseEntity.accepted()
        .location(URI.create("/api/seller/listings/" + product.id()))
        .body(Map.of("status", "PENDING", "message", "Your listing is waiting for review."));
  }
}