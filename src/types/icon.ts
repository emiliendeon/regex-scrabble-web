import { type StrictExtract } from "./common";

export type IconName = "arrow" | "caret" | "close" | "menu" | "valid" | "invalid";

export const OrientableIconNames = ["arrow", "caret"] as const;

export type OrientableIconName = StrictExtract<IconName, (typeof OrientableIconNames)[number]>;
export type NonOrientableIconName = Exclude<IconName, OrientableIconName>;
