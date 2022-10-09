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
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("origin", "http://127.0.0.1:3000");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "appx");
    urlencoded.append("client_secret", "bx5Ono2y0FYEVRWB7zw6S55pOEmKQ2kW");
    urlencoded.append("grant_type", "client_credentials");

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
      .then(response => {
        console.log("呵呵", response)
        return response.text()
      })
      .then(result => {
        console.log("哈哈", result)
        console.log(result)
      })
      .catch(error => console.error('error', error));
  }, [])
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