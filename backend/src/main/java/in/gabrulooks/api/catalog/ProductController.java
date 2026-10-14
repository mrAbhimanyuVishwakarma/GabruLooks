package in.gabrulooks.api.catalog;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
  private final ProductRepository repository;

  public ProductController(ProductRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/api/products")
  public List<Product> publishedProducts() {
    return repository.findPublished();
  }

  @GetMapping("/api/products/{slug}")
  public ResponseEntity<Product> publishedProduct(@PathVariable String slug) {
    Product product = repository.findBySlug(slug);
    return product == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(product);
  }

  @GetMapping("/api/admin/products")
  public List<AdminListing> allProducts() {
    return repository.findAllForAdmin();
  }

  @PostMapping("/api/admin/products")
  public ResponseEntity<Product> create(@Valid @RequestBody ProductInput input) {
    Product product = repository.insert(input);
    return ResponseEntity.created(URI.create("/api/products/" + product.slug())).body(product);
  }

  @PutMapping("/api/admin/products/{id}")
  public ResponseEntity<Product> update(@PathVariable String id, @Valid @RequestBody ProductInput input) {
    Product product = repository.replace(id, input);
    return product == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(product);
  }

  @DeleteMapping("/api/admin/products/{id}")
  public ResponseEntity<Void> delete(@PathVariable String id) {
    return repository.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
  }

  @PatchMapping("/api/admin/products/{id}/review")
  public ResponseEntity<Product> review(
      @PathVariable String id, @Valid @RequestBody ReviewInput input) {
    Product.ReviewStatus status;
    try {
      status = Product.ReviewStatus.valueOf(input.status().toUpperCase());
    } catch (IllegalArgumentException exception) {
      return ResponseEntity.badRequest().build();
    }
    Product product = repository.review(id, status);
    return product == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(product);
  }

  public record ReviewInput(@jakarta.validation.constraints.NotBlank String status) {}
}