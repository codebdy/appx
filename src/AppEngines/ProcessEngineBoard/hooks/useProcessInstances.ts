import { useEffect } from "react";

const OPERATE_URL = "http://localhost:8081/";
const ClientID = "appx";
const ClientSecret = "bx5Ono2y0FYEVRWB7zw6S55pOEmKQ2kW";

const KeyCloak = "http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token"
// curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
// --header 'Content-Type: application/x-www-form-urlencoded' \
// --data-urlencode 'client_id=<client id>' \
// --data-urlencode 'client_secret=<secret>' \
// --data-urlencode 'grant_type=client_credentials'

export function useProcessInstances() {

}

/*

fetch("http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token", 
  {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify({
      client_id: "appx",
      client_secret: "bx5Ono2y0FYEVRWB7zw6S55pOEmKQ2kW",
      grant_type: "client_credentials"
    }),
    redirect: 'follow',
    mode: "cors",
  }
)
  .then(response => response.text())
  .then(result => callback(result))
  .catch(error => callback('error'+error.message));
  */