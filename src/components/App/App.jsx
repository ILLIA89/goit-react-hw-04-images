import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Container } from './App.styled';

export function App() {
  const [requestName, setRequestName] = useState('');

  return (
    <Container>
      <SearchBar onSubmit={setRequestName} />
      <ImageGallery requestName={requestName} />
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
