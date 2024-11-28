//Récupérer et afficher les posts (5 posts avec pagination) :
const postsPerPage = 5;//Affichez les 5 premiers posts sur la page.
let currentPage = 1;
let AllPosts = [];

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`Network response is NOT ok! status: ${response.status}`);
        }
        const posts = await response.json();
       posts = data;
        displayPosts();
    } catch (error) {
        console.error('Error:', error);
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Erreur lors de la récupération des données!'+ error.message; //Ajoutez des messages d'erreur si les données ne sont pas récupérées correctement.
        errorElement.classList.add( 'add error ')
        document.getElementById('errorPost').appendChild(errorElement);
    }

}

//Fonction pour charger les posts (pagination) :

//Implémentez la pagination pour afficher 5 posts à la fois, avec des boutons pour naviguer entre les pages.

 function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToDisplay = AllPosts.slice(startIndex, endIndex);

    paginatedPosts.forEach(post => {
        
    });

}

//Fonction pour afficher les posts (pagination) :
function loadAllPosts() {

}

fetchPosts();
