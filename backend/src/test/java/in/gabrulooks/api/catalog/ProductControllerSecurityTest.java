package in.gabrulooks.api.catalog;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest({ProductController.class, SellerListingController.class})
@Import(in.gabrulooks.api.SecurityConfig.class)
@TestPropertySource(properties = {
  "app.allowed-origins=http://localhost:5173",
  "app.admin.username=test-admin",
  "app.admin.password-hash={noop}test-password"
})
class ProductControllerSecurityTest {
  @Autowired
  private MockMvc mvc;

  @MockBean
  private ProductRepository repository;

  @Test
  void publishedCatalogIsPublic() throws Exception {
    when(repository.findPublished()).thenReturn(List.of());

    mvc.perform(get("/api/products")).andExpect(status().isOk());
  }

  @Test
  void productAdministrationRequiresAuthentication() throws Exception {
    mvc.perform(get("/api/admin/products")).andExpect(status().isUnauthorized());
  }

  @Test
  void sellerCanSubmitAListingWithoutAuthentication() throws Exception {
    Instant now = Instant.now();
    Product pending = new Product(
        "listing-id", "used-shoes-a1b2c3d4", "Used shoes", "Gently worn shoes", "Shoes", 500000,
        List.of("https://images.example/a.jpg", "https://images.example/b.jpg", "https://images.example/c.jpg"),
        List.of(new Product.Variant("UK 9", 1)), Product.ListingType.PRELOVED,
        Product.ConditionGrade.GOOD, "Seller", "Delhi", Product.ReviewStatus.PENDING, false, now, now);
    when(repository.submitPreloved(any(SellerListingInput.class))).thenReturn(pending);

    mvc.perform(post("/api/seller/listings")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {"sellerName":"Seller","sellerEmail":"seller@example.com","sellerPhone":"+919876543210","sellerCity":"Delhi","title":"Used shoes","category":"Shoes","description":"Gently worn shoes","pricePaise":500000,"condition":"GOOD","size":"UK 9","imageUrls":["https://images.example/a.jpg","https://images.example/b.jpg","https://images.example/c.jpg"]}
            """))
        .andExpect(status().isAccepted())
        .andExpect(jsonPath("$.status").value("PENDING"));
  }
}