"use client";

import type { ReactNode } from "react";
import { trackActivity } from "@/lib/activity";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  actionKey: string;
  label: string;
  targetType: string;
  targetId?: string | null;
  metadata?: Record<string, unknown>;
};

export function TrackedLink({
  href,
  className,
  children,
  actionKey,
  label,
  targetType,
  targetId = null,
  metadata,
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        if (!actionKey) {
          return;
        }

        trackActivity({
          action_key: actionKey,
          label,
          target_type: targetType,
          target_id: targetId,
          target_url: href,
          metadata: metadata ?? {},
        });
      }}
    >
      {children}
    </a>
  );
}
