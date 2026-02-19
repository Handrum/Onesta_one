import React, { useState } from 'react';
/* Cambiamos BrowserRouter por HashRouter para que los enlaces funcionen 
  correctamente en GitHub Pages sin errores de "página no encontrada".
*/
import { HashRouter as Router, Routes, Route, useNavigate, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft, Car, 
  Stethoscope, RefreshCw, User, Phone, Star,
  Download, CheckCircle2, Users, TrendingUp, LayoutDashboard, ClipboardList, Send, Menu
} from 'lucide-react';

// --- 1. ESTRUCTURA BASE DE LA PÁGINA ---
const PageLayout = ({ children, title, showNav = true }) => (
  <div className="min-h-screen bg-[#F8FAFC] font-['Manrope']">
    {showNav && (
      <nav className="relative z-[100] w-full max-w-7xl mx-auto px-6 py-6 mt-4 overflow-hidden flex justify-between items-center shadow-2xl shadow-slate-200/50 rounded-[0.5rem] bg-white">
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Link to="/" className="bg-white p-1 rounded-[0.5rem] border-slate-100 block">
              <img 
                src={process.env.PUBLIC_URL + '/Logo_Onesta.png'} 
                alt="Logo Empresa" 
                className="h-10 w-auto object-contain" 
              />
            </Link>
          </div>

          <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.15em] text-slate-600">
            <span className="text-red-600 border-red-600 pb-1 cursor-pointer">Seguros</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Reclamos</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Contacto</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {window.location.hash !== '#/' && window.location.hash !== '' && (
            <Link to="/" className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-[0.2em] transition-colors">
              Cerrar Sesión
            </Link>
          )}
        </div>
      </nav>
    )}
    <main className="max-w-7xl mx-auto px-6 py-12">
      {title && <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tighter text-center">{title}</h1>}
      {children}
    </main>
  </div>
);

// --- 2. PÁGINA DE INICIO Y ACCESO (LOGIN) ---
const LandingPage = () => {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    role === 'admin' ? navigate('/admin-dashboard') : navigate('/dashboard');
  };

  return (
    <PageLayout showNav={true}>
      <div className="relative flex flex-col min-h-[80vh] justify-center">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500 rounded-full opacity-5 blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-teal-400 rounded-full opacity-10 blur-3xl -z-10"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center py-12">
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <div className="w-full mb-6">
                <img 
                  src={process.env.PUBLIC_URL + '/Logo_Onesta.png'} 
                  alt="Onesta One" 
                  className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] h-auto object-contain mx-auto lg:ml-[-40px]" 
                />
              </div>
              <div className="space-y-4 px-4 lg:px-0">
                <h6 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tighter uppercase">La plataforma para asegurar flotilla empresarial</h6>
                <p className="text-slate-500 text-lg font-medium max-w-xl leading-relaxed">Gestiona pólizas, unidades y siniestros de tu empresa en un único lugar.</p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-500 shadow-sm">U{i}</div>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Más de <span className="text-slate-800">500 corporativos</span> confían</p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-10 lg:mt-0">
              <div className="bg-white p-8 rounded-[1rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 w-full max-w-[400px]">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Portal de Gestión</h2>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Bienvenido</p>
                </div>
                <div className="flex bg-slate-50 p-1.5 rounded-[0.7rem] mb-8 border border-slate-100">
                  <button onClick={() => setRole('user')} className={`flex-1 py-3 text-[10px] font-black rounded-[0.5rem] transition-all ${role === 'user' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>CLIENTE</button>
                  <button onClick={() => setRole('admin')} className={`flex-1 py-3 text-[10px] font-black rounded-[0.5rem] transition-all ${role === 'admin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>ADMIN</button>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input type="text" placeholder="Usuario" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-[0.7rem] outline-none text-sm font-semibold focus:border-red-500 transition-all" required />
                  <input type="password" placeholder="Contraseña" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-[0.7rem] outline-none text-sm font-semibold focus:border-red-500 transition-all" required />
                  <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-[0.7rem] font-black hover:bg-red-600 transition-all mt-4 text-[11px] tracking-[0.2em] uppercase shadow-lg shadow-slate-200">Entrar al Dashboard</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer className="w-full max-w-7xl mx-auto px-6 mt-36 pb-10 border-t border-slate-200 pt-8 flex justify-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">© 2026 Onesta One. <span className="font-medium normal-case ml-2 opacity-60">*Sujeto a póliza colectiva.</span></p>
        </footer>
      </div>
    </PageLayout>
  );
};

