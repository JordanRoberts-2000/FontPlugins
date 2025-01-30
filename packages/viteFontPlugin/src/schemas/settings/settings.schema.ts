import { z } from "zod";

export const settingsSchema = z.object({
  google: z.object({}),
});

// type WithDefaultsReturn<T extends z.ZodObject<z.ZodRawShape>> = z.ZodObject<{
//   [K in keyof T["shape"]]: z.ZodDefault<T["shape"][K]>;
// }>;

// // adds defaults to object feilds
// const withDefaults = <T extends z.ZodObject<ZodRawShape>>(
//   schema: T,
//   defaults: z.infer<T>
// ): WithDefaultsReturn<T> => {
//   const transformedFields = Object.entries(schema.shape).map(([key, value]) => {

//     const transformedValue = value.default(defaults[key])
//     return [key, transformedValue]
//   });
//   const newSchema = Object.fromEntries(transformedFields);
//   return newSchema as WithDefaultsReturn<T>
// };

// type HasDefault<T, K extends keyof T> = K extends keyof T
//   ? T[K] extends undefined
//     ? false
//     : true
//   : false;

// type WithDefaultsReturn<
//   T extends z.ZodObject<z.ZodRawShape>,
//   Defaults extends Partial<z.infer<T>>
// > = z.ZodObject<{
//   [K in keyof T["shape"]]: HasDefault<Defaults, K> extends true
//     ? z.ZodDefault<T["shape"][K]>
//     : T["shape"][K];
// }>;

// // adds defaults to object feilds
// const withDefaults = <
//   T extends z.ZodObject<ZodRawShape>,
//   Defaults extends Partial<z.infer<T>>
// >(
//   schema: T,
//   defaults: Defaults
// ): WithDefaultsReturn<T, Defaults> => {
//   const transformedFields = Object.entries(schema.shape).map(([key, value]) => {
//     if (key in defaults) {
//       const transformedValue = (value as z.ZodType).default(
//         defaults[key as keyof typeof defaults]
//       );
//       return [key, transformedValue];
//     }

//     return [key, value];
//   });
//   const newSchema = Object.fromEntries(transformedFields);
//   return newSchema as any;
// };

// const settingsSchemaBase = fontSettingsSchema.partial().extend({
//   unicodeRange: z.string().optional(),
//   preconnects: z.array(z.string()).optional(),
//   // optimize: withDefaults(optimizeSchema, {
//   //   convertToWoff2: true,
//   //   enabled: true,
//   //   extractUnicodeRange: true,
//   //   // trimUnusedWeightsAndStyles intentially missing
//   // }),
// });

// const { success, data } = settingsSchemaBase.safeParse({
//   optimize: {
//     trimUnusedWeightsAndStyles: true,
//   },
// });

// console.log(success, data);

// export type GlobalSettings = z.input<typeof settingsSchemaBase>["optimize"];

// fix the WithDefaultsReturn Type so that GlobalSettings has type:
// type GlobalSettings = {
//   enabled: boolean | undefined;
//   extractUnicodeRange: boolean | undefined;
//   trimUnusedWeightsAndStyles: boolean | undefined;
//   convertToWoff2: boolean; // hasnt had default applied so no '| undefined'
// }

// const settingsSchemaBase = fontSettingsSchema.extend({
//   unicodeRange: z.string().optional(),
//   preconnects: z.array(z.string()).optional(),
//     optimize: withDefaults(optimizeSchema, {
//       convertToWoff2: true,
//       enabled: true,
//       extractUnicodeRange: true,
//       // trimUnusedWeightsAndStyles intentially missing
//     })
//   // optimize: optimizeSchema
//   //   .applyDefaults(defaultSettings.optimize)
//   //   .default(defaultSettings.optimize),
//   // google: googleSettingsSchema,
//   // local: localSettingsSchema,
//   // css: cssSettingsSchema,
//   // script: scriptSettingsSchema,
// });
