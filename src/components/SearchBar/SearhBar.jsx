import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  SearchBarStyled,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchFormInput,
} from './SearchBarStyled';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSearchChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('🍳Please enter somthing to search!', {
        theme: 'dark',
      });
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchBarStyled className="Searchbar">
        <SearchForm className="SearchForm" onSubmit={this.handleSubmit}>
          <SearchButton className="SearchForm-button" type="submit">
            <SearchButtonLabel className="SearchForm-button-label">
              Find
            </SearchButtonLabel>
          </SearchButton>
          <SearchFormInput
            placeholder="Hello I am Image Search!"
            className="SearchForm-input"
            type="text"
            name="pokemonName"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        </SearchForm>
      </SearchBarStyled>
    );
  }
}
