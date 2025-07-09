document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obtener valores
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const asunto = document.getElementById('asunto').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      // Validación simple
      if (!nombre || !correo || !asunto || !mensaje) {
        alert('Por favor complete todos los campos.');
        return;
      }

      // Crear objeto del mensaje
      const nuevoMensaje = {
        nombre,
        correo,
        asunto,
        mensaje,
        fecha: new Date().toLocaleString()
      };

      // Obtener mensajes previos del localStorage
      let mensajesGuardados = JSON.parse(localStorage.getItem('mensajesContacto')) || [];

      // Agregar el nuevo mensaje
      mensajesGuardados.push(nuevoMensaje);

      // Guardar de nuevo en localStorage
      localStorage.setItem('mensajesContacto', JSON.stringify(mensajesGuardados));

      // Mostrar en consola (para la demo)
      console.log('📬 Mensajes almacenados:', mensajesGuardados);

      // Confirmación
      alert(`¡Gracias, ${nombre}! Tu mensaje ha sido enviado y guardado.`);

      // Limpiar formulario
      contactForm.reset();
    });
  }
});

// Mostrar mensajes en mensajes.html
document.addEventListener('DOMContentLoaded', () => {
  const mensajesContainer = document.getElementById('mensajes-lista');

  if (mensajesContainer) {
    // Obtener mensajes del localStorage
    const mensajesGuardados = JSON.parse(localStorage.getItem('mensajesContacto')) || [];

    if (mensajesGuardados.length === 0) {
      mensajesContainer.innerHTML = '<p>No hay mensajes guardados.</p>';
      return;
    }

    // Crear tabla
    const tabla = document.createElement('table');
    tabla.classList.add('mensajes-tabla');

    // Encabezados
    const encabezados = `
      <tr>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Asunto</th>
        <th>Mensaje</th>
        <th>Fecha</th>
      </tr>`;
    tabla.innerHTML = encabezados;

    // Filas con datos
    mensajesGuardados.forEach(msg => {
      const fila = `
        <tr>
          <td>${msg.nombre}</td>
          <td>${msg.correo}</td>
          <td>${msg.asunto}</td>
          <td>${msg.mensaje}</td>
          <td>${msg.fecha}</td>
        </tr>`;
      tabla.innerHTML += fila;
    });

    // Agregar tabla al contenedor
    mensajesContainer.appendChild(tabla);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Recuperar datos guardados o inicializar vacíos
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

  // Seleccionar formularios
  const loginForm = document.querySelector('.login-form');
  const registroForm = document.querySelector('.registro-form');

  // ========== LOGIN ==========
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usuario = document.getElementById('login-user').value.trim();
      const password = document.getElementById('login-pass').value.trim();

      if (!usuario || !password) {
        alert('Por favor ingrese usuario y contraseña.');
        return;
      }

      const encontrado = usuarios.find(
        u => u.usuario === usuario && u.password === password
      );

      if (encontrado) {
        // Guardar fecha/hora de acceso
        encontrado.fechaAcceso = new Date().toLocaleString();

        // Actualizar lista de usuarios
        usuarios = usuarios.map(u => u.usuario === encontrado.usuario ? encontrado : u);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Guardar como usuario activo
        localStorage.setItem('usuarioActivo', JSON.stringify(encontrado));

        alert(`¡Bienvenido, ${encontrado.nombreCompleto}!`);
        localStorage.setItem('usuarioActivo', JSON.stringify({
          ...encontrado,
          fechaAcceso: new Date().toLocaleString()
        }));
        window.location.href = 'panel.html';
        } else {
      alert('Usuario o contraseña incorrectos.');
      }
    });
  }

  // ========== REGISTRO ==========
  if (registroForm) {
    registroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usuario = document.getElementById('register-user').value.trim();
      const nombreCompleto = document.getElementById('register-full').value.trim();
      const password = document.getElementById('register-pass').value.trim();
      const role = document.getElementById('register-role').value.trim();

      if (!usuario || !nombreCompleto || !password || !role) {
        alert('Por favor complete todos los campos.');
        return;
      }

      // Validar que el usuario no exista
      const existe = usuarios.some(u => u.usuario === usuario);
      if (existe) {
        alert('El usuario ya existe. Elija otro nombre de usuario.');
        return;
      }

      // Crear nuevo usuario
      const nuevoUsuario = {
        usuario,
        nombreCompleto,
        password,
        role,
        historialPrestamos: [
            {
                titulo: "Los sueños de Einstein",
                fechaPrestamo: "01/07/2025",
                fechaDevolucion: "15/07/2025",
                estado: "Prestado"
            },
            {
                titulo: "Viaje más allá de las estrellas",
                fechaPrestamo: "15/06/2025",
                fechaDevolucion: "29/06/2025",
                estado: "Devuelto"
            }
  ]
};

      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      registroForm.reset();
    });
  }
});