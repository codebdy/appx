import { Schema } from "@formily/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInstanceParams } from "~/plugin-sdk";

export function useNavigateRoute() {
  const navigate = useNavigate();
  const { instance } = useInstanceParams()
  const navigateRoute = useCallback((route: string) => {
    const realRoute = route.split("{{").map((left) => {
      return left.split("}}").map(right => {
        return Schema.shallowCompile(`{{${right}}}`, { "$this": instance }) || right
      }
      ).join("")
    }).join("");

    navigate(realRoute)
  }, [navigate, instance])

  return navigateRoute;
}