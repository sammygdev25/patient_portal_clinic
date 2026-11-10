import React from 'react';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import type { VisitNote } from '../types';

interface VisitNoteListProps {
  notes: VisitNote[];
}

function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function VisitNoteList({ notes }: VisitNoteListProps) {
  const list = Array.isArray(notes) ? notes : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="book"
        title="No visit notes yet"
        text="After your appointments, your doctor's visit notes will appear here."
      />
    );
  }

  return (
    <div className="ds-stack">
      {list.map((note) => (
        <Card key={note.id}>
          <CardBody>
            <div className="ds-between">
              <h3 className="ds-card-title">Visit Note</h3>
              <CardMeta>{formatDateTime(note.created_at)}</CardMeta>
            </div>
            <p className="ds-muted">{note.notes}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}