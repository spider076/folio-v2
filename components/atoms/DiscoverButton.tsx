"use client";

import Link from "next/link";
import posthog from "posthog-js";

import Button from "./Button";

const DiscoverButton = () => {
  return (
    <Link
      tabIndex={-1}
      className="outline-none"
      href="#work"
      onClick={() => {
        posthog.capture('"Discover my work" button icon clicked', {
          Clicked: true,
        });
      }}
    >
      <Button>Discover my work ↓</Button>
    </Link>
  );
};

export default DiscoverButton;
