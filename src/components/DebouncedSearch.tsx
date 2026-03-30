import { useState, useEffect } from 'react';
import { Search, XIcon } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface Props {
    onSearch: (value: string) => void;
}

const DebouncedSearch = ({ onSearch }: Props) => {
    const [input, setInput] = useState('');

    const debouncedValue = useDebounce(input, 500);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    const handleClear = () => {
        setInput('')
        onSearch('')
    }

    return (
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', flex: 1, maxWidth: '400px' }}>
            <Search size={20} color="var(--text-muted)" style={{ marginRight: '0.75rem' }} />
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
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
            {input && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                >
                    <XIcon className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default DebouncedSearch;