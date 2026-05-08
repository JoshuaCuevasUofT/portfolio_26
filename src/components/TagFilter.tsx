import React from 'react';
import { type Tag } from '../types/project';

interface TagFilterProps {
  selectedTags: Tag[];
  onTagSelect: (tag: Tag) => void;
  onTagDeselect: (tag: Tag) => void;
  onRefresh?: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ selectedTags, onTagSelect, onTagDeselect, onRefresh }) => {
  const allTags: Tag[] = ['Data Science (ML)', 'Data Analysis', 'Quantitative Research', 'Data Engineering', 'Dashboards'];

  const handleTagClick = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      onTagDeselect(tag);
    } else {
      onTagSelect(tag);
    }
  };

  return (
    <div className="tag-filter">
      <div className="tag-filter-bar">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${selectedTags.includes(tag) ? 'selected' : 'unselected'}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
        {onRefresh && (
          <button
            className={`refresh-button ${selectedTags.length === 0 ? 'disabled' : ''}`}
            onClick={onRefresh}
            disabled={selectedTags.length === 0}
            aria-label="Reset filters"
          >
            ↻
          </button>
        )}
      </div>
    </div>
  );
};

export default TagFilter;
