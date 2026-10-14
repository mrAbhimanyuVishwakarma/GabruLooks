package in.gabrulooks.api.catalog;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ProductInput(
    @NotBlank @Size(max = 120) String title,
    @NotBlank @Pattern(regexp = "[a-z0-9]+(?:-[a-z0-9]+)*") @Size(max = 140) String slug,
    @NotBlank @Size(max = 60) String category,
    @NotBlank @Size(max = 800) String description,
    @Positive long pricePaise,
    @NotNull @Size(max = 8) List<@NotBlank @Pattern(regexp = "https://.+") String> imageUrls,
    @NotNull @Size(max = 12) List<@NotNull @Valid VariantInput> variants,
    Product.ListingType listingType,
    Product.ConditionGrade condition,
    @Size(max = 80) String sellerDisplayName,
    @Size(max = 80) String sellerCity,
    @Size(max = 254) @jakarta.validation.constraints.Email String sellerEmail,
    @Size(max = 20) @Pattern(regexp = "^$|^\\+?[0-9]{10,15}$") String sellerPhone,
    boolean published) {

  public record VariantInput(
      @NotBlank @Size(max = 12) String size,
      @PositiveOrZero int stock) {}

  @jakarta.validation.constraints.AssertTrue(message = "Pre-loved listings require a condition and at most one item per size")
  public boolean isListingValid() {
    if (listingType != Product.ListingType.PRELOVED) return true;
    return condition != null && variants != null
      && variants.stream().allMatch(variant -> variant != null && variant.stock() <= 1);
  }
}