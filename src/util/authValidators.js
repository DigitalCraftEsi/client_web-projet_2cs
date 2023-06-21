/**
 * @param {"AM" | "AC" | "DECIDEUR" | "SADM" | "ADM"} role the role to be validated
 * @returns a function that checks if the logged user has the corresponding role
 */
const validator = (role) => () => {
    const item = JSON.parse(localStorage.getItem("user"));
    if(item == null) {
        return false;
    }

    if(item.role == null) {
        return false;
    }

    return item.role === role;
}

export const validateSADM = validator("SADM");
export const validateADM = validator("ADM");
export const validateAC = validator("AC");
export const validateDecideur = validator("DECIDEUR");

/**
 * @returns true if the user is not logged in, false otherwise
 */
export const checkNotConnected = () => {
    const item = localStorage.getItem("user");
    if (item == null) return true;
    return false;
}