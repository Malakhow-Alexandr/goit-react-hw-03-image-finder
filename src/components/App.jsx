import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from './SearchBar/SearhBar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
  };
  handleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        <ImageGallery onSearch={this.state.searchQuery} />
      </div>
    );
  }
}
