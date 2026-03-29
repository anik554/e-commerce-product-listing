import type { Product } from "../types/product"


const ProductCard = ({ product }: { product: Product }) => {
    return (
        <article style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
        }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
            aria-label={`${product.name}, price ${product.price}`}>

            <div style={{ background: '#f5f5f5', height: '200px', overflow: 'hidden' }}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/400/300?random=${product.id}`;
                    }}
                />
            </div>

            <div style={{ padding: '0.85rem 1rem 1.1rem' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 4px', fontWeight: 500 }}>
                    {product.category}
                </p>

                <p
                    style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        margin: '0 0 10px',
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {product.name}
                </p>

                <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)', margin: 0 }}>
                    ৳ {product.price.toLocaleString()}
                </p>

                {product.stock < 10 && (
                    <span
                        style={{
                            display: 'inline-block',
                            marginTop: '8px',
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            background: product.stock === 0 ? '#fee2e2' : '#fef3c7',
                            color: product.stock === 0 ? '#991b1b' : '#92400e',
                            fontWeight: 500,
                        }}
                    >
                        {product.stock === 0 ? 'Out of stock' : `Only ${product.stock} left`}
                    </span>
                )}
            </div>
        </article>
    )
}

export default ProductCard