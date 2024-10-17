// Register button and form elements
let register_button = document.getElementById("register");
let form = document.getElementById("form");

// Event listener for the register button
register_button.addEventListener("click", function (event) {
    event.preventDefault();

    // Очищаємо всі попередні повідомлення про помилки
    clearErrorMessages();

    // Get form input values
    let user_id = document.getElementById("tbody").querySelectorAll("tr").length + 1;
    let user_email = document.getElementById("email").value;
    let user_password = document.getElementById("password").value;
    let user_name = document.getElementById("name").value;
    let user_surname = document.getElementById("surname").value;
    let user_maturity = document.getElementById("maturity").value;
    let user_photo = document.getElementById("photo").files[0];
    let user_birthday = document.getElementById("birthday").value;
    let user_group = document.getElementById("group").value;
    let user_gender = document.querySelector('input[name="options-outlined"]:checked')?.value || 'N/A';
    let user_phone = document.getElementById("phone").value;

    // Валідація введених даних
    let isValid = validateForm(user_email, user_password, user_name, user_surname, user_birthday, user_phone);

    // Якщо валідація не пройдена, не додаємо дані в таблицю
    if (!isValid) {
        return;
    }

    // Додавання даних у таблицю
    let user_info = {
        id: user_id,
        email: user_email,
        password: user_password,
        name: user_name,
        surname: user_surname,
        maturity: user_maturity,
        photo: user_photo ? user_photo.name : '',
        birthday: user_birthday,
        group: user_group,
        gender: user_gender,
        phone: user_phone
    };

    let tr = document.createElement("tr");

    for (let key in user_info) {
        let td = document.createElement("td");
        td.innerText = user_info[key] ? user_info[key] : '-';
        tr.appendChild(td);
    }

    // Додаємо новий рядок у таблицю
    document.getElementById("tbody").appendChild(tr);

    // Очищення форми після успішного введення
    form.reset();
});

// Функція валідації форми
function validateForm(email, password, name, surname, birthday, phone) {
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/; // Номер телефону повинен містити 10 цифр

    // Перевірка електронної пошти
    if (!emailPattern.test(email)) {
        showErrorMessage("email", "Введіть коректний E-mail!");
        isValid = false;
    }

    // Перевірка пароля (мінімум 6 символів)
    if (password.length < 6) {
        showErrorMessage("password", "Пароль повинен містити не менше 6 символів!");
        isValid = false;
    }

    // Перевірка імені
    if (name.trim() === '') {
        showErrorMessage("name", "Ім'я є обов'язковим полем!");
        isValid = false;
    }

    // Перевірка прізвища
    if (surname.trim() === '') {
        showErrorMessage("surname", "Прізвище є обов'язковим полем!");
        isValid = false;
    }

    // Перевірка дати народження
    if (birthday === '') {
        showErrorMessage("birthday", "Дата народження є обов'язковим полем!");
        isValid = false;
    }

    // Перевірка номера телефону
    if (!phonePattern.test(phone)) {
        showErrorMessage("phone", "Введіть коректний номер телефону (10 цифр)!");
        isValid = false;
    }

    return isValid;
}

// Функція для відображення повідомлень про помилки
function showErrorMessage(fieldId, message) {
    const inputField = document.getElementById(fieldId);
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.innerText = message;
    inputField.insertAdjacentElement("afterend", errorElement);
}

// Функція для очищення повідомлень про помилки
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(error => error.remove());
}
