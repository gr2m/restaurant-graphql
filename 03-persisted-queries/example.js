function post(path, data) {
  return fetch(`${location.protocol}//${location.host}${path}`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
}

let {data: {salads: [salad], burgers}} = await post('/graphql', {
  id: 1
})
