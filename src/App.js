import React, { useRef, useState, useEffect } from 'react';

import Spinner from './components/Loader';
import ImageGallery from './components/ImageGallery'
import SearchBar from './components/SearchBar'
import Button from './components/Button'
import Modal from './components/Modal'

import imageApi from './services/image-api'

// listRef = React.createRef();

const App = () => {

  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeImg, setActiveImg] = useState('')

  const ref = useRef(null)


  useEffect(() => {
    if (loading) {
      fetchImages();
    }
    if (loading && page > 1) {
      const last = ref.current.querySelector("li:last-child")
      // console.log(last.offsetTop)
      // console.log(last.scrollHeight)
      console.log(last.offsetTop)
      window.scrollTo({
        top: last.offsetTop + 260,
        behavior: 'smooth'
      })

    }
    //   else {
    // let last = null;
    // if (page > 1) {
    //   last = ref.current.querySelector("li:last-child")

    // }
    // console.log(last);
    // }

  }, [loading])

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   if (prevState.images.length < this.state.images.length) {
  //     const { current } = this.listRef;
  //     return current.scrollHeight;
  //   }
  //   return null;
  // }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (snapshot !== null) {
  //     window.scrollTo({
  //       top: snapshot,
  //       behavior: 'smooth'
  //     })
  //   }
  // }

  const toggleModal = (src) => {
    setShowModal(!showModal);
    setActiveImg(src)
  }

  const onChangeQuery = (query) => {
    setSearchQuery(query)
    setPage(1)
    setImages([])
    setError(null)
  }

  const fetchImages = () => {
    // setLoading(true)
    imageApi.fetchImages(page, searchQuery)
      .then(items => {
        // let last = null;
        // if (page > 1) {
        //   last = ref.current.querySelector("li:last-child")
        // }
        // setPage(page + 1);
        // setLoading(false)
        setImages([...images, ...items]);
        setLoading(false)
        // if (page > 1) {
        //   console.log(last.scrollHeight);
        //   window.scrollTo({
        //     top: last.scrollHeight,
        //     behavior: 'smooth'
        //   })
        // }
      })
      .catch(error => setError(error))
    // .finally(() => setLoading(false))
  }

  const shouldRenderLoadMoreButton = images.length > 0 && !loading;
  return (
    <>
      <SearchBar onSubmit={onChangeQuery} />
      {error && <h2 style={{ color: "red", textAlign: "center" }}>Sorry, there must be some problem on a server!</h2>}

      <div ref={ref}>
        <ImageGallery images={images} onClick={toggleModal} />
      </div>

      {loading &&
        <Spinner />}

      {shouldRenderLoadMoreButton &&
        <Button onClick={() => {
          setPage(page + 1)
          setLoading(true)
        }
        }>
          Load more
          </Button>}

      {showModal && <Modal onClose={toggleModal}>
        <img src={activeImg} alt="" /></Modal>}

    </>
  );
}

export default App;

//ref={listRef}