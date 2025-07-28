import {
    Add as AddIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

import CardList from '../components/CardList';
import EditModal from '../components/EditModal';
import TagFilter from '../components/TagFilter';
import { filterByTags, fuzzySearch } from '../utils/fuzzySearch';

// Sample initial data
const initialNotes = [
  {
    id: '1',
    title: 'Ninja LLC Company Overview',
    content: 'Ninja LLC is a leading midstream service provider that owns one of the nation\'s premier natural gas liquids systems, connecting NGL supply in the Rocky Mountain, Permian and Mid-Continent regions with key market centers.',
    tags: ['company', 'overview', 'business'],
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'Safety Protocols',
    content: 'All employees must follow proper safety procedures including wearing PPE, conducting safety briefings before operations, and reporting any safety incidents immediately.',
    tags: ['safety', 'procedures', 'mandatory'],
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: '3',
    title: 'Emergency Contact Numbers',
    content: 'Emergency Hotline: 1-800-xxx-xxxx, Supervisor Contact: 555-xxxx, Security: 911 or 555-xxxx. Keep these numbers accessible at all times.',
    tags: ['emergency', 'contacts', 'important'],
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString(),
  },
];

const Notes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Get all unique tags from notes
  const allTags = useMemo(() => {
    const tagSet = new Set();
    notes.forEach(note => {
      if (note.tags) {
        note.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [notes]);

  // Filter and search notes
  const filteredNotes = useMemo(() => {
    let result = notes;

    // Apply tag filter first
    if (selectedTags.length > 0) {
      result = filterByTags(result, selectedTags);
    }

    // Apply fuzzy search
    if (searchQuery.trim()) {
      result = fuzzySearch(result, searchQuery);
    }

    return result;
  }, [notes, searchQuery, selectedTags]);

  const handleCreateNote = () => {
    setCreateModalOpen(true);
  };

  const handleCreateSave = (newNote) => {
    setNotes(prev => [newNote, ...prev]);
    setCreateModalOpen(false);
  };

  const handleCreateCancel = () => {
    setCreateModalOpen(false);
  };

  const handleEditNote = (updatedNote) => {
    setNotes(prev => prev.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const handleDeleteNote = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Notes
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNote}
            size="large"
          >
            Create Note
          </Button>
        </Box>

        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'flex-start' }}>
            <TextField
              label="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              }}
              sx={{ flex: 1 }}
            />
            <TagFilter
              allTags={allTags}
              selectedTags={selectedTags}
              onTagsChange={handleTagsChange}
            />
          </Box>

          {(searchQuery || selectedTags.length > 0) && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {filteredNotes.length} of {notes.length} notes shown
                {searchQuery && ` • Search: "${searchQuery}"`}
                {selectedTags.length > 0 && ` • Tags: ${selectedTags.join(', ')}`}
              </Typography>
            </Box>
          )}
        </Paper>

        <CardList
          items={filteredNotes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          type="note"
        />

        <EditModal
          open={createModalOpen}
          item={null}
          type="note"
          onSave={handleCreateSave}
          onCancel={handleCreateCancel}
        />
      </Box>
    </Container>
  );
};

export default Notes;
