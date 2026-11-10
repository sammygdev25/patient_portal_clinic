import { PageHeader } from '../components/ui';

interface DocumentsHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function DocumentsHeader({
  title = 'Documents',
  subtitle = 'Upload and manage your insurance cards, lab results and other clinic paperwork in one secure place.',
}: DocumentsHeaderProps) {
  return <PageHeader title={title} subtitle={subtitle} />;
}