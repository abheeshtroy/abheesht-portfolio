import { streamText, convertToModelMessages, UIMessage } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { SYSTEM_PROMPT } from "@/lib/ai-prompt";

export const runtime = "edge";

// ─── Anthropic provider ──────────────────────────────────────────────────────
const anthropic = createAnthropic();

// ─── Upstash rate limiter (20 messages per 3 hours, per IP) ──────────────────
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "3 h"),
  prefix: "portfolio-chat",
});

// ─── POST /api/chat ──────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // --- Rate limit by IP ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "127.0.0.1";

    const isDev = process.env.NODE_ENV === "development";
    const { success } = isDev ? { success: true } : await ratelimit.limit(ip);

    if (!success) {
      return new Response(
        JSON.stringify({
          error:
            "That's my message cap for now — gotta keep Abheesht's API bill sane. But his inbox is always open → scroll down to the contact form or email abheeshtr11@gmail.com",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // --- Parse messages ---
    const { messages } = (await req.json()) as { messages: UIMessage[] };

    // --- Stream response from Haiku ---
    const result = streamText({
      model: anthropic("claude-haiku-4-5"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      providerOptions: {
        anthropic: {
          cacheControl: { type: "ephemeral" },
        },
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}