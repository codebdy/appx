import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CODE_LOGIN_EXPIRED, LOGIN_URL } from "../consts";
import { GraphQLRequestError } from "../enthooks";

export function useShowError(err?: GraphQLRequestError) {
  const navigate = useNavigate();
  useEffect(() => {
    if (err?.extensions?.["code"] === CODE_LOGIN_EXPIRED) {
      navigate(LOGIN_URL);
    } else if (err) {
      message.error(err.message)
    }
  }, [err, navigate])
}