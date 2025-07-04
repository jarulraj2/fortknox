document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("id_js_content");
    if (!textarea) return;

    // ✅ Create "Minify" button
    const button = document.createElement("button");
    button.textContent = "Minify JS";
    button.type = "button";
    button.style.margin = "10px 0";
    button.className = "btn btn-warning";

    // ✅ Insert before the textarea
    textarea.parentNode.insertBefore(button, textarea);

    button.addEventListener("click", function () {
        let js = textarea.value;

        // Basic inline minifier (you can enhance this)
        js = js.replace(/\/\/[^\n\r]*/g, '')         // remove line comments
               .replace(/\s*([=+\-{}();:,<>])\s*/g, '$1') // remove spacing
               .replace(/\s+/g, ' ')                  // collapse spaces
               .trim();

        textarea.value = js;
        alert("JS Minified!");
    });
});
