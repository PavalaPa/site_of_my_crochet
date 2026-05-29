const slides = [
    {image: "/img/main_image1.png", link: "product.html?id=2"},
    {image: "/img/main_image2.png", link: "product.html?id=4"},
    {image: "/img/main_image3.png", link: "product.html?id=10"}
];
let index = 0;
let link = document.getElementById("slideLink");  
let currentSlide = document.getElementById("slide1");
let nextSlide = document.getElementById("slide2");

//первая картинка
currentSlide.style.backgroundImage =
    `url('${slides[index].image}')`;

link.href = slides[index].link;

function changeSlide() {

    index = (index + 1) % slides.length; //переход к след изображению

    nextSlide.style.backgroundImage =
        `url('${slides[index].image}')`;

    link.href = slides[index].link;

    //плавное наложение
    nextSlide.style.opacity = 1;
    currentSlide.style.opacity = 0;

    //меняем местами слои (чтоб не ломалась логика слайдов надо next тоже сменить, чтобы он ссылался на другой слайд)
    [currentSlide, nextSlide] = [nextSlide, currentSlide]; //деконструирубщее присваивание
}

setInterval(changeSlide, 2000);