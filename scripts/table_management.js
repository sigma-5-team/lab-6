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

let select_all_button = document.getElementById("select-all");
select_all_button.addEventListener("click", function () {
    let checked_lines = document.querySelectorAll('input[name="line"]');

    checked_lines.forEach(function (checkbox) {
        checkbox.checked = true;
    });
})