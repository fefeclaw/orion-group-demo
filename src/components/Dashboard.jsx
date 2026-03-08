import { useEffect, useState } from 'react';

const styles = {
  sidebar: {
    width: '320px',
    minHeight: '100vh',
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    borderRight: '1px solid #1E293B',
    overflowY: 'auto',
  },
  header: {
    padding: '24px 20px 20px',
    borderBottom: '1px solid #1E293B',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  },
  headerTitle: {
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '3px',
    color: '#F97316',
    margin: 0,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: '11px',
    color: '#94A3B8',
    letterSpacing: '2px',
    marginTop: '4px',
    textTransform: 'uppercase',
  },
  section: {
    padding: '18px 20px',
    borderBottom: '1px solid #1E293B',
  },
  sectionTitle: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  kpiCard: {
    backgroundColor: '#1E293B',
    borderRadius: '10px',
    padding: '12px',
    border: '1px solid #334155',
    transition: 'transform 0.2s ease',
    cursor: 'default',
  },
  kpiValue: {
    fontSize: '24px',
    fontWeight: '800',
    lineHeight: 1,
    marginBottom: '4px',
  },
  kpiLabel: {
    fontSize: '10px',
    color: '#94A3B8',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  convoyItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    backgroundColor: '#1E293B',
    borderRadius: '8px',
    marginBottom: '8px',
    border: '1px solid #334155',
  },
  convoyLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  convoyName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#E2E8F0',
  },
  convoyRoute: {
    fontSize: '11px',
    color: '#64748B',
    marginTop: '2px',
  },
  badge: {
    fontSize: '10px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '20px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  corridorItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    backgroundColor: '#1E293B',
    borderRadius: '8px',
    marginBottom: '8px',
    border: '1px solid #334155',
  },
  corridorDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  corridorName: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#CBD5E1',
  },
  corridorSub: {
    fontSize: '10px',
    color: '#64748B',
    marginTop: '2px',
  },
  footer: {
    marginTop: 'auto',
    padding: '16px 20px',
    borderTop: '1px solid #1E293B',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  footerText: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#22C55E',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#22C55E',
    flexShrink: 0,
    animation: 'pulse 1.5s infinite',
  },
};

const statusConfig = {
  moving: { color: '#22C55E', bg: 'rgba(34,197,94,0.15)', label: 'EN ROUTE' },
  delayed: { color: '#F97316', bg: 'rgba(249,115,22,0.15)', label: 'RETARD' },
  alert:   { color: '#EF4444', bg: 'rgba(239,68,68,0.15)',  label: 'ALERTE' },
};

function AnimatedNumber({ target, suffix = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setValue(parseFloat(current.toFixed(1)));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {Number.isInteger(target) ? Math.round(value) : value}
      {suffix}
    </span>
  );
}

export default function Dashboard({ kpis, convoys, corridors }) {
  const {
    onTimeRate = 94.2,
    avgTransitHours = 18.5,
    activeConvoys = 12,
    incidentsResolved = 7,
  } = kpis || {};

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .kpi-card:hover { transform: translateY(-2px); }
        .convoy-item:hover { background-color: #263348 !important; }
      `}</style>

      <div style={styles.sidebar}>
        {/* ── HEADER ── */}
        <div style={styles.header}>
          <p style={styles.headerTitle}>Orion Group</p>
          <p style={styles.headerSubtitle}>🌍 Orchestration Logistique</p>
        </div>

        {/* ── KPIs ── */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>📊</span> KPIs en temps réel
          </div>
          <div style={styles.kpiGrid}>
            <div style={styles.kpiCard} className="kpi-card">
              <div style={{ ...styles.kpiValue, color: '#22C55E' }}>
                <AnimatedNumber target={onTimeRate} suffix="%" />
              </div>
              <div style={styles.kpiLabel}>Ponctualité</div>
            </div>
            <div style={styles.kpiCard} className="kpi-card">
              <div style={{ ...styles.kpiValue, color: '#3B82F6' }}>
                <AnimatedNumber target={avgTransitHours} suffix="h" />
              </div>
              <div style={styles.kpiLabel}>Transit moyen</div>
            </div>
            <div style={styles.kpiCard} className="kpi-card">
              <div style={{ ...styles.kpiValue, color: '#F97316' }}>
                <AnimatedNumber target={activeConvoys} />
              </div>
              <div style={styles.kpiLabel}>Convois actifs</div>
            </div>
            <div style={styles.kpiCard} className="kpi-card">
              <div style={{ ...styles.kpiValue, color: '#A855F7' }}>
                <AnimatedNumber target={incidentsResolved} />
              </div>
              <div style={styles.kpiLabel}>Incidents résolus</div>
            </div>
          </div>
        </div>

        {/* ── CONVOYS ── */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>🚛</span> Convois actifs
          </div>
          {(convoys || []).map((convoy) => {
            const cfg = statusConfig[convoy.status] || statusConfig.moving;
            return (
              <div key={convoy.id} style={styles.convoyItem} className="convoy-item">
                <div style={styles.convoyLeft}>
                  <span style={{ fontSize: '18px' }}>🚛</span>
                  <div>
                    <div style={styles.convoyName}>{convoy.name}</div>
                    <div style={styles.convoyRoute}>{convoy.route || convoy.corridor}</div>
                  </div>
                </div>
                <span
                  style={{
                    ...styles.badge,
                    color: cfg.color,
                    backgroundColor: cfg.bg,
                    border: `1px solid ${cfg.color}40`,
                  }}
                >
                  {cfg.label}
                </span>
              </div>
            );
          })}
          {(!convoys || convoys.length === 0) && (
            <div style={{ color: '#64748B', fontSize: '12px', textAlign: 'center', padding: '12px 0' }}>
              Aucun convoi en cours
            </div>
          )}
        </div>

        {/* ── CORRIDORS ── */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>🗺️</span> Corridors
          </div>
          {(corridors || []).map((corridor) => (
            <div key={corridor.id} style={styles.corridorItem}>
              <div style={{ ...styles.corridorDot, backgroundColor: corridor.color || '#F97316' }} />
              <div>
                <div style={styles.corridorName}>{corridor.name}</div>
                {corridor.description && (
                  <div style={styles.corridorSub}>{corridor.description}</div>
                )}
              </div>
            </div>
          ))}
          {(!corridors || corridors.length === 0) && (
            <div style={{ color: '#64748B', fontSize: '12px', textAlign: 'center', padding: '12px 0' }}>
              Aucun corridor défini
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div style={styles.footer}>
          <div style={styles.pulseDot} />
          <span style={styles.footerText}>IA Décisionnelle active</span>
        </div>
      </div>
    </>
  );
}
