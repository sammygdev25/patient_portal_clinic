import type { ClinicHour } from '../types';
import { Icon } from '../components/icons';

interface ClinicHoursTableProps {
  hours: ClinicHour[];
}

const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function formatTime(value: string): string {
  if (!value) return '';
  const parts = value.split(':');
  const hourNum = parseInt(parts[0], 10);
  const minute = parts[1] ?? '00';
  const period = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
  return `${hour12}:${minute} ${period}`;
}

function ClinicHoursTable({ hours }: ClinicHoursTableProps) {
  const sortedHours = Array.isArray(hours)
    ? [...hours].sort(
        (a, b) => DAY_ORDER.indexOf(a.day_of_week) - DAY_ORDER.indexOf(b.day_of_week)
      )
    : [];

  if (sortedHours.length === 0) {
    return (
      <div className="ds-empty">
        <Icon name="clock" size={28} />
        <p>Clinic hours have not been published yet.</p>
      </div>
    );
  }

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {sortedHours.map((entry) => (
            <tr key={entry.id}>
              <td>{DAY_LABELS[entry.day_of_week] || entry.day_of_week}</td>
              <td>{formatTime(entry.open_time)}</td>
              <td>{formatTime(entry.close_time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClinicHoursTable;