

function converToken(tokenObj){
  return tokenObj.token_type + " " + tokenObj.access_token;
}
function getToken(){
const tokenStr = readFromCache("camundaToken");
if(tokenStr){
  const tokenCache = JSON.parse(tokenStr)
  if (tokenCache.value.expires_in >  Date.now() - tokenCache.createdAt + 10){
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
  value:tokenObj,
  createdAt: Date.now(),
})
return converToken(tokenObj);
}

function getProcesses(token, body){
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
