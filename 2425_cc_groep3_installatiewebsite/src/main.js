import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.addEventListener("DOMContentLoaded", function () {
  const stories = [
      { title: "John Doe", content: "Een verhaal over hoop en verlies achter tralies." },
      { title: "Michael S.", content: "Hoe een leven veranderde door één fout." },
      { title: "Anoniem", content: "De strijd om gerechtigheid in een gebroken systeem." }
  ];

  const storiesContainer = document.getElementById("stories-container");

  stories.forEach(story => {
      const storyCard = document.createElement("div");
      storyCard.classList.add("story-card");

      storyCard.innerHTML = `
          <h3>${story.title}</h3>
          <p>${story.content}</p>
          <button onclick="alert('Meer informatie over ${story.title}')">Lees meer</button>
      `;

      storiesContainer.appendChild(storyCard);
  });
});
