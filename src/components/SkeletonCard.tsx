
const SkeletonCard = () => {
    return (
        <div
            className="glass-panel"
            style={{ borderRadius: '16px', overflow: 'hidden' }}
            aria-hidden="true"
        >
            <div style={{ height: '200px', background: 'var(--border)', opacity: 0.5, animation: 'pulse 1.5s ease-in-out infinite' }} />
            <div style={{ padding: '1rem' }}>
                <div style={{ height: '12px', width: '60px', background: 'var(--border)', borderRadius: '6px', marginBottom: '8px', opacity: 0.5 }} />
                <div style={{ height: '16px', width: '90%', background: 'var(--border)', borderRadius: '6px', marginBottom: '6px', opacity: 0.5 }} />
                <div style={{ height: '16px', width: '70%', background: 'var(--border)', borderRadius: '6px', marginBottom: '12px', opacity: 0.5 }} />
                <div style={{ height: '20px', width: '80px', background: 'var(--border)', borderRadius: '6px', opacity: 0.5 }} />
            </div>
            <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>
        </div>
    )
}

export default SkeletonCard;