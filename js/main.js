const openContactFormBtn = document.getElementById('openContactForm');
const contactForm = document.querySelector('.contact');
const hideContactFormBtn = document.querySelector('.contact__button--cancel');
const sendContactFormBtn = document.querySelector('.contact__button--send');
const contactFeedback = document.querySelector('.contact__feedback');
const resetBorders = [...document.querySelectorAll('.contact__reset-border')];

let clientName, clientEmail, clientPhone, clientMessage;

function getActualFormData() {
    clientName = document.getElementById('clientName');
    clientPhone = document.getElementById('clientPhone');
    clientEmail = document.getElementById('clientEmail');
    clientMessage = document.getElementById('clientMessage');
}

function cleanForm() {
    clientName.value = '';
    clientPhone.value = '';
    clientEmail.value = '';
    clientMessage.value = '';
}

openContactFormBtn.addEventListener('click', () => {
    contactForm.style.display = 'flex';
});

hideContactFormBtn.addEventListener('click', () => {
    getActualFormData();
    cleanForm();
    contactForm.style.display = 'none'
});


sendContactFormBtn.addEventListener('click', () => {

    getActualFormData();

    if (clientName.value.length < 1) {
        clientName.style.borderColor = '#e783a5';
        return contactFeedback.innerHTML = 'Jak masz na imię?'
    } else if (clientPhone.value.length < 2 && clientEmail.value.length < 2) {
        clientPhone.style.borderColor = '#e783a5';
        clientEmail.style.borderColor = '#e783a5';
        return contactFeedback.innerHTML = 'Podaj email lub numer telefonu'
    } else if (clientMessage.value.length < 1) {
        clientMessage.style.borderColor = '#e783a5';
        return contactFeedback.innerHTML = 'Podaj treść wiadomości'
    } else {
        // wysyłamy formularz, dane trafiają na serwer
        let data = new URLSearchParams();

        data.append("clientName", clientName.value);
        data.append("clientPhone", clientPhone.value);
        data.append("clientEmail", clientEmail.value);
        data.append("clientMessage", clientMessage.value);


        fetch(`http://localhost:5000/send-energy-msg`, {
                method: 'post',
                body: data,
                mode: "no-cors",
            })
            .then(response => response.text())
            .then(text => contactFeedback.innerHTML = text)
            .catch(err => contactFeedback.innerHTML = err);

    }


});

resetBorders.forEach(element => {
    element.addEventListener('focus', () => {
        resetBorders.forEach(item => {
            item.style.borderColor = '#ccc';
        });
        contactFeedback.innerHTML = '';

    })
})