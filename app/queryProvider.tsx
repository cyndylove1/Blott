"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const client =  new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
