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
    const description = String(formData.get("description") || "").trim();
    const attachment = formData.get("attachment");

    if (!fullName || !npm || !email || !title || !description) {
      return NextResponse.json(
        { message: "Semua field wajib harus diisi." },
        { status: 400 },
      );
    }

    const upstream = new FormData();

    upstream.append("full_name", fullName);
    upstream.append("name", fullName);
    upstream.append("npm", npm);
    upstream.append("student_id", npm);
    upstream.append("email", email);
    upstream.append("title", title);
    upstream.append("subject", title);
    upstream.append("description", description);
    upstream.append("details", description);
    upstream.append("content", description);

    if (attachment instanceof File && attachment.size > 0) {
      upstream.append("attachment", attachment);
      upstream.append("evidence", attachment);
      upstream.append("proof_file", attachment);
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

    const message =
      typeof parsed === "object" &&
      parsed !== null &&
      "message" in parsed &&
      typeof (parsed as { message?: unknown }).message === "string"
        ? (parsed as { message: string }).message
        : "Aspirasi berhasil dikirim.";

    return NextResponse.json({ message, data: parsed });
  } catch {
    return NextResponse.json(
      { message: "Terjadi kendala saat menghubungi server aspirasi." },
      { status: 500 },
    );
  }
}
