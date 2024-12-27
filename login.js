       function loginUser() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                alert('Inicio de sesión exitoso');
                window.location.href = 'index.html';
            } else {
                alert('Email o contraseña incorrectos');
            }
        }
   