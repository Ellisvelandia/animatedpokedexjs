const pokemonCount = 905;
let pokedex = {};

window.onload = async function () {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").append(pokemon);
  }

  document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
};

const getPokemon = async (num) => {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

  let response = await fetch(url);
  let pokemon = await response.json();
  // console.log(pokemon);

  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"];
  let pokemonImg =
    pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];

  response = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await response.json();

  // console.log(pokemonDesc)
  pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    desc: pokemonDesc,
  };
};

function updatePokemon() {
  document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

  let typesDiv = document.getElementById("pokemon-types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }

  let types = pokedex[this.id]["types"];
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    (type.innerText = types[i]["type"]["name"].toUpperCase()),
      type.classList.add("type-box");
    type.classList.add(types[i]["type"]["name"]);
    typesDiv.append(type);
  }

  document.getElementById("pokemon-description").innerText =
    pokedex[this.id]["desc"];
}
