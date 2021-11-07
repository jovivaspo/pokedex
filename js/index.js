import apiPokemon from "./api-pokemon.js";
import getHtml from "./components.js"
import menu from "./menu.js";
import search from "./create-form.js";
import callPokemon from "./callPokemon.js";

const urlCollection = "https://pokeapi.co/api/v2/pokemon/";

const d=document;

let page= 1;

d.addEventListener("DOMContentLoaded", e=>{

    getHtml([]);
    menu();
    setTimeout(()=>{
        apiPokemon(urlCollection);
    },2500)


})

d.addEventListener("click", e=>{
    if(e.target.matches(".link a")){
        e.preventDefault();
        apiPokemon(e.target.href);
    }
    if(e.target.matches(".link a > i")){
        e.preventDefault();
        apiPokemon(e.target.parentNode.href);
    }

    if(e.target.matches(".menu .research")){
        e.preventDefault();
        search()
    }

    if(e.target.matches("form .btn-search")){
        
        let pokemon=d.querySelector("form").search.value.toLowerCase();
        e.preventDefault();
        console.log(pokemon)
        callPokemon(pokemon);
        d.querySelector("form").search.value="";

    }

})