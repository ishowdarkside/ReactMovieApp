import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export default function Search({ query, setQuery }) {
  const inputElement = useRef(0);

  useKey("enter", focusEnter);

  function focusEnter() {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
