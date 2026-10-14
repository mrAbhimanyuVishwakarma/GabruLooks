package in.gabrulooks.api.catalog;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.List;

public record SellerListingInput(
    @NotBlank @Size(max = 80) String sellerName,
    @NotBlank @Email @Size(max = 254) String sellerEmail,
    @NotBlank @Pattern(regexp = "^\\+?[0-9]{10,15}$") String sellerPhone,
    @NotBlank @Size(max = 80) String sellerCity,
    @NotBlank @Size(max = 120) String title,
    @NotBlank @Size(max = 60) String category,
    @NotBlank @Size(max = 800) String description,
    @Positive long pricePaise,
    @NotNull Product.ConditionGrade condition,
    @NotBlank @Size(max = 12) String size,
    @NotNull @Size(min = 3, max = 8) List<@NotBlank @Pattern(regexp = "https://.+") String> imageUrls) {}