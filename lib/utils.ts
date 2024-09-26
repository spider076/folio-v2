import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

class DiscordUser {
  constructor(
    public username: string,
    public id: string
  ) {}
}

export let user = new DiscordUser("spider076", "719500343477534722");
