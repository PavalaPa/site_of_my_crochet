function sendMail() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const comment = document.getElementById("comment");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const btn = document.getElementById("sendButton");
    //превращаем корзину в текст
    const cart = favorites.length
        ? favorites.join(", ")
        : "Корзина пуста";

    const templateParams = {
        name: name.value,
        email: email.value,
        comment: comment.value,
        cart: cart
    };

    btn.disabled = true; //блокируем, чтобы много не отправляли
    btn.textContent = "Отправка...";
    alert("Отправка заказа, пожалуйста подождите...");


    emailjs.send(
        "service_7ab4mhc",
        "template_oskhaib",
        templateParams
    )
    .then(() => {
        name.value = "";
        email.value = "";
        comment.value = "";
        alert("Заказ отправлен! С вами свяжется торговец!");
        btn.disabled = false;
        btn.textContent = "Отправить"

        localStorage.removeItem("favorites");
        render();
        renderFavorites();

    })
    .catch((error) => {
        console.error("Ошибка отправки:", error);
        alert("Ошибка отправки заказа");
    });
}
document.getElementById("orderForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();
        sendMail();
    });