import { useRef, useEffect } from 'react';

export default function useFocus() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return inputRef;
}
