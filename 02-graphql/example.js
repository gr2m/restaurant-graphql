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
  query: `{
    burgers(count:3) {
      shrimp
    }
    salads {
      avocado
      arugula
      mango
      onion
    }
  }`
})
// salad: {"avocado":1,"mango":1,"arugula":true,"onion":true}
// burgers: [{"shrimp":1},{"shrimp":1},{"shrimp":1}]

Object.assign(salad, {
  shrimps: burgers.reduce((numShrimps, burger) => numShrimps + burger.shrimp, 0)
})
// salad: {"avocado":1,"mango":1,"arugula":true,"onion":true, shrimp: 3}
