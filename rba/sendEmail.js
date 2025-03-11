document.querySelector('.email-signup button').addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.querySelector('.email-signup input').value;
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const url = window.location.href;

    fetch('http://localhost:3000/api/email/addEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, date, time, url })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});