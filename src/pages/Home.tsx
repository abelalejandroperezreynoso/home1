import React, { useState, useEffect } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useUrls } from '../context/UrlContext';
import { UrlConfigModal } from '../components/UrlConfigModal';
import { LoginPanel } from '../components/LoginPanel';

const LINKS = {
  DIFUSION: 'https://astounding-crostata-aca5ed.netlify.app',
  EVALUACION_RIESGOS: 'https://fascinating-sundae-ab4c37.netlify.app'
};

function Home() {
  const { urls } = useUrls();
  const [showUrlConfig, setShowUrlConfig] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    departamento: '',
    supervisor: '',
    observador: 'No',
    status: 'active',
    puesto: '',
    linea: '',
    estatus: 'Activo'
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (!formData.name.trim() || !formData.employeeId.trim()) {
      setError('El nombre y el ID del empleado son obligatorios');
      return;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, 'employees'), formData);
      setFormData({
        name: '',
        employeeId: '',
        departamento: '',
        supervisor: '',
        observador: 'No',
        status: 'active',
        puesto: '',
        linea: '',
        estatus: 'Activo'
      });
    } catch (err) {
      console.error('Error al guardar empleado:', err);
      setError('Error al guardar el empleado. Por favor, intente nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginPanel onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <button
          onClick={() => setShowUrlConfig(true)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          title="Personal"
        >
          <Settings size={24} />
        </button>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          title="Cerrar Sesión"
        >
          <LogOut size={24} />
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center p-6 min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">SEGURIDAD</h1>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <a
                href={LINKS.DIFUSION}
                className="w-full px-8 py-2.5 bg-white text-blue-600 rounded-full 
                         hover:bg-gray-50 transform hover:scale-105 
                         transition-all duration-200 focus:outline-none focus:ring-2 
                         focus:ring-blue-400 focus:ring-opacity-50
                         border border-blue-600 text-sm"
              >
                DIFUSION
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={LINKS.EVALUACION_RIESGOS}
                className="w-full px-8 py-2.5 bg-white text-blue-600 rounded-full 
                         hover:bg-gray-50 transform hover:scale-105 
                         transition-all duration-200 focus:outline-none focus:ring-2 
                         focus:ring-blue-400 focus:ring-opacity-50
                         border border-blue-600 text-sm"
              >
                EVALUACION DE RIESGOS
              </a>
            </div>
          </div>
        </div>
      </div>

      <UrlConfigModal
        isOpen={showUrlConfig}
        onClose={() => setShowUrlConfig(false)}
      />
    </div>
  );
}

export default Home;
