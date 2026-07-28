"use client";

import InitialLoader from "@/components/ui/loader/InitialLoader";
import React, { useState } from "react";

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* The Loader sits on top (z-index 9999). 
        When it finishes its exit animation, it calls onComplete, 
        which updates state to remove it from the DOM.
      */}
      {isLoading && <InitialLoader onComplete={() => setIsLoading(false)} />}

      {/* We render the main website content immediately. 
        It stays hidden behind the loader until the loader slides up.
      */}
      <div className="relative z-0">{children}</div>
    </>
  );
}
