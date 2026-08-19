/**
 * Helper to generate Google Calendar event URL and download .ics files for alarms
 */

export function formatIcsDate(dateObj) {
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export function openGoogleCalendarEvent({ title, details, startDate, location = 'Oficina Mecânica' }) {
  const start = startDate ? new Date(startDate) : new Date();
  // Default to 1 hour event
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const startIso = formatIcsDate(start);
  const endIso = formatIcsDate(end);

  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const url = `${baseUrl}&text=${encodeURIComponent(title)}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}&dates=${startIso}/${endIso}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}

export function downloadIcsFile({ title, details, startDate, location = 'Oficina Mecânica' }) {
  const start = startDate ? new Date(startDate) : new Date();
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const startIso = formatIcsDate(start);
  const endIso = formatIcsDate(end);
  const nowIso = formatIcsDate(new Date());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AutoCare Manager//BR',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:autocare-${Date.now()}@autocare.app`,
    `DTSTAMP:${nowIso}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D', // Alarm 1 day before
    'ACTION:DISPLAY',
    'DESCRIPTION:Lembrete de Manutenção do Veículo - AutoCare',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Lembrete_Revisao_${Date.now()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
