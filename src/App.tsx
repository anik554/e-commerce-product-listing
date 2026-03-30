import { useProducts } from './hooks/useProducts';
import { useState } from 'react';
import Pagination from './components/Pagination';
import ProductCard from './components/ProductCard';
import SkeletonCard from './components/SkeletonCard';
import { useBreakpoint } from './hooks/useBreakpoint';
import ErrorState from './components/ErrorState';
import DebouncedSearch from './components/DebouncedSearch';
import { FilterIcon, SearchIcon } from 'lucide-react'

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useProducts({ page, limit, category, search });
  const screen = useBreakpoint();

  const handleCategoryChange = (val: string) => {
    setCategory(val || undefined);
    setPage(1);
  };

  const skeletonCount = screen === 'lg' ? 10 : screen === 'md' ? 6 : 1;

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <header className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Premium Products
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Browse our collection. Handling the flaky API gracefully is part of the challenge.
        </p>
      </header>

      <section className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-full sm:w-auto flex-grow max-w-md">
          <DebouncedSearch
            onSearch={(value) => {
              setSearch(value)
            }}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2.5 text-sm bg-gray-100 border-transparent rounded-xl focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-black/5 transition-all appearance-none cursor-pointer font-medium text-gray-700"
              value={category ?? ''}
              onChange={e => handleCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
              <option value="outdoors">Outdoors</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <main>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (<ErrorState onRetry={() => refetch()} message={error.message} />) : data?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <SearchIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find anything matching "{search}" in{' '}
              {category ? category : 'any category'}. Try adjusting your
              filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {data?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {!isLoading && (
          <Pagination
            total={data?.total ?? 0}
            page={page}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
