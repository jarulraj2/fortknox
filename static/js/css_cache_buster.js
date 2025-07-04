// css_cache_buster.js
window.addEventListener("load", function () {
    const links = document.querySelectorAll("link[rel=stylesheet]");
    links.forEach(link => {
        const href = link.getAttribute("href").split("?")[0];
        link.setAttribute("href", href + "?v=" + new Date().getTime());
    });
});
