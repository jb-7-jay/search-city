import { useRef, useEffect, useCallback, useState } from "react";
import "./SearchInput.css";
import { debounceFn } from "../../helpers";

const SearchInput = ({ onDebounedTextChange, textValue }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(textValue);
  }, [textValue]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const debouncedInputFn = useCallback(
    debounceFn((text) => {
      onDebounedTextChange(text);
    }, 700),
    []
  );

  return (
    <div className="search-input-container">
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Search Places..."
        value={value}
        onChange={(e) => {
          debouncedInputFn(e.target.value);
          setValue(e.target.value);
        }}
        // disabled={true}
      />
      <div className="shortcut-badge">Ctrl + /</div>
    </div>
  );
};

export default SearchInput;
