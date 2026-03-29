import { Search } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { useCallback, useState } from 'react';
import Pagination from './components/Pagination';
import ProductCard from './components/ProductCard';
import SkeletonCard from './components/SkeletonCard';
import { useBreakpoint } from './hooks/useBreakpoint';

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const screen = useBreakpoint();
  const { data, isLoading, error } = useProducts({ page, limit, category, search });
  console.log(data);

  const handleSearch = useCallback(() => {
    setSearch(searchInput);
    setPage(1);
  }, [searchInput]);


  const handleCategoryChange = (val: string) => {
    setCategory(val || undefined);
    setPage(1);
  };

  const skeletonCount = screen === 'lg' ? 10 : screen === 'md' ? 6 : 1;

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      {/* Header Section */}
      <header className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Premium Products
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Browse our collection. Handling the flaky API gracefully is part of the challenge.
        </p>
      </header>

      {/* Controls Section */}
      <section style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', flex: 1, maxWidth: '400px' }}>
          <Search size={20} color="var(--text-muted)" style={{ marginRight: '0.75rem' }} />
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search products..."
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              outline: 'none',
              width: '100%',
              fontSize: '1rem'
            }}
          />
          {searchInput && (
            <button
              onClick={() => { setSearchInput(''); setSearch(''); setPage(1); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0 4px' }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="glass-panel"
          style={{
            padding: '0.75rem 1.25rem',
            color: 'var(--primary)',
            fontWeight: 600,
            cursor: 'pointer',
            border: '1px solid var(--primary)',
            borderRadius: '12px',
            fontSize: '14px',
          }}
        >
          Search
        </button>

        <select
          className="glass-panel"
          value={category ?? ''}
          onChange={e => handleCategoryChange(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            color: 'var(--text-main)',
            outline: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            appearance: 'none',
          }}
        >
          <option value="" style={{ background: 'var(--surface)' }}>All Categories</option>
          <option value="electronics" style={{ background: 'var(--surface)' }}>Electronics</option>
          <option value="clothing" style={{ background: 'var(--surface)' }}>Clothing</option>
          <option value="home" style={{ background: 'var(--surface)' }}>Home</option>
          <option value="outdoors" style={{ background: 'var(--surface)' }}>Outdoors</option>
        </select>
      </section>

      {/* Main Grid Placeholder */}
      <main>
        {/* Placeholder state to visually guide candidate */}
        {/* <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
          border: '1px dashed var(--border)',
          borderRadius: '16px',
        }}>
          <Loader2 size={40} color="var(--primary)" className="spin" style={{ marginBottom: '1rem', animation: 'spin 2s linear infinite' }} />
          <style>
            {`
               @keyframes spin {
                 100% { transform: rotate(360deg); }
               }
             `}
          </style>
          <h2 style={{ marginBottom: '0.5rem' }}>Start Building Your Grid!</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '500px' }}>
            Use <code>src/services/api.ts</code> to fetch the products. Remember to build pagination and handle the network errors that the API frequently throws!
          </p>
        </div> */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {data?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Pagination
        total={data?.total ?? 0}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />
    </div>
  );
}

export default App;
