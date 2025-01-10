import { useState, useEffect } from "react";

// This custom hook delays updating a value until a specified time has passed
// Useful for scenarios like search inputs where you want to wait for the user to stop typing
// before triggering an action (like an API call)
export function useDebounce<T>(value: T, delay: number): [T] {
  // Store the debounced value in state
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Create a timer that will update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes before the delay has passed
    // This prevents the debounced value from updating with an old value
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect if value or delay changes

  return [debouncedValue];
}
