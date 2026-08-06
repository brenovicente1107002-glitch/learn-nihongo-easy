import { createFileRoute } from "@tanstack/react-router";

/**
 * Áudio japonês gerado no servidor (fallback quando o aparelho não tem voz ja-JP).
 * GET /api/tts?text=こんにちは
 */
export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const text = (url.searchParams.get("text") ?? "").slice(0, 300).trim();
        if (!text) return new Response("missing text", { status: 400 });

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("tts unavailable", { status: 503 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini-tts",
            input: text,
            voice: "alloy",
            instructions: "Speak in natural, clear Japanese with a native Tokyo accent.",
            response_format: "mp3",
            stream_format: "audio",
          }),
        });

        if (!res.ok) {
          const body = await res.text().catch(() => "");
          console.error(`TTS failed [${res.status}]: ${body}`);
          return new Response(body || "tts error", { status: res.status });
        }

        return new Response(res.body, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "public, max-age=604800",
          },
        });
      },
    },
  },
});
