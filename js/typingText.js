document.addEventListener("DOMContentLoaded", () => {
    const $el = $(".reviews-title"); //$ вместо document.querySelector, т.к. jquery объект
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
});