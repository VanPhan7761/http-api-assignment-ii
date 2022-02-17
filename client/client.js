const handleResponse = async (response, parseResponse) => {

  //Grab the content section
  const content = document.querySelector('#content');

  //Based on the status code, display something
  switch (response.status) {
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
    case 404:
      content.innerHTML = `<b>Resource Not Found</b>`;
      break;
    default: //any other status code
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }

  let obj = await response.json();
  if (parseResponse) {

    let jsonString = JSON.stringify(obj);
    content.innerHTML += `<p>${jsonString}</p>`;

  } else {
    //If we have a message, display it.
    if (obj.message) {
      content.innerHTML += '<p>Meta Data Received</p>';
      content.innerHTML += `<p>${obj.message}</p>`;
    }
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

//function to send request. This is marked as async since we will use await.
const requestUpdate = async (userForm) => {

  //Grab the url and method from the html form below
  const url = userForm.querySelector('#urlField').value;
  const method = userForm.querySelector('#methodSelect').value;

  //Await our fetch response. Go to the URL, use the right method, and attach the headers.
  let response = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json'
    },
  });

  handleResponse(response, method === 'get');
};


const init = () => {
  //---------name form used for making post requests--------------
  const nameForm = document.querySelector('#nameForm');

  //replaces default form action with sendPost
  const addUser = (e) => {
    e.preventDefault();
    sendPost(nameForm);
    return false;
  }

  nameForm.addEventListener('submit', addUser);
  //---------------------------------------------------------------

  //--------name form used for making header/get requests----------
  //grab form
  const userForm = document.querySelector('#userForm');

  //function to handle our request. In this case, it also cancels the built in html form action
  const getUsers = (e) => {
    e.preventDefault();
    requestUpdate(userForm);
    return false;
  }

  //add event listener
  userForm.addEventListener('submit', getUsers);
  //---------------------------------------------------------------


}


window.onload = init;