// --- 3. PANEL PRINCIPAL DEL CLIENTE ---
const Dashboard = () => {
  const navigate = useNavigate();
  const polizas = [
    { id: 'GM-99021', ramo: 'Gastos Médicos Mayores', status: 'Activa', color: 'text-green-600 bg-green-50 border-green-100' },
    { id: 'FL-44012', ramo: 'Flotilla Empresarial', status: 'En Pago', color: 'text-blue-600 bg-blue-50 border-blue-100' },
  ];

  return (
    <PageLayout title="Mi Resumen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-[0.75rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8 grid grid-cols-2 md:grid-cols-6 gap-2">
          {[
            { icon: Stethoscope, label: 'Gastos Médicos', path: '/gastos-medicos' },
            { icon: Car, label: 'Flotilla', path: '/flotilla' },
            { icon: RefreshCw, label: 'Renovación', path: '/renovacion' },
            { icon: User, label: 'Menores', path: '/gastos-menores' },
            { icon: Phone, label: 'Contacto', path: '/contactos' },
            { icon: Star, label: 'Club', path: '/club' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => navigate(item.path)} 
              className="flex flex-col items-center gap-4 group transition-all"
            >
              <div className="text-slate-400 group-hover:text-red-600 transition-colors">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-black text-slate-400 group-hover:text-red-600 uppercase tracking-widest text-center transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[0.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Menu size={16} className="text-slate-400" />
              <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-[0.15em]">Pólizas Vigentes</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">2 Activas</span>
          </div>
          <div className="p-3 space-y-1">
            {polizas.map(p => (
              <div key={p.id} onClick={() => p.ramo.includes('Flotilla') && navigate('/flotilla')} className="flex justify-between items-center p-5 rounded-[0.5rem] hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-slate-100 rounded-[0.5rem] flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm leading-none mb-1.5">{p.id}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{p.ramo}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-black px-3 py-1 border rounded-full uppercase ${p.color}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// --- 4. PANEL DEL ADMINISTRADOR ---
const AdminDashboard = () => (
  <PageLayout title="Consola Administrativa">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {[
        { label: 'Clientes Activos', val: '2,450', icon: Users, color: 'text-blue-600' },
        { label: 'Primas Totales', val: '$1.2M', icon: TrendingUp, color: 'text-emerald-600' },
        { label: 'Siniestros Hoy', val: '14', icon: ClipboardList, color: 'text-orange-600' },
      ].map((card, i) => (
        <div key={i} className="bg-white p-10 rounded-[0.5rem] border border-slate-200 shadow-sm">
          <card.icon size={28} className={`${card.color} mb-8`} />
          <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-2">{card.label}</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">{card.val}</p>
        </div>
      ))}
    </div>
    <div className="bg-slate-900 p-20 rounded-[0.5rem] text-white text-center border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-[100px]"></div>
      <LayoutDashboard size={56} className="mx-auto mb-8 text-blue-400 opacity-50" />
      <h3 className="text-3xl font-black mb-4 tracking-tight">Reporte Maestro de Operaciones</h3>
      <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">Visualización de datos críticos del ecosistema en tiempo real.</p>
    </div>
  </PageLayout>
);

// --- 5. MÓDULO DE GESTIÓN DE FLOTILLAS ---
const FlotillaPage = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [seleccion, setSeleccion] = useState({ año: '', marca: '' });
  const navigate = useNavigate();

  const coberturas = [
    { v: '3%', l: 'Deducible Daños' }, { v: '10%', l: 'Deducible Robo' }, { v: '2 mil', l: 'Responsabilidad Civil' },
    { v: '500 m', l: 'Gastos Médicos' }, { v: '3 mil', l: 'RC Exceso' }, { v: 'Cubierta 1', l: 'No Deducible' },
    { v: 'Cubierta 2', l: 'Asistencia Vial' }, { v: 'Cubierta 3', l: 'RC Ocupantes' }, { v: 'Cubierta 4', l: 'Muerte Conductor' },
  ];

  const unidades = [
    { id: 1, modelo: 'Toyota Hilux 2023', placa: 'ABC-123', status: 'ASEGURADO' },
    { id: 2, modelo: 'Nissan NP300 2022', placa: 'XYZ-987', status: 'ASEGURADO' },
  ];

  return (
    <PageLayout title="Gestión de Flotilla Corporativa">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest mb-10 group">
        <ArrowLeft size={16} /> VOLVER AL PANEL
      </button>

      <div className="grid grid-cols-12 gap-10 items-stretch">
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <section className="bg-white rounded-[0.5rem] border border-slate-200 shadow-sm p-12 relative flex flex-col h-[700px]">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Cotiza aquí auto</h2>
                <p className="text-slate-400 text-base mt-2 font-medium">Alta inmediata</p>
              </div>
              <button className="bg-red-600 text-white px-10 py-3.5 rounded-[0.5rem] font-black text-xs uppercase tracking-widest shadow-lg shadow-red-100">Seleccionar</button>
            </div>

            <div className="w-full max-w-4xl mx-auto flex items-center justify-between mb-16 bg-slate-50 p-6 rounded-[0.5rem] border border-slate-100">
              {[
                { n: 1, t: 'Conoce' }, { n: 2, t: 'Selecciona' }, { n: 3, t: 'Revisa' }, { n: 4, t: 'Contrata' }
              ].map((p) => (
                <div key={p.n} className="flex items-center flex-1 last:flex-none">
                  <div className={`flex items-center gap-4 ${pasoActual === p.n ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-[0.5rem] flex items-center justify-center font-black text-sm ${pasoActual === p.n ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'}`}>{p.n}</div>
                    <div className="text-left hidden md:block">
                      <p className="text-[10px] font-black text-red-600 uppercase leading-none mb-1">Paso 0{p.n}</p>
                      <p className="text-xs font-black uppercase tracking-tight">{p.t}</p>
                    </div>
                  </div>
                  {p.n < 4 && <div className="flex-1 mx-6 h-[2px] bg-slate-200 hidden lg:block" />}
                </div>
              ))}
            </div>

            <div className="flex-1 min-h-0">
              {pasoActual === 1 && (
                <div className="grid grid-cols-3 gap-3 h-full">
                  {coberturas.map((c, i) => (
                    <div key={i} onClick={() => setPasoActual(2)} className="group cursor-pointer bg-white border border-slate-100 rounded-[0.5rem] p-4 flex flex-col items-center justify-center text-center hover:border-red-500 transition-all border-dashed">
                      <p className="text-2xl font-black text-slate-900 group-hover:text-red-600">{c.v}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase mt-2">{c.l}</p>
                    </div>
                  ))}
                </div>
              )}

              {pasoActual === 2 && (
                <div className="max-w-xl mx-auto space-y-8">
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', 'Otros'].map(y => (
                      <button key={y} onClick={() => setSeleccion({ ...seleccion, año: y })} className={`py-4 rounded-[0.5rem] font-black border transition-all text-sm ${seleccion.año === y ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-red-600'}`}>{y}</button>
                    ))}
                  </div>
                  {seleccion.año && (
                    <div className="max-w-md mx-auto space-y-4">
                      <input type="text" placeholder="Código Postal" className="w-full p-5 bg-slate-50 rounded-[0.5rem] border border-slate-200 font-bold text-sm outline-none focus:border-red-600" />
                      <button onClick={() => setPasoActual(3)} className="w-full py-5 bg-red-600 text-white rounded-[0.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl">Obtener Cotización</button>
                    </div>
                  )}
                </div>
              )}

              {pasoActual === 3 && (
                <div className="text-center py-10">
                  <RefreshCw className="mx-auto text-red-600 mb-8 animate-spin" size={48} />
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Procesando tarifa...</h3>
                  <button onClick={() => setPasoActual(4)} className="mt-12 text-[10px] font-black text-slate-300 uppercase underline">Simular resultado</button>
                </div>
              )}

              {pasoActual === 4 && (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">Pre-Aprobado</h3>
                  <button onClick={() => navigate('/dashboard')} className="bg-slate-900 text-white px-16 py-5 rounded-[0.5rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-red-600 transition-colors">Finalizar y Contratar</button>
                </div>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
              {pasoActual > 1 && (
                <button onClick={() => setPasoActual(pasoActual - 1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-red-600">
                  <ArrowLeft size={14} /> Atrás
                </button>
              )}
            </div>
          </section>

          <section className="bg-white rounded-[0.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-widest">Unidades Aseguradas</h3>
              <button className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase">
                <Download size={14} /> PDF PÓLIZA
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {unidades.map(u => (
                <div key={u.id} className="p-6 flex justify-between items-center hover:bg-slate-50">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-100 rounded-[0.5rem] flex items-center justify-center text-slate-400"><Car size={22} /></div>
                    <div>
                      <p className="font-black text-slate-900 text-base leading-none mb-2">{u.modelo}</p>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{u.placa}</p>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-emerald-100">● {u.status}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 h-full">
          <div className="bg-white rounded-[0.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 h-[700px] flex flex-col overflow-hidden">
            <div className="bg-white p-10 border-b border-slate-100 flex flex-col items-center text-center">
              <div className="mb-4 h-12 flex items-center justify-center">
                <img 
                  src={process.env.PUBLIC_URL + '/Logo_Onesta.png'} 
                  alt="Logo" 
                  className="h-full w-auto max-w-[200px]" 
                />
              </div>
            </div>
            <div className="flex-1 bg-slate-50/30 p-8 space-y-5 overflow-y-auto">
              <div className="bg-white p-5 rounded-[0.5rem] rounded-tl-none border border-slate-100 shadow-sm text-sm text-slate-700 font-semibold">¡Hola! Soy tu asistente.</div>
              {['¿Cómo reporto un choque?', '¿Qué cubre el 3%?'].map(q => (
                <button key={q} className="w-full text-left p-4 bg-white border border-slate-200 rounded-[0.5rem] text-[10px] font-black text-blue-600 uppercase tracking-tight hover:border-blue-600 hover:bg-blue-50/30 transition-all">{q}</button>
              ))}
            </div>
            <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
              <input type="text" placeholder="Escribe tu duda..." className="flex-1 bg-slate-50 p-4 rounded-[0.5rem] text-sm font-bold outline-none border border-slate-100 focus:bg-white focus:border-red-600 transition-all" />
              <button className="bg-blue-600 text-white p-4 rounded-[0.5rem] font-black shadow-lg shadow-blue-100">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const GenericSection = ({ name, icon: Icon }) => (
  <PageLayout title={name}>
    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-red-600 font-black mb-10 text-[11px] uppercase tracking-widest">
      <ArrowLeft size={16} /> Volver
    </button>
    <div className="max-w-2xl mx-auto bg-white p-24 rounded-[0.5rem] border border-slate-200 text-center shadow-sm">
      <div className="bg-slate-50 w-24 h-24 rounded-[0.5rem] flex items-center justify-center mx-auto mb-8 text-slate-300">
        <Icon size={56} />
      </div>
      <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Módulo en Desarrollo</h2>
      <p className="text-slate-400">Esta sección estará disponible muy pronto.</p>
    </div>
  </PageLayout>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/flotilla" element={<FlotillaPage />} />
        <Route path="/gastos-medicos" element={<GenericSection name="Gastos Médicos" icon={Stethoscope} />} />
        <Route path="/renovacion" element={<GenericSection name="Renovación" icon={RefreshCw} />} />
        <Route path="/gastos-menores" element={<GenericSection name="Gastos Médicos Menores" icon={User} />} />
        <Route path="/contactos" element={<GenericSection name="Contactos" icon={Phone} />} />
        <Route path="/club" element={<GenericSection name="Club Onesta" icon={Star} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}