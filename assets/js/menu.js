function toggleMenu() {
    var menuLinks = document.querySelector('.nav-links');
    menuLinks.classList.toggle('show-menu');
}

function hideMenu() {
    var menuLinks = document.querySelector(".nav-links");
    menuLinks.style.right = "-200px";
    document.querySelector(".open").style.display = "block";
}

function showMenu() {
    var menuLinks = document.querySelector(".nav-links");
    menuLinks.style.right = "0";
    document.querySelector(".open").style.display = "none";
}
