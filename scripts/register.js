// Register button and form elements
let register_button = document.getElementById("register");
let form = document.getElementById("form");

// Input field references
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let nameInput = document.getElementById("name");
let surnameInput = document.getElementById("surname");
let birthdayInput = document.getElementById("birthday");
let phoneInput = document.getElementById("phone");
let genderInput = document.querySelector('input[name="options-outlined"]');
let photoInput = document.getElementById("photo");

IMask(
    phoneInput,
    {mask: '+{38} (\\000) 000-00-00'}
)

// Validation rules
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation function on blur
emailInput.addEventListener('blur', () => validateInput(emailInput, emailPattern, "Введіть коректний E-mail!"));
passwordInput.addEventListener('blur', () => validateInput(passwordInput, /.{6,}/, "Пароль повинен містити не менше 6 символів!"));
nameInput.addEventListener('blur', () => validateInput(nameInput, /.+/, "Ім'я є обов'язковим полем!"));
surnameInput.addEventListener('blur', () => validateInput(surnameInput, /.+/, "Прізвище є обов'язковим полем!"));
birthdayInput.addEventListener('blur', () => validateInput(birthdayInput, /.+/, "Дата народження є обов'язковим полем!"));
phoneInput.addEventListener('blur', () => validateInput(phoneInput, /.{19}/, "Введіть коректний номер телефону!"));
photoInput.addEventListener('blur', validatePhoto);
genderInput.addEventListener('blur', validateGender);

// Register button event listener
register_button.addEventListener("click", function (event) {
    event.preventDefault();
    clearErrorMessages();


    // Get form input values
    let user_id = document.getElementById("tbody").querySelectorAll("tr").length + 1;
    let user_email = emailInput.value;
    let user_password = passwordInput.value;
    let user_name = nameInput.value;
    let user_surname = surnameInput.value;
    let user_maturity = document.getElementById("maturity").value;
    let user_photo = photoInput.files[0]; // Only get the first file
    let user_birthday = birthdayInput.value;
    let user_group = document.getElementById("group").value;
    let user_gender = document.querySelector('input[name="options-outlined"]:checked') ? document.querySelector('input[name="options-outlined"]:checked').value : '';
    let user_phone = phoneInput.value;

    // Validate all fields and show error messages
    validateInput(emailInput, emailPattern, "Введіть коректний E-mail!");
    validateInput(passwordInput, /.{6,}/, "Пароль повинен містити не менше 6 символів!");
    validateInput(nameInput, /.+/, "Ім'я є обов'язковим полем!");
    validateInput(surnameInput, /.+/, "Прізвище є обов'язковим полем!");
    validateInput(birthdayInput, /.+/, "Дата народження є обов'язковим полем!");
    validateInput(phoneInput, /.{19}/, "Введіть коректний номер телефону!");
    validatePhoto();
    validateGender();

    // Validate all fields
    let isValid = validateForm(user_email, user_password, user_name, user_surname, user_birthday, user_phone, user_gender);

    if (!isValid) {
        return; // Do not proceed if form is invalid
    }

    // Create user info object
    let user_info = {
        id: user_id,
        email: user_email,
        password: user_password,
        name: user_name,
        surname: user_surname,
        maturity: user_maturity,
        photo: user_photo,
        birthday: user_birthday,
        group: user_group,
        gender: user_gender,
        phone: user_phone
    };

    // Create new table row with user details
    let tr = document.createElement("tr");

    // Add each user detail as a table cell
    for (let key in user_info) {
        let td = document.createElement("td");

        if (key === "photo" && user_info[key]) {
            // Display photo as an image
            td.appendChild(readImage(user_info[key], 40, 40));
        } else {
            // Append other details as text
            td.innerText = user_info[key];
        }

        tr.appendChild(td);
    }

    // Add a checkbox for selecting the row
    let td = document.createElement("td");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "line";
    checkbox.id = user_id.toString();

    td.appendChild(checkbox);
    tr.appendChild(td);

    // Append the new row to the table body
    document.getElementById("tbody").appendChild(tr);

    // Add the new row to the table
    document.getElementById("tbody").appendChild(tr);

    // Reset form after submission
    form.reset();
});

// Function to validate individual input fields
function validateInput(input, pattern, errorMessage) {
    let value = input.value;
    if (!pattern.test(value)) {
        showErrorMessage(input, errorMessage);
    } else {
        clearErrorMessage(input);
    }
}

// Function to validate the photo input
function validatePhoto() {
    if (photoInput.files.length === 0) {
        showErrorMessage(photoInput, "Фото є обов'язковим!");
    } else {
        clearErrorMessage(photoInput);
    }
}

// Function to validate gender selection
function validateGender() {
    let selectedGender = document.querySelector('input[name="options-outlined"]:checked');
    if (!selectedGender) {
        showErrorMessage(genderInput, "Стать є обов'язковою!");
    } else {
        clearErrorMessage(genderInput);
    }
}

// Function to validate the entire form
function validateForm(email, password, name, surname, birthday, phone, gender) {
    let isValid = true;
    if (!emailPattern.test(email)) isValid = false;
    if (password.length < 6) isValid = false;
    if (name.trim() === '') isValid = false;
    if (surname.trim() === '') isValid = false;
    if (birthday.trim() === '') isValid = false;
    if (phone.length !== 19) isValid = false;
    if (!gender) isValid = false;

    // Validate photo
    if (photoInput.files.length === 0) {
        isValid = false;
        validatePhoto();
    }

    return isValid;
}

// Function to create an image element
function readImage(file, width, height) {
    let img = document.createElement("img");
    const reader = new FileReader();
    img.height = height;
    img.width = width;

    reader.addEventListener("load", () => {
        img.src = reader.result;
    });

    // Check if file is valid before calling readAsDataURL
    if (file instanceof Blob) {
        reader.readAsDataURL(file);
    } else {
        console.error("Invalid file passed to readImage function.");
    }

    return img;
}

// Show error message under the input field
function showErrorMessage(input, message) {
    clearErrorMessage(input); // Clear previous error message if any
    let errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.innerText = message;
    input.insertAdjacentElement("afterend", errorElement);
}

// Clear the error message from the input field
function clearErrorMessage(input) {
    let errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
    }
}

// Clear all error messages
function clearErrorMessages() {
    document.querySelectorAll(".error-message").forEach(error => error.remove());
}

// Event listener for the delete button
let delete_button = document.getElementById("delete");
delete_button.addEventListener("click", function () {
    let checked_lines = document.querySelectorAll('input[name="line"]:checked');

    if (checked_lines.length === 0) {
        alert("No lines chosen!");
    } else {
        checked_lines.forEach(function (checkbox) {
            let row = checkbox.closest("tr");
            if (row) {
                row.remove();
            } else {
                alert("No chosen lines");
            }
        });
    }
});

// Event listener for the copy button
let copy_button = document.getElementById("copy");
copy_button.addEventListener("click", function () {
    let checked_lines = document.querySelectorAll('input[name="line"]:checked');

    if (checked_lines.length === 0) {
        alert("No lines chosen!");
    } else {
        checked_lines.forEach(function (checkbox) {
            checkbox.checked = false;

            let row = checkbox.closest("tr");
            if (row) {
                let clone = row.cloneNode(true);
                row.after(clone);
            }
        });
    }
});