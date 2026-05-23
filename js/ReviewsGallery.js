document.addEventListener("DOMContentLoaded", () => {

    const data = [
        { img: "/img/1.jpg", nick: "@forest_wanderer", text: "Невероятная атмосфера" },
        { img: "/img/2.jpg", nick: "@moon_thread", text: "Очень тонкая работа" },
        { img: "/img/3.jpg", nick: "@lost_cartographer", text: "Как из другого мира" },
        { img: "/img/4.jpg", nick: "@sea_stitch", text: "Уют и магия" },
        { img: "/img/5.jpg", nick: "@night_loom", text: "Потрясающе" },
        { img: "/img/6.jpg", nick: "@ember_tales", text: "Сказочные артефакты" },
        { img: "/img/7.jpg", nick: "@hidden_fable", text: "Хочу всё" }
    ];

    const track = document.getElementById("track");

    let index = 0;

    function render() {
        track.innerHTML = "";

        data.forEach(item => {

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${item.img}">
                <div class="card-content">
                    <div class="nick">${item.nick}</div>
                    <div class="text">${item.text}</div>
                </div>
            `;

            track.appendChild(card);
        });
    }

    function update() {

        const cards = document.querySelectorAll(".card");

        cards.forEach((card, i) => {

            if (i >= index && i < index + 3) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (index < data.length - 3) {
            index++;
            update();
        }
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (index > 0) {
            index--;
            update();
        }
    });

    render();
    update();
});