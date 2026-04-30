import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/public-api";

const SUBMIT_URL = `${BASE_URL}/api/v1/public/aspirations/submit/`;
const SUBMIT_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get("full_name") || "").trim();
    const npm = String(formData.get("npm") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const shortDescription = String(formData.get("short_description") || "").trim();
    const attachment = formData.get("evidence_attachment");

    if (!fullName || !npm || !email || !title || !shortDescription) {
      return NextResponse.json(
        { message: "Semua field wajib harus diisi." },
        { status: 400 },
      );
    }

    const upstream = new FormData();

    upstream.append("full_name", fullName);
    upstream.append("npm", npm);
    upstream.append("email", email);
    upstream.append("title", title);
    upstream.append("short_description", shortDescription);

    if (attachment instanceof File && attachment.size > 0) {
      upstream.append("evidence_attachment", attachment);
    }

    const response = await fetch(SUBMIT_URL, {
      method: "POST",
      body: upstream,
      cache: "no-store",
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
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
        parsed ?? { success: false, message: "Gagal mengirim aspirasi ke server." },
        { status: response.status },
      );
    }

    return NextResponse.json(
      parsed ?? {
        success: true,
        message: "Aspiration submitted successfully",
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
