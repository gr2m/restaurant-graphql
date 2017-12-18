function get(path) {
  return fetch(`${location.protocol}//${location.host}${path}`)
    .then(response => response.json())
}

let [salad] = await get("/salads?count=1");
// salad: {"avocado":1,"mango":1,"onion":0.2,"arugula":true,"lemon":true}

let burgers = await get("/burgers?count=3");
// burgers: [
//   {"buns":2,"shrimp":1,"egg":1,"lettuce":2.5,"mayo":true},
//   {"buns":2,"shrimp":1,"egg":1,"lettuce":2.5,"mayo":true},
//   {"buns":2,"shrimp":1,"egg":1,"lettuce":2.5,"mayo":true}]

delete salad.onion; // TODO: Tell the team to add onion to the menu!

Object.assign(salad, {
  shrimps: burgers.reduce(
    (numShrimps, burger) => numShrimps + burger.shrimp,
    0
  )
});
// salad: {"avocado":1,"mango":1,"arugula":true,"lemon":true, shrimp: 3}
