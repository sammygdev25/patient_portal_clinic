import type { VisitNote } from '../types';
import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { Icon } from '../components/icons';

interface VisitNotesContentProps {
  notes: VisitNote[];
  loading?: boolean;
}

export default function VisitNotesContent({ notes, loading = false }: VisitNotesContentProps) {
  if (loading) {
    return (
      <Section eyebrow="Your records" title="Visit notes">
        <SkeletonCards count={3} />
      </Section>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <Section eyebrow="Your records" title="Visit notes">
        <EmptyState
          icon="book"
          title="No visit notes yet"
          text="After your appointment, your doctor's notes from the visit will appear here."
        />
      </Section>
    );
  }

  return (
    <Section eyebrow="Your records" title="Visit notes" subtitle="Clinical notes written by your doctor after each appointment.">
      <Grid size="md" cols={2}>
        {(Array.isArray(notes) ? notes : []).map((note) => (
          <Card key={note.id}>
            <CardBody>
              <CardTitle>
                <Icon name="book" size={16} /> Visit note
              </CardTitle>
              <CardMeta>
                {new Date(note.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </CardMeta>
              <p className="ds-muted">{note.notes}</p>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}