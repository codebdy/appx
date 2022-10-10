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
  .catch(error => callback('error'+error.message));