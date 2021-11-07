const d = document;


export default async function apiPokemon(url) {
    const $grid = d.querySelector(".grid-collection");
    const $next = d.querySelector(".next");
    const $previous = d.querySelector(".previous");
    const $fragment = d.createDocumentFragment();
    const $load = d.querySelector(".load");
    const $link = d.querySelector(".link");
    const $template = d.querySelector("template").content;
    let res;
    let json;
    try {
        $load.style.display = "block";
        console.log($grid.innerHTML)
        if ($grid.innerHTML !== "") $grid.innerHTML = "";
        res = await fetch(url);
        json = await res.json();
        //console.log(json)
        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        $next.href = json.next;
        //console.log($next)
        if (json.previous) {
            $previous.href = json.previous
            $previous.classList.remove("hidden")
        }else{
            $previous.classList.add("hidden")
        }
        let numPokemon = json.results.length;
        //console.log(numPokemon)
        for (let i = 0; i < numPokemon; i++) {

            try {
                res = await fetch(json.results[i].url);
                let pokemon = await res.json();
                console.log(pokemon)
                if (!res.ok) throw { status: res.status, statusText: res.statusText }
                
                $template.querySelector(".front .name").innerHTML = pokemon.name;
                $template.querySelector(".back .name").innerHTML = pokemon.name;
                $template.querySelector(".front .img-pokemon").src = pokemon.sprites.other.dream_world.front_default;
                $template.querySelector(".back .img-pokemon").src=pokemon.sprites.other.dream_world.front_default;
                $template.querySelector(".front [data-experience] span").innerHTML = pokemon.base_experience;
                $template.querySelector(".front [data-attack] span").innerHTML = pokemon.stats[1].base_stat;
                $template.querySelector(".front [data-defense] span").innerHTML = pokemon.stats[2].base_stat;
                $template.querySelector(".back [data-experience] span").innerHTML = pokemon.base_experience;
                $template.querySelector(".back [data-attack] span").innerHTML = pokemon.stats[1].base_stat;
                $template.querySelector(".back [data-defense] span").innerHTML = pokemon.stats[2].base_stat;
                $template.querySelector(".back [data-type] span").innerHTML = pokemon.types[0].type.name;
                $template.querySelector(".back [data-height] span").innerHTML = `${pokemon.height}m`;
                $template.querySelector(".back [data-weight] span").innerHTML = `${pokemon.weight}kg`;
                $template.querySelector(".back [data-moves] span").innerHTML = `${pokemon.moves[0].move.name}, ${pokemon.moves[1].move.name}...`;
                $template.querySelector(".front").dataset.type=pokemon.types[0].type.name;
                const $clon = d.importNode($template, true);
                $fragment.appendChild($clon);

            } catch (err) {
                let msg = err.statusText || "An error happened with the API";
                $grid.innerHTML = `<p class="error">Error ${err.status}:${msg}</p>`
                console.log(err)
            }
           
        }
        
         $load.style.display = "none";
         $grid.appendChild($fragment);
         $link.classList.remove("hidden")

    } catch (err) {
        let msg = err.statusText || "An error happened with the API";
        $grid.innerHTML = `<p class="error">Error ${err.status}:${msg}</p>`
        console.log(err)
    }
}
