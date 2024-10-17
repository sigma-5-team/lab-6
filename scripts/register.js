let user_phone_input = document.getElementById("phone");
let user_phone_mask = IMask(
    user_phone_input,
    {mask: '+{38} (000) 000-00-00'}
)

// Register button and form elements
let register_button = document.getElementById("register");
let form = document.getElementById("form");

// Event listener for the register button
register_button.addEventListener("click", function (event) {
    event.preventDefault();

    // Create table body
    let table_body = document.getElementById("tbody");

    // Get form input values
    let user_id = table_body.querySelectorAll("tr").length + 1;
    let user_email = document.getElementById("email").value;
    let user_password = document.getElementById("password").value;
    let user_name = document.getElementById("name").value;
    let user_surname = document.getElementById("surname").value;
    let user_maturity = document.getElementById("maturity").value;
    let user_photo = document.getElementById("photo").files[0];
    let user_birthday = document.getElementById("birthday").value;

    let user_group_select = document.getElementById("group");
    let user_group = user_group_select[user_group_select.selectedIndex].value;

    let user_gender = document.querySelector('input[type="radio"]:checked').value
    let user_phone = user_phone_mask.value;

    // Update user_info array with the latest values
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

    // Create a new row and populate it with user info
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
    table_body.appendChild(tr);

    // Reset the form after submission
    form.reset();

    // Scroll to bottom after pressing the button
    document.documentElement.scrollTop = document.documentElement.clientHeight;
});

// Function to create an image element
function readImage(file, width, height) {
    let img = document.createElement("img");
    const reader = new FileReader();
    img.height = height;
    img.width = width;

    reader.addEventListener("load", () => {
        img.src = reader.result.toString();
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

