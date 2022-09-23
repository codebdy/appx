import { message } from "antd";
import { useEffect } from "react";

export function useShowError(err?: Error) {
  useEffect(() => {
    if (err) {
      message.error(err.message)
    }
  }, [err])
}