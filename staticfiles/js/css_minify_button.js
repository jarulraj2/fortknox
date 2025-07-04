document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector("textarea[name='css_content']");
    if (!textarea) return;

    // Create "Minify CSS" button
    const button = document.createElement("button");
    button.type = "button";
    button.innerText = "⚡ Minify CSS";
    button.className = "btn btn-danger";
    button.style.marginBottom = "10px";

    textarea.parentNode.insertBefore(button, textarea);

    button.addEventListener("click", function () {
        let css = textarea.value;

        // Remove comments
        css = css.replace(/\/\*[\s\S]*?\*\//g, '');

        // Remove space around { } : ; ,
        css = css.replace(/\s*([{}:;,])\s*/g, '$1');

        // Remove trailing semicolon before }
        css = css.replace(/;}/g, '}');

        // Collapse all spaces
        css = css.replace(/\s+/g, ' ').trim();

        textarea.value = css;
        alert("✅ CSS minified!");
    });
});
