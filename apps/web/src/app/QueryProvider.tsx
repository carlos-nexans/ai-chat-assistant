'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient()


export default function QueryProvider({ children }: { children: React.ReactNode }): React.ReactNode {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}