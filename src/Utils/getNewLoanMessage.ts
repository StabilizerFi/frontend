export const getNewLoanMessage = (collateral: number, stable: number, price: number, minimumCollateral: number) => {
    if (!(collateral && stable)) {
        return ({ isValid: false, errorMessage: "Please fill out all the form details." });
    }
    if (stable < 0) {
        return ({ isValid: false, errorMessage: "Please adjust the USD to value to over 0 USD or greater." });
    }
    console.log(collateral * price);
    console.log(minimumCollateral / 10**24);
    if (collateral * price < minimumCollateral / 10**24) {
        return ({ isValid: false, errorMessage: "Your collateral is too low. Please either increase the collateral or decrease the loan." });
    }
    return ({ isValid: true });
}