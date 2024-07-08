document.addEventListener('DOMContentLoaded', () => {
    let div_root = document.querySelector(".root");

    const users = [];

    function UserComponent(user) {
        return `
            <div class="user-card">
                <div class="header">
                    <div class="imgUser"><img src="https://github.com/EduardoAjcajon/imgEvaluacion2/blob/main/userPerfil.jpg?raw=true" alt=""></div>
                    <div class="user">
                        <div class="userName">${user.name}</div>
                        <div class="userCorreo">${user.email}</div>
                    </div>
                    <div class="numeroAsignaciones">${user.assignments.length}</div>
                    <div class="btnAsignacion">+</div>
                </div>
                <div class="asignaciones">
                    ${user.assignments.map((a, index) => `<button class="asignacion">Asignación ${index + 1}</button>`).join('')}
                </div>
            </div>
        `;
    }

    function modal() {
        div_root.innerHTML = `
            <div class="btnNuevoUser">Agregar nuevo Usuario</div>
            ${users.map(user => UserComponent(user))}
            <div class="register-form">
                <h3>Registro</h3>
                <label for="name">Nombre:</label>
                <input type="text" id="name">
                <label for="email">Correo electrónico:</label>
                <input type="email" id="email">
                <button id="register">Enviar</button>
            </div>
        `;

        document.querySelector('.btnNuevoUser').addEventListener('click', () => {
            let registerForm = document.querySelector('.register-form');
            registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('register').addEventListener('click', () => {
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            users.push({ name, email, assignments: [] });
            modal();
        });

        
    }

    modal();
});
