import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/public-api";

const TRACK_URL = `${BASE_URL}/api/v1/public/tickets/track/`;
const TRACK_TIMEOUT_MS = 5_000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticketId = searchParams.get("ticket_id");
    const upstreamUrl = new URL(TRACK_URL);

    if (ticketId) {
      upstreamUrl.searchParams.set("ticket_id", ticketId);
    }

    const response = await fetch(upstreamUrl.toString(), {
      cache: "no-store",
      signal: AbortSignal.timeout(TRACK_TIMEOUT_MS),
    });

    const raw = await response.text();
    let parsed: unknown = null;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      const message =
        typeof parsed === "object" &&
        parsed !== null &&
        "message" in parsed &&
        typeof (parsed as { message?: unknown }).message === "string"
          ? (parsed as { message: string }).message
          : "Gagal mengambil data tracking tiket.";

      return NextResponse.json({ message }, { status: response.status });
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { message: "Terjadi kendala saat melacak tiket." },
      { status: 500 },
    );
  }
}
