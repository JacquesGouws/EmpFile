class Modals{

    // Modals are created dynamically and removed from the DOM after use

    // Modal dialog for deleting a single employee
    static showDeleteEmpModal(name, surname){
        let modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        modal.setAttribute("id", "delete-emp-modal");
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-labelledby", "delete-emp-modal-title");
        modal.setAttribute("aria-hidden", "true");
        let modalContent = `
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="delete-emp-modal-title">Delete Employee</h5>
                    <button type="button" class="close btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure?<br>${name} ${surname} will be deleted.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="confirm-delete-emp-btn">I'm Sure</button>
                </div>
            </div>
        </div>`;
        modal.innerHTML = modalContent;
        document.querySelector("body").appendChild(modal);
        $("#delete-emp-modal").modal("show");
        $('#delete-emp-modal').on('hidden.bs.modal', function () {
            $(this).remove();
        });
    }

    // Modal dialog for deleting all employees
    static showDeleteAllEmpsModal(){
        let modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        modal.setAttribute("id", "delete-all-emps-modal");
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-labelledby", "delete-emp-modal-title");
        modal.setAttribute("aria-hidden", "true");
        let modalContent = `        
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalCenterTitle">Delete All Employees?</h5>
                    <button type="button" class="close btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure? <br>
                    This action cannot be reverted.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="confirm-delete-all-btn">I'm Sure</button>
                </div>
            </div>
        </div>`;
        modal.innerHTML = modalContent;
        document.querySelector("body").appendChild(modal);
        $("#delete-all-emps-modal").modal("show");
        $("#delete-all-emps-modal").on('hidden.bs.modal', function () {
            $(this).remove();
        });
    }

    // Modal dialog for editing an employee
    static showEditEmpModal(oldEmployee, newEmployee){
        let modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        modal.setAttribute("id", "edit-emp-modal");
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-labelledby", "edit-emp-modal-title");
        modal.setAttribute("aria-hidden", "true");
        let modalContent = `
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="edit-emp-modal-title">Edit Employee Details?</h5>
                    <button type="button" class="close btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Employee: ${oldEmployee.empID}<br>
                    Name: ${oldEmployee.name}<br>
                    Surname ${oldEmployee.surname}<br>
                    Age: ${oldEmployee.age}<br>
                    Gender: ${oldEmployee.gender}<br>
                    Department: ${oldEmployee.department}<br>
                    Occupation: ${oldEmployee.occupation}<br>
                    Cell: ${oldEmployee.cell}<br>
                    Email: ${oldEmployee.email}<br>
                    <br><h6>To:</h6><br>
                    Employee: ${newEmployee.empID}<br>
                    Name: ${newEmployee.name}<br>
                    Surname ${newEmployee.surname}<br>
                    Age: ${newEmployee.age}<br>
                    Gender: ${newEmployee.gender}<br>
                    Department: ${newEmployee.department}<br>
                    Occupation: ${newEmployee.occupation}<br>
                    Cell: ${newEmployee.cell}<br>
                    Email: ${newEmployee.email}<br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="confirm-save-edit-btn">Yes</button>
                </div>
            </div>
        </div>`;
        modal.innerHTML = modalContent;
        document.querySelector("body").appendChild(modal);
        $("#edit-emp-modal").modal("show");
        $('#edit-emp-modal').on('hidden.bs.modal', function () {
            $(this).remove();
        });
    }

}