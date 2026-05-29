document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("collectionsGrid");
    const btn = document.getElementById("showMoreBtn");

    let collections = [];
    let visibleCount = getVisibleCount();

    function loadCollections() {

        $.getJSON("/json/collections.json", function(data) {
            collections = data;

            render();
        });
    }

    function render() {

        grid.innerHTML = "";

        const visibleItems = collections.slice(0, visibleCount);

        visibleItems.forEach(col => {

            const card = document.createElement("div");
            card.classList.add("collectionCard");

            card.innerHTML = `
                <img src="${col.image}" alt="${col.name}" style="width:100%;">
                <h1>${col.name}</h1>
                <div class="overlay">
                    <div class="cardContent">
                        <p>${col.description}</p>
                    </div>
                </div>
                <button onclick="window.location.href=${col.link} class="BtnGo">Перейти</button>
            `;

            grid.appendChild(card);
        });

        toggleButton();
    }

    function toggleButton() {

        if (collections.length > visibleCount) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }

    btn.addEventListener("click", () => {

        visibleCount += getVisibleCount();
        render();
    });

    // добавляем ограничения на width
    function getVisibleCount() {

        if (window.innerWidth <= 900) {
            return 1;
        }

        if (window.innerWidth <= 1200) {
            return 2;
        }

        return 3;
    }

    loadCollections();
});