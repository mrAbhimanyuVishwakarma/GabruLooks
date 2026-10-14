import { useEffect, useState } from 'react';
import type { AdminListing, Product, Variant } from './types';
import { demoProducts } from './demoProducts';
import {
  ArrowDown,
  ArrowRight,
  ShoppingBag,
  Check,
  ChevronDown,
  CircleAlert,
  Menu,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';

type CartLine = { productId: string; size: string; quantity: number };

const conditionLabels: Record<NonNullable<Product['condition']>, string> = {
  NEW_WITH_TAGS: 'New with tags',
  LIKE_NEW: 'Like new',
  GOOD: 'Good condition',
  FAIR: 'Fair condition',
};

const apiUrl = (path: string) => `${import.meta.env.VITE_API_BASE_URL ?? ''}${path}`;
const money = (paise: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(paise / 100);

function readCart(): CartLine[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem('gabru_cart_v2') ?? '[]');
    if (!Array.isArray(value)) return [];
    return value.filter((line): line is CartLine =>
      typeof line?.productId === 'string' && typeof line?.size === 'string' &&
      Number.isInteger(line?.quantity) && line.quantity > 0,
    );
  } catch {
    return [];
  }
}

function App() {
  const isAdmin = window.location.pathname.startsWith('/admin');
  return isAdmin ? <AdminPage /> : <Storefront />;
}

