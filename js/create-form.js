const d = document;


export default function search() {
    const $h2 = d.querySelector("h2")
    const $load = d.querySelector(".load")
    const $link = d.querySelector(".link")
    const $grid = d.querySelector(".grid-collection")


    $h2.innerHTML = "RESEARCH POKEMON";
    $grid.innerHTML = "";
    $link.classList.add("hidden");
    $h2.insertAdjacentHTML('beforeend', `<form>
        <label for="search">Enter pokemon name</label>
        <input type="search" placeholder="Insert Pokemon" name="search" id="search" required autocomplete="off">
        <button class=btn-search>Search</search>
    </form>`);

}