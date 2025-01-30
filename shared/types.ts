import { WEIGHT_DEFINITIONS } from "./constants.js";

export type WeightName = (typeof WEIGHT_DEFINITIONS)[number][1];

export type WeightNumber = (typeof WEIGHT_DEFINITIONS)[number][0];
