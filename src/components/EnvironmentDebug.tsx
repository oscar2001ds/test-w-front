// Componente temporal para debug - eliminar después
import { BASE_CONFIG } from '../core/config/base-config'

export function EnvironmentDebug() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      background: 'rgba(0,0,0,0.9)', 
      color: 'white', 
      padding: '15px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '400px',
      borderRadius: '5px',
      margin: '10px'
    }}>
      <h4>🔍 Environment Debug:</h4>
      <div style={{ fontFamily: 'monospace' }}>
        <div>NEXT_PUBLIC_API_URL: <strong>{process.env.NEXT_PUBLIC_API_URL || 'NOT SET'}</strong></div>
        <div>BASE_CONFIG.API_URL: <strong>{BASE_CONFIG.API_URL}</strong></div>
        <div>NODE_ENV: <strong>{process.env.NODE_ENV}</strong></div>
      </div>
    </div>
  );
}