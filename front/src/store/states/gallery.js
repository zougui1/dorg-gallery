import { DynamicState } from 'dynamic-redux';

const galleryState = new DynamicState({
  showOverlay: {
    all: true,
    draw: true,
    text: true,
  },
  images: [],
  filteredImages: [],
  filter: ['everything'],
  currentPage: 1,
  currentUser: '',
  requestReceived: false,
});

galleryState.createState({
  displayOverlay: {
    type: 'SHOW_OVERLAY_ON_IMAGES',
    prop: 'showOverlay'
  },
  setImages: 'SET_IMAGES',
  setFilteredImages: 'SET_FILTERED_IMAGES',
  setFilter: 'SET_FILTER',
  setCurrentPage: 'SET_CURRENT_PAGE',
  setCurrentUser: 'SET_CURRENT_USER',
  setRequestReceived: 'SET_REQUEST_RECEIVED',
});

export default galleryState;
