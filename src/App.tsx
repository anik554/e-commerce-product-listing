import { useProducts } from "./hooks/useProducts";
import { useState } from "react";
import Pagination from "./components/Pagination";
import ProductCard from "./components/ProductCard";
import SkeletonCard from "./components/SkeletonCard";
import { useBreakpoint } from "./hooks/useBreakpoint";
import ErrorState from "./components/ErrorState";
import DebouncedSearch from "./components/DebouncedSearch";
import { FilterIcon, SearchIcon } from "lucide-react";

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState<string | undefined>();
  const [search, setSearch] = useState("");
  const { data, isLoading, error, refetch } = useProducts({
    page,
    limit,
    category,
    search,
  });
  const screen = useBreakpoint();

  const handleCategoryChange = (val: string) => {
    setCategory(val || undefined);
    setPage(1);
  };

  const skeletonCount = screen === "lg" ? 10 : screen === "md" ? 6 : 1;

  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <header
        style={{
          position: "relative",
          padding: "2.5rem 2rem",
          marginBottom: "2rem",
          background: "var(--color-background-primary)",
          borderRadius: "var(--border-radius-xl)",
          border: "0.5px solid var(--color-border-tertiary)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "580px",
            height: "100%",
            pointerEvents: "none",
            opacity: 0.04,
          }}
        >
          <svg
            viewBox="0 0 280 120"
            fill="none"
            style={{ width: "100%", height: "100%" }}
          >
            <circle cx="200" cy="60" r="120" fill="currentColor" />
            <circle cx="260" cy="20" r="60" fill="currentColor" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            position: "relative",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--color-background-secondary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: "999px",
                padding: "4px 12px",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#1D9E75",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-secondary)",
                  letterSpacing: "0.02em",
                }}
              >
                New arrivals weekly
              </span>
            </div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 500,
                margin: "0 0 0.4rem",
                lineHeight: 1.2,
              }}
            >
              Discover something{" "}
              <em
                style={{
                  color: "var(--color-text-secondary)",
                  fontStyle: "italic",
                }}
              >
                exceptional
              </em>
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                maxWidth: "400px",
                lineHeight: 1.6,
              }}
            >
              Curated products across electronics, clothing, home & outdoors —
              filtered to fit exactly what you need.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: isLoading ? <span className="text-sm">Loading...</span> : `${data?.total}`, label: "Products" },
              { value: "4", label: "Categories" },
              { value: "Free", label: "Shipping" },
            ].map((stat, i, arr) => (
              <div
                key={stat.label}
                style={{ display: "flex", alignItems: "center", gap: "2rem" }}
              >
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "1.5rem", fontWeight: 500, margin: 0 }}>
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <div
                    style={{
                      width: "0.5px",
                      height: "36px",
                      background: "var(--color-border-tertiary)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>
      <section className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-full sm:w-auto flex-grow max-w-md">
          <DebouncedSearch
            onSearch={(value) => {
              setSearch(value);
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
              value={category ?? ""}
              onChange={(e) => handleCategoryChange(e.target.value)}
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
        ) : error ? (
          <ErrorState onRetry={() => refetch()} message={error.message} />
        ) : data?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <SearchIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find anything matching "{search}" in{" "}
              {category ? category : "any category"}. Try adjusting your filters
              or search terms.
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
