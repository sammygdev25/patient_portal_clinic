import { Section } from './ui/Section.tsx';
import { Grid } from './ui/Grid.tsx';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { SkeletonCards } from './ui/Loading.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Button } from './ui/Button.tsx';
import { Icon } from '../components/icons';
import type { Document } from '../types';

interface DocumentsContentProps {
  documents: Document[];
  loading: boolean;
}

const typeLabels: Record<string, string> = {
  insurance: 'Insurance Card',
  lab_result: 'Lab Result',
  other: 'Other',
};

const typeIcons: Record<string, 'shield' | 'package'> = {
  insurance: 'shield',
  lab_result: 'package',
  other: 'package',
};

export default function DocumentsContent({ documents, loading }: DocumentsContentProps) {
  if (loading) {
    return (
      <Section title="Your documents" subtitle="Insurance cards, lab results and other paperwork on file">
        <SkeletonCards count={4} />
      </Section>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <Section title="Your documents" subtitle="Insurance cards, lab results and other paperwork on file">
        <EmptyState
          icon="upload"
          title="No documents uploaded yet"
          text="Upload your insurance card, lab results or other paperwork so your care team has it on hand."
        />
      </Section>
    );
  }

  return (
    <Section title="Your documents" subtitle="Insurance cards, lab results and other paperwork on file">
      <Grid size="md" cols={3}>
        {(Array.isArray(documents) ? documents : []).map((doc) => (
          <Card key={doc.id}>
            <CardBody>
              <Badge tone="soft">{typeLabels[doc.document_type] || 'Other'}</Badge>
              <CardTitle>
                <Icon name={typeIcons[doc.document_type] || 'package'} size={18} />{' '}
                {typeLabels[doc.document_type] || doc.document_type}
              </CardTitle>
              <CardMeta>
                Uploaded {new Date(doc.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </CardMeta>
            </CardBody>
            <CardFooter>
              <Button
                variant="secondary"
                href={typeof doc.file === 'string' ? doc.file : undefined}
              >
                <Icon name="download" size={16} /> View file
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
