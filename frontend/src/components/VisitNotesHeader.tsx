import React from 'react';
import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface VisitNotesHeaderProps {
  noteCount?: number;
}

export default function VisitNotesHeader({ noteCount = 0 }: VisitNotesHeaderProps) {
  return (
    <PageHeader
      eyebrow="Patient Portal"
      title="Visit Notes"
      subtitle={
        noteCount > 0
          ? `Review the clinical notes your doctors have written after your ${noteCount} past visit${noteCount === 1 ? '' : 's'}.`
          : 'Clinical notes from your doctors will appear here after each completed appointment.'
      }
      actions={<Icon name="book" size={28} title="Visit notes" />}
    />
  );
}