document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".product-nav-menu");
  const productContents = document.querySelectorAll(".product-content");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.getAttribute("data-target");

      // 🔁 Remove active class from all tabs
      navItems.forEach(i => i.classList.remove("active"));
      // ✅ Add active class to clicked tab
      item.classList.add("active");

      // 🔁 Hide all content sections
      productContents.forEach(section => {
        section.classList.remove("show");
      });

      // ✅ Show the matching section
      const targetSection = Array.from(productContents).find(section =>
        section.getAttribute("data-name") === target
      );

      if (targetSection) {
        targetSection.classList.add("show");
      }
    });
  });
});
