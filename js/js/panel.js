document.addEventListener('DOMContentLoaded', () => {
  // Verificar si hay sesión activa
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

  if (!usuarioActivo) {
    // Redirigir si no hay sesión
    window.location.href = 'login.html';
    return;
  }

  // Mostrar saludo personalizado y rol
  document.getElementById('user-greeting').textContent = `Bienvenido/a, ${usuarioActivo.nombreCompleto}`;
  document.getElementById('user-role').textContent = `Rol: ${usuarioActivo.role}`;

switch (usuarioActivo.role) {
  case 'Estudiante':
    panelEstudiante.style.display = 'block';
    break;
  case 'Profesor':
    panelProfesor.style.display = 'block';
    break;
  case 'Bibliotecario':
    panelBibliotecario.style.display = 'block';
    break;
}


  // Mostrar fecha/hora de acceso
  const fechaAcceso = new Date().toLocaleString();
  document.getElementById('fecha-acceso').textContent = `Fecha y hora de acceso: ${fechaAcceso}`;

  // Simular historial dinámico
  const historialPrestamos = [
    {
      titulo: 'Los sueños de Einstein',
      prestamo: '01/07/2025',
      devolucion: '15/07/2025',
      estado: 'Prestado'
    },
    {
      titulo: 'Viaje más allá de las estrellas',
      prestamo: '15/06/2025',
      devolucion: '29/06/2025',
      estado: 'Devuelto'
    },
    {
      titulo: 'Crónicas medievales',
      prestamo: '20/05/2025',
      devolucion: '03/06/2025',
      estado: 'Devuelto'
    }
  ];

  // Construir tabla dinámicamente
  const tablaContainer = document.getElementById('tabla-prestamos');
  const tabla = document.createElement('table');
  tabla.classList.add('history-table');

  const thead = `
    <thead>
      <tr>
        <th>Título del Libro</th>
        <th>Fecha de Préstamo</th>
        <th>Fecha de Devolución</th>
        <th>Estado</th>
      </tr>
    </thead>`;
  tabla.innerHTML = thead;

  const tbody = document.createElement('tbody');
  historialPrestamos.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${item.titulo}</td>
      <td>${item.prestamo}</td>
      <td>${item.devolucion}</td>
      <td>${item.estado}</td>`;
    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);
  tablaContainer.appendChild(tabla);

  // Botón de logout
  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
  });
});
