"use client";

import { useEffect, useState } from "react";

/** Renders the current year without blocking prerendering. */
export default function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year ?? "—"}</>;
}
