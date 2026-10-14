export type Variant = { size: string; stock: number };

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  pricePaise: number;
  imageUrls: string[];
  variants: Variant[];
  listingType: 'DROPSHIP' | 'PRELOVED';
  condition: 'NEW_WITH_TAGS' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | null;
  sellerDisplayName: string | null;
  sellerCity: string | null;
  reviewStatus: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  published: boolean;
};

export type AdminListing = { product: Product; sellerEmail: string | null; sellerPhone: string | null };