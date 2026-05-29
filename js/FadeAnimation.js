$(window).on("scroll", function () { // выполнение при прокрутке страницы
    $(".fade").each(function () {
        const top = $(this).offset().top; //расстояние от элемента до верха
        const scroll = $(window).scrollTop(); //позиция прокрутки стр
        const windowHeight = $(window).height(); //высота окна

        if (scroll + windowHeight > top + 100) { //проверка появления эл на экране
            $(this).animate(
                { opacity: 1 },
                { duration: 2000, 
                  step: function(now) { //анимируем по шагам
                        const translate = 60 - (60 * now);
                        $(this).css(
                            "transform",
                            `translateY(${translate}px)`
                        );
                    },
                    easing: "swing" //плавное ускорене
                }
            );
            $(this).removeClass("fade"); //чтобы не было повторной анимации
        }
    });
});