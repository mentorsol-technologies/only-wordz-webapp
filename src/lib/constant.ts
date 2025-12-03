import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const packageData = {
  name: "Lets get to know eachother",
  description:
    "Perfect for quick conversations and getting to know each other!",
  duration: "7 days",
  remaining: {
    messages: 15,
    voiceCalls: { count: 2, minutes: 5 },
    videoCalls: 0,
  },
};
export const callerData = {
  name: "Tim Anderson",
  image: "/images/Tim Anderson.jpg",
  callDuration: "00:05",
};
