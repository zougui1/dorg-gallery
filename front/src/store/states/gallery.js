import { DynamicState } from 'dynamic-redux';

const galleryState = new DynamicState('gallery', {
  showOverlay: ['text', 'draw'],
  images: [],
  filteredImages: [],
  filter: ['*'],
  currentPage: 1,
  maxPage: 1,
  currentUser: '',
  requestReceived: false,
  searchOptions: {
    search: '',
    haveOverlays: ['*'],
    rating: ['general', 'suggestive', 'nsfw'],
    sort: {
      criteria: 'date',
      order: 1
    }
  },
  currentImage: null,
  searchOptionsPanel: false,
  loader: {
    loading: false,
    error: false,
    success: false,
    empty: false,
    emptyMessage: 'There is no images'
  }
});

galleryState.createActions({
  showOverlay: 'set',
  images: 'set',
  filteredImages: 'set',
  filter: 'set',
  currentPage: ['set', 'inc', 'dec'],
  maxPage: 'set',
  currentUser: 'set',
  currentImage: 'set',
  requestReceived: 'set',
  searchOptions: ['set', 'merge'],
  searchOptionsPanel: 'set',
  loader: ['set', 'merge'],
  __STATE__: 'reset',
});

export default galleryState;
