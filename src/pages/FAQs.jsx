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
const initialFAQs = [
  {
    id: '1',
    title: 'How do I access the employee portal?',
    content: 'To access the employee portal, go to www.ninja llc.com/employee and log in with your company credentials. If you forgot your password, use the "Forgot Password" link or contact IT support.',
    tags: ['portal', 'access', 'login'],
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
  },
  {
    id: '2',
    title: 'What are the vacation request procedures?',
    content: 'Submit vacation requests through the HR portal at least 2 weeks in advance. Your supervisor must approve the request before it becomes official. Check the company calendar for blackout dates.',
    tags: ['vacation', 'HR', 'procedures'],
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString(),
  },
  {
    id: '3',
    title: 'How do I report a safety incident?',
    content: 'Safety incidents must be reported immediately to your supervisor and documented in the safety management system. For emergencies, call 911 first, then notify your supervisor and safety department.',
    tags: ['safety', 'incident', 'reporting'],
    createdAt: new Date('2024-03-01').toISOString(),
    updatedAt: new Date('2024-03-01').toISOString(),
  },
  {
    id: '4',
    title: 'What benefits are available to employees?',
    content: 'Ninja LLC offers comprehensive benefits including health insurance, dental, vision, 401(k) with company match, life insurance, and employee assistance programs. Details are available in the benefits portal.',
    tags: ['benefits', 'insurance', 'retirement'],
    createdAt: new Date('2024-03-10').toISOString(),
    updatedAt: new Date('2024-03-10').toISOString(),
  },
];

const FAQs = () => {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Get all unique tags from FAQs
  const allTags = useMemo(() => {
    const tagSet = new Set();
    faqs.forEach(faq => {
      if (faq.tags) {
        faq.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [faqs]);

  // Filter and search FAQs
  const filteredFAQs = useMemo(() => {
    let result = faqs;

    // Apply tag filter first
    if (selectedTags.length > 0) {
      result = filterByTags(result, selectedTags);
    }

    // Apply fuzzy search
    if (searchQuery.trim()) {
      result = fuzzySearch(result, searchQuery);
    }

    return result;
  }, [faqs, searchQuery, selectedTags]);

  const handleCreateFAQ = () => {
    setCreateModalOpen(true);
  };

  const handleCreateSave = (newFAQ) => {
    setFaqs(prev => [newFAQ, ...prev]);
    setCreateModalOpen(false);
  };

  const handleCreateCancel = () => {
    setCreateModalOpen(false);
  };

  const handleEditFAQ = (updatedFAQ) => {
    setFaqs(prev => prev.map(faq =>
      faq.id === updatedFAQ.id ? updatedFAQ : faq
    ));
  };

  const handleDeleteFAQ = (faqId) => {
    setFaqs(prev => prev.filter(faq => faq.id !== faqId));
  };

  const handleTagsChange = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Frequently Asked Questions
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateFAQ}
            size="large"
          >
            Add FAQ
          </Button>
        </Box>

        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'flex-start' }}>
            <TextField
              label="Search FAQs..."
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
                {filteredFAQs.length} of {faqs.length} FAQs shown
                {searchQuery && ` • Search: "${searchQuery}"`}
                {selectedTags.length > 0 && ` • Tags: ${selectedTags.join(', ')}`}
              </Typography>
            </Box>
          )}
        </Paper>

        <CardList
          items={filteredFAQs}
          onEdit={handleEditFAQ}
          onDelete={handleDeleteFAQ}
          type="FAQ"
        />

        <EditModal
          open={createModalOpen}
          item={null}
          type="FAQ"
          onSave={handleCreateSave}
          onCancel={handleCreateCancel}
        />
      </Box>
    </Container>
  );
};

export default FAQs;
