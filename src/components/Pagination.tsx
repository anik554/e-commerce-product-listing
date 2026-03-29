import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  rowsPerPageOptions?: number[];
}

export default function Pagination({
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
  rowsPerPageOptions = [10, 25, 50, 100],
}: PaginationProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(total / limit);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const handleToggle = () => {
    if (!dropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = rowsPerPageOptions.length * 40 + 8;
      const openAbove = rect.bottom + dropdownHeight + 8 > window.innerHeight;
      setDropdownPos({
        top: openAbove ? rect.top - dropdownHeight - 4 : rect.bottom + 4,
        left: rect.left,
      });
    }
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        !dropdownRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    window.addEventListener("scroll", handler, true);
    return () => window.removeEventListener("scroll", handler, true);
  }, [dropdownOpen]);

  const handleLimitSelect = (val: number) => {
    onLimitChange(val);
    onPageChange(1);
    setDropdownOpen(false);
  };

  const dropdown = dropdownOpen
    ? createPortal(
        <div
          ref={dropdownRef}
          role="listbox"
          aria-label="Rows per page"
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            zIndex: 9999,
            background: "#1e2535",
            borderRadius: "6px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            minWidth: "90px",
            overflow: "hidden",
            padding: "4px 0",
          }}
        >
          {rowsPerPageOptions.map((opt) => (
            <button
              key={opt}
              role="option"
              aria-selected={opt === limit}
              onClick={() => handleLimitSelect(opt)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 16px",
                fontSize: "14px",
                background: opt === limit ? "#2563eb" : "transparent",
                color: opt === limit ? "#ffffff" : "#d1d5db",
                fontWeight: opt === limit ? 600 : 400,
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (opt !== limit)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (opt !== limit)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {opt}
            </button>
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "14px",
          userSelect: "none",
          color: "inherit",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ opacity: 0.6, whiteSpace: "nowrap" }}>Rows per page:</span>

          <button
            ref={triggerRef}
            onClick={handleToggle}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 6px",
              borderRadius: "6px",
              border: "none",
              background: "transparent",
              color: "inherit",
              fontWeight: 500,
              fontSize: "14px",
              cursor: "pointer",
              opacity: 1,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "rgba(128,128,128,0.15)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            <span>{limit}</span>
            <ChevronUp
              size={13}
              style={{
                transition: "transform 0.2s",
                transform: dropdownOpen ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </button>
        </div>

        <span style={{ opacity: 0.6, whiteSpace: "nowrap" }}>
          {from}–{to} of {total}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px",
              borderRadius: "6px",
              border: "none",
              background: "transparent",
              color: "inherit",
              cursor: page <= 1 ? "not-allowed" : "pointer",
              opacity: page <= 1 ? 0.3 : 0.7,
            }}
            onMouseEnter={(e) => {
              if (page > 1)
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(128,128,128,0.15)";
            }}
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px",
              borderRadius: "6px",
              border: "none",
              background: "transparent",
              color: "inherit",
              cursor: page >= totalPages ? "not-allowed" : "pointer",
              opacity: page >= totalPages ? 0.3 : 0.7,
            }}
            onMouseEnter={(e) => {
              if (page < totalPages)
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(128,128,128,0.15)";
            }}
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {dropdown}
    </>
  );
}