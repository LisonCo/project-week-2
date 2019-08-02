// Change the favorite button when clicked
$(".favorite-button").click(function(event){
    let button = event.currentTarget
    button.html("Unfavorite");
})
