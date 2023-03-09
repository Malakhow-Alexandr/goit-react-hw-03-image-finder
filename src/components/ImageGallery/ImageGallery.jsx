import { Component } from 'react';
import { SearchImgService } from 'components/services/Fetch-Api-class';

const searchImgService = new SearchImgService();

export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    loading: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.onSearch !== this.props.onSearch) {
      searchImgService.query = this.props.onSearch;
      console.log('1243');
    }
  }

  render() {
    return <ul className="gallery"></ul>;
  }
}
