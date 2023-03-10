import PropTypes from 'prop-types';
import { DescriptionContainer, DescriptionStyled } from './Description.styled';

export const Description = ({ text }) => {
  return (
    <DescriptionContainer>
      <DescriptionStyled>{text}</DescriptionStyled>
    </DescriptionContainer>
  );
};

Description.propTypes = {
  text: PropTypes.string,
};
