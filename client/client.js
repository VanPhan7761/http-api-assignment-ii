const getUsers = async () =>{
    console.log("get user");
}

const addUsers = async () =>{
    console.log("add user");
}

const init = () => {
    const getBtn = document.querySelector("#getBtn");
    const addBtn = document.querySelector("#addBtn");

    getBtn.addEventListener('click', getUsers);
    addBtn.addEventListener('click', addUsers);
}

window.onload = init;
