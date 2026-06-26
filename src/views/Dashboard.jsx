import React, { useState } from 'react';

const Dashboard = () => {
  const metrics = [
    { id: 1, title: 'CLIENTES ACTIVOS', value: 24, color: '#2563eb' },       // Azul corporativo suave
    { id: 2, title: 'SOLICITUDES PENDIENTES', value: 5, color: '#d97706' }, // Ámbar/Naranja elegante
    { id: 3, title: 'USUARIOS NUEVOS', value: 8, color: '#059669' },       // Verde esmeralda sutil
  ];

  const activities = [
    { id: 1, text: 'Nuevo cliente registrado en el sistema', time: 'Hace 10 min' },
    { id: 2, text: 'Nueva solicitud de soporte recibida', time: 'Hace 1 hora' },
    { id: 3, text: 'Perfil de usuario actualizado', time: 'Hace 3 horas' },
    { id: 4, text: 'Recordatorio de seguimiento pendiente', time: 'Ayer' },
  ];

  // Estados para manejar las animaciones de las tarjetas de métricas
  const [hoveredCard, setHoveredCard] = useState(null);
  // Estado para la tarjeta de actividad reciente
  const [hoveredSection, setHoveredSection] = useState(false);
  // Estado para las filas de actividades
  const [hoveredRow, setHoveredRow] = useState(null);

  const styles = {
    container: {
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '48px 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#1f2937'
    },
    wrapper: {
      maxWidth: '1024px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '48px'
    },
    title: {
      fontFamily: 'Georgia, serif',
      fontSize: '36px',
      fontWeight: '700',
      color: '#111827',
      margin: '0 0 8px 0',
      letterSpacing: '0.5px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '400'
    },
    sectorBadge: {
      backgroundColor: '#111827',
      color: '#ffffff',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      marginLeft: '4px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '40px'
    },
    card: (id, isHovered, activeColor) => ({
      backgroundColor: '#ffffff',
      padding: '32px',
      borderRadius: '16px',
      border: `1px solid ${isHovered ? activeColor : '#e2e8f0'}`,
      boxShadow: isHovered 
        ? `0 10px 25px -5px ${activeColor}15, 0 8px 10px -6px ${activeColor}15`
        : '0 4px 20px -4px rgba(0, 0, 0, 0.03)',
      transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }),
    cardTitle: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#6b7280',
      letterSpacing: '1.5px',
      marginBottom: '12px'
    },
    cardValue: (isHovered, activeColor) => ({
      fontSize: '54px',
      fontWeight: '700',
      color: isHovered ? activeColor : '#111827',
      margin: 0,
      transition: 'color 0.3s ease'
    }),
    sectionCard: {
      backgroundColor: '#ffffff',
      padding: '32px',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      boxShadow: hoveredSection ? '0 6px 24px -4px rgba(0, 0, 0, 0.05)' : '0 4px 20px -4px rgba(0, 0, 0, 0.03)',
      transition: 'all 0.3s ease'
    },
    sectionTitle: {
      fontFamily: 'Georgia, serif',
      fontSize: '20px',
      fontWeight: '700',
      color: '#111827',
      margin: '0 0 24px 0'
    },
    activityRow: (id, isHovered) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 12px',
      margin: '0 -12px',
      borderRadius: '8px',
      backgroundColor: isHovered ? '#f1f5f9' : 'transparent',
      borderBottom: '1px solid #f1f5f9',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }),
    activityLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    dot: {
      width: '6px',
      height: '6px',
      backgroundColor: '#111827',
      borderRadius: '50%'
    },
    activityText: {
      fontSize: '14px',
      color: '#374151',
      fontWeight: '500'
    },
    activityTime: {
      fontSize: '12px',
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Encabezado */}
        <div style={styles.header}>
          <h1 style={styles.title}>¡Hola, maria!</h1>
          <div style={styles.subtitle}>
            Panel de control centralizado • Sector actual: 
            <span style={styles.sectorBadge}>Soporte</span> • viernes, 26 de junio de 2026
          </div>
        </div>

        {/* Tarjetas de Métricas Animadas */}
        <div style={styles.grid}>
          {metrics.map((metric) => {
            const isHovered = hoveredCard === metric.id;
            return (
              <div 
                key={metric.id} 
                style={styles.card(metric.id, isHovered, metric.color)}
                onMouseEnter={() => setHoveredCard(metric.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <span style={styles.cardTitle}>{metric.title}</span>
                <h2 style={styles.cardValue(isHovered, metric.color)}>{metric.value}</h2>
              </div>
            );
          })}
        </div>

        {/* Actividad Reciente Animada */}
        <div 
          style={styles.sectionCard}
          onMouseEnter={() => setHoveredSection(true)}
          onMouseLeave={() => setHoveredSection(false)}
        >
          <h2 style={styles.sectionTitle}>Actividad Reciente</h2>
          <div>
            {activities.map((activity, index) => {
              const isRowHovered = hoveredRow === activity.id;
              return (
                <div 
                  key={activity.id} 
                  style={{
                    ...styles.activityRow(activity.id, isRowHovered),
                    borderBottom: index === activities.length - 1 ? 'none' : styles.activityRow().borderBottom,
                  }}
                  onMouseEnter={() => setHoveredRow(activity.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div style={styles.activityLeft}>
                    <div style={{
                      ...styles.dot,
                      backgroundColor: isRowHovered ? '#2563eb' : '#111827',
                      transform: isRowHovered ? 'scale(1.3)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }} />
                    <span style={{
                      ...styles.activityText,
                      color: isRowHovered ? '#111827' : '#374151'
                    }}>{activity.text}</span>
                  </div>
                  <span style={styles.activityTime}>{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;