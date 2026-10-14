package in.gabrulooks.api.catalog;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Sorts.descending;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Updates;
import com.mongodb.client.model.ReplaceOptions;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.bson.Document;
import org.springframework.stereotype.Repository;

@Repository
public class ProductRepository {
  private final MongoCollection<Document> products;

  public ProductRepository(MongoDatabase database) {
    products = database.getCollection("products");
    products.createIndex(new Document("slug", 1), new IndexOptions().unique(true));
    products.createIndex(new Document("published", 1).append("reviewStatus", 1).append("createdAt", -1));
    products.createIndex(new Document("sellerEmail", 1));
  }

  public List<Product> findPublished() {
    return read(products.find(new Document("published", true).append("reviewStatus", "APPROVED"))
        .sort(descending("createdAt")));
  }

  public List<AdminListing> findAllForAdmin() {
    List<AdminListing> result = new ArrayList<>();
    for (Document document : products.find().sort(descending("updatedAt"))) {
      result.add(new AdminListing(fromDocument(document), document.getString("sellerEmail"), document.getString("sellerPhone")));
    }
    return result;
  }

  public Product findBySlug(String slug) {
    Document document = products.find(eq("slug", slug)).first();
    return document == null || !document.getBoolean("published", false)
        || !"APPROVED".equals(document.getString("reviewStatus")) ? null : fromDocument(document);
  }

  public Product insert(ProductInput input) {
    Instant now = Instant.now();
    Product.ListingType listingType = input.listingType() == null
        ? Product.ListingType.DROPSHIP : input.listingType();
    Product.ReviewStatus reviewStatus = input.published()
        ? Product.ReviewStatus.APPROVED : Product.ReviewStatus.DRAFT;
    Product product = new Product(
        UUID.randomUUID().toString(), input.slug(), input.title().trim(), input.description().trim(),
        input.category().trim(), input.pricePaise(), input.imageUrls(), toVariants(input.variants()),
        listingType, input.condition(), clean(input.sellerDisplayName()), clean(input.sellerCity()),
        reviewStatus, input.published(), now, now);
    Document document = toDocument(product)
        .append("sellerEmail", clean(input.sellerEmail()))
        .append("sellerPhone", clean(input.sellerPhone()));
    products.insertOne(document);
    return product;
  }

  public Product submitPreloved(SellerListingInput input) {
    Instant now = Instant.now();
    String slug = input.title().toLowerCase().replaceAll("[^a-z0-9]+", "-")
        .replaceAll("(^-|-$)", "") + "-" + UUID.randomUUID().toString().substring(0, 8);
    Product product = new Product(
        UUID.randomUUID().toString(), slug, input.title().trim(), input.description().trim(),
        input.category().trim(), input.pricePaise(), input.imageUrls(),
        List.of(new Product.Variant(input.size().trim(), 1)), Product.ListingType.PRELOVED,
        input.condition(), input.sellerName().trim(), input.sellerCity().trim(),
        Product.ReviewStatus.PENDING, false, now, now);
    Document document = toDocument(product)
        .append("sellerEmail", input.sellerEmail().trim().toLowerCase())
        .append("sellerPhone", input.sellerPhone().trim());
    products.insertOne(document);
    return product;
  }

  public Product replace(String id, ProductInput input) {
    Document existing = products.find(eq("_id", id)).first();
    if (existing == null) return null;
    Instant createdAt = existing.getDate("createdAt").toInstant();
    Product.ListingType listingType = input.listingType() == null
      ? Product.ListingType.DROPSHIP : input.listingType();
    Product.ReviewStatus reviewStatus = input.published()
      ? Product.ReviewStatus.APPROVED
      : "PENDING".equals(existing.getString("reviewStatus"))
        ? Product.ReviewStatus.PENDING : Product.ReviewStatus.DRAFT;
    Product product = new Product(
        id, input.slug(), input.title().trim(), input.description().trim(), input.category().trim(),
      input.pricePaise(), input.imageUrls(), toVariants(input.variants()), listingType,
      input.condition(), clean(input.sellerDisplayName()), clean(input.sellerCity()), reviewStatus,
      input.published(), createdAt, Instant.now());
    Document document = toDocument(product)
      .append("sellerEmail", clean(input.sellerEmail()))
      .append("sellerPhone", clean(input.sellerPhone()));
    products.replaceOne(eq("_id", id), document, new ReplaceOptions());
    return product;
  }

