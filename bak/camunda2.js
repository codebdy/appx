



function converToken(tokenObj) {
  return tokenObj.token_type + " " + tokenObj.access_token;
}
function getToken() {
  const tokenCache = readFromCache("camundaToken");

  if (tokenCache) {
    if (tokenCache.value.expires_in > Date.now() - tokenCache.createdAt + 10) {
      return converToken(tokenCache.value)
    }
  }
  const result = iFetch("http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "client_id=appx&client_secret=bx5Ono2y0FYEVRWB7zw6S55pOEmKQ2kW&grant_type=client_credentials",
    }
  )
  const tokenObj = JSON.parse(result)
  writeToCache("camundaToken", {
    value: tokenObj,
    createdAt: Date.now(),
  })
  return converToken(tokenObj);
}

function searchProcesses(token, body) {
  let result = iFetch("http://localhost:8081/v1/process-instances/search",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": token,
      },
      body: body,
    }
  )
  return result;
}



const token = getToken()

const result = JSON.parse(
  searchProcesses(
    token,
    JSON.stringify({}),
  )
)

return {
  nodes: result?.items?.map(item => {
    return {
      ...item,
      id: item.key
    }
  }),
  total: result?.total,
}