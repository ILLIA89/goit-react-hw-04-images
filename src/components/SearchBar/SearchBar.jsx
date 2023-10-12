import { useState } from 'react';
// 111
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBarBox } from './SearchBar.styled';

export function SearchBar({ onSubmit }) {
  const [requestName, setRequest] = useState('');

  const handleInputChange = e => {
    setRequest(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (requestName.trim() === '') {
      return toast.error('Please write your request');
    }

    onSubmit(requestName);

    setRequest('');
  };

  return (
    <SearchBarBox>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          type="text"
          name="requestName"
          value={requestName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </SearchBarBox>
  );
}
