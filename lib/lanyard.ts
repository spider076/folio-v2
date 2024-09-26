import { useLanyard } from "react-use-lanyard";

export function useStatus() {
  const userId = "756858570602971186";
  const result = useLanyard({
    userId,
    socket: true,
  });

  return {
    ...result,
  };
}

// 719500343477534722
// 756858570602971186