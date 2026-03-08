import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { corridors, corridorMap } from '../data/corridors'
import { getPositionOnPath } from '../hooks/useSimulation'

const statusColor = { moving: '#22C55E', delayed: '#F97316', alert: '#EF4444' }

export default function Map({ convoys }) {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <MapContainer
        center={[8, -2]}
        zoom={5}
        style={{ width: '100%', height: '100%', background: '#0F172A' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Corridor lines */}
        {corridors.map(corridor => (
          <Polyline
            key={corridor.id}
            positions={corridor.waypoints}
            pathOptions={{
              color: corridor.color,
              weight: 3,
              opacity: 0.7,
              dashArray: '6 4',
            }}
          />
        ))}

        {/* City dots */}
        {corridors.map(corridor =>
          corridor.cities.map(city => (
            <CircleMarker
              key={`${corridor.id}-${city.name}`}
              center={city.coords}
              radius={4}
              pathOptions={{ color: corridor.color, fillColor: corridor.color, fillOpacity: 0.9, weight: 1 }}
            >
              <Tooltip permanent={false} direction="top">
                <span style={{ fontSize: 12 }}>{city.name}</span>
              </Tooltip>
            </CircleMarker>
          ))
        )}

        {/* Moving convoys */}
        {convoys.map(convoy => {
          const corridor = corridorMap[convoy.corridorId]
          if (!corridor) return null
          const position = getPositionOnPath(corridor.waypoints, convoy.progress)
          const color = statusColor[convoy.status] || '#22C55E'

          return (
            <CircleMarker
              key={convoy.id}
              center={position}
              radius={8}
              pathOptions={{
                color: '#fff',
                fillColor: color,
                fillOpacity: 1,
                weight: 2,
              }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                <div style={{ fontSize: 12, lineHeight: 1.4 }}>
                  <strong>{convoy.name}</strong><br />
                  {convoy.origin} → {convoy.destination}<br />
                  <span style={{ color }}>{convoy.status.toUpperCase()}</span>
                </div>
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>

      {/* Map overlay legend */}
      <div style={{
        position: 'absolute', bottom: 24, right: 16, zIndex: 1000,
        background: 'rgba(15,23,42,0.85)', borderRadius: 8, padding: '10px 14px',
        border: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: '#fff',
        backdropFilter: 'blur(4px)',
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6, color: '#F97316', letterSpacing: 1 }}>LÉGENDE</div>
        {[['#22C55E', 'En transit'], ['#F97316', 'Retard'], ['#EF4444', 'Alerte IA']].map(([color, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
