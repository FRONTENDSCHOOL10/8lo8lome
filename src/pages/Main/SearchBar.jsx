export default function SearchBar() {
  return (
    <header className="flex">
      <div className="border border-yellow-200">
        <form action="" className="border-2 border-yellow-300 p-4">
          <label htmlFor="search" className="sr-only">
            검색
          </label>
          <input
            id="search"
            type="text"
            placeholder="검색어를 입력해 주세요."
            className="bg-transparent outline-none"
          />
          <button type="submit" aria-label="검색">
            🔎
          </button>
        </form>
      </div>
    </header>
  );
}
