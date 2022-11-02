import { Schema } from "@formily/react";

export function parseRoute(route: string | undefined, instance?: any) {
  return route.split("{{").map((left) => {
    return left.split("}}").map(right => {
      return Schema.shallowCompile(`{{${right}}}`, { "$this": instance }) || right
    }
    ).join("")
  }).join("");
}