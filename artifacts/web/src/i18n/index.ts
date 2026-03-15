import { sk, type TranslationKeys } from "./sk";
import { hu } from "./hu";

export type Lang = "sk" | "hu";

export const translations: Record<Lang, TranslationKeys> = { sk, hu };

export type { TranslationKeys };
