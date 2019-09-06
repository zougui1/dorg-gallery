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
});

galleryState.createState({
  setShowOverlay: {
    type: 'SET_SHOW_OVERLAY_ON_IMAGES',
    prop: 'showOverlay'
  },
  setImages: 'SET_IMAGES',
  setFilteredImages: 'SET_FILTERED_IMAGES',
  setFilter: 'SET_FILTER',
  setCurrentPage: 'SET_CURRENT_PAGE',
  setCurrentUser: 'SET_CURRENT_USER',
  setCurrentImage: 'SET_CURRENT_IMAGE',
  setRequestReceived: 'SET_REQUEST_RECEIVED',
  setSearchOptions: 'SET_SEARCH_OPTIONS',
});

export default galleryState;
