import React, {Component} from 'react';

import Spinner from './components/Loader';


import ImageGallery from './components/ImageGallery'
import SearchBar from './components/SearchBar'
import Button from './components/Button'

import imageApi from './services/image-api'



class App extends Component {

  state = {
    images: [],
    searchQuery: "",
    isLoading: false,
    error: null,
    page: 1,
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles()
    }
  }
  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      error: null,
    })
  }

  fetchArticles = () => {
    const {page, searchQuery} = this.state;

    this.setState({
      isLoading: true
    })
    
    imageApi.fetchImages(page, searchQuery)
    .then(images => {
      this.setState(prevState=> ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
      }))
    })
    .catch(error => this.setState({error}))
    .finally(()=> this.setState({isLoading: false}))

  }
  
  render() {

      const {images, isLoading, error} = this.state;
      const {onChangeQuery, fetchArticles} = this;
      const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

      return (
        <>
     
        <SearchBar onSubmit={onChangeQuery}/>
        {error && <h2 style={{color: "red", textAlign: "center"}}>Sorry, there must be some problem on a server!</h2>}

        <ImageGallery images={images}/>

        {isLoading && 
        <Spinner/>}

        {shouldRenderLoadMoreButton &&
          <Button onClick={fetchArticles}>
            Load more
          </Button>}
        </>
      );
  }

}

export default App;
