import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
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
        </div>
    );
};

export default DebouncedSearch;