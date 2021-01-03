class GUI{

    // Load all employees from local storage to GUI table
    static loadAllEmployees(){
        if(Storage.hasEmployees()){
            let employees = Storage.getAllEmployees();
            for(let i = 0; i < employees.length; i++){
                let element = document.createElement("tr");
                element.classList.add("employeeData");
                element.innerHTML = `
                <td>${employees[i].empID}</td>
                <td>${employees[i].name}</td>
                <td class="col-hide-p col-hide-t">${employees[i].surname}</td>
                <td class="col-hide-p col-hide-t col-hide-d">${employees[i].age}</td>
                <td class="col-hide-p col-hide-t col-hide-d">${employees[i].gender}</td>
                <td class="col-hide-p">${employees[i].department}</td>
                <td class="col-hide-p col-hide-t">${employees[i].occupation}</td>
                <td class="col-hide-p col-hide-t col-hide-d">${employees[i].cell}</td>
                <td class="col-hide-p col-hide-t col-hide-d">${employees[i].email}</td>
                    <td class="action-btn-container">
                        <button class="btn btn-primary view-emp-btn">
                            <i class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-warning edit-emp-btn">
                            <i class="fa fa-cogs" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-danger delete-emp-btn">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>`;
                let elementPlacement = document.querySelector("tbody");
                elementPlacement.appendChild(element);
            }
        }
    }

    // Add employee to GUI table
    static addEmployee(employee){       
        let element = `
            <tr class="employeeData">
                <td>${employee.empID}</td>
                <td>${employee.name}</td>
                <td class="col-hide-p col-hide-t">${employee.surname}</td>
                <td class="col-hide-p col-hide-t col-hide-d">${employee.age}</td>
                <td class="col-hide-p col-hide-t col-hide-d">${employee.gender}</td>
                <td class="col-hide-p">${employee.department}</td>
                <td class="col-hide-p col-hide-t">${employee.occupation}</td>
                <td class="col-hide-p col-hide-t col-hide-d">${employee.cell}</td>
                <td class="col-hide-p col-hide-t col-hide-d">${employee.email}</td>
                <td class="action-btn-container">
                    <button class="btn btn-primary view-emp-btn">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-warning edit-emp-btn">
                        <i class="fa fa-cogs" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-danger delete-emp-btn">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>`;
        document.querySelector("tbody").insertAdjacentHTML("beforeend", element);
    }

    // Delete all employees from GUI table
    static deleteAllEmployees(){
        let rows = document.querySelectorAll(".employeeData");
        for(let i = 0; i < rows.length; i++){
            rows[i].remove();
        }
    }

    // Delete a single employee from GUI table
    static deleteEmployee(elementToDelete){
        elementToDelete.remove();
    }

    // View Employee Data
    static viewEmployee(selectedEmployee){
        document.getElementById("id").value = selectedEmployee.empID;
        document.getElementById("name").value = selectedEmployee.name;
        document.getElementById("surname").value = selectedEmployee.surname;
        document.getElementById("age").value = selectedEmployee.age;
        document.getElementById("gender").value = selectedEmployee.gender;
        document.getElementById("department").value = selectedEmployee.department;
        document.getElementById("occupation").value = selectedEmployee.occupation;
        document.getElementById("cell").value = selectedEmployee.cell;
        document.getElementById("email").value = selectedEmployee.email;
    }

    // Retrieve form data
    static getFormValues(){
        let id = document.querySelector("#id-input").value;
        let name = document.querySelector("#name-input").value;
        let surname = document.querySelector("#surname-input").value;
        let age = document.querySelector("#age-input").value;
        let gender = document.querySelector("input[name='newEmpGender']:checked").value;
        let department = document.getElementById("department-select").value;
        let occupation = document.querySelector("#occupation-input").value;
        let cell = document.querySelector("#cell-input").value;
        let email = document.querySelector("#email-input").value;
        name = GUI.sanatizeString(name);
        surname = GUI.sanatizeString(surname);
        occupation = GUI.sanatizeString(occupation);
        return [id, name, surname, age, gender, department, occupation, cell, email];
    }

     // Sanitize string values, first letter uppercase and trimmed
     static sanatizeString(value){
        value = value.trim();
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return value;
    }

    // Retrieve employee values from GUI table
    static getRowData(row){
        let id = row.cells[0].textContent;
        let name = row.cells[1].textContent;
        let surname = row.cells[2].textContent;
        let age = row.cells[3].textContent;
        let gender = row.cells[4].textContent;
        let department = row.cells[5].textContent;
        let occupation = row.cells[6].textContent;
        let cell = row.cells[7].textContent;
        let email = row.cells[8].textContent;
        return [id, name, surname, age, gender, department, occupation, cell, email];
    }

    // Show editable employee data
    static showEditableData(editableData){
        document.getElementById("id-input").value = editableData[0];
        document.getElementById("name-input").value = editableData[1];
        document.getElementById("surname-input").value = editableData[2];
        document.getElementById("age-input").value = editableData[3] ;
        document.getElementById("department-select").value = editableData[5];
        document.getElementById("occupation-input").value = editableData[6];
        document.getElementById("cell-input").value = editableData[7];
        document.getElementById("email-input").value = editableData[8];
        let radios = document.querySelectorAll(".form-check-input");   
        if(editableData[4] === "Male"){
            radios[0].checked = true;
        }
        else if(editableData[4] === "Female"){
            radios[1].checked = true;
        }
        else{
            radios[2].checked = true;
        }   
        window.scrollTo(0,0);
    }

    // Filter employees by name
    static filterEmployees(text){
        let rows = document.querySelectorAll(".employeeData");
        for (let i = 0; i < rows.length; i++) {
            let nameColumn = rows[i].getElementsByTagName("td")[1];
            if(nameColumn){
                let employeeName = nameColumn.textContent;
                if(employeeName.toLowerCase().indexOf(text) > -1){
                    rows[i].style.display = "";
                }
                else{
                    rows[i].style.display = "none";
                }
            }
        }
    }

    // Reload and refresh the page
    static reloadPage(){
        location.reload();
    }

    // Clear form input fields
    static clearInputFields(){
       const form = document.querySelector("#add-emp-form");
       form.reset();
    }   

    // Change display property of save employee buttons
    static showSaveButtons(){
        let saveEditBtn;
        let cancelEditBtn;
        cancelNewEmpBtn.style.display = "inline-block";
        saveNewEmpBtn.style.display = "inline-block";
        saveEditBtn = document.querySelector("#save-edit-btn");
        cancelEditBtn = document.querySelector("#cancel-edit-btn");
        saveEditBtn.style.display = "none";
        cancelEditBtn.style.display = "none";
    }

    // Change display property of edit employee buttons
    static showEditButtons(){
        let saveEditBtn;
        let cancelEditBtn;
        cancelNewEmpBtn.style.display = "none";
        saveNewEmpBtn.style.display = "none";
        saveEditBtn = document.querySelector("#save-edit-btn");
        cancelEditBtn = document.querySelector("#cancel-edit-btn");
        saveEditBtn.style.display = "inline-block";
        cancelEditBtn.style.display = "inline-block";
    }

    // Disable all edit action buttons
    static disableEditActionButtons(){
        let editBtns = document.querySelectorAll(".edit-emp-btn");
        for(let i = 0; i < editBtns.length; i++){
            editBtns[i].classList.add("disabled");
        }
    }

    // Enable all edit action buttons
    static enableEditActionButtons(){
        let editBtns = document.querySelectorAll(".edit-emp-btn");
        for(let i = 0; i < editBtns.length; i++){
            editBtns[i].classList.remove("disabled");
        }
    }

    // Identify and return clicked row from GUI table
    static identifyRow(clickSource, className){
        if(clickSource.classList.contains(className)){
            return clickSource.parentElement.parentElement;
        }
        else{
            return clickSource.parentElement.parentElement.parentElement;
        }
    }

}