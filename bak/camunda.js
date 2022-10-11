goFetch("http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token",
  {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "client_id=appx&client_secret=bx5Ono2y0FYEVRWB7zw6S55pOEmKQ2kW&grant_type=client_credentials",
  }
)
  .then(result => callback(result))
  .catch(error => callback('error' + error.message));


function getToken() {
  let result = iFetch("http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "client_id=appx&client_secret=bx5Ono2y0FYEVRWB7zw6S55pOEmKQ2kW&grant_type=client_credentials",
    }
  )
  return result;
}

function getProcesses(token) {
  let result = iFetch("http://localhost:8081/v1/process-instances/search",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({}),
    }
  )
  return result;
}


const token = getToken()

const tokenObj = JSON.parse(token)

return getProcesses(tokenObj.token_type + " " + tokenObj.access_token)