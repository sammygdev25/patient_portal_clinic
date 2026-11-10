import React, { useState } from 'react';
import { createDocument } from '../api';
import { Button } from './ui/Button.tsx';
import { Icon } from './icons';

interface DocumentUploadFormProps {
  onUpload: () => void;
}

const DOCUMENT_TYPES: { value: string; label: string }[] = [
  { value: 'insurance', label: 'Insurance Card' },
  { value: 'lab_result', label: 'Lab Result' },
  { value: 'other', label: 'Other' },
];

export default function DocumentUploadForm({ onUpload }: DocumentUploadFormProps) {
  const [documentType, setDocumentType] = useState<string>('other');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose a file to upload.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await createDocument({
        document_type: documentType,
        file: file,
      } as any);
      setFile(null);
      setDocumentType('other');
      const fileInput = document.getElementById('document-upload-file') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      }
      onUpload();
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      <div className="ds-field">
        <label className="ds-label" htmlFor="document-upload-type">
          Document type
        </label>
        <select
          id="document-upload-type"
          className="input"
          value={documentType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDocumentType(e.target.value)}
        >
          {DOCUMENT_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="document-upload-file">
          File
        </label>
        <input
          id="document-upload-file"
          className="input"
          type="file"
          onChange={handleFileChange}
        />
        <p className="ds-help">Upload insurance cards, lab results or other clinic documents.</p>
      </div>

      {error && (
        <p className="ds-help" style={{ color: 'var(--color-danger)' }}>
          {error}
        </p>
      )}

      <div className="ds-form-actions">
        <Button type="submit" variant="primary" disabled={submitting}>
          <Icon name="upload" size={16} />
          {submitting ? 'Uploading...' : 'Upload Document'}
        </Button>
      </div>
    </form>
  );
}