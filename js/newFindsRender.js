document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("newFindsGrid");
    const btn = document.getElementById("showMoreBtnFinds");

    let finds = [];
    let visibleCount = 4;

    function loadFinds() {

        $.getJSON("/json/products.json", function(data) {
            finds = data;

            render();
            renderFavorites();
        });
    }

function render() {

    grid.innerHTML = "";

    const visibleItems = finds.slice(0, visibleCount);

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    visibleItems.forEach(col => {

        const isFav = favorites.includes(col.id);

        const card = document.createElement("div");
        card.classList.add("newFindsCard");

        card.innerHTML = `
            <a href="/product.html?id=${col.id}" class="findContent">

                <img class="favImg"
                     src="${isFav ? '/img/icons/favorite_fill.svg' : '/img/icons/favorite.svg'}"
                     alt="fav"
                     style="width:32px;">

                <img class="findImg" src="${col.image}" alt="${col.name}">
                <h1>${col.name}</h1>
            </a>

            <h2>${col.price_ru}rub</h2>
        `;

        grid.appendChild(card);

            const fav = card.querySelector(".favImg"); //обработка нажатия на fav
            fav.addEventListener("click", (event) => {
                event.preventDefault(); //отменяем стандартное действие элемента, чтобы не переходить 
                // на страницу товара 
                let favorites = JSON.parse(localStorage.getItem("favorites")) || []; //парсим фав или пустой массив
                if (favorites.includes(col.id)) {  //если товар в избранном
                    favorites = favorites.filter(id => id !== col.id);
                } 
                else {
                    favorites.push(col.id);
                }
                localStorage.setItem( // сохраняем
                    "favorites",
                    JSON.stringify(favorites)
                );
                render();
                renderFavorites();
            });
        });

        toggleButton();
    }

    function renderFavorites() {

        const menu = document.getElementById("favoritesMenu");

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        menu.innerHTML = "";

        favorites.forEach(id => {

            const product = finds.find(
                item => item.id === id
            );

            if (product) {

                const link = document.createElement("a");

                link.href =
                    `/product.html?id=${product.id}`;

                link.textContent = product.name;

                menu.appendChild(link);
            }
        });
    }

    function toggleButton() {

        if (finds.length > visibleCount) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }

    btn.addEventListener("click", () => {

        visibleCount += 4;
        render();
    });
    loadFinds();
});