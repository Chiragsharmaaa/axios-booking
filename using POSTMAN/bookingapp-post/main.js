const form = document.getElementById('form-control');

const username = document.getElementById('username');

const useremail = document.getElementById('useremail');

const submit = document.getElementById('submitbtn');

submit.addEventListener('click', onSubmit);

// DOM Content Loaded Event Listener: it updates the page with localstorage
// history every time the page is launched (helps keep track of pre existing data)
document.addEventListener('DOMContentLoaded', function(){
    let AllkeysInLocalStorage = Object.keys(localStorage); //returns array of keys
    AllkeysInLocalStorage.forEach(function (key) {
        let keyFromLocal = localStorage.getItem(key);
        let parsedData = JSON.parse(keyFromLocal);
        appendList(parsedData);
    });
});

//On-submit function:
function onSubmit(event) {
    event.preventDefault();

//creating an Object to store values in key-value pair.
    myObj = {
        name: username.value,
        email: useremail.value
    };
    appendList(myObj)
    username.value = '';
    useremail.value = '';
};





//Main Function:
function appendList(myObj) {
    
//we need to verify the preexisting data in the frontend with email which we enter
//delete it first and then create a new div by under statements of this function 

//this is accessible and applicable when some data is there in localstorage(ie on front end too)
    const allh4inFront = document.getElementsByClassName('email-h4-class')
    
    //to check if the entered email pre exists. If yes: then remove the old details from localstorage and frontend.
    for (let i = 0; i<allh4inFront.length; i++){
        if (allh4inFront[i].innerHTML == myObj.email){
            const toBeDeleted = allh4inFront[i].parentElement;
            toBeDeleted.remove();
        };
    };
    
    // creating elements for frontend when appendList function is called with suitable arguments.
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('inner-div');
    const nameContainerH4 = document.createElement('h4');
    const emailContainerH4 = document.createElement('h4');
    emailContainerH4.classList.add('email-h4-class');

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.classList.add('innerbtn');
    editButton.classList.add('editbtn');
    deleteButton.classList.add('innerbtn');
    deleteButton.classList.add('dltbtn');

    editButton.innerHTML = 'Edit';
    deleteButton.innerHTML = 'Delete';

    let stringifiedData = JSON.stringify(myObj);

    nameContainerH4.innerHTML = myObj.name;
    emailContainerH4.innerHTML = myObj.email;

    innerDiv.appendChild(nameContainerH4);
    innerDiv.appendChild(emailContainerH4);
    innerDiv.appendChild(editButton);
    innerDiv.appendChild(deleteButton);

    axios.post('https://crudcrud.com/api/f5396c49789540febcdcc08a4614cd86/appoinmentData', { myObj, stringifiedData })
    .then((response) => {
        console.log(response)
    }).catch(err => console.log(err))
    // localStorage.setItem(myObj.email, stringifiedData);


    const parentDiv = document.getElementById('total-items');
    parentDiv.appendChild(innerDiv);

    //Delete Button Function:
    deleteButton.addEventListener('click', function() {
        const emailforremovingfromlocal = deleteButton.previousSibling.previousSibling;
        localStorage.removeItem(emailforremovingfromlocal.innerHTML); //providing key i.e. email here to removeItem
        deleteButton.parentElement.remove(); //removing the div from front end.
    })


    //Edit Button Function:
    editButton.addEventListener('click', function() {
        const targetName = editButton.previousSibling.previousSibling.innerHTML; //targetting name w.r.t. editbutton
        const targetEmail = editButton.previousSibling.innerHTML; //targetting email w.r.t. editbutton

        username.value = targetName; //updating input box with values to be modified
        useremail.value = targetEmail;
        editButton.parentElement.remove(); //removing the div after values updated in input box

    });

};





