fetch('https://nomoreparties.co/v1/plus-cohort-24', {
    headers: {
        authorization: '1f4caeaf-a831-4781-be39-58597bdf5036'
    }
})
    .then(res => res.json())
    .then((result) => {
        console.log(result);
    }); 