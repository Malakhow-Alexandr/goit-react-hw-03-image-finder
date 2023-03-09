import { Component } from 'react';
import { toast } from 'react-toastify';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log('wtf?');
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
      <section className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button className="SearchForm-button" type="submit">
            <span className="SearchForm-button-label">Find</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            name="pokemonName"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        </form>
      </section>
    );
  }
}
