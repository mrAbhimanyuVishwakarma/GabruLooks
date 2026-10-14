package in.gabrulooks.api.catalog;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProductController.class)
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
}