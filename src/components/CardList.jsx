import {
    Delete as DeleteIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import { useState } from 'react';
import EditModal from './EditModal';

const CardList = ({ items, onEdit, onDelete, type = 'note' }) => {
  const [editItem, setEditItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = (item) => {
    setEditItem(item);
    setEditModalOpen(true);
  };

  const handleEditSave = (updatedItem) => {
    onEdit(updatedItem);
    setEditModalOpen(false);
    setEditItem(null);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
    setEditItem(null);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      onDelete(item.id);
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No {type}s found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type === 'note'
            ? 'Create your first note to get started!'
            : 'No FAQs match your search criteria.'}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: 4,
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {truncateText(item.content)}
                </Typography>
                {item.tags && item.tags.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    {item.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(item)}
                    color="primary"
                    title="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(item)}
                    color="error"
                    title="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                {item.createdAt && (
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <EditModal
        open={editModalOpen}
        item={editItem}
        type={type}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default CardList;
