// Estado global
let creators = [];
let creatives = [];
let isEditMode = false;
let currentEditId = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  loadData();
});

// Configurar tabs
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  // Desactivar todos los tabs
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Activar tab seleccionado
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(`${tabId}-tab`).classList.add('active');
}

// Cargar datos
async function loadData() {
  await Promise.all([loadCreators(), loadCreatives()]);
}

async function loadCreators() {
  try {
    const response = await fetch('/api/creators');
    creators = await response.json();
    renderCreators();
    updateCreatorCheckboxes();
  } catch (error) {
    console.error('Error al cargar creadores:', error);
    showAlert('Error al cargar creadores', 'error');
  }
}

async function loadCreatives() {
  try {
    const response = await fetch('/api/creatives');
    creatives = await response.json();
    renderCreatives();
  } catch (error) {
    console.error('Error al cargar creatividades:', error);
    showAlert('Error al cargar creatividades', 'error');
  }
}

// Renderizar creatividades
function renderCreatives() {
  const container = document.getElementById('creatives-list');
  
  if (creatives.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No hay creatividades</h3>
        <p>Crea tu primera creatividad para empezar</p>
      </div>
    `;
    return;
  }

  container.innerHTML = creatives.map(creative => `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">${escapeHtml(creative.name)}</div>
          ${creative.description ? `<div class="card-subtitle">${escapeHtml(creative.description)}</div>` : ''}
        </div>
        <span class="badge ${creative.active ? 'badge-success' : 'badge-secondary'}">
          ${creative.active ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      <div class="card-body">
        ${creative.file_type.startsWith('video/') 
          ? `<video src="${creative.file_path}" style="width: 100%; border-radius: 8px;" muted></video>`
          : `<img src="${creative.file_path}" style="width: 100%; border-radius: 8px;">`
        }

        <div style="margin-top: 12px;">
          <strong>Creadores asignados:</strong><br>
          ${creative.creators.length > 0 
            ? creative.creators.map(c => `<span class="badge badge-primary">${escapeHtml(c.name)}</span>`).join(' ')
            : '<span style="color: var(--text-light);">Ninguno</span>'
          }
        </div>

        <div class="obs-link">
          <input type="text" value="${creative.obs_url}" readonly onclick="this.select()">
          <button class="btn btn-primary btn-sm" onclick="copyToClipboard('${creative.obs_url}')">
            Copiar
          </button>
        </div>
      </div>

      <div class="card-footer">
        <button class="btn btn-secondary btn-sm" onclick="editCreative(${creative.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteCreative(${creative.id}, '${escapeHtml(creative.name)}')">Eliminar</button>
      </div>
    </div>
  `).join('');
}

// Renderizar creadores
function renderCreators() {
  const container = document.getElementById('creators-list');
  
  if (creators.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No hay creadores</h3>
        <p>Añade los streamers de tu equipo</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Twitch</th>
          <th>Notas</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${creators.map(creator => `
          <tr>
            <td><strong>${escapeHtml(creator.name)}</strong></td>
            <td>${creator.twitch_username ? escapeHtml(creator.twitch_username) : '-'}</td>
            <td>${creator.notes ? escapeHtml(creator.notes) : '-'}</td>
            <td>
              <span class="badge ${creator.active ? 'badge-success' : 'badge-secondary'}">
                ${creator.active ? 'Activo' : 'Inactivo'}
              </span>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="editCreator(${creator.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deleteCreator(${creator.id}, '${escapeHtml(creator.name)}')">Eliminar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Modal Creatividad
function openCreativeModal(id = null) {
  isEditMode = !!id;
  currentEditId = id;

  const modal = document.getElementById('creative-modal');
  const form = document.getElementById('creative-form');
  const title = document.getElementById('creative-modal-title');
  const fileInput = document.getElementById('creative-file');
  const fileInfo = document.getElementById('current-file-info');

  title.textContent = isEditMode ? 'Editar Creatividad' : 'Nueva Creatividad';
  form.reset();
  fileInfo.innerHTML = '';

  if (isEditMode) {
    const creative = creatives.find(c => c.id === id);
    if (creative) {
      document.getElementById('creative-id').value = creative.id;
      document.getElementById('creative-name').value = creative.name;
      document.getElementById('creative-description').value = creative.description || '';
      
      fileInput.removeAttribute('required');
      fileInfo.innerHTML = `<small>Archivo actual: ${creative.file_path.split('/').pop()}</small>`;

      // Marcar creadores asignados
      creative.creators.forEach(creator => {
        const checkbox = document.querySelector(`input[name="creator_ids"][value="${creator.id}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }
  } else {
    fileInput.setAttribute('required', 'required');
    document.getElementById('creative-id').value = '';
  }

  modal.classList.add('active');
}

function closeCreativeModal() {
  document.getElementById('creative-modal').classList.remove('active');
  document.getElementById('creative-form').reset();
}

// Modal Creador
function openCreatorModal(id = null) {
  isEditMode = !!id;
  currentEditId = id;

  const modal = document.getElementById('creator-modal');
  const form = document.getElementById('creator-form');
  const title = document.getElementById('creator-modal-title');

  title.textContent = isEditMode ? 'Editar Creador' : 'Nuevo Creador';
  form.reset();

  if (isEditMode) {
    const creator = creators.find(c => c.id === id);
    if (creator) {
      document.getElementById('creator-id').value = creator.id;
      document.getElementById('creator-name').value = creator.name;
      document.getElementById('creator-twitch').value = creator.twitch_username || '';
      document.getElementById('creator-notes').value = creator.notes || '';
    }
  } else {
    document.getElementById('creator-id').value = '';
  }

  modal.classList.add('active');
}

function closeCreatorModal() {
  document.getElementById('creator-modal').classList.remove('active');
  document.getElementById('creator-form').reset();
}

// Actualizar checkboxes de creadores
function updateCreatorCheckboxes() {
  const container = document.getElementById('creator-checkboxes');
  
  if (creators.length === 0) {
    container.innerHTML = '<p style="color: var(--text-light); padding: 12px;">No hay creadores. Añade creadores primero.</p>';
    return;
  }

  container.innerHTML = creators.map(creator => `
    <div class="checkbox-item">
      <input type="checkbox" id="creator-${creator.id}" name="creator_ids" value="${creator.id}">
      <label for="creator-${creator.id}">${escapeHtml(creator.name)}</label>
    </div>
  `).join('');
}

// Eventos de formularios
document.getElementById('creative-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const creatorIds = Array.from(document.querySelectorAll('input[name="creator_ids"]:checked')).map(cb => cb.value);
  
  creatorIds.forEach(id => formData.append('creator_ids', id));

  try {
    const url = isEditMode ? `/api/creatives/${currentEditId}` : '/api/creatives';
    const method = isEditMode ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      body: formData
    });

    if (response.ok) {
      showAlert(`Creatividad ${isEditMode ? 'actualizada' : 'creada'} correctamente`, 'success');
      closeCreativeModal();
      await loadCreatives();
    } else {
      const error = await response.json();
      showAlert(error.error || 'Error al guardar creatividad', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Error al guardar creatividad', 'error');
  }
});

document.getElementById('creator-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const url = isEditMode ? `/api/creators/${currentEditId}` : '/api/creators';
    const method = isEditMode ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showAlert(`Creador ${isEditMode ? 'actualizado' : 'creado'} correctamente`, 'success');
      closeCreatorModal();
      await loadData();
    } else {
      const error = await response.json();
      showAlert(error.error || 'Error al guardar creador', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Error al guardar creador', 'error');
  }
});

// Editar
function editCreative(id) {
  openCreativeModal(id);
}

function editCreator(id) {
  openCreatorModal(id);
}

// Eliminar
async function deleteCreative(id, name) {
  if (!confirm(`¿Eliminar la creatividad "${name}"?\n\nEsta acción no se puede deshacer.`)) {
    return;
  }

  try {
    const response = await fetch(`/api/creatives/${id}`, { method: 'DELETE' });
    
    if (response.ok) {
      showAlert('Creatividad eliminada correctamente', 'success');
      await loadCreatives();
    } else {
      showAlert('Error al eliminar creatividad', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Error al eliminar creatividad', 'error');
  }
}

async function deleteCreator(id, name) {
  if (!confirm(`¿Eliminar el creador "${name}"?\n\nSe eliminará de todas las creatividades asignadas.`)) {
    return;
  }

  try {
    const response = await fetch(`/api/creators/${id}`, { method: 'DELETE' });
    
    if (response.ok) {
      showAlert('Creador eliminado correctamente', 'success');
      await loadData();
    } else {
      showAlert('Error al eliminar creador', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Error al eliminar creador', 'error');
  }
}

// Utilidades
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showAlert('Enlace copiado al portapapeles', 'success');
  }).catch(() => {
    showAlert('No se pudo copiar el enlace', 'error');
  });
}

function showAlert(message, type = 'info') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  alert.style.position = 'fixed';
  alert.style.top = '20px';
  alert.style.right = '20px';
  alert.style.zIndex = '9999';
  alert.style.minWidth = '300px';
  alert.style.animation = 'slideIn 0.3s ease';

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Cerrar modales al hacer clic fuera
document.getElementById('creative-modal').addEventListener('click', (e) => {
  if (e.target.id === 'creative-modal') {
    closeCreativeModal();
  }
});

document.getElementById('creator-modal').addEventListener('click', (e) => {
  if (e.target.id === 'creator-modal') {
    closeCreatorModal();
  }
});

// Animaciones CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);
