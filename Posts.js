import { fetchPosts } from './api.js';


// Récupérer et afficher les posts (5 posts avec pagination) :
const postsPerPage = 5; // Nombre de posts à afficher par page.
let currentPage = 1; // Page courante.
let AllPosts = []; // Tableau pour stocker tous les posts récupérés.

// Récupération des posts
const postsContainer = document.querySelector("#posts");

//prevPageButton.disabled = true; // Désactivation du bouton précédent au début

const prevPageButton = document.querySelector("#prevPage");
const nextPageButton = document.querySelector("#nextPage");
const pageInfoElement = document.querySelector("#pageInfo");
const errorPostElement = document.querySelector("#errorPost");

// Implémentez la pagination pour afficher 5 posts à la fois, avec des boutons pour naviguer entre les pages.

const displayPosts = () => {
  console.log('displaying posts for page', currentPage);
  
  // Vider le conteneur des posts Réinitialisation du conteneur des posts
  postsContainer.innerHTML = "";
  // Calculer les indices de début et de fin pour les posts à afficher sur la page courante.
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  // Récupérer les posts à afficher sur la page courante à partir des indices calculés.
  const paginatedPosts = AllPosts.slice(startIndex, endIndex); // Correction : Utiliser AllPosts au lieu de posts

  // Afficher les posts sur la page courante.
  paginatedPosts.forEach(post => {
    const postElement = document.createElement("div");
    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title;
    const bodyElement = document.createElement("p");
    bodyElement.textContent = post.body;

    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);
    postsContainer.appendChild(postElement);
  });

  // Affichage du numéro de page
  pageInfoElement.textContent = currentPage;
  // Gestion : Activation ou désactivation des boutons de navigation
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = endIndex >= AllPosts.length; // Correction : Utiliser endIndex au lieu de end
 
};

// Fonctions fléchées pour la navigation entre les pages
const previousPage = () => {
  if (currentPage > 1) {
    currentPage--;
    displayPosts();
  }
};

const nextPage = () => {
  if (currentPage * postsPerPage < AllPosts.length) {
    currentPage++;
    displayPosts();
  }
};


// Fonction pour afficher tous les posts (sans pagination) :
const loadAllPosts = ()=> {
  console.log('Loading all posts');
  
  postsContainer.innerHTML = '';

  AllPosts.forEach(post => {
      const postElement = document.createElement('div');

      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title;
      const bodyElement = document.createElement('p');
      bodyElement.textContent = post.body;

      postElement.appendChild(titleElement);
      postElement.appendChild(bodyElement);
      postsContainer.appendChild(postElement);
  });

  // Masquer les boutons de pagination et le numéro de page
   pageInfoElement.style.display = 'none';
 
};

 const initializePosts = async () => {
  try {
   
    AllPosts = await fetchPosts();
 
    displayPosts();
  } catch (error) {
    const errorElement = document.createElement('div');
    errorElement.textContent = 'Erreur lors de la récupération des données'+ error.message;
    errorElement.classList.add('error');
    errorPostElement.appendChild(errorElement);
  }
};


// Ajouter des écouteurs d'évènement pour les boutons de navigation
prevPageButton.addEventListener("click", previousPage);
nextPageButton.addEventListener("click", nextPage);

// Ajouter un écouteur d'évènement pour le bouton "Charger tous les posts"
document.querySelector('#loadAllPost').addEventListener('click', loadAllPosts);


export {initializePosts};
