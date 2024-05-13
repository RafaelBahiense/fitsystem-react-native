import * as React from "react";

export function numberOnlyFilter(
  text: string,
  setValue: React.Dispatch<{ value: string; error: string }>,
) {
  const numericValue = text.replace(/[^0-9.]/g, "");

  if (numericValue.split(".").length > 2) return;
  if (numericValue.length > 4) return;

  setValue({ value: numericValue, error: "" });
}
