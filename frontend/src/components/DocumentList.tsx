import type { Document } from '../types';
import { Card } from './ui/Card.tsx';
import { CardBody } from './ui/Card.tsx';
import { CardTitle } from './ui/Card.tsx';
import { CardMeta } from './ui/Card.tsx';
import { CardFooter } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { EmptyState } from './ui/EmptyState.tsx';
import { Grid } from './ui/Grid.tsx';
import { Icon } from '../components/icons';
import { formatDate } from '../utils';

interface DocumentListProps {
  documents: Document[];
}

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  insurance: 'Insurance Card',
  lab_result: 'Lab Result',
  other: 'Other',
};

const DOCUMENT_TYPE_TONE: Record<string, 'primary' | 'soft' | 'neutral'> = {
  insurance: 'primary',
  lab_result: 'soft',
  other: 'neutral',
};

function DocumentList({ documents }: DocumentListProps) {
  const docs = Array.isArray(documents) ? documents : [];

  if (docs.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No documents yet"
        text="Upload your insurance card, lab results, or other medical paperwork to keep everything in one place."
      />
    );
  }

  return (
    <Grid size="sm" cols={3}>
      {docs.map((doc) => {
        const label = DOCUMENT_TYPE_LABELS[doc.document_type] || doc.document_type;
        const tone = DOCUMENT_TYPE_TONE[doc.document_type] || 'neutral';
        const fileName = typeof doc.file === 'string' ? doc.file.split('/').pop() : 'document';

        return (
          <Card key={doc.id}>
            <CardBody>
              <div className="ds-cluster" style={{ justifyContent: 'space-between' }}>
                <Icon name="package" size={20} />
                <Badge tone={tone}>{label}</Badge>
              </div>
              <CardTitle>{fileName}</CardTitle>
              <CardMeta>Uploaded {formatDate(doc.created_at)}</CardMeta>
            </CardBody>
            <CardFooter>
              {typeof doc.file === 'string' && doc.file ? (
                <a
                  className="btn btn-secondary"
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="download" size={16} /> View file
                </a>
              ) : (
                <span className="ds-muted ds-small">No file attached</span>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </Grid>
  );
}

export default DocumentList;