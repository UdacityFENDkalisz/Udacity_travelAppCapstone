/**
 * Loads data from local storage on page load and calls to update the UI
 * @param {load event} event Fires when page is finished loading
 */
export function checkLocalStorage(event) {
    if (localStorage.allData) {
        const allData = JSON.parse(localStorage.getItem('allData'))
        Client.updateUI(allData)
    }
}

/**
 * Clears data from local storage and reloads page if user clicks button
 * @param {click event} event Fires with click of clear button
 */
export function clearLocalStorage(event) {
    localStorage.clear()
    location.reload()
}