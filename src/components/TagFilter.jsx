import {
    Clear as ClearIcon,
    FilterList as FilterIcon,
} from '@mui/icons-material';
import {
    Badge,
    Box,
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
    FormGroup,
    Popover,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const TagFilter = ({ allTags, selectedTags, onTagsChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTagToggle = (tag) => {
    const currentIndex = selectedTags.indexOf(tag);
    const newSelectedTags = [...selectedTags];

    if (currentIndex === -1) {
      newSelectedTags.push(tag);
    } else {
      newSelectedTags.splice(currentIndex, 1);
    }

    onTagsChange(newSelectedTags);
  };

  const handleClearAll = () => {
    onTagsChange([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'tag-filter-popover' : undefined;

  return (
    <Box>
      <Badge badgeContent={selectedTags.length} color="primary">
        <Button
          aria-describedby={id}
          variant="outlined"
          onClick={handleClick}
          startIcon={<FilterIcon />}
          sx={{ mr: 1 }}
        >
          Filter by Tags
        </Button>
      </Badge>

      {selectedTags.length > 0 && (
        <Button
          variant="text"
          size="small"
          onClick={handleClearAll}
          startIcon={<ClearIcon />}
          sx={{ ml: 1 }}
        >
          Clear Filters
        </Button>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { p: 2, minWidth: 250, maxWidth: 400 }
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filter by Tags
        </Typography>

        {allTags.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No tags available
          </Typography>
        ) : (
          <>
            <FormGroup>
              {allTags.map((tag) => (
                <FormControlLabel
                  key={tag}
                  control={
                    <Checkbox
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                    />
                  }
                  label={tag}
                />
              ))}
            </FormGroup>

            {selectedTags.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Active filters:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selectedTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      onDelete={() => handleTagToggle(tag)}
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </>
        )}
      </Popover>
    </Box>
  );
};

export default TagFilter;
