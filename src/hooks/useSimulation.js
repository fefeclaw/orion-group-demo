import { useState, useEffect, useRef } from 'react'
import { initConvoys } from '../data/convoys'
import { initialKPIs, incidentScenarios } from '../data/kpis'

export function getPositionOnPath(waypoints, progress) {
  const totalSegments = waypoints.length - 1
  const pos = Math.min(progress * totalSegments, totalSegments - 0.001)
  const segIdx = Math.floor(pos)
  const segProgress = pos - segIdx
  const start = waypoints[segIdx]
  const end = waypoints[segIdx + 1]
  return [
    start[0] + (end[0] - start[0]) * segProgress,
    start[1] + (end[1] - start[1]) * segProgress,
  ]
}

export function useSimulation() {
  const [convoys, setConvoys] = useState(initConvoys)
  const [kpis, setKpis] = useState(initialKPIs)
  const [activeIncident, setActiveIncident] = useState(null)
  const incidentTimer = useRef(null)
  const incidentIdx = useRef(0)

  useEffect(() => {
    // Move convoys
    const moveInterval = setInterval(() => {
      setConvoys(prev =>
        prev.map(c => ({
          ...c,
          progress: c.progress >= 1 ? 0.01 : c.progress + 0.0008,
        }))
      )
    }, 100)

    // Trigger incidents periodically
    const triggerIncident = () => {
      const scenario = incidentScenarios[incidentIdx.current % incidentScenarios.length]
      incidentIdx.current += 1

      // Mark a convoy as alert
      setConvoys(prev => {
        const idx = prev.findIndex(c => c.corridorId === scenario.corridor)
        if (idx === -1) return prev
        const next = [...prev]
        next[idx] = { ...next[idx], status: 'alert' }
        return next
      })

      setActiveIncident(scenario)

      // Update KPIs slightly
      setKpis(prev => ({
        ...prev,
        onTimeRate: Math.max(85, prev.onTimeRate - 1),
        incidentsResolved: prev.incidentsResolved + 1,
      }))
    }

    incidentTimer.current = setTimeout(triggerIncident, 15000)
    const repeatInterval = setInterval(() => {
      if (!activeIncident) triggerIncident()
    }, 40000)

    return () => {
      clearInterval(moveInterval)
      clearTimeout(incidentTimer.current)
      clearInterval(repeatInterval)
    }
  }, [])

  const dismissIncident = () => {
    setActiveIncident(null)
    // Recover the convoy
    setConvoys(prev =>
      prev.map(c => (c.status === 'alert' ? { ...c, status: 'moving' } : c))
    )
    setKpis(prev => ({ ...prev, onTimeRate: Math.min(97, prev.onTimeRate + 1) }))
  }

  return { convoys, kpis, activeIncident, dismissIncident }
}
