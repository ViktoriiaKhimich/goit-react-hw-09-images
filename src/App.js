import React, { Component, createRef } from 'react';

import Spinner from './components/Loader';
import ImageGallery from './components/ImageGallery'
import SearchBar from './components/SearchBar'
import Button from './components/Button'
import Modal from './components/Modal'

import imageApi from './services/image-api'

// listRef = React.createRef();

class App extends Component {

  state = {
    images: [],
    searchQuery: "",
    isLoading: false,
    error: null,
    page: 1,
    showModal: false,
    activeImg: ""
  }

  listRef = createRef()

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.images.length < this.state.images.length) {
      const { current } = this.listRef;
      return current.scrollHeight;
    }
    return null;

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (snapshot !== null) {
      window.scrollTo({
        top: snapshot,
        behavior: 'smooth'
      })
    }
  }


  toggleModal = (src) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      activeImg: src
    }))
  }

  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      error: null,
    })
  }

  fetchImages = () => {
    const { page, searchQuery } = this.state;

    this.setState({
      isLoading: true
    })

    imageApi.fetchImages(page, searchQuery)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
          isLoading: false,
        }))
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }))

  }

  render() {

    const { images, isLoading, error, showModal, activeImg } = this.state;
    const { onChangeQuery, fetchImages, listRef, toggleModal } = this;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;


    return (
      <>
        <SearchBar onSubmit={onChangeQuery} />
        {error && <h2 style={{ color: "red", textAlign: "center" }}>Sorry, there must be some problem on a server!</h2>}

        <div ref={listRef}>
          <ImageGallery images={images} onClick={toggleModal} />
        </div>

        {isLoading &&
          <Spinner />}

        {shouldRenderLoadMoreButton &&
          <Button onClick={fetchImages}>
            Load more
          </Button>}

        {showModal && <Modal onClose={toggleModal}>
          <img src={activeImg} alt="" /></Modal>}

      </>
    );
  }

}

export default App;
