import { useEffect, useState, useCallback } from 'react';
import {
  getRequirements,
  updateRequirement
} from '../services/requirementService';

function RequirementTable() {

  const [projectId, setProjectId] = useState(1);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRequirements = useCallback(async () => {

    setError('');

    if (!projectId) {
      setRequirements([]);
      return;
    }

    try {

      setLoading(true);

      const response = await getRequirements(projectId);

      setRequirements(response.data.data);

    } catch {

      setError('Error cargando requisitos');

    } finally {

      setLoading(false);
    }

  }, [projectId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadRequirements();
    }, 0);

    return () => clearTimeout(timeout);

  }, [loadRequirements]);

  const handleStatusChange = async (id, newStatus) => {

    try {

      await updateRequirement(id, {
        status: newStatus
      });

      await loadRequirements();

    } catch {

      setError('Error actualizando requisito');
    }
  };

  return (
    <div className="card">

      <div className="table-header">
        <h2>Lista de Requisitos</h2>

        <div className="actions">
          <input
            type="number"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Project ID"
          />

          <button onClick={loadRequirements}>
            Refrescar
          </button>
        </div>
      </div>

      {loading && <p>Cargando...</p>}

      {error && (
        <p className="error-message">{error}</p>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Actualizar</th>
          </tr>
        </thead>

        <tbody>
          {requirements.map((requirement) => (
            <tr key={requirement.id}>
              <td>{requirement.id}</td>
              <td>{requirement.projectId}</td>
              <td>{requirement.title}</td>
              <td>{requirement.description}</td>

              <td>
                <span className={`status ${requirement.status}`}>
                  {requirement.status}
                </span>
              </td>

              <td>
                <select
                  value={requirement.status}
                  onChange={(e) =>
                    handleStatusChange(
                      requirement.id,
                      e.target.value
                    )
                  }
                >
                  <option value="pending">pending</option>
                  <option value="approved">approved</option>
                  <option value="rejected">rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequirementTable;