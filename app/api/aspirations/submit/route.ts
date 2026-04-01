import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/public-api";

const SUBMIT_URL = `${BASE_URL}/api/v1/public/aspirations/submit/`;

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
          : "Gagal mengirim aspirasi ke server.";

      return NextResponse.json({ message }, { status: response.status });
    }

    const upstreamMessage =
      typeof parsed === "object" &&
      parsed !== null &&
      "message" in parsed &&
      typeof (parsed as { message?: unknown }).message === "string"
        ? (parsed as { message: string }).message
        : "Aspiration submitted successfully";

    return NextResponse.json({
      message: `${upstreamMessage} Aspirasi sudah masuk ke backend, silakan cek email untuk notifikasi lanjutan.`,
      data: parsed,
    });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kendala saat menghubungi server aspirasi." },
      { status: 500 },
    );
  }
}
