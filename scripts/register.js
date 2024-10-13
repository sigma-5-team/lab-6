let user_id = 0;

// Register button and form elements
let register_button = document.getElementById("register");
let form = document.getElementById("form");

// Event listener for the register button
register_button.addEventListener("click", function (event) {
    event.preventDefault();

    // Get form input values
    let user_email = document.getElementById("email").value;
    let user_password = document.getElementById("password").value;
    let user_name = document.getElementById("name").value;
    let user_surname = document.getElementById("surname").value;
    let user_maturity = document.getElementById("maturity").value;
    let user_photo = document.getElementById("photo").files[0];
    let user_bday = document.getElementById("bday").value;

    let user_group_select = document.getElementById("group");
    let user_group = user_group_select[user_group_select.selectedIndex].value;

    let user_gender = document.querySelector('input[type="radio"]:checked').value

    let user_phone = document.getElementById("phone").value;

    // Increment the user_id
    user_id++;

    // Update user_info array with the latest values
    let user_info = {
        id: user_id,
        email: user_email,
        password: user_password,
        name: user_name,
        surname: user_surname,
        maturity: user_maturity,
        photo: user_photo,
        birthday: user_bday,
        group: user_group,
        gender: user_gender,
        phone: user_phone
    };

    // Create a new row and populate it with user info
    let table_body = document.getElementById("tbody");
    let tr = document.createElement("tr");

    // Add each user detail as a table cell
    for (let key in user_info) {
        let td = document.createElement("td");

        if (key === "photo" && user_info[key]) {
            // Display photo as an image
            td.appendChild(createImageElement(user_info[key], 40, 40));
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
    checkbox.id = user_id;

    td.appendChild(checkbox);
    tr.appendChild(td);

    // Append the new row to the table body
    table_body.appendChild(tr);

    // Reset the form after submission
    form.reset();
});

// Function to create an image element
function createImageElement(file, width, height) {
    let img = document.createElement("img");
    const reader = new FileReader();
    img.height = height;
    img.width = width;

    reader.addEventListener("load", () => {
        img.src = reader.result;  // Convert image file to base64 string
    });

    if (file) {
        reader.readAsDataURL(file);
    }

    return img;
}

// Event listener for the delete button
let delete_button = document.getElementById("delete");
delete_button.addEventListener("click", function () {
    let checked_lines = document.querySelectorAll('input[name="line"]:checked');

    checked_lines.forEach(function (checkbox) {
        let row = checkbox.closest('tr');
        if (row) {
            row.remove();
        }
    });
});

// Event listener for the copy button
let copy_button = document.getElementById("copy");
copy_button.addEventListener("click", function () {
    let checked_lines = document.querySelectorAll('input[name="line"]:checked');

    checked_lines.forEach(function (checkbox) {
        checkbox.checked = false;

        let row = checkbox.closest('tr');
        if (row) {
            let clone = row.cloneNode(true);
            row.after(clone);
        }
    });
});
