class Validation{

    // Validate input entries - no empty entries allowed
    static filled(id, name, surname, age, department, occupation, cell, email){
        if(id == "" | name == "" | surname == "" | age == "" | department == "" | 
        occupation == "" | cell == "" | email == ""){
            return false;
        }
        else{
            return true;
        }    
    }

    // Validate ID - not smaller than 1 or greater than 1000
    static isValidID(id){
        if(id < 1 | id > 1000){
            return false;
        }
        else{
            return true;
        }
    }

    // Validate name - only letter, no spaces allowed
    static isValidName(name){
        let regExp = /^[A-Za-z]+$/;
        if(name.match(regExp)){
            return true;
        }
        else{
            return false;
        }
    }

    // Validate surname - only letters, spaces allowed
    static isValidSurname(surname){
        let regExp = /^[A-Za-z\s]+$/;
        if(surname.match(regExp)){
            return true;
        }
        else{
            return false;
        }
    }

    // Validate age - not smaller than 15 or greater than 100
    static isValidAge(age){
        if(age < 15 | age > 100){
            return false;
        }
        else{
            return true;
        }     
    }

    // Validate occupation - only letters, spaces allowed
    static isValidOccupation(occupation){
        let regExp = /^[A-Za-z\s]+$/;
        if(occupation.match(regExp)){
            return true;
        }
        else{
            return false;
        }
    }

    // Validate cell - 10 digits, no spaces or letters
    static isValidCell(cell){
        let regExp = /^\d{10}$/;
        if(cell.match(regExp)){
            return true;
        }
        else{
            return false;
        }
    }

    // Validate email
    static isValidEmail(email){
        let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(regExp)){
            return true
        }
        else{
            return false;
        }
    }

    // Validate all fields
    static isValidForm(formValues){
        let valid = false;
        let id = formValues[0];
        let name = formValues[1];
        let surname = formValues[2];
        let age = formValues[3];
        let gender = formValues[4];
        let department = formValues[5];
        let occupation = formValues[6];
        let cell = formValues[7];
        let email = formValues[8];
        if(Validation.filled(id, name, surname, age, department, occupation, cell, email)){
            if(Validation.isValidID(id)){
                if(Validation.isValidName(name)){
                    if(Validation.isValidSurname(surname)){
                        if(Validation.isValidAge(age)){
                            if(Validation.isValidOccupation(occupation)){
                                if(Validation.isValidCell(cell)){
                                    if(Validation.isValidEmail(email)){
                                        valid = true;
                                    }
                                    else{Alert.showVAlidationAlert("invalid-email");}
                                }
                                else{Alert.showVAlidationAlert("invalid-cell");}
                            }
                            else{Alert.showVAlidationAlert("invalid-occupation");}
                        }
                        else{Alert.showVAlidationAlert("invalid-age");}
                    }
                    else{Alert.showVAlidationAlert("invalid-surname");}
                    
                }
                else{Alert.showVAlidationAlert("invalid-name");}
            }
            else{Alert.showVAlidationAlert("invalid-ID");}
        }
        else{Alert.showVAlidationAlert("missing-input-entry");}
        return valid;
    }   

    // Check if employee data has been changed before saving edit
    static employeeDataChanged(oldEmployee, newEmployee){
        if(JSON.stringify(oldEmployee) === JSON.stringify(newEmployee)){
            return true;
        }
        else{
            return false;
        }
    } 

}