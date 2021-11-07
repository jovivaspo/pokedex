const d = document;

export default async function getHtml() {

    const $element = d.querySelectorAll("[data-include]");
    console.log($element)
    for (let el of $element) {
        fetch(el.dataset.include)
            .then(res => res.text())
            .then(html => el.outerHTML = html)
            .catch(err => {
                let msg = err.statusText || "Ocurrió un error al cargar el elemento";
                el.outerHTML = `<p class="error">Error: ${err.status}: ${msg}></p>`
            })
        
    }


}

