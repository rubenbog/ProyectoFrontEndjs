
        function registerUser() {
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Guardar los datos en localStorage
            const user = { nombre, email, password };
            localStorage.setItem('user', JSON.stringify(user));

            alert('Registro exitoso');
            window.location.href = 'login.html';
        }
   