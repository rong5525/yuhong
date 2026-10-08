document.getElementById("current-year").textContent = new Date().getFullYear();

document.getElementById("print-resume").addEventListener("click", () => {
  window.print();
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
