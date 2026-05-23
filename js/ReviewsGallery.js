document.addEventListener("DOMContentLoaded", () => {
    const reviews = [
        { img: "/img/items/hat-1.jpg", nick: "@moon_fairy", text: "Хочу всё" },
        { img: "/img/items/hat-2.jpg", nick: "@moon_fairy", text: "Хочу всё" },
        { img: "/img/items/hat-3.jpg", nick: "@moon_fairy", text: "Хочу всё" },
        { img: "/img/items/bag-2.jpg", nick: "@moon_fairy", text: "Потрясающе" },
        { img: "/img/items/bag-4.jpg", nick: "@moon_fairy", text: "Потрясающе" },
        { img: "/img/items/bag-5.jpg", nick: "@moon_fairy", text: "Потрясающе" },
        { img: "/img/items/bag-6.jpg", nick: "@moon_fairy", text: "Потрясающе" }
    ];

    const track = document.getElementById("track");
    let index = 0;

    function render() {
        track.innerHTML = ""; //удаляем содержимое чтоб карточки не дублировались

        reviews.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card"); //добавляем класс диву

            card.innerHTML = 
            `<img src="${item.img}">
                <div class="card-content">
                    <div class="nick">${item.nick}</div>
                    <div class="text">${item.text}</div>
                </div>`;

            track.appendChild(card);
        });
    }

    function update() {

        const cards = document.querySelectorAll(".card");

        cards.forEach((card, i) => {

            if (i >= index && i < index + 3) { //только три карточки начиная с индекс
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (index < reviews.length - 3) {
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