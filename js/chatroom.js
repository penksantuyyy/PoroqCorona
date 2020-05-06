// SHOW SIDEPANEL
const menu_nav = document.querySelector(".navbar__menu");
const sidePanel_nav = document.querySelector(".navbar__sidepanel");
const sideClose_nav = document.querySelector(".navbar__sidepanel--close");

menu_nav.addEventListener("click", () => {
  sidePanel_nav.style.width = "48rem";
});

sideClose_nav.addEventListener("click", () => {
  sidePanel_nav.style.width = "0";
});

const chatting_container = document.querySelector(".chatting__cardContainer");

chatting_container.addEventListener("click", (e) => {
  console.log(e.offsetY);
});
