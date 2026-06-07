import { createApi } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import { PLACEHOLDER_CODE } from "../../constants/generator";
import { BASE_URL, baseQueryWithReauth } from "../../api/baseQuery";
import { setProgress } from "./generatorSlice";
import type { RootState } from "../../store";

export const GenerateUIRequestSchema = z.object({
  prompt: z.string().trim().min(1, "Prompt cannot be empty"),
});

export const GeneratedComponentSchema = z.object({
  componentType: z.literal("pricing-card"),
  prompt: z.string(),
  model: z.string(),
  generatedAt: z.string(),
  generatedCode: z.string(),
});

const CompleteEventSchema = z.object({
  stage: z.literal("complete"),
  result: z.object({
    model: z.string(),
    generatedAt: z.string(),
    generatedCode: z.string(),
  }),
});

const ProgressEventSchema = z.object({
  stage: z.string(),
  progress: z.number(),
});

export type GenerateUIRequest = z.infer<typeof GenerateUIRequestSchema>;
export type GeneratedComponent = z.infer<typeof GeneratedComponentSchema>;

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";
const SIMULATED_LATENCY_MS = 2500;

export const generatorApi = createApi({
  reducerPath: "generatorApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    generateUI: builder.mutation<GeneratedComponent, GenerateUIRequest>({
      queryFn: async (args, api) => {
        const parsed = GenerateUIRequestSchema.safeParse(args);
        if (!parsed.success) {
          return { error: { status: "CUSTOM_ERROR", error: parsed.error.issues[0].message } };
        }
        const { prompt } = parsed.data;

        if (USE_MOCK) {
          await new Promise((resolve) =>
            setTimeout(resolve, SIMULATED_LATENCY_MS)
          );
          return {
            data: {
              componentType: "pricing-card",
              prompt,
              model: "agent-v1",
              generatedAt: new Date().toISOString(),
              generatedCode: PLACEHOLDER_CODE,
            },
          };
        }

        api.dispatch(setProgress({ progress: 0, stage: "starting" }));

        const token = (api.getState() as RootState).auth.token;
        const authHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        let response: Response;
        try {
          response = await fetch(`${BASE_URL}/generate/stream`, {
            method: "POST",
            headers: authHeaders,
            body: JSON.stringify({ prompt }),
          });
        } catch {
          return { error: { status: "FETCH_ERROR", error: "Network error" } };
        }

        if (!response.ok) {
          return { error: { status: "CUSTOM_ERROR" as const, error: `HTTP ${response.status}: ${response.statusText}` } };
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";

          for (const eventText of events) {
            for (const line of eventText.split("\n")) {
              if (!line.startsWith("data: ")) continue;

              let raw: unknown;
              try {
                raw = JSON.parse(line.slice(6));
              } catch {
                continue;
              }

              const complete = CompleteEventSchema.safeParse(raw);
              if (complete.success) {
                return {
                  data: {
                    componentType: "pricing-card" as const,
                    prompt,
                    model: complete.data.result.model,
                    generatedAt: complete.data.result.generatedAt,
                    generatedCode: complete.data.result.generatedCode,
                  },
                };
              }

              const progress = ProgressEventSchema.safeParse(raw);
              if (progress.success) {
                api.dispatch(setProgress({ progress: progress.data.progress, stage: progress.data.stage }));
              }
            }
          }
        }

        return { error: { status: "CUSTOM_ERROR", error: "Stream ended without a result" } };
      },
    }),
  }),
});

export const { useGenerateUIMutation } = generatorApi;
