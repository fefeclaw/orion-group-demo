import { corridors } from './data/corridors'
import { useSimulation } from './hooks/useSimulation'
import Map from './components/Map'
import Dashboard from './components/Dashboard'
import IncidentAlert from './components/IncidentAlert'
import './App.css'

export default function App() {
  const { convoys, kpis, activeIncident, dismissIncident } = useSimulation()

  return (
    <div className="app-container">
      <Dashboard kpis={kpis} convoys={convoys} corridors={corridors} />
      <Map convoys={convoys} />
      {activeIncident && (
        <IncidentAlert incident={activeIncident} onDismiss={dismissIncident} />
      )}
    </div>
  )
}
