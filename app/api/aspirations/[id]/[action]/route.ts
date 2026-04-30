import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/public-api";

const MUTATION_TIMEOUT_MS = 10_000;

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string; action: string }> },
) {
  try {
    const { id, action } = await context.params;

    if (!id || (action !== "upvote" && action !== "vote")) {
      return NextResponse.json(
        { success: false, message: "Endpoint aspirasi tidak valid." },
        { status: 400 },
      );
    }

    const upstreamUrl = `${BASE_URL}/api/v1/public/aspirations/${id}/${action}/`;
    const response = await fetch(upstreamUrl, {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(MUTATION_TIMEOUT_MS),
    });

    const raw = await response.text();
    let parsed: unknown = null;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        parsed ?? { success: false, message: `Gagal melakukan ${action}.` },
        { status: response.status },
      );
    }

    return NextResponse.json(
      parsed ?? {
        success: true,
        message: "Request successful",
        data: null,
      },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kendala saat menghubungi server aspirasi." },
      { status: 500 },
    );
  }
}
