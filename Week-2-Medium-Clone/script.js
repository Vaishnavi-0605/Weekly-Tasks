const toggleBtn = document.querySelector(".toggle-btn");
const sidebar = document.querySelector(".aside-col-links");
const sectionArea = document.querySelector(".section-area");
const rightside = document.querySelector(".right-aside");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
  console.log('clicked');
  sectionArea.classList.toggle("sidebar-closed");
  rightside.classList.toggle("right-shift");
});