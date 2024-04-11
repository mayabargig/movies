const apiKey = "be93d2314b628d913609d274fc1bdf70";

/** @type {number[]} */
var favoriteArray = JSON.parse(localStorage.getItem("favoriteArray")) || [];

/**
 * @param {HTMLLIElement} button
*/
var changeColor = function (button) {
    const id = button.id;
    const isLiked = !favoriteArray?.includes(id)
    const likedIcon = 'far fa-heart'
    const unlikeIcon = 'fas fa-heart'
    if (isLiked) {
        console.log('before add: ', favoriteArray)
        favoriteArray.push(id)
        console.log('after add: ', favoriteArray)
        setF(favoriteArray)
        likedIcon.split(' ').forEach(i => button.classList.remove(i))
        unlikeIcon.split(' ').forEach(i => button.classList.add(i))
    }
    else {
        console.log('before delete: ', favoriteArray)
        const index = favoriteArray.indexOf(id);
        if (index !== -1) {
            favoriteArray.splice(index, 1);
            setF(favoriteArray);
        }
        console.log('before after: ', favoriteArray)
        setF(favoriteArray)
        unlikeIcon.split(' ').forEach(i => button.classList.remove(i))
        likedIcon.split(' ').forEach(i => button.classList.add(i))
    }
    function setF(favoriteArray) {
        localStorage.setItem("favoriteArray", JSON.stringify(favoriteArray));
    }
}