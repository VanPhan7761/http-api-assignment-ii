const handleResponse = async (response) => {
      
    //Grab the content section
    const content = document.querySelector('#content');

    //Based on the status code, display something
    switch(response.status) {
      case 200: //success
        content.innerHTML = `<b>Success</b>`;
        break;
      case 201: //created
        content.innerHTML = '<b>Created</b>';
        break;
      case 204: //updated (no response back from server)
        content.innerHTML = '<b>Updated (No Content)</b>';
        return;
      case 400: //bad request
        content.innerHTML = `<b>Bad Request</b>`;
        break;
      default: //any other status code
        content.innerHTML = `Error code not implemented by client.`;
        break;
    }

    let obj = await response.json();
    
    //If we have a message, display it.
    if(obj.message){
      content.innerHTML += `<p>${obj.message}</p>`;
    }
  };



const sendPost = async (nameForm) => {
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');

    const nameField = nameForm.querySelector('#nameField');
    const ageField = nameForm.querySelector('#ageField');

    //Build a data string in the FORM-URLENCODED format.
    const formData = `name=${nameField.value}&age=${ageField.value}`;

    let response = await fetch(nameAction, {
        method: nameMethod,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formData,
      });


      //Once we have a response, handle it.
      handleResponse(response);
}

const init = () => {
    const nameForm = document.querySelector('#nameForm');

    //replaces default form action with sendPost
    const addUser = (e) => {
        e.preventDefault();
        sendPost(nameForm);
        return false;
    }

    nameForm.addEventListener('submit', addUser);
}


window.onload = init;

