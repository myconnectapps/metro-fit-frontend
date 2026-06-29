/**
 * API service for wellness profile.
 * Abstracts all HTTP I/O behind a clean interface.
 * Swap this for a mock during testing.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Saves (creates or updates) a wellness profile.
 * @param {{ userId?: string, currentWeight: string, targetWeight: string, stepTarget: string, activeMinutes: string }} data
 * @returns {Promise<{ success: boolean, data?: object, errors?: object, message?: string }>}
 */
export async function saveWellnessProfile(data) {
  const response = await fetch(`${API_BASE}/wellness-profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: data.userId || 'anonymous',
      currentWeight: Number(data.currentWeight),
      targetWeight:  Number(data.targetWeight),
      stepTarget:    Number(data.stepTarget),
      activeMinutes: Number(data.activeMinutes),
    }),
  });

  const json = await response.json();
  return json;
}
