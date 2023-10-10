import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import { BASE_URL, API_KEY, SEARCH_PARAMS } from './Pixabay/Pixabay';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMoreButton from './Button/Button';
import SpinnerLoader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     hits: [],
  //     name: '',
  //     page: 1,
  //     showModal: false,
  //     loading: false,
  //     largeImageURL: '',
  //     tags: '',
  //     totalHits: 0,
  //   };
  // }

  const [hits, setHits] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  // componentDidMount() {}

  // componentDidUpdate(prevProps, prevState) {
  //   const { name, page } = this.state;
  //   if (prevState.name !== name || prevState.page !== page) {
  //     this.fetchImages();
  //   }
  // }

  useEffect(() => {
    if (name !== '' && (page === 1 || page > 1)) {
      fetchImages();
    }
  }, [name, page]);

  const toggleModal = (imageURL, tag) => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    //   largeImageURL: imageURL,
    //   tags: tag,
    // }));
    setShowModal(!showModal);
    setLargeImageURL(imageURL);
    setTags(tag);
  };

  const getValue = ({ name }) => {
    // this.setState({
    //   hits: [],
    //   name,
    //   page: 1,
    //   totalHits: 0,
    // });
    setHits([]);
    setName(name);
    setPage(1);
    setTotalHits(0);
  };

  const fetchImages = () => {
    // const { name, page } = this.state;
    setLoading(true);
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`
        )
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          }
          const modifiedHits = response.data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );
          // this.setState(prevState => ({
          //   hits: [...prevState.hits, ...modifiedHits],
          //   totalHits: response.data.totalHits,
          //   loading: false,
          // }));
          setHits(prevHits => [...prevHits, ...modifiedHits]);
          setTotalHits(response.data.totalHits);
          setLoading(false);
        });
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  // const { hits, showModal, loading, largeImageURL, totalHits } = this.state;

  return (
    <div>
      <SearchBar onSubmitHandler={getValue} />

      {hits.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem articles={hits} onImage={toggleModal} />
        </ImageGallery>
      )}

      {showModal && <Modal onClose={toggleModal} url={largeImageURL} />}

      {loading && <SpinnerLoader />}

      {totalHits > 0 && hits.length < totalHits && (
        <LoadMoreButton onButtonClick={loadMore} />
      )}
    </div>
  );
};

export default App;
