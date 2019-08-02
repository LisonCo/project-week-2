function favoriteImage(event, id){
    const button = event.currentTarget
    axios.post(`/discover/favorite/${id}`)
        .then((response) => {
            if(response.data.favorite){
            setFavorite(button);
            } else {
            setUnfavorite(button)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

function setFavorite(button){
    button.innerHTML = "<i class='fas fa-heart'></i>"
}

function setUnfavorite(button){
    button.innerHTML = "<i class='far fa-heart'></i>"
}