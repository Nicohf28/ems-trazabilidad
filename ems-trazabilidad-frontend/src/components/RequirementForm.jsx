import { useState } from 'react';
import { createRequirement } from '../services/requirementService';

const validStatuses = ['pending', 'approved', 'rejected'];

function RequirementForm({ onRequirementCreated }) {
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    description: '',
    status: 'pending'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.projectId) {
      return 'El projectId es obligatorio';
    }

    if (isNaN(formData.projectId)) {
      return 'El projectId debe ser numérico';
    }

    if (!formData.title.trim()) {
      return 'El título es obligatorio';
    }

    if (!validStatuses.includes(formData.status)) {
      return 'Estado inválido';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');

      await createRequirement({
        projectId: Number(formData.projectId),
        title: formData.title,
        description: formData.description,
        status: formData.status
      });

      setFormData({
        projectId: '',
        title: '',
        description: '',
        status: 'pending'
      });

      if (onRequirementCreated) {
        onRequirementCreated();
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Error creando requisito'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Crear Requisito</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Project ID</label>
          <input
            type="number"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            placeholder="1"
          />
        </div>

        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Login"
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="El sistema debe permitir login"
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>
        </div>

        {error && (
          <p className="error-message">{error}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>

      </form>
    </div>
  );
}

export default RequirementForm;