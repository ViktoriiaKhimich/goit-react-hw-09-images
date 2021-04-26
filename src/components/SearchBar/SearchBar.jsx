import {Component} from 'react';

import styles from './SearchBar.module.css'

class SearchBar extends Component {

    state = {
        query: ''
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value, 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.query)
        this.reset()
    }

    reset = () => {
        this.setState({
            query: ""
        })
    }



    render() {

        const {query} = this.state;
        const {handleChange, handleSubmit} = this;

        return ( 
            <header className={styles.Searchbar}>
            <form onSubmit={handleSubmit} className={styles.SearchForm}>
                <button type="submit" className={styles.SearchFormButton}>
                <span className={styles.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                name='query'
                value={query}
                onChange={handleChange}
                className={styles.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
            </form>
            </header>
     );
    }
    
}
 
export default SearchBar;