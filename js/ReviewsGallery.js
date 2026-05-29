document.addEventListener("DOMContentLoaded", () => {
    let reviews = [];
    const track = document.getElementById("track");
    let index = 0;
    //загружаем json
    function loadReviews(){
        $.getJSON('/json/reviews.json', function(data){ //jquery
            console.log("ЗАГРУЖЕННЫЕ ДАННЫЕ:", data);
            reviews = data;
            
            render();
            update();
        });
    }

    function render() {
        track.innerHTML = ""; //удаляем содержимое чтоб карточки не дублировались

        reviews.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card"); //добавляем класс диву

            card.innerHTML =
            `<a href="${item.instagram}" target="_blank" class="review-link">

                <img src="${item.img}" alt="${item.nick}">

                <div class="card-content">
                    <div class="nick">${item.nick}</div>
                    <div class="text">${item.text}</div>
                </div>

            </a>`;


            // card.innerHTML = 
            // `<img src="${item.img}">
            //     <div class="card-content">
            //         <div class="nick">${item.nick}</div>
            //         <div class="text">${item.text}</div>
            //     </div>`;

            track.appendChild(card);
        });
    }

    function update() {
        const visibleCount = getVisibleCount();
        const cards = document.querySelectorAll(".card");

        cards.forEach((card, i) => {

            if (i >= index && i < index + visibleCount) { //только три карточки начиная с индекс
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    document.getElementById("nextBtn").addEventListener("click", () => {
        const visibleCount = getVisibleCount();
        if (index < reviews.length - visibleCount) {
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

    loadReviews();

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

});