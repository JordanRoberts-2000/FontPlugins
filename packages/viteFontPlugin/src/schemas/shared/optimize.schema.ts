import { z } from "zod";

export const optimizeSchema = z.object({
  enabled: z.boolean(),
  extractUnicodeRange: z.boolean(),
  trimUnusedWeightsAndStyles: z.boolean(),
  convertToWoff2: z.boolean(),
});

export type OptimizeSettings = z.infer<typeof optimizeSchema>;
