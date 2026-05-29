$(window).on("scroll", function () { // выполнение при прокрутке страницы
    const $el = $(".reviews-title"); //jquery элемент
    const top = $el.offset().top; //расстояние от элемента до верха
    const scroll = $(window).scrollTop(); //позиция прокрутки стр
    const windowHeight = $(window).height(); //высота окна

    if ($el.data("animated")) return; // выход если анимировали
    if (scroll + windowHeight > top + 100) { //проверка появления эл на экране

        $el.data("animated", true);

        const text = $el.text();
        $el.text("");
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                $el.text($el.text() + text[i]);
                i++;
                setTimeout(typeWriter, 80);
            }
        }

        typeWriter();
    }
});