function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [demoCatalog, setDemoCatalog] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All pieces');
  const [listingType, setListingType] = useState<'ALL' | Product['listingType']>('ALL');
  const [cart, setCart] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');

  async function loadProducts() {
    setLoading(true);
    setLoadError('');
    try {
      const response = await fetch(apiUrl('/api/products'));
      if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
      const data: unknown = await response.json();
      if (!Array.isArray(data)) throw new Error('Catalog response was not valid');
      setProducts(data as Product[]);
      setDemoCatalog(false);
    } catch {
      if (import.meta.env.DEV) {
        setProducts(demoProducts);
        setDemoCatalog(true);
      } else {
        setLoadError('The collection could not load. Check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadProducts(); }, []);
  useEffect(() => { localStorage.setItem('gabru_cart_v2', JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(''), 2400);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const categories = ['All pieces', ...new Set(products.map((product) => product.category).filter(Boolean))];
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'All pieces' || product.category === category;
    const matchesType = listingType === 'ALL' || product.listingType === listingType;
    const needle = query.trim().toLowerCase();
    const matchesQuery = !needle || `${product.title} ${product.category} ${product.description}`.toLowerCase().includes(needle);
    return matchesCategory && matchesType && matchesQuery;
  });
  const cartLines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...line, product }] : [];
  });
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cartLines.reduce((total, line) => total + line.product.pricePaise * line.quantity, 0);

  function addToCart(product: Product) {
    const size = selectedSizes[product.id] ?? product.variants.find((variant) => variant.stock > 0)?.size;
    if (!size) {
      setNotice('This piece is currently out of stock.');
      return;
    }
    const available = product.variants.find((variant) => variant.size === size)?.stock ?? 0;
    const existing = cart.find((line) => line.productId === product.id && line.size === size);
    if (existing && existing.quantity >= available) {
      setNotice(`Only ${available} available in size ${size}.`);
      return;
    }
    setCart((current) => {
      const match = current.find((line) => line.productId === product.id && line.size === size);
      return match
        ? current.map((line) => line === match ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { productId: product.id, size, quantity: 1 }];
    });
    setNotice(`${product.title} added to your bag`);
  }

  function changeQuantity(productId: string, size: string, delta: number) {
    const product = products.find((item) => item.id === productId);
    const available = product?.variants.find((variant) => variant.size === size)?.stock ?? 0;
    const existing = cart.find((line) => line.productId === productId && line.size === size);
    if (delta > 0 && existing && existing.quantity >= available) {
      setNotice(`Only ${available} available in size ${size}.`);
      return;
    }
    setCart((current) => current.flatMap((line) => {
      if (line.productId !== productId || line.size !== size) return [line];
      const quantity = line.quantity + delta;
      return quantity > 0 ? [{ ...line, quantity }] : [];
    }));
  }

  return (
    <>
      <div className="announcement"><span>GABRU LOOKS</span><span>{demoCatalog ? 'Preview catalog · sample items only' : 'New pieces are added by the team in real time'}</span><ArrowRight size={14} /></div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <a className="wordmark" href="/" aria-label="Gabru Looks home">GABRU<span>LOOKS</span><small>.IN</small></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#sell" onClick={() => setMenuOpen(false)}>Sell a piece</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our point of view</a>
        </nav>
        <div className="header-actions">
          <label className="search-box">
            <Search size={17} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your fit" aria-label="Search products" />
          </label>
          <button className="bag-trigger" onClick={() => setCartOpen(true)} aria-label={`Open bag with ${cartCount} items`}>
            <ShoppingBag size={19} /><span>Bag</span><b>{cartCount}</b>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <img className="hero-photo" src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=2200&q=85" alt="Streetwear styling in a city setting" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="hero-label"><span /> THE GABRU LOOKS COLLECTION</p>
            <h1>Dress like<br />you mean it.</h1>
            <p>Find the pieces that feel like you. Explore what is in stock now.</p>
            <a className="button button-lime" href="#collection">Shop the collection <ArrowDown size={16} /></a>
          </div>
          <div className="hero-index"><span>GABRU LOOKS</span><span>INDIA</span></div>
        </section>

        <section className="collection" id="collection">
          <div className="collection-head">
            <div><p className="eyebrow">THE STORE</p><h2>Find your next<br className="mobile-break" /> everyday piece.</h2></div>
            <p className="collection-note">Browse the live collection.<br />Availability updates with the store.</p>
          </div>
          {demoCatalog && <div className="demo-notice" role="status"><CircleAlert size={16} /><span>Sample listings and prices for preview only. These items are not for sale.</span></div>}
          {!loading && !loadError && products.length > 0 && (
            <>
              <div className="listing-tabs" aria-label="Filter by listing type">
                <button className={listingType === 'ALL' ? 'listing-tab active' : 'listing-tab'} onClick={() => setListingType('ALL')}>Everything</button>
                <button className={listingType === 'DROPSHIP' ? 'listing-tab active' : 'listing-tab'} onClick={() => setListingType('DROPSHIP')}>Fresh drops</button>
                <button className={listingType === 'PRELOVED' ? 'listing-tab active' : 'listing-tab'} onClick={() => setListingType('PRELOVED')}>Pre-loved</button>
              </div>
              <div className="collection-toolbar">
                <div className="category-list" aria-label="Filter by category">
                  {categories.map((item) => <button key={item} className={category === item ? 'category-chip active' : 'category-chip'} onClick={() => setCategory(item)}>{item}</button>)}
                </div>
                <span className="result-count">{visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}</span>
              </div>
            </>
          )}

          {loading && <div className="loading-grid" aria-label="Loading collection">{Array.from({ length: 4 }, (_, index) => <div className="skeleton" key={index} />)}</div>}
          {loadError && <div className="state-panel"><CircleAlert /><h3>Collection unavailable</h3><p>{loadError}</p><button className="button button-dark" onClick={() => void loadProducts()}>Try again <ArrowRight size={16} /></button></div>}
          {!loading && !loadError && products.length === 0 && <div className="state-panel empty-panel"><span className="empty-mark">G.</span><h3>The next drop is being prepared.</h3><p>There are no published pieces right now. Check back soon.</p></div>}
          {!loading && !loadError && products.length > 0 && visibleProducts.length === 0 && <div className="state-panel"><Search /><h3>No pieces found</h3><p>Try a different search or collection.</p><button className="text-button" onClick={() => { setQuery(''); setCategory('All pieces'); setListingType('ALL'); }}>Clear filters</button></div>}

          {visibleProducts.length > 0 && <div className="product-grid">
            {visibleProducts.map((product) => {
              const sizes = product.variants.filter((variant) => variant.stock > 0);
              const selected = selectedSizes[product.id] ?? sizes[0]?.size ?? '';
              return <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  {product.imageUrls[0] ? <img src={product.imageUrls[0]} alt={product.title} loading="lazy" /> : <div className="image-placeholder"><span>G.</span></div>}
                  {sizes.length === 0 && <span className="stock-label">Sold out</span>}
                </div>
                <div className="product-info">
                  <div className="product-meta"><span>{product.listingType === 'PRELOVED' ? 'Pre-loved' : 'Fresh drop'}</span><span>{sizes.length ? 'In stock' : 'Out of stock'}</span></div>
                  <h3>{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  {product.listingType === 'PRELOVED' && <p className="preloved-meta">{product.condition ? conditionLabels[product.condition] : 'Pre-loved'}{product.sellerCity ? ` · ${product.sellerCity}` : ''}</p>}
                  <div className="product-buy-row">
                    <strong>{money(product.pricePaise)}</strong>
                    {sizes.length > 0 && <label className="size-select"><span className="sr-only">Size for {product.title}</span><select value={selected} onChange={(event) => setSelectedSizes((current) => ({ ...current, [product.id]: event.target.value }))}>{sizes.map((variant) => <option key={variant.size} value={variant.size}>{variant.size}</option>)}</select><ChevronDown size={13} /></label>}
                  </div>
                  <button className="add-button" disabled={!sizes.length} onClick={() => addToCart(product)}>{sizes.length ? <>Add to bag <Plus size={16} /></> : 'Unavailable'}</button>
                </div>
              </article>;
            })}
          </div>}
        </section>

        <SellerSubmission />

        <section className="brand-note" id="about">
          <span className="brand-note-mark">G.</span>
          <div><p className="eyebrow">GABRU LOOKS</p><h2>Good style is<br />personal.</h2></div>
          <p>We are building a collection worth wearing on repeat. Browse the pieces currently available, and let the fit do the talking.</p>
        </section>
      </main>

      <footer className="site-footer"><a className="wordmark" href="/">GABRU<span>LOOKS</span><small>.IN</small></a><span>© {new Date().getFullYear()} Gabru Looks</span><a href="/admin">Store admin</a></footer>

      {cartOpen && <div className="drawer-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title">
          <div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2 id="bag-title">The bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
          <div className="drawer-items">{cartLines.length === 0 ? <div className="drawer-empty"><ShoppingBag size={30} /><h3>Your bag is empty.</h3><p>Take a look at the collection.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Keep browsing</button></div> : cartLines.map((line) => <div className="cart-line" key={`${line.productId}-${line.size}`}>
            {line.product.imageUrls[0] ? <img src={line.product.imageUrls[0]} alt="" /> : <div className="cart-placeholder">G.</div>}
            <div className="cart-line-info"><h3>{line.product.title}</h3><span>Size {line.size}</span><div className="quantity-control"><button onClick={() => changeQuantity(line.productId, line.size, -1)} aria-label="Decrease quantity">−</button><span>{line.quantity}</span><button onClick={() => changeQuantity(line.productId, line.size, 1)} aria-label="Increase quantity">+</button></div></div>
            <strong>{money(line.product.pricePaise * line.quantity)}</strong>
          </div>)}</div>
          <div className="drawer-total"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p><ShieldCheck size={15} /> Shipping and payment will be confirmed at checkout.</p><button className="button button-disabled" disabled>Checkout is being set up</button></div>
        </aside>
      </div>}
      {notice && <div className="toast" role="status"><Check size={16} />{notice}</div>}
    </>
  );
}

