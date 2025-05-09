"use client";

import posthog from "posthog-js";
import React from "react";

interface PosthogEventProps {
  title: String;
  eventDescription: string;
}

const PosthogEvent = ({
  title,
  eventDescription,
}: PosthogEventProps): React.ReactElement => {
  return (
    <p
      onClick={() => {
        posthog.capture(eventDescription, {
          Clicked: true,
        });
      }}
    >
      {title}
    </p>
  );
};

export default PosthogEvent;
