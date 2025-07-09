document.addEventListener('DOMContentLoaded', () => {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
  const adminContent = document.getElementById('admin-content');
  const adminWarning = document.getElementById('admin-warning');

  if (!usuarioActivo) {
    window.location.href = 'login.html';
    return;
  }

  if (usuarioActivo.role !== 'Bibliotecario') {
    adminWarning.textContent = '⚠️ Acceso denegado. Solo bibliotecarios pueden ver esta página.';
    return;
  }

  // Mostrar contenido
  adminContent.style.display = 'block';

  // =========================
  // Mostrar lista de usuarios
  // =========================
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuariosLista = document.getElementById('usuarios-lista');

  if (usuarios.length === 0) {
    usuariosLista.innerHTML = '<p>No hay usuarios registrados.</p>';
  } else {
    const tabla = document.createElement('table');
    tabla.classList.add('usuarios-tabla');
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre Completo</th>
          <th>Rol</th>
        </tr>
      </thead>`;
    const tbody = document.createElement('tbody');

    usuarios.forEach(u => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${u.usuario}</td>
        <td>${u.nombreCompleto}</td>
        <td>${u.role}</td>`;
      tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    usuariosLista.appendChild(tabla);
  }

  // ================================
  // Mostrar mensajes de contacto
  // ================================
  const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
  const mensajesLista = document.getElementById('mensajes-lista');

  if (mensajes.length === 0) {
    mensajesLista.innerHTML = '<p>No hay mensajes almacenados.</p>';
  } else {
    const tabla = document.createElement('table');
    tabla.classList.add('mensajes-tabla');
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Asunto</th>
          <th>Mensaje</th>
          <th>Fecha</th>
        </tr>
      </thead>`;
    const tbody = document.createElement('tbody');

    mensajes.forEach(m => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${m.nombre}</td>
        <td>${m.correo}</td>
        <td>${m.asunto}</td>
        <td>${m.mensaje}</td>
        <td>${m.fecha}</td>`;
      tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    mensajesLista.appendChild(tabla);
  }

  // ============================
  // Botón para borrar todo
  // ============================
  const clearBtn = document.getElementById('clear-data-btn');
  clearBtn.addEventListener('click', () => {
    if (confirm('⚠️ Esto borrará TODOS los datos de usuarios y mensajes. ¿Continuar?')) {
      localStorage.removeItem('usuarios');
      localStorage.removeItem('mensajesContacto');
      alert('✅ Datos limpiados. Recarga la página para ver los cambios.');
      location.reload();
    }
  });
});
