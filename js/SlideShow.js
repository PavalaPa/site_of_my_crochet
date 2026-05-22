const images = [
    "/img/main_image1.png",
    "/img/main_image2.png",
    "/img/main_image3.png"
];

let index = 0;
let link = document.getElementById("slideLink");  
let currentSlide = document.getElementById("slide1");
let nextSlide = document.getElementById("slide2");

//первая картинка
currentSlide.style.backgroundImage =
    `url('${images[index]}')`;

link.href = images[index]; //СМЕНИ НА НОРМ ССЫЛКИ

function changeSlide() {

    index = (index + 1) % images.length; //переход к след изображению

    nextSlide.style.backgroundImage =
        `url('${images[index]}')`;

    link.href = images[index]; //ТУТ ТОЖЕ НАДО СМЕНИТЬ ПОТОМ

    //плавное наложение
    nextSlide.style.opacity = 1;
    currentSlide.style.opacity = 0;

    //меняем местами слои (чтоб не ломалась логика слайдов надо next тоже сменить, чтобы он ссылался на другой слайд)
    [currentSlide, nextSlide] = [nextSlide, currentSlide]; //деконструирубщее присваивание
}

setInterval(changeSlide, 2000);