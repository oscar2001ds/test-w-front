export default function FinancialSimulatorPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
        <h2 className="text-2xl font-bold text-white mb-4">Bienvenido al Simulador Financiero</h2>
        <p className="text-white/80 mb-4">
          Aquí puedes simular diferentes escenarios financieros y tomar decisiones informadas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
          <h3 className="text-lg font-semibold text-white mb-2">Simulación de Préstamos</h3>
          <p className="text-white/70 text-sm">
            Calcula cuotas, intereses y términos de préstamos
          </p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
          <h3 className="text-lg font-semibold text-white mb-2">Análisis de Inversiones</h3>
          <p className="text-white/70 text-sm">
            Evalúa el retorno de diferentes inversiones
          </p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
          <h3 className="text-lg font-semibold text-white mb-2">Planificación de Ahorros</h3>
          <p className="text-white/70 text-sm">
            Proyecta tus metas de ahorro a largo plazo
          </p>
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
        <h3 className="text-xl font-semibold text-white mb-4">Contenido Principal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded p-4">
            <p className="text-white/80">
              Esta es una demostración del layout con sidebar. El contenido ahora aparece correctamente
              al lado del sidebar, no detrás de él.
            </p>
          </div>
          <div className="bg-white/10 rounded p-4">
            <p className="text-white/80">
              Puedes colapsar el sidebar usando el botón en la parte superior izquierda.
              El contenido se ajustará automáticamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}