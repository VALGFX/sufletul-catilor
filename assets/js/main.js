const items = [
    {type: ['c_universale'], image: "/assets/images/entertainment/photo1.jpeg"},
    {type: ['f_universale'], image: "/assets/images/entertainment/photo2.jpg"},
    {type: ['s_universale', 'c_universale'], image: "/assets/images/entertainment/photo3.png"},
    {type: ['c_universale'], image: "/assets/images/entertainment/photo4.webp"},
    {type: ['f_universale'], image: "/assets/images/entertainment/photo5.jpeg"},
    {type: ['c_universale'], image: "/assets/images/entertainment/photo6.jpg"},
    {type: ['c_universale'], image: "/assets/images/entertainment/photo7.webp"},
    {type: ['s_universale'], image: "/assets/images/entertainment/photo8.jpg"},
    {type: ['c_universale'], image: "/assets/images/entertainment/photo9.webp"},
    {type: ['f_universale'], image: "/assets/images/entertainment/photo10.jpg"},
    {type: ['c_universal'], image: "/assets/images/entertainment/photo11.jpg"},
    {type: ['c_romane'], image: "/assets/images/entertainment/photo12.jpg"},
    {type: ['c_romane'], image: "/assets/images/entertainment/photo13.png"},
    {type: ['c_romane'], image: "/assets/images/entertainment/photo14.jpeg"},
    {type: ['c_romane'], image: "/assets/images/entertainment/photo15.jpeg"},
    {type: ['c_romane'], image: "/assets/images/entertainment/photo16.jpg"},
    {type: ['c_romane'], image: "/assets/images/entertainment/photo17.jpeg"},
    {type: ['c_romane'], image: "/assets/images/entertainment/photo18.jpg"},
    {type: ['f_romane'], image: "/assets/images/entertainment/photo19.webp"},
    {type: ['f_romane'], image: "/assets/images/entertainment/photo20.jpg"},
    {type: ['f_romane'], image: "/assets/images/entertainment/photo21.jpg"},
    {type: ['f_romane'], image: "/assets/images/entertainment/photo22.jpg"},
    {type: ['f_romane'], image: "/assets/images/entertainment/photo23.jpg"},
];

// Funcție pentru a genera un număr aleator
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function filterItems(category) {
    // Filtrarea obiectelor în funcție de categorie
    const filteredItems = items.filter(item => category === 'toate' || (item.type && item.type.includes(category)));

    // Rearanjarea aleatoare a obiectelor filtrate
    const randomOrderItems = [...filteredItems].sort(() => getRandomNumber(filteredItems.length) - 5);

    // Afișarea rezultatelor în #items-section
    const itemsSection = document.getElementById('items-section');
    itemsSection.innerHTML = ''; // Curățarea secțiunii pentru a afișa noile rezultate

    randomOrderItems.forEach(item => {
        const itemElement = document.createElement('div');

        // Adăugarea imaginii
        const imgElement = document.createElement('img');
        imgElement.src = item.image;
        imgElement.alt = item.type.join(', '); // Afișează toate categoriile separate prin virgulă
        itemElement.appendChild(imgElement);

        itemsSection.appendChild(itemElement);
    });
}

function toggleSubcategories(category) {
    const subcategories = document.getElementById(`${category}-subcategories`);
    const displayStyle = subcategories.style.display === 'block' ? 'none' : 'block';
    subcategories.style.display = displayStyle;
}

function showSubcategories(category) {
    const subcategories = document.getElementById(`${category}-subcategories`);
    subcategories.style.display = 'block';
}

function hideSubcategories() {
    const subcategoriesContainers = document.querySelectorAll('.subcategories-container');

    subcategoriesContainers.forEach(container => {
        const subcategories = container.querySelector('.subcategories');
        subcategories.style.display = 'none';
    });
}

document.querySelector('.subcategories').addEventListener('touchstart', function () {
    this.classList.toggle('touched');
});

// Afișează toate elementele la încărcarea paginii
document.addEventListener('DOMContentLoaded', function () {
    filterItems('toate');
});
