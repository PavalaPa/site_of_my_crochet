document.addEventListener("DOMContentLoaded", () => {

    const id = new URLSearchParams(window.location.search).get("id");

    const mainImage = document.getElementById("mainImage");
    const gallery = document.getElementById("gallery");

    const nameEl = document.getElementById("productName");
    const priceEl = document.getElementById("productPrice");
    const descEl = document.getElementById("productDescription");
    const compositionEl = document.getElementById("composition");
    const seasonsEl = document.getElementById("seasons");
    const favImg = document.getElementById("favImg");

    $.getJSON("/json/products.json", function(products) {

        const product = products.find(p => p.id == id);
        if (!product) return;

        // ОСНОВНАЯ ИНФОРМАЦИЯ
        nameEl.textContent = product.name;
        priceEl.textContent = product.price_ru + " rub";
        descEl.textContent = product.description || "";
        compositionEl.textContent = product.composition || "—";

        mainImage.src = product.image;

        seasonsEl.innerHTML = "";

        if (product.season && product.season.length > 0) {

            product.season.forEach(season => {

                const div = document.createElement("div");
                div.textContent = season;

                seasonsEl.appendChild(div);
            });
        } else {
            seasonsEl.innerHTML = "<div>—</div>";
        }
        // ГАЛЕРЕЯ
        // /img/items/название/1.jpg

        gallery.innerHTML = "";

        const basePath = `/img/items/${product.page}/`;

        const imagesCount = product.images_count || 1;

        mainImage.src = `${basePath}1.jpg`;

        for (let i = 1; i <= imagesCount; i++) {

            const imgPath = `${basePath}${i}.jpg`;

            const img = document.createElement("img");
            img.src = imgPath;

            img.addEventListener("click", () => {
                mainImage.src = imgPath;
            });

            gallery.appendChild(img);
        }

        // ИЗБРАННОЕ

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        const isFav = favorites.includes(product.id);

        favImg.src = isFav
            ? "/img/icons/favorite_fill.svg"
            : "/img/icons/favorite.svg";

        favImg.addEventListener("click", () => {

            if (favorites.includes(product.id)) {

                favorites = favorites.filter(id => id !== product.id);
                favImg.src = "/img/icons/favorite.svg";

            } else {

                favorites.push(product.id);
                favImg.src = "/img/icons/favorite_fill.svg";
            }

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );
            renderFavorites();
        });
    });
});