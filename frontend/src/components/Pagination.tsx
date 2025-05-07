interface PaginationProps {
  page: number;
  count: number;
  onChange: (p: number) => void;
}

const Pagination = ({ page, count, onChange }: PaginationProps) => {
  const total = Math.ceil(count / 10);
  return (
    <div>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`px-3 py-1 border rounded ${n === page ? "bg-blue-500 text-white" : ""}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
