import { useState } from 'react';
import { useGlobalContext } from './Context';
import axios from 'axios';

const SearchForm = () => {
  const { searchValue, setSearchValue } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.elements); TO FETCH ALL THE ELEMENT IN A FORM
    const searchVal = e.target.elements.search.value;
    if (!searchVal) return;

    setSearchValue(searchVal);
  };
  return (
    <section>
      <h1 className="title">unsplash images</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="search"
          className="form-input search-input"
          placeholder="cat"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </section>
  );
};
export default SearchForm;
