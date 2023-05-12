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

export const checkNotConnected = () => {
    const item = localStorage.getItem("user");
    if (item == null) return true;
    return false;
}