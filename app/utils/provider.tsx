"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/app/utils/query-client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </QueryClientProvider>
  );
};

export default Provider;
