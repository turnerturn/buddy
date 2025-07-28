import Fuse from 'fuse.js';

const createFuseInstance = (data, keys) => {
  const options = {
    includeScore: true,
    threshold: 0.4,
    keys: keys || ['title', 'content', 'tags'],
  };

  return new Fuse(data, options);
};

export const fuzzySearch = (data, query, keys) => {
  if (!query || query.trim() === '') {
    return data;
  }

  const fuse = createFuseInstance(data, keys);
  const results = fuse.search(query.trim());

  return results.map(result => result.item);
};

export const filterByTags = (data, selectedTags) => {
  if (!selectedTags || selectedTags.length === 0) {
    return data;
  }

  return data.filter(item =>
    item.tags && item.tags.some(tag => selectedTags.includes(tag))
  );
};

export default fuzzySearch;
