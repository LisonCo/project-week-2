// Change the favorite button when clicked
document.getElementsByClassName("favorite-button").forEach(element => {
    element.onclick = function(event) {
        event.currentTarget.innerHTML = "Unfavorite";
        console.log("button changed")
    }
});
