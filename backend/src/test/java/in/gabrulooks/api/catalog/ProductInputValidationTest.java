package in.gabrulooks.api.catalog;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.util.List;
import org.junit.jupiter.api.Test;

class ProductInputValidationTest {
  private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

  @Test
  void rejectsInvalidPriceSlugImageAndVariantStock() {
    ProductInput input = new ProductInput(
        " ", "Not a valid slug", " ", " ", 0,
        List.of("http://not-secure.example/image.jpg"),
      List.of(new ProductInput.VariantInput(" ", -1)), Product.ListingType.PRELOVED,
      null, "Seller", "Delhi", "not-an-email", "invalid", true);

    assertThat(validator.validate(input)).isNotEmpty();
  }

  @Test
  void acceptsVerifiedCatalogData() {
    ProductInput input = new ProductInput(
        "Heavyweight tee", "heavyweight-tee", "Oversized tees", "Combed cotton tee.", 89900,
        List.of("https://res.cloudinary.com/gabru/image/upload/tee.jpg"),
      List.of(new ProductInput.VariantInput("M", 1)), Product.ListingType.PRELOVED,
      Product.ConditionGrade.LIKE_NEW, "Seller", "Delhi", "seller@example.com", "+919876543210", true);

    assertThat(validator.validate(input)).isEmpty();
  }

  @Test
  void rejectsMultipleUnitsForPrelovedListings() {
    ProductInput input = new ProductInput(
        "Pre-loved jacket", "pre-loved-jacket", "Jackets", "Verified item condition.", 450000,
        List.of("https://images.example/jacket.jpg"),
        List.of(new ProductInput.VariantInput("M", 2)), Product.ListingType.PRELOVED,
        Product.ConditionGrade.GOOD, "Seller", "Delhi", "seller@example.com", "+919876543210", false);

    assertThat(validator.validate(input)).isNotEmpty();
  }

  @Test
  void sellerListingsRequireAtLeastThreeHttpsPhotos() {
    SellerListingInput input = new SellerListingInput(
        "Seller", "seller@example.com", "+919876543210", "Delhi", "Leather bag", "Bags",
        "Pre-loved bag with visible wear.", 420000, Product.ConditionGrade.GOOD, "Medium",
        List.of("https://images.example/front.jpg", "https://images.example/back.jpg"));

    assertThat(validator.validate(input)).isNotEmpty();
  }
}