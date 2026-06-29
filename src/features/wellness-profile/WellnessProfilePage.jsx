import React from 'react';
import WellnessProfileForm from './WellnessProfileForm';

/**
 * WellnessProfilePage
 *
 * Full-page wrapper for the Wellness Profile Configuration Setup screen.
 * Dark slate canvas with centred card form.
 */
function WellnessProfilePage() {
  return (
    <main
      style={{
        minHeight:      '100vh',
        background:     'var(--color-canvas)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        padding:        'var(--space-10) var(--space-4)',
      }}
    >
      {/* Page header */}
      <header
        style={{
          textAlign:    'center',
          marginBottom: 'var(--space-8)',
          maxWidth:     '640px',
        }}
      >
        {/* Logo / brand mark */}
        <div
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          '56px',
            height:         '56px',
            background:     'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            borderRadius:   '16px',
            marginBottom:   'var(--space-5)',
            boxShadow:      '0 8px 32px rgba(99,102,241,0.35)',
          }}
          aria-hidden="true"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>

        <p
          style={{
            fontSize:    'var(--font-size-sm)',
            fontWeight:  600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:       'var(--color-indigo)',
            marginBottom: 'var(--space-2)',
          }}
        >
          Metro Fit
        </p>

        <h1
          style={{
            fontSize:    'var(--font-size-3xl)',
            fontWeight:  700,
            color:       'var(--color-text-primary)',
            lineHeight:  1.2,
            marginBottom: 'var(--space-3)',
          }}
        >
          Wellness Profile Setup
        </h1>

        <p
          style={{
            fontSize: 'var(--font-size-base)',
            color:    'var(--color-text-muted)',
            lineHeight: 1.7,
          }}
        >
          Configure your physical metrics and wellness goals so Metro Fit
          can accurately calculate your daily progress and keep you on track.
        </p>
      </header>

      {/* Stats cards — motivational context */}
      <div
        style={{
          display:              'grid',
          gridTemplateColumns:  'repeat(3, 1fr)',
          gap:                  'var(--space-4)',
          marginBottom:         'var(--space-8)',
          width:                '100%',
          maxWidth:             '860px',
        }}
      >
        {[
          { icon: '⚖️', label: 'Weight', desc: 'Track your progress' },
          { icon: '🚶', label: 'Steps',  desc: 'Move every day' },
          { icon: '⏱️', label: 'Active', desc: 'Stay energised' },
        ].map(({ icon, label, desc }) => (
          <div
            key={label}
            style={{
              background:    'var(--color-card)',
              border:        '1px solid var(--color-border)',
              borderRadius:  'var(--radius-md)',
              padding:       'var(--space-5)',
              textAlign:     'center',
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>{icon}</span>
            <p
              style={{
                marginTop:  'var(--space-2)',
                fontWeight: 600,
                color:      'var(--color-text-primary)',
                fontSize:   'var(--font-size-sm)',
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color:    'var(--color-text-muted)',
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* The form card */}
      <WellnessProfileForm />

      {/* Footer note */}
      <p
        style={{
          marginTop: 'var(--space-8)',
          fontSize:  'var(--font-size-xs)',
          color:     'var(--color-placeholder)',
          textAlign: 'center',
        }}
      >
        All fields accept positive numbers only · Values are validated in real-time
      </p>
    </main>
  );
}

export default WellnessProfilePage;
