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

let {data: {addSalads: salads, addBurgers: burgers}} = await post('/graphql', {
  query: `mutation cook{
    addSalads(count: 10)
    addBurgers(count: 5)
  }`
})
