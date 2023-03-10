import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FetchImagesFromApi } from 'components/services/Fetch-Api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ThreeCircles } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ButtonWraper } from 'components/Button/Button.styled';
import { Description } from 'components/Description/Description';

export class ImageGallery extends Component {
  state = {
    currentPage: 1,
    images: [],
    status: 'idle',
    isLoading: false,
    totalHits: 0,
  };

  static propTypes = {
    onSearch: PropTypes.string.isRequired,
    onModal: PropTypes.func.isRequired,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;
    const { onSearch } = this.props;

    if (prevProps.onSearch !== onSearch) {
      this.setState({
        status: 'pending',
        isLoading: false,
        images: [],
        currentPage: 1,
        totalHits: 0,
      });

      try {
        const response = await FetchImagesFromApi(1, onSearch);

        if (response.data.total === 0) {
          toast.warn(`Sorry, there are no images for ${onSearch} request.`);
          this.setState({ status: 'rejected' });
          return;
        }
        toast.success(`Good we found ${response.data.totalHits} images`);
        this.setState({
          images: response.data.hits,
          currentPage: response.currentPage,
          status: 'resolve',
          totalHits: response.data.totalHits,
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }

    if (prevState.currentPage !== currentPage && currentPage !== 1) {
      try {
        this.setState({ isLoading: true });
        const response = await FetchImagesFromApi(
          this.state.currentPage,
          this.props.onSearch
        );

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...response.data.hits],
            currentPage: response.currentPage,
            status: 'resolve',
            isLoading: false,
          };
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  onButtonClick = () => {
    this.setState(({ currentPage }) => {
      return { currentPage: currentPage + 1 };
    });
  };

  render() {
    const { images, status, isLoading, totalHits } = this.state;
    const { onModal } = this.props;

    return (
      <>
        {status === 'rejected' && (
          <Description
            text={'Something wrong... Please try to search one more time!'}
          />
        )}

        {status === 'idle' && (
          <Description text={'Add your Search Query to input.'} />
        )}

        {images.length !== 0 && status !== 'rejected' && (
          <>
            <ImageGalleryStyled>
              <ImageGalleryItem images={images} onModal={onModal} />
            </ImageGalleryStyled>
            <ButtonWraper>
              {isLoading && (
                <ThreeCircles
                  height="80"
                  width="80"
                  ariaLabel="three-circles-rotating"
                  outerCircleColor="#0a598d"
                  innerCircleColor="#260a8d"
                  middleCircleColor="#6a0474"
                />
              )}
              {!isLoading && images.length < totalHits && (
                <Button onClick={this.onButtonClick} />
              )}
            </ButtonWraper>
          </>
        )}
        {status === 'pending' && (
          <ThreeCircles
            height="80"
            width="80"
            wrapperClass="spinner-wrapper"
            ariaLabel="three-circles-rotating"
            outerCircleColor="#0a598d"
            innerCircleColor="#260a8d"
            middleCircleColor="#6a0474"
          />
        )}
      </>
    );
  }
}
