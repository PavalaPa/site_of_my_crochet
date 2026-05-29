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

    loadReviews();

});