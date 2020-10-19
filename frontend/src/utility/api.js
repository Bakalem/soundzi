function sendApiRequest({endPoint, method = 'POST', params = null}) {
  const uri = 'http://localhost:4000';
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  function handleResponse(response) {
    if (!response.ok) {
      throw response.statusText;
    }
    if(localStorage.getItem('user') || response.headers.get('x-isAuthentified')){
      localStorage.setItem('token', response.headers.get('x-access-token'));
      localStorage.setItem('refreshToken', response.headers.get('x-refresh-token'));
    }
    return response.json().then(data => ({
      data : data,
      status : response.ok
    }))
  }

  return fetch(uri + endPoint, {
    method: method,
    headers: headers,
    body: params && JSON.stringify(params)
  }).then(handleResponse);
}

export default sendApiRequest;