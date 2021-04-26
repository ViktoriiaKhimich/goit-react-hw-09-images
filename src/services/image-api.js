import axios from 'axios';


const fetchImages = (page = 1, searchQuery = '') => {
    return axios
    .get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&key=20961462-909795e71f735a58f24820845&per_page=12`)
    .then(response => response.data.hits)
}

export default {fetchImages}