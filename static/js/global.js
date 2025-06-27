// static/js/global.js
document.addEventListener("DOMContentLoaded", function () {
;
  const navItems = document.querySelectorAll(".product-nav-menu");
  const productContents = document.querySelectorAll(".product-content");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.getAttribute("data-target");

      // Remove all active states
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Show matching tab content
      productContents.forEach(section => {
        if (section.getAttribute("data-name") === target) {
          section.classList.add("show");
        } else {
          section.classList.remove("show");
        }
      });
    });
  });
});