    public Product review(String id, Product.ReviewStatus status) {
    if (status != Product.ReviewStatus.APPROVED && status != Product.ReviewStatus.REJECTED) return null;
    Document updated = products.findOneAndUpdate(eq("_id", id),
      Updates.combine(
        Updates.set("reviewStatus", status.name()),
        Updates.set("published", status == Product.ReviewStatus.APPROVED),
        Updates.set("updatedAt", java.util.Date.from(Instant.now()))));
    if (updated == null) return null;
    updated.put("reviewStatus", status.name());
    updated.put("published", status == Product.ReviewStatus.APPROVED);
    updated.put("updatedAt", java.util.Date.from(Instant.now()));
    return fromDocument(updated);
    }

  public boolean delete(String id) {
    return products.deleteOne(eq("_id", id)).getDeletedCount() > 0;
  }

  private List<Product> read(Iterable<Document> documents) {
    List<Product> result = new ArrayList<>();
    for (Document document : documents) result.add(fromDocument(document));
    return result;
  }

  private Product fromDocument(Document document) {
    List<Document> rawVariants = document.getList("variants", Document.class, List.of());
    List<Product.Variant> variants = rawVariants.stream()
        .map(variant -> new Product.Variant(variant.getString("size"), variant.getInteger("stock", 0)))
        .toList();
    return new Product(
        document.getString("_id"), document.getString("slug"), document.getString("title"),
        document.getString("description"), document.getString("category"),
        ((Number) document.get("pricePaise")).longValue(),
        document.getList("imageUrls", String.class, List.of()), variants,
        enumValue(Product.ListingType.class, document.getString("listingType"), Product.ListingType.DROPSHIP),
        enumValue(Product.ConditionGrade.class, document.getString("condition"), null),
        document.getString("sellerDisplayName"), document.getString("sellerCity"),
        enumValue(Product.ReviewStatus.class, document.getString("reviewStatus"),
          document.getBoolean("published", false) ? Product.ReviewStatus.APPROVED : Product.ReviewStatus.DRAFT),
        document.getBoolean("published", false), document.getDate("createdAt").toInstant(),
        document.getDate("updatedAt").toInstant());
  }

  private Document toDocument(Product product) {
    List<Document> variants = product.variants().stream()
        .map(variant -> new Document("size", variant.size()).append("stock", variant.stock()))
        .toList();
    return new Document("_id", product.id())
        .append("slug", product.slug())
        .append("title", product.title())
        .append("description", product.description())
        .append("category", product.category())
        .append("pricePaise", product.pricePaise())
        .append("imageUrls", product.imageUrls())
        .append("variants", variants)
        .append("listingType", product.listingType().name())
        .append("condition", product.condition() == null ? null : product.condition().name())
        .append("sellerDisplayName", product.sellerDisplayName())
        .append("sellerCity", product.sellerCity())
        .append("reviewStatus", product.reviewStatus().name())
        .append("published", product.published())
        .append("createdAt", java.util.Date.from(product.createdAt()))
        .append("updatedAt", java.util.Date.from(product.updatedAt()));
  }

  private List<Product.Variant> toVariants(List<ProductInput.VariantInput> variants) {
    return variants.stream().map(variant -> new Product.Variant(variant.size().trim(), variant.stock())).toList();
  }

  private String clean(String value) {
    return value == null || value.isBlank() ? null : value.trim();
  }

  private <T extends Enum<T>> T enumValue(Class<T> type, String value, T fallback) {
    if (value == null) return fallback;
    try {
      return Enum.valueOf(type, value);
    } catch (IllegalArgumentException ignored) {
      return fallback;
    }
  }
}