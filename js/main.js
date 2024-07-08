document.addEventListener('DOMContentLoaded', () => {
    let div_root = document.querySelector(".root");

    const users = [];

    function renderUserComponent(user) {
        return `
            <div class="user-card">
                <div class="header">
                    <div class="imgUser"><img src="https://github.com/EduardoAjcajon/imgEvaluacion2/blob/main/userPerfil.jpg?raw=true" alt=""></div>
                    <div class="user">
                        <div class="userName">${user.name}</div>
                        <div class="userCorreo">${user.email}</div>
                    </div>
                    <div class="numeroAsignaciones">${user.assignments.length}</div>
                    <div class="btnAsignacion" data-user-index="${users.indexOf(user)}">+</div>
                </div>
                <div class="asignaciones">
                    ${user.assignments.map((a, index) => `<button class="asignacion">Asignación ${index + 1}</button>`) }
                </div>
            </div>
        `;
    }

    function openModal(userIndex) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modalMas">
                <span class="close-button">&times;</span>
                <h2>Nueva Asignación</h2>
                <label for="assignmentName">Nombre de la asignación:</label>
                <input type="text" id="assignmentName">
                <button id="saveAssignment">Guardar</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-button').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('#saveAssignment').addEventListener('click', () => {
            const assignmentName = modal.querySelector('#assignmentName').value;
            if (assignmentName) {
                users[userIndex].assignments.push(assignmentName);
                document.body.removeChild(modal);
                modal();
            }
        });
    }

    function modal() {
        div_root.innerHTML = `
            <div class="btnNuevoUser">Agregar nuevo Usuario</div>
            ${users.map(user => renderUserComponent(user))}
            <div class="register-form" style="display: none;">
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

        document.querySelectorAll('.btnAsignacion').forEach(button => {
            button.addEventListener('click', () => {
                let userIndex = button.getAttribute('data-user-index');
                openModal(userIndex);
            });
        });
    }

    modal();
});
