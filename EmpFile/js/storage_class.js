class Storage{
    
    // Retrieve all the employees currently in local browser storage
    static getAllEmployees(){
        let allEmployees = [];
        if(this.hasEmployees()){         
            allEmployees = JSON.parse(localStorage.getItem("employees"));
        }
        return allEmployees;
    }

    // Check if local browser storage contains any employees
    static hasEmployees(){
        if(localStorage.getItem("employees") === "[]" | localStorage.getItem("employees") === null){
            return false;
        }
        else{
            return true;
        } 
    }

    // Check if an employee exists in local browser storage
    static employeeExists(employeeID){
        let exists = false;
        let allEmployees = Storage.getAllEmployees();
        for(let i = 0; i < allEmployees.length; i++){
            if(allEmployees[i].empID === employeeID){
                exists = true;
                break;
            }
        }
        return exists;
    }

    // Add an employee to local browser storage
    static addEmployee(newEmployee){
        let employees = Storage.getAllEmployees();
        employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    // Delete a single employee from local browser storage
    static deleteEmployee(employeeID){
        let employees = Storage.getAllEmployees();
        for(let i = 0; i < employees.length; i++){
            if(employees[i].empID === employeeID){
                employees.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    // Delete all the employees from local browser storage
    static deleteAllEmployees(){
        localStorage.clear();
    }

    // Edit employee data
    static editEmployee(oldEmployeeID, newEmployee){
        let allEmployees = Storage.getAllEmployees();
            for(let i = 0; i < allEmployees.length; i++){
                if(allEmployees[i].empID === oldEmployeeID){
                    allEmployees[i].empID = newEmployee.empID;
                    allEmployees[i].name = newEmployee.name;
                    allEmployees[i].surname = newEmployee.surname;
                    allEmployees[i].age = newEmployee.age;
                    allEmployees[i].gender = newEmployee.gender;
                    allEmployees[i].department = newEmployee.department;
                    allEmployees[i].occupation = newEmployee.occupation;
                    allEmployees[i].cell = newEmployee.cell;
                    allEmployees[i].email = newEmployee.email;
                }
            }
        localStorage.setItem("employees", JSON.stringify(allEmployees));
    }

}