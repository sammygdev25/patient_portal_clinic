import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getVisitNoteList } from '../api';
import type { VisitNote } from '../types';
import VisitNotesHeader from '../components/VisitNotesHeader';
import VisitNotesContent from '../components/VisitNotesContent';
import { Alert } from '../components/ui/Badge.tsx';

export default function VisitNotesPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<VisitNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let active = true;
    const loadNotes = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getVisitNoteList();
        if (active) {
          setNotes(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError('Unable to load your visit notes right now. Please try again later.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    loadNotes();
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="ds-stack-lg">
      <VisitNotesHeader noteCount={notes.length} />
      {error ? <Alert tone="danger">{error}</Alert> : null}
      <VisitNotesContent notes={notes} loading={loading} />
    </div>
  );
}