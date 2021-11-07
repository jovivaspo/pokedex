const d = document;


export default function menu() {

    d.addEventListener("click", e => {
        //console.log(e.target)
        const $menu = d.querySelector(".menu");
        if (e.target.matches(".btn-menu span")) {
            console.log(e.target)

            if (!$menu.classList.contains("is-active")) {
                $menu.classList.add("is-active")
            } else {
                $menu.classList.remove("is-active")
            }

        }

        if(e.target.matches(".menu a ") && $menu.classList.contains("is-active")) {
           
            $menu.classList.remove("is-active");
            
        }



    })
}