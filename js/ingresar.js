const validateFrom = (e) => {
    e.preventDefault()

    const emailValue = document.getElementById('email').value;
    const passValue = document.getElementById('pass').value;
    if (emailValue !== '' && passValue !== '') {
        window.location.href = '../index.html';
    } else {
        document.getElementById('alert').innerHTML = `
        <div class="alert alert-warning d-flex gap-5" role="alert">
        <div>Datos incorrectos!</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> `
    }
}

document.getElementById('myForm').addEventListener('submit', validateFrom)

