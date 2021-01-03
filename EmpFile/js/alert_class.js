class Alert{

    // Generate and display CRUD or exception alert
    static showCrudAlert(type){
        let message;
        const alertPlacement = document.querySelector("#employee-records");
        const node = alertPlacement.children[3];
        const alertBox = document.createElement("div");
        if(type === "insert-success"){
            message = "Employee successfully added!";
            alertBox.classList.add("alert-success");
        }
        else if(type === "delete-success"){
            message = "Employee successfully deleted!";
            alertBox.classList.add("alert-success");
        }
        else if(type === "all-delete-success"){
            message = "All employees successfully deleted!";
            alertBox.classList.add("alert-success");
        }
        else if(type === "no-employees-to-delete"){
            message = "There are no employees to remove.";
            alertBox.classList.add("alert-danger");
        }
        else if(type === "edit-success"){
            message = "Employee details successfully edited!";
            alertBox.classList.add("alert-success");
        }
        else if(type === "unforseen-error"){
            message = "The operation failed. Your storage might be full.";
            alertBox.classList.add("alert-danger");
        }
        alertBox.classList.add("alert");
        alertBox.appendChild(document.createTextNode(message));
        window.scrollTo(0,0);
        hideForm();
        alertPlacement.insertBefore(alertBox, node);
        window.setTimeout(function(){
            alertBox.remove();
        }, 3000);
    }  

    // Generate and display form validation alert
    static showVAlidationAlert(type){
        let message;
        const alertPlacement = document.querySelector("form");
        const node = alertPlacement.children[1];
        const alertBox = document.createElement("div");
        if(type === "employee-exists"){
            message = "You already have that employee registered";
            alertBox.classList.add("alert-danger");
        }
        else if(type === "missing-input-entry"){
            message = "Please fill all fields";
            alertBox.classList.add("alert-warning");
        }
        else if(type === "invalid-ID"){
            message = "ID must be between 1 and 1000.";
            alertBox.classList.add("alert-warning");
        }
        else if(type === "invalid-name"){
            message = "Invalid name.";
            alertBox.classList.add("alert-warning");
        }
        else if(type === "invalid-surname"){
            message = "Invalid surname.";
            alertBox.classList.add("alert-warning");
        }
        else if(type === "invalid-age"){
            message = "Age must be between 15 and 100.";
            alertBox.classList.add("alert-warning");
        }
        else if(type === "invalid-occupation"){
            message = "Invalid occupation.";
            alertBox.classList.add("alert-warning");
        }
        else if(type === "invalid-cell"){
            message = "Invalid cell.";
            alertBox.classList.add("alert-warning");
        }
        else if(type === "invalid-email"){
            message = "Invalid email.";
            alertBox.classList.add("alert-warning");
        }
        else if(type === "no-edit"){
            message = "No employee details have been changed";
            alertBox.classList.add("alert-warning");
        }
        alertBox.classList.add("alert");
        alertBox.appendChild(document.createTextNode(message));
        window.scrollTo(0,0);
        alertPlacement.insertBefore(alertBox, node);
        window.setTimeout(function(){
            alertBox.remove();
        }, 3000);
    }

}