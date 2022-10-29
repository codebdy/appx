import { useCallback, useEffect, useRef } from "react";

function createInput(): HTMLInputElement {
  const inputEl = document.createElement('input');
  inputEl.type = "file";
  //inputEl.style.display = 'none';

  document.body.appendChild(inputEl);
  return inputEl;
}

export function useOpenFile() {
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const fileInputRef = useRef<HTMLInputElement>()

  const handleFileInputChange = useCallback(
    (event: Event) => {
      console.log("呵呵", event)
      resolveRef.current && resolveRef.current(undefined)
      document.body.removeChild(fileInputRef.current);
    },
    [fileInputRef]
  );

  const open = useCallback(() => {
    const p = new Promise((resolve, reject) => {
      fileInputRef.current = createInput();
      resolveRef.current = resolve;
      rejectRef.current = reject;
      fileInputRef.current.addEventListener("change", handleFileInputChange)
      fileInputRef.current?.click();
    });
    return p;
  }, [resolveRef, rejectRef, handleFileInputChange, fileInputRef])

  return open;
}