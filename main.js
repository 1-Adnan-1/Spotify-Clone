import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();
elements.form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  const query = e.target[0].value;
  if (!query) {
    alert("Lütfen bir müzik ismi giriniz!");
    return;
  }

  updateTitle(`${query} İçin Sonuçlar`);
  api.searchMusic(query);
});
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});

const playMusic = (url) => {
  elements.audioSource.src = url;
  elements.audio.load();
  elements.audio.play();
};

const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card"); 
    renderPlayingInfo(parent.dataset);
    console.log(parent.dataset);
    playMusic(parent.dataset.url);
  }
};

document.addEventListener("click", handleClick);
const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
