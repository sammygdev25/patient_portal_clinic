import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDocumentList } from '../api';
import type { Document } from '../types';
import DocumentsHeader from '../components/DocumentsHeader';
import DocumentsContent from '../components/DocumentsContent';
import DocumentUploadForm from '../components/DocumentUploadForm';
import { Section } from '../components/ui/Section.tsx';

export default function DocumentsPage() {
  useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDocumentList();
      setDocuments(Array.isArray(data) ? data : []);
    } catch {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return (
    <div className="ds-stack-lg">
      <DocumentsHeader />
      <Section title="Upload a document" tight>
        <DocumentUploadForm onUpload={loadDocuments} />
      </Section>
      <DocumentsContent documents={documents} loading={loading} />
    </div>
  );
}