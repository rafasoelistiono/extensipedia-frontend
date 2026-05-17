export type ActivityPayload = {
  action_key: string;
  label: string;
  page_path?: string;
  target_type: string;
  target_id?: string | null;
  target_url?: string | null;
  metadata?: Record<string, unknown>;
  idempotency_key?: string;
};

export function trackActivity(action: ActivityPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: ActivityPayload = {
    ...action,
    page_path: action.page_path ?? window.location.pathname,
    metadata: action.metadata ?? {},
  };

  void fetch("/api/activity-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}
