import type { VisitNote, Prescription } from '../types';
import { Stack } from './ui/Grid.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Icon } from './icons';
import { formatDate } from '../utils';

interface VisitHistoryListProps {
  notes: VisitNote[];
  prescriptions: Prescription[];
}

type TimelineEntry =
  | { kind: 'note'; date: string; data: VisitNote }
  | { kind: 'prescription'; date: string; data: Prescription };

export default function VisitHistoryList({ notes, prescriptions }: VisitHistoryListProps) {
  const safeNotes = Array.isArray(notes) ? notes : [];
  const safePrescriptions = Array.isArray(prescriptions) ? prescriptions : [];

  const entries: TimelineEntry[] = [
    ...safeNotes.map((n) => ({ kind: 'note' as const, date: n.created_at, data: n })),
    ...safePrescriptions.map((p) => ({ kind: 'prescription' as const, date: p.created_at, data: p })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (entries.length === 0) {
    return (
      <EmptyState
        icon="book"
        title="No visit history yet"
        text="Visit notes and prescriptions written for this patient will appear here."
      />
    );
  }

  return (
    <Stack gap="md">
      {entries.map((entry) => {
        if (entry.kind === 'note') {
          const note = entry.data;
          return (
            <div key={`note-${note.id}`} className="ds-card">
              <div className="ds-card-body">
                <div className="ds-between">
                  <Badge tone="primary">
                    <Icon name="book" size={14} /> Visit Note
                  </Badge>
                  <span className="ds-small ds-muted">{formatDate(note.created_at)}</span>
                </div>
                <p className="ds-lead" style={{ marginTop: 'var(--space-sm)' }}>
                  {note.notes}
                </p>
              </div>
            </div>
          );
        }

        const prescription = entry.data;
        return (
          <div key={`prescription-${prescription.id}`} className="ds-card">
            <div className="ds-card-body">
              <div className="ds-between">
                <Badge tone="success">
                  <Icon name="tag" size={14} /> Prescription
                </Badge>
                <span className="ds-small ds-muted">{formatDate(prescription.created_at)}</span>
              </div>
              <p className="ds-card-title" style={{ marginTop: 'var(--space-sm)' }}>
                {prescription.medication}
                <span className="ds-muted"> &middot; {prescription.dosage}</span>
              </p>
              {prescription.instructions && (
                <p className="ds-small ds-muted">{prescription.instructions}</p>
              )}
            </div>
          </div>
        );
      })}
    </Stack>
  );
}