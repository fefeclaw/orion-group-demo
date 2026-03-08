import { useEffect, useState } from 'react';

const severityConfig = {
  critical: { icon: '🔴', color: '#EF4444', bg: 'rgba(239,68,68,0.12)', label: 'CRITIQUE',  border: '#EF4444' },
  high:     { icon: '🟠', color: '#F97316', bg: 'rgba(249,115,22,0.12)', label: 'ÉLEVÉ',    border: '#F97316' },
  medium:   { icon: '🟡', color: '#EAB308', bg: 'rgba(234,179,8,0.12)',  label: 'MODÉRÉ',   border: '#EAB308' },
  low:      { icon: '🟢', color: '#22C55E', bg: 'rgba(34,197,94,0.12)', label: 'FAIBLE',    border: '#22C55E' },
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(3px)',
  },
  card: {
    backgroundColor: '#0F172A',
    border: '1px solid #1E293B',
    borderRadius: '16px',
    width: '420px',
    maxWidth: '90vw',
    padding: '28px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: '#F8FAFC',
    position: 'relative',
  },
  aiBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(249,115,22,0.15)',
    border: '1px solid rgba(249,115,22,0.4)',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#F97316',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '18px',
  },
  badgeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#F97316',
    animation: 'alertPulse 1s infinite',
  },
  incidentHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '14px',
  },
  incidentIcon: {
    fontSize: '28px',
    lineHeight: 1,
    flexShrink: 0,
  },
  incidentTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#F1F5F9',
    lineHeight: 1.3,
    margin: 0,
  },
  metaRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '6px',
    flexWrap: 'wrap',
  },
  metaBadge: {
    fontSize: '10px',
    fontWeight: '600',
    padding: '2px 8px',
    borderRadius: '12px',
    backgroundColor: '#1E293B',
    color: '#94A3B8',
    border: '1px solid #334155',
    letterSpacing: '0.5px',
  },
  severityBadge: {
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '12px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  divider: {
    height: '1px',
    backgroundColor: '#1E293B',
    margin: '16px 0',
  },
  messageBox: {
    backgroundColor: '#1E293B',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '13px',
    color: '#CBD5E1',
    lineHeight: '1.6',
    marginBottom: '16px',
    border: '1px solid #334155',
  },
  aiActionBox: {
    borderRadius: '10px',
    padding: '14px',
    marginBottom: '22px',
  },
  aiActionTitle: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  aiActionText: {
    fontSize: '13px',
    lineHeight: '1.6',
    fontWeight: '500',
  },
  confirmBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '800',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#F97316',
    color: '#fff',
  },
};

export default function IncidentAlert({ incident, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Slight delay so the browser paints before triggering the transition
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  if (!incident) return null;

  const {
    type = 'Incident détecté',
    corridor = '',
    location = '',
    message = '',
    aiAction = '',
    severity = 'high',
  } = incident;

  const cfg = severityConfig[severity] || severityConfig.high;

  function handleDismiss() {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 280);
  }

  const cardStyle = {
    ...styles.card,
    transform: visible && !exiting ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
    opacity: visible && !exiting ? 1 : 0,
    transition: 'transform 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.28s ease',
    borderColor: cfg.border + '55',
  };

  const overlayStyle = {
    ...styles.overlay,
    opacity: visible && !exiting ? 1 : 0,
    transition: 'opacity 0.28s ease',
  };

  return (
    <>
      <style>{`
        @keyframes alertPulse {
          0%   { box-shadow: 0 0 0 0 rgba(249,115,22,0.7); }
          70%  { box-shadow: 0 0 0 7px rgba(249,115,22,0); }
          100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
        }
        .confirm-btn:hover {
          background-color: #EA6C0A !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(249,115,22,0.35);
        }
        .confirm-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div style={overlayStyle} onClick={handleDismiss}>
        <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
          {/* ── AI BADGE ── */}
          <div style={styles.aiBadge}>
            <div style={styles.badgeDot} />
            ⚡ IA Décisionnelle
          </div>

          {/* ── INCIDENT HEADER ── */}
          <div style={styles.incidentHeader}>
            <span style={styles.incidentIcon}>{cfg.icon}</span>
            <div>
              <h2 style={styles.incidentTitle}>{type}</h2>
              <div style={styles.metaRow}>
                {corridor && (
                  <span style={styles.metaBadge}>🗺️ {corridor}</span>
                )}
                {location && (
                  <span style={styles.metaBadge}>📍 {location}</span>
                )}
                <span
                  style={{
                    ...styles.severityBadge,
                    color: cfg.color,
                    backgroundColor: cfg.bg,
                    border: `1px solid ${cfg.color}50`,
                  }}
                >
                  {cfg.label}
                </span>
              </div>
            </div>
          </div>

          <div style={styles.divider} />

          {/* ── MESSAGE ── */}
          {message && (
            <div style={styles.messageBox}>
              {message}
            </div>
          )}

          {/* ── AI ACTION ── */}
          {aiAction && (
            <div
              style={{
                ...styles.aiActionBox,
                backgroundColor: cfg.bg,
                border: `1px solid ${cfg.color}35`,
              }}
            >
              <div style={{ ...styles.aiActionTitle, color: cfg.color }}>
                <span>🤖</span> Action IA
              </div>
              <p style={{ ...styles.aiActionText, color: '#E2E8F0', margin: 0 }}>
                {aiAction}
              </p>
            </div>
          )}

          {/* ── CONFIRM BUTTON ── */}
          <button
            style={styles.confirmBtn}
            className="confirm-btn"
            onClick={handleDismiss}
          >
            Confirmer
          </button>
        </div>
      </div>
    </>
  );
}
