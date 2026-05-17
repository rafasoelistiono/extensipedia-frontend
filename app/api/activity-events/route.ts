import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/public-api";

const ACTIVITY_EVENTS_URL = `${BASE_URL}/api/v1/public/activity-events/`;
const ACTIVITY_EVENTS_TIMEOUT_MS = 5_000;

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const response = await fetch(ACTIVITY_EVENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(ACTIVITY_EVENTS_TIMEOUT_MS),
    });

    const raw = await response.text();

    return new NextResponse(raw, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kendala saat mencatat aktivitas.", data: {} },
      { status: 500 },
    );
  }
}
