import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

export function useCreateSubscriber() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.subscribers.create.input>) => {
      const res = await fetch(api.subscribers.create.path, {
        method: api.subscribers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid email");
        }
        throw new Error("Failed to subscribe");
      }

      return api.subscribers.create.responses[201].parse(await res.json());
    },
  });
}
