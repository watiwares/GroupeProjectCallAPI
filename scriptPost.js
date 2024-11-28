// Récupérer et afficher les posts (5 posts avec pagination) :
const postsPerPage = 5; // Nombre de posts à afficher par page.
let currentPage = 1; // Page courante.
let AllPosts = []; // Tableau pour stocker tous les posts récupérés.

async function fetchPosts() {
  try {
    // Récupération des posts
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // Vérification de la réponse
    if (!response.ok) {
      throw new Error(`Network response is NOT ok! status: ${response.status}`);
    }
    // Conversion de la réponse en JSON
    const posts = await response.json();
    // Ajout des posts récupérés à AllPosts
    AllPosts = posts;
    // Appel de la fonction displayPosts
    displayPosts();
  } catch (error) {
    console.error("Error:", error);
    const errorElement = document.createElement("div");
    errorElement.textContent =
      "Erreur lors de la récupération des données! " + error.message; // Ajoutez des messages d'erreur si les données ne sont pas récupérées correctement.
    errorElement.classList.add("error"); // Correction : Supprimer l'espace avant 'error'
    document.getElementById("errorPost").appendChild(errorElement);
  }
}

// Fonction pour charger les posts (pagination) :

// Implémentez la pagination pour afficher 5 posts à la fois, avec des boutons pour naviguer entre les pages.

function displayPosts() {
  // Vider le conteneur des posts Réinitialisation du conteneur des posts
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";
  // Calculer les indices de début et de fin pour les posts à afficher sur la page courante.
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Récupérer les posts à afficher sur la page courante à partir des indices calculés.
  const paginatedPosts = AllPosts.slice(startIndex, endIndex); // Correction : Utiliser AllPosts au lieu de posts

  // Afficher les posts sur la page courante.
  paginatedPosts.forEach((post) => {
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
  document.getElementById("pageNumber").textContent = `Page: ${currentPage}`;
  // Gestion : Activation ou désactivation des boutons de navigation
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = endIndex >= AllPosts.length; // Correction : Utiliser endIndex au lieu de end
}

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

// Ajouter des écouteurs d'évènement pour les boutons de navigation
document.getElementById("prevPage").addEventListener("click", previousPage);
document.getElementById("nextPage").addEventListener("click", nextPage);

// Fonction pour afficher tous les posts (sans pagination) :
function loadAllPosts() {
  // Cette fonction pour charger tous les posts sans pagination si nécessaire.
  const postsContainer = document.getElementById('posts');
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
  document.getElementById('pageNumber').style.display = 'none';
  document.getElementById('prevPage').style.display = 'none';
  document.getElementById('nextPage').style.display = 'none';
}

// Ajouter un écouteur d'évènement pour le bouton "Charger tous les posts"
document.getElementById('loadAllPost').addEventListener('click', loadAllPosts);

fetchPosts();
