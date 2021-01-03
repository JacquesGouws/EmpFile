// GLOBAL ELEMENTS

const addEmpBtn = document.querySelector("#add-emp-btn");
const removeEmpsBtn = document.querySelector("#remove-emps-btn");
const addEmpForm = document.querySelector("#add-emp-form");
const cancelNewEmpBtn = document.querySelector("#cancel-new-emp-btn");
const saveNewEmpBtn = document.querySelector("#save-new-emp-btn");
const searchInput = document.querySelector("#search-input");

// EVENT LISTENERS ON PAGE LOAD

document.addEventListener("DOMContentLoaded", load);
addEmpBtn.addEventListener("click", displayForm);
cancelNewEmpBtn.addEventListener("click", hideForm);
saveNewEmpBtn.addEventListener("click", addEmployee);
removeEmpsBtn.addEventListener("click", callDeleteAllModal);
searchInput.addEventListener("keyup", filterEmployees);

// EVENT LISTENERS ON DYNAMICALLY INSERTED ACTION BUTTONS

function setActionBtnsEvents(){
    let delBtns = document.querySelectorAll(".delete-emp-btn");
    let viewBtns = document.querySelectorAll(".view-emp-btn");
    let editBtns = document.querySelectorAll(".edit-emp-btn");
    for(let i = 0; i < delBtns.length; i++){
        delBtns[i].addEventListener("click", callDeleteEmpModal);
        viewBtns[i].addEventListener("click", viewEmployee);
        editBtns[i].addEventListener("click", showEditableEmployeeData);
    }
}

// EVENT HANDLERS

// Load and display all employees
function load(){
    GUI.loadAllEmployees();
    setActionBtnsEvents(); 
}

// Filter employees by name
function filterEmployees(e){
    let text = e.target.value.toLowerCase();
    GUI.filterEmployees(text);
}

// Display form
function displayForm(){
    addEmpForm.style.display = "block";
    removeEmpsBtn.classList.add("disabled");
    addEmpBtn.classList.add("disabled");
    GUI.disableEditActionButtons();
}

// Hide form
function hideForm(){
    GUI.clearInputFields();
    addEmpForm.style.display = "none";
    removeEmpsBtn.classList.remove("disabled");
    addEmpBtn.classList.remove("disabled");
    GUI.showSaveButtons(); 
    GUI.enableEditActionButtons();
}

// Adding a new employee
function addEmployee(){
    let employeeData = GUI.getFormValues();
    if(Validation.isValidForm(employeeData)){
        let newEmployee = new Employee(employeeData);
        if(!Storage.employeeExists(newEmployee.empID)){
            try{
                Storage.addEmployee(newEmployee);
                GUI.addEmployee(newEmployee);                    
                setActionBtnsEvents();            
                Alert.showCrudAlert("insert-success");
            }
            catch(e){
                Alert.showCrudAlert("unforseen-error");
            }     
        }
        else{
            Alert.showVAlidationAlert("employee-exists");
        }
    } 
}

// Display delete all employees confirmation modal
function callDeleteAllModal(){
    if(Storage.hasEmployees()){
        Modals.showDeleteAllEmpsModal();
        document.querySelector("#confirm-delete-all-btn").addEventListener("click", deleteAllEmployees);
    }
    else{
        Alert.showCrudAlert("no-employees-to-delete");
    }

}

// Delete all employees from application
function deleteAllEmployees(){
    try{
        $("#delete-all-emps-modal").modal("hide");
        Storage.deleteAllEmployees();
        GUI.deleteAllEmployees();
        Alert.showCrudAlert("all-delete-success");
    }
    catch(e){
        Alert.showCrudAlert("unforseen-error");
    }
}


// Display delete single employee confiration modal
function callDeleteEmpModal(e){
    let clickSource = e.target;
    let row = GUI.identifyRow(clickSource, "delete-emp-btn")
    let id = row.cells[0].textContent;
    let name = row.cells[1].textContent;
    let surname = row.cells[2].textContent;
    Modals.showDeleteEmpModal(name, surname);
    document.querySelector("#confirm-delete-emp-btn").addEventListener("click", function(){
        deleteEmployee(id, row);
    });
}

// Deleting a single employee
function deleteEmployee(id, row){
    try{
        $("#delete-emp-modal").modal("hide");
        Storage.deleteEmployee(id);
        GUI.deleteEmployee(row);
        Alert.showCrudAlert("delete-success");
    }
    catch(e){
        Alert.show("unforseen-error");
    }
}

// View employee data
function viewEmployee(e){
    let clickSource = e.target;
    let row = GUI.identifyRow(clickSource, "view-emp-btn");
    let selectedEmployee = new Employee(GUI.getRowData(row));
    GUI.viewEmployee(selectedEmployee);
    if(window.innerWidth <= 800){
        document.querySelector("aside").scrollIntoView();
    }

}

// View editable employee data
function showEditableEmployeeData(e){
    let clickSource = e.target;    
    let row = GUI.identifyRow(clickSource, "edit-emp-btn")
    let rowData = GUI.getRowData(row);
    let saveEditBtn;
    let cancelEditBtn;
    displayForm();
    document.querySelector("#form-header").innerHTML = "Edit Employee details below:";
    GUI.showEditableData(rowData);
    GUI.showEditButtons();
    saveEditBtn = document.querySelector("#save-edit-btn");
    cancelEditBtn = document.querySelector("#cancel-edit-btn");
    saveEditBtn.addEventListener("click", function(){
        callEditEmpModal(rowData);
    });
    cancelEditBtn.addEventListener("click", function(){    
        hideForm();
    });
}

// Display edit employee confirmation modal
function callEditEmpModal(rowData){
    let oldEmployee = new Employee(rowData);
    let formDataToEdit = GUI.getFormValues();
    if(Validation.isValidForm(formDataToEdit)){
        let newEmployee = new Employee(formDataToEdit);
        if(!Validation.employeeDataChanged(oldEmployee, newEmployee)){
            if(newEmployee.empID !== oldEmployee.empID){
                if(!Storage.employeeExists(newEmployee.empID)){
                    Modals.showEditEmpModal(oldEmployee, newEmployee);
                    document.querySelector("#confirm-save-edit-btn").addEventListener("click", function(){
                        editEmployee(oldEmployee.empID, newEmployee);
                    });
                }
                else{
                    Alert.showVAlidationAlert("employee-exists");
                }
            }
            else{
                Modals.showEditEmpModal(oldEmployee, newEmployee);
                document.querySelector("#confirm-save-edit-btn").addEventListener("click", function(){
                    editEmployee(oldEmployee.empID, newEmployee);
                });
            }
        }
        else{
            Alert.showVAlidationAlert("no-edit");
        }
    } 
}

// Edit employee
function editEmployee(oldEmployeeID, newEmployee){
    try{
        $("#edit-emp-modal").modal("hide");
        Storage.editEmployee(oldEmployeeID, newEmployee);        
        Alert.showCrudAlert("edit-success");
        window.setTimeout(function(){
            GUI.reloadPage();
        }, 3000);
    }
    catch(e){
        Alert.showCrudAlert("unforseen-error");
    }
}



    