function SellerSubmission() {
  const [form, setForm] = useState({
    sellerName: '', sellerEmail: '', sellerPhone: '', sellerCity: '', title: '', category: 'Shoes',
    description: '', price: '', condition: 'GOOD' as NonNullable<Product['condition']>, size: '', imageUrls: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function submitListing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const imageUrls = form.imageUrls.split('\n').map((url) => url.trim()).filter(Boolean);
    if (imageUrls.length < 3 || imageUrls.length > 8 || imageUrls.some((url) => !url.startsWith('https://'))) {
      setError('Add 3 to 8 HTTPS photo URLs. Upload clear item photos to Cloudinary first.');
      setSubmitting(false);
      return;
    }
    try {
      const response = await fetch(apiUrl('/api/seller/listings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerName: form.sellerName,
          sellerEmail: form.sellerEmail,
          sellerPhone: form.sellerPhone,
          sellerCity: form.sellerCity,
          title: form.title,
          category: form.category,
          description: form.description,
          pricePaise: Math.round(Number(form.price) * 100),
          condition: form.condition,
          size: form.size,
          imageUrls,
        }),
      });
      if (!response.ok) {
        const details: unknown = await response.json().catch(() => null);
        const message = typeof details === 'object' && details !== null && 'error' in details
          ? String(details.error) : 'Your listing could not be submitted. Check the details and try again.';
        throw new Error(message);
      }
      setSubmitted(true);
      setForm({ sellerName: '', sellerEmail: '', sellerPhone: '', sellerCity: '', title: '', category: 'Shoes', description: '', price: '', condition: 'GOOD', size: '', imageUrls: '' });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Your listing could not be submitted. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return <section className="sell-section" id="sell">
    <div className="sell-intro"><p className="eyebrow">GIVE A GOOD PIECE ANOTHER RUN</p><h2>Sell something<br />worth keeping.</h2><p>List pre-loved shoes, jackets, bags, and more. We review each listing before it can appear in the store.</p><div className="sell-steps"><span><b>01</b> Share the details</span><span><b>02</b> We review your listing</span><span><b>03</b> Buyers can discover it</span></div></div>
    <form className="sell-form" onSubmit={submitListing}>
      <div className="sell-form-head"><div><p className="eyebrow">PRE-LOVED SUBMISSION</p><h3>List your piece</h3></div><span>Seller contact stays private</span></div>
      {submitted ? <div className="seller-success" role="status"><Check /><h3>Listing sent for review.</h3><p>It will not appear in the store until an admin reviews it. We will contact you using the details you provided.</p><button type="button" className="text-button" onClick={() => setSubmitted(false)}>Submit another piece</button></div> : <>
        <div className="seller-fields two-col">
          <label>Your name<input required maxLength={80} autoComplete="name" value={form.sellerName} onChange={(event) => setForm({ ...form, sellerName: event.target.value })} /></label>
          <label>City<input required maxLength={80} autoComplete="address-level2" value={form.sellerCity} onChange={(event) => setForm({ ...form, sellerCity: event.target.value })} /></label>
          <label>Email<input required type="email" maxLength={254} autoComplete="email" value={form.sellerEmail} onChange={(event) => setForm({ ...form, sellerEmail: event.target.value })} /></label>
          <label>Phone<input required type="tel" pattern="\+?[0-9]{10,15}" maxLength={16} autoComplete="tel" value={form.sellerPhone} onChange={(event) => setForm({ ...form, sellerPhone: event.target.value })} /></label>
        </div>
        <div className="seller-fields two-col">
          <label>What are you selling?<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option>Shoes</option><option>Jackets</option><option>Bags</option><option>Clothing</option><option>Accessories</option></select></label>
          <label>Item size<input required maxLength={12} value={form.size} onChange={(event) => setForm({ ...form, size: event.target.value })} placeholder="For example: UK 9 or Large" /></label>
        </div>
        <label>Listing title<input required maxLength={120} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Brand, item, and useful detail" /></label>
        <div className="seller-fields two-col">
          <label>Condition<select value={form.condition} onChange={(event) => setForm({ ...form, condition: event.target.value as NonNullable<Product['condition']> })}><option value="NEW_WITH_TAGS">New with tags</option><option value="LIKE_NEW">Like new</option><option value="GOOD">Good condition</option><option value="FAIR">Fair condition</option></select></label>
          <label>Asking price (INR)<input required type="number" min="1" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label>
        </div>
        <label>Describe the item<textarea required maxLength={800} rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Mention wear, measurements, repairs, and anything a buyer should know." /></label>
        <label>Photo URLs<textarea required rows={3} value={form.imageUrls} onChange={(event) => setForm({ ...form, imageUrls: event.target.value })} placeholder="Paste 3 to 8 HTTPS Cloudinary URLs, one per line." /></label>
        <p className="seller-privacy"><ShieldCheck size={15} /> Submit only items you own or are allowed to sell. Contact details are visible to store admins, not buyers. We do not certify authenticity.</p>
        {error && <p className="seller-error" role="alert">{error}</p>}
        <button className="button button-dark" type="submit" disabled={submitting}>{submitting ? 'Sending for review…' : 'Send listing for review'} <ArrowRight size={16} /></button>
      </>}
    </form>
  </section>;
}

function AdminPage() {
  const [auth, setAuth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<AdminListing[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [form, setForm] = useState({
    title: '', slug: '', category: '', description: '', price: '', imageUrl: '',
    variants: [{ size: 'S', stock: 0 }, { size: 'M', stock: 0 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 0 }] as Variant[],
    listingType: 'DROPSHIP' as Product['listingType'], condition: '' as Product['condition'],
    sellerDisplayName: '', sellerCity: '', sellerEmail: '', sellerPhone: '', published: true,
  });

  async function refreshProducts(token = auth) {
    setError('');
    const response = await fetch(apiUrl('/api/admin/products'), { headers: { Authorization: `Basic ${token}` } });
    if (!response.ok) throw new Error(response.status === 401 ? 'Sign-in failed. Check your admin credentials.' : `Could not load products (${response.status}).`);
    setProducts(await response.json() as AdminListing[]);
  }

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = btoa(`${email}:${password}`);
    try {
      await refreshProducts(token);
      setAuth(token);
      setPassword('');
      setSuccess('Signed in. Product changes are saved to the catalog.');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Sign-in failed.'); }
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth) return;
    setSaving(true); setError(''); setSuccess('');
    try {
      const { imageUrl, price, ...productFields } = form;
      const response = await fetch(apiUrl(editingId ? `/api/admin/products/${editingId}` : '/api/admin/products'), {
        method: editingId ? 'PUT' : 'POST',
        headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productFields,
          pricePaise: Math.round(Number(price) * 100),
          imageUrls: imageUrl.split('\n').map((url) => url.trim()).filter(Boolean),
        }),
      });
      if (!response.ok) throw new Error((await response.text()) || `Save failed (${response.status}).`);
      setForm({
        title: '', slug: '', category: '', description: '', price: '', imageUrl: '',
        variants: [{ size: 'S', stock: 0 }, { size: 'M', stock: 0 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 0 }],
        listingType: 'DROPSHIP', condition: null, sellerDisplayName: '', sellerCity: '',
        sellerEmail: '', sellerPhone: '', published: true,
      });
      setEditingId('');
      await refreshProducts();
      setSuccess(editingId ? 'Product changes saved.' : 'Piece added to the collection.');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Could not save the piece.'); }
    finally { setSaving(false); }
  }

  async function removeProduct(product: Product) {
    if (!window.confirm(`Delete “${product.title}” from the catalog?`)) return;
    const response = await fetch(apiUrl(`/api/admin/products/${product.id}`), { method: 'DELETE', headers: { Authorization: `Basic ${auth}` } });
    if (!response.ok) { setError(`Could not delete ${product.title}.`); return; }
    setProducts((current) => current.filter((item) => item.product.id !== product.id));
    setSuccess('Piece removed from the catalog.');
  }

  async function reviewListing(product: Product, status: 'APPROVED' | 'REJECTED') {
    setError(''); setSuccess('');
    const response = await fetch(apiUrl(`/api/admin/products/${product.id}/review`), {
      method: 'PATCH',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) { setError(`Could not ${status.toLowerCase()} this listing.`); return; }
    await refreshProducts();
    setSuccess(status === 'APPROVED' ? 'Listing approved and published.' : 'Listing rejected and kept off the storefront.');
  }

  function editProduct(listing: AdminListing) {
    const { product } = listing;
    setEditingId(product.id);
    setForm({
      title: product.title,
      slug: product.slug,
      category: product.category,
      description: product.description,
      price: (product.pricePaise / 100).toFixed(2),
      imageUrl: product.imageUrls.join('\n'),
      variants: product.variants,
      listingType: product.listingType,
      condition: product.condition,
      sellerDisplayName: product.sellerDisplayName ?? '',
      sellerCity: product.sellerCity ?? '',
      sellerEmail: listing.sellerEmail ?? '',
      sellerPhone: listing.sellerPhone ?? '',
      published: product.published,
    });
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <main className="admin-shell">
    <header className="admin-header"><a className="wordmark" href="/">GABRU<span>LOOKS</span><small>.IN</small></a><span>STORE ADMIN</span><a href="/">View storefront <ArrowRight size={15} /></a></header>
    <section className="admin-intro"><p className="eyebrow">CATALOG MANAGEMENT</p><h1>Run the collection.</h1><p>Manage real product details, image links, variant sizes, and available stock.</p></section>
    {!auth ? <form className="admin-login" onSubmit={signIn}><h2>Admin sign in</h2><p>Use the admin credentials configured on the API service.</p><label>Email<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="button button-dark" type="submit">Sign in <ArrowRight size={16} /></button>{error && <p className="form-error" role="alert">{error}</p>}</form> : <div className="admin-layout">
      <form className="product-form" onSubmit={saveProduct}><div className="form-heading"><div><p className="eyebrow">{editingId ? 'EDIT LISTING' : 'NEW PRODUCT'}</p><h2>{editingId ? 'Update this piece' : 'Add a piece'}</h2></div><div className="form-actions">{editingId && <button className="text-button" type="button" onClick={() => { setEditingId(''); setForm({ title: '', slug: '', category: '', description: '', price: '', imageUrl: '', variants: [{ size: 'S', stock: 0 }, { size: 'M', stock: 0 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 0 }], listingType: 'DROPSHIP', condition: null, sellerDisplayName: '', sellerCity: '', sellerEmail: '', sellerPhone: '', published: true }); }}>Cancel</button>}<button className="button button-dark" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Add product'} <ArrowRight size={16} /></button></div></div>
        <label>Product name<input required maxLength={120} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value, slug: event.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })} /></label>
        <div className="form-pair"><label>Listing type<select value={form.listingType} onChange={(event) => setForm({ ...form, listingType: event.target.value as Product['listingType'], condition: event.target.value === 'PRELOVED' ? form.condition ?? 'GOOD' : null })}><option value="DROPSHIP">Fresh drop</option><option value="PRELOVED">Pre-loved</option></select></label><label>Category<input required maxLength={60} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="Shoes, jackets, bags" /></label></div>
        <div className="form-pair"><label>Price (INR)<input required type="number" min="1" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label>{form.listingType === 'PRELOVED' && <label>Condition<select required value={form.condition ?? ''} onChange={(event) => setForm({ ...form, condition: event.target.value as Product['condition'] })}><option value="">Choose condition</option><option value="NEW_WITH_TAGS">New with tags</option><option value="LIKE_NEW">Like new</option><option value="GOOD">Good condition</option><option value="FAIR">Fair condition</option></select></label>}</div>
        <label>Description<textarea required maxLength={800} rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
        <label>Cloudinary image URL(s), one per line<textarea rows={2} value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="https://res.cloudinary.com/..." /></label>
        <fieldset><legend>Available stock by size</legend><div className="stock-fields">{form.variants.map((variant, index) => <label key={variant.size}>{variant.size}<input type="number" min="0" step="1" value={variant.stock} onChange={(event) => setForm({ ...form, variants: form.variants.map((item, current) => current === index ? { ...item, stock: Number(event.target.value) } : item) })} /></label>)}</div></fieldset>
        <label className="publish-toggle"><input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} /> Show this piece in the storefront</label>
        <p className="admin-note"><ShieldCheck size={16} /> Product and stock changes are stored by the API. Use verified descriptions, prices, image links, and stock counts.</p>
      </form>
      <section className="admin-products"><div className="form-heading"><div><p className="eyebrow">LISTINGS & REVIEW</p><h2>{products.length} {products.length === 1 ? 'listing' : 'listings'}</h2></div><button className="icon-button" title="Refresh catalog" onClick={() => void refreshProducts().catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Refresh failed.'))}><ArrowDown /></button></div>
        {products.map(({ product, sellerEmail, sellerPhone }) => <article className="admin-product" key={product.id}><div className="admin-listing-copy"><strong>{product.title}</strong><span>{product.listingType === 'PRELOVED' ? 'Pre-loved' : 'Fresh drop'} · {money(product.pricePaise)} · {product.category} · {product.variants.reduce((sum, item) => sum + item.stock, 0)} units · {product.reviewStatus}</span>{sellerEmail && <span>Seller: {product.sellerDisplayName} · {sellerEmail} · {sellerPhone}</span>}</div><div className="admin-row-actions">{product.reviewStatus === 'PENDING' && <><button className="review-approve" onClick={() => void reviewListing(product, 'APPROVED')} aria-label={`Approve ${product.title}`}><Check size={15} /> Approve</button><button className="review-reject" onClick={() => void reviewListing(product, 'REJECTED')} aria-label={`Reject ${product.title}`}><X size={15} /> Reject</button></>}<button className="icon-button" onClick={() => editProduct({ product, sellerEmail, sellerPhone })} aria-label={`Edit ${product.title}`}><Pencil size={17} /></button><button className="icon-button danger" onClick={() => void removeProduct(product)} aria-label={`Delete ${product.title}`}><Trash2 size={17} /></button></div></article>)}
        {products.length === 0 && <p className="admin-empty">No catalog pieces yet. Add the first verified product.</p>}
      </section>
      {(error || success) && <div className={error ? 'admin-feedback error' : 'admin-feedback'} role={error ? 'alert' : 'status'}>{error || success}</div>}
    </div>}
  </main>;
}

export default App;