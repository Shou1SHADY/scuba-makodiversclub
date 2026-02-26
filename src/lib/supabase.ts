import { createClient } from './supabase/client';

// Keep the unified export but shift it to use the new browser client for general use cases.
// This preserves compatibility with existing 'use client' components.
export const supabase = createClient();
