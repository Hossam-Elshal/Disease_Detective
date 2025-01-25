let menuIcon = document.querySelector('.toggle-bar');
let linksMenu = document.querySelector('.menu'); 

menuIcon.addEventListener('click', (event) => {
    linksMenu.classList.toggle('open');
    event.stopPropagation();
});

document.addEventListener('click', () => {
    if (linksMenu.classList.contains('open')) {
        linksMenu.classList.remove('open');
    }
});
//=======================================================
const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail(event) {
    // event.preventDefault(); // Prevent form submission
    let params = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value,
        subject: document.querySelector('#subject').value,
        message: document.querySelector('#message').value,
    };
    
    emailjs.send("service_hpyffzf", "template_872ev9r", params)
        .then(() => {
            Swal.fire({
                title: "Good job!",
                text: "Email Sent Successfully!",
                icon: "success"
            });
            form.reset();
        })
        .catch(() => {
            Swal.fire({
                title: "Oops!",
                text: "Failed to send email. Please try again later.",
                icon: "error"
            });
        });
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items){
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }
        if (items[1].value != "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        });
        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const email = document.getElementById("email"); // Ensure email is correctly selected
    const errorTxtEmail = document.querySelector(".error-txt.email"); // Fix selector

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid email address";
        } else {
            errorTxtEmail.innerText = "Email Address can't be blank";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
        errorTxtEmail.innerText = ""; // Clear error text
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    
    if (!fullName.classList.contains("error") && 
    !email.classList.contains("error") && 
    !phone.classList.contains("error") && 
    !subject.classList.contains("error") && 
    !mess.classList.contains("error")) {

        sendEmail();
        // form.reset();
        // return false;
    }
})