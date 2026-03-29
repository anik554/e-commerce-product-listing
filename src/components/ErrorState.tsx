import { RefreshCw } from "lucide-react";


const ErrorState = ({ onRetry, message }: { onRetry: () => void; message: string }) => {
    return (
        <>
            <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinOnce {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .error-float   { animation: floatUpDown 3s ease-in-out infinite; }
        .error-fade    { animation: fadeSlideUp 0.5s ease forwards; }
        .error-fade-1  { animation: fadeSlideUp 0.5s ease 0.1s both; }
        .error-fade-2  { animation: fadeSlideUp 0.5s ease 0.25s both; }
        .error-fade-3  { animation: fadeSlideUp 0.5s ease 0.4s both; }
        .retry-btn:hover .retry-icon { animation: spinOnce 0.5s ease; }
      `}</style>

            <div
                role="alert"
                className="glass-panel"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem 2rem',
                    borderRadius: '20px',
                    textAlign: 'center',
                    marginBottom: '2rem',
                }}
            >
                {/* Floating SVG illustration */}
                <div className="error-float" style={{ marginBottom: '2rem' }}>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Cloud body */}
                        <ellipse cx="60" cy="72" rx="42" ry="26" fill="var(--border)" opacity="0.5" />
                        <ellipse cx="44" cy="66" rx="22" ry="20" fill="var(--border)" opacity="0.6" />
                        <ellipse cx="76" cy="64" rx="26" ry="22" fill="var(--border)" opacity="0.6" />
                        <ellipse cx="60" cy="58" rx="30" ry="24" fill="var(--border)" opacity="0.7" />
                        {/* Lightning bolt */}
                        <path
                            d="M64 30 L52 54 H61 L56 82 L76 50 H66 L72 30 Z"
                            fill="var(--primary)"
                            opacity="0.85"
                        />
                        {/* Sad eyes */}
                        <circle cx="47" cy="70" r="3" fill="var(--text-muted)" opacity="0.7" />
                        <circle cx="73" cy="70" r="3" fill="var(--text-muted)" opacity="0.7" />
                        {/* Sad mouth */}
                        <path d="M51 80 Q60 76 69 80" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
                    </svg>
                </div>

                {/* Text */}
                <h2 className="error-fade-1" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Something went wrong
                </h2>
                <p className="error-fade-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '380px', marginBottom: '2rem', lineHeight: 1.6 }}>
                    {message ?? 'The server might be overloaded. Please try again in a moment.'}
                </p>

                {/* Retry button */}
                <button
                    onClick={onRetry}
                    className="retry-btn error-fade-3"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '0.65rem 1.5rem',
                        background: 'var(--primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '14px',
                        transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                    <RefreshCw size={15} className="retry-icon" />
                    Try Again
                </button>
            </div>
        </>
    )
}

export default ErrorState