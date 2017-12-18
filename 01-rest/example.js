function get(path) {
  return fetch(`${location.protocol}//${location.host}${path}`)
    .then(response => response.json())
}

let [salad] = await get("/salads?count=1");
// salad: {"avocado":1,"mango":1,"tomato":0.2,"arugula":true,"onion":true}

let burgers = await get("/burgers?count=3");
// burgers: [
//   {"buns":2,"shrimp":1,"egg":1,"lettuce":2.5,"mayo":true},
//   {"buns":2,"shrimp":1,"egg":1,"lettuce":2.5,"mayo":true},
//   {"buns":2,"shrimp":1,"egg":1,"lettuce":2.5,"mayo":true}]

delete salad.tomato; // TODO: Tell the team to add tomato to the menu!

Object.assign(salad, {
  shrimps: burgers.reduce(
    (numShrimps, burger) => numShrimps + burger.shrimp,
    0
  )
});
// salad: {"avocado":1,"mango":1,"arugula":true,"onion":true, shrimp: 3}
