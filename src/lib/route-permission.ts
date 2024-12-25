import { EnumRole } from "./enums";

export const ROUTE_PERMISSION: Record<string, EnumRole[]> = {
  "/content-editor": [EnumRole.admin],
  "/practice": [EnumRole.learner],
};

export const FALLBACK_ROUTE: Record<EnumRole, string> = {
  [EnumRole.admin]: "/content-editor",
  [EnumRole.learner]: "/practice",
};
