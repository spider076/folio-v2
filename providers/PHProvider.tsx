"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.POSTHOG_KEY!, {
    api_host: process.env.POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    autocapture: false, // Disable automatic event capture, as we capture manually
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
