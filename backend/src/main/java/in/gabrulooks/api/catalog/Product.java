package in.gabrulooks.api.catalog;

import java.time.Instant;
import java.util.List;

public record Product(
    String id,
    String slug,
    String title,
    String description,
    String category,
    long pricePaise,
    List<String> imageUrls,
    List<Variant> variants,
    ListingType listingType,
    ConditionGrade condition,
    String sellerDisplayName,
    String sellerCity,
    ReviewStatus reviewStatus,
    boolean published,
    Instant createdAt,
    Instant updatedAt) {
  public record Variant(String size, int stock) {}

  public enum ListingType { DROPSHIP, PRELOVED }

  public enum ConditionGrade { NEW_WITH_TAGS, LIKE_NEW, GOOD, FAIR }

  public enum ReviewStatus { DRAFT, PENDING, APPROVED, REJECTED }
}