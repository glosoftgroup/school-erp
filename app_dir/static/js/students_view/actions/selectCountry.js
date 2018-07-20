export const selectCountry = (country) => {
    console.log("You clicked on user: ", country);
    return {
        type: 'COUNTRY_SELECTED',
        payload: user
    }
};