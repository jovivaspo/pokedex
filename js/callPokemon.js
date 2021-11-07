const d = document;

export default async function callPokemon(pokemon) {

    const $grid = d.querySelector(".grid-collection");
    const $template = d.querySelector("template").content;
    const $fragment = d.createDocumentFragment();
    const $load = d.querySelector(".load")

    $load.style.display = "block";
    $grid.innerHTML = "";
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(json => {
            $load.style.display = "none";
            console.log(json);
            $template.querySelector(".front .name").innerHTML = json.name;
            $template.querySelector(".back .name").innerHTML = json.name;
            $template.querySelector(".front .img-pokemon").src = json.sprites.other.dream_world.front_default;
            $template.querySelector(".back .img-pokemon").src = json.sprites.other.dream_world.front_default;
            $template.querySelector(".front [data-experience] span").innerHTML = json.base_experience;
            $template.querySelector(".front [data-attack] span").innerHTML = json.stats[1].base_stat;
            $template.querySelector(".front [data-defense] span").innerHTML = json.stats[2].base_stat;
            $template.querySelector(".back [data-experience] span").innerHTML = json.base_experience;
            $template.querySelector(".back [data-attack] span").innerHTML = json.stats[1].base_stat;
            $template.querySelector(".back [data-defense] span").innerHTML = json.stats[2].base_stat;
            $template.querySelector(".back [data-type] span").innerHTML = json.types[0].type.name;
            $template.querySelector(".back [data-height] span").innerHTML = `${json.height}m`;
            $template.querySelector(".back [data-weight] span").innerHTML = `${json.weight}kg`;
            $template.querySelector(".back [data-moves] span").innerHTML = `${json.moves[0].move.name}, ${json.moves[1].move.name}...`;
            $template.querySelector(".front").dataset.type = json.types[0].type.name;
            const $clon = d.importNode($template, true);
            $fragment.appendChild($clon);
            $grid.appendChild($fragment)
        })
        .catch(err => {
            $load.style.display = "none";
            let msg = err.statusText || "pokemon not found, spell check";
            $grid.innerHTML = `<p class="error">Error ${err.status}:${msg}</p>`
            console.log(err)
        })

}