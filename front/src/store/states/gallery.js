import { DynamicState } from 'dynamic-redux';

const galleryState = new DynamicState('gallery', {
  showOverlay: ['text', 'draw'],
  images: [],
  filteredImages: [],
  filter: ['*'],
  currentPage: 1,
  currentUser: '',
  requestReceived: false,
  searchOptions: {
    search: '',
    haveOverlays: ['*'],
    rating: ['general', 'suggestive', 'nsfw'],
    sort: {
      criteria: 'date',
      order: 'ASC'
    }
  },
  currentImage: null,
  searchOptionsPanel: false,
});

galleryState.createReducer({
  showOverlay: 'set',
  images: 'set',
  filteredImages: 'set',
  filter: 'set',
  currentPage: ['set', 'inc', 'dec'],
  currentUser: 'set',
  currentImage: 'set',
  requestReceived: 'set',
  searchOptions: 'set',
  searchOptionsPanel: 'set',
});

export default galleryState;
