import {
  ImageGalleryItemStyled,
  ImageGalleryItemImage,
} from './ImageGallery.styled';

import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onModal }) => {
  return images.map(image => {
    return (
      <ImageGalleryItemStyled key={image.id}>
        <ImageGalleryItemImage
          onClick={() => {
            onModal(image.largeImageURL);
          }}
          height="260"
          src={image.webformatURL}
          alt={image.tag}
        />
      </ImageGalleryItemStyled>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onModal: PropTypes.func.isRequired,
};
