document.addEventListener("DOMContentLoaded", () => {

    const menu = document.getElementById("favoritesMenu");

    if (!menu) return; // если на странице нет меню — ничего не делаем

    function renderFavorites() {

        const favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        menu.innerHTML = "";

        if (favorites.length === 0) {

            const empty = document.createElement("a");
            empty.textContent = "Корзина пуста.";
            menu.appendChild(empty);
            return;
        }

        $.getJSON("/json/products.json", function(products) {

            favorites.forEach(id => {

                const product = products.find(p => p.id === id);

                if (product) {

                    const link = document.createElement("a");

                    link.href = `/product.html?id=${product.id}`;

                    link.textContent = product.name;

                    menu.appendChild(link);
                }
            });
        });
    }

    // сразу рисуем корзину при загрузке страницы
    renderFavorites();

    // делаем функцию доступной глобально (чтобы вызывать после добавления/удаления)
    window.renderFavorites = renderFavorites;
});