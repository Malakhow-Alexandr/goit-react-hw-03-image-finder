import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from './SearchBar/SearhBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Container } from 'Container.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    picUrl: '',
  };
  handleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  toogleModal = picUrl => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      picUrl,
    }));
  };
  render() {
    const { showModal, picUrl } = this.state;
    return (
      <Container className="App">
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />

        <ImageGallery
          onSearch={this.state.searchQuery}
          onModal={this.toogleModal}
        />

        {showModal && <Modal onClose={this.toogleModal} picUrl={picUrl} />}
      </Container>
    );
  }
}
