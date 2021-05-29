import { useState } from 'react';

import styles from './SearchBar.module.css'

const SearchBar = ({ onSubmit }) => {

    const [query, setQuery] = useState('')

    const handleChange = (e) => {
        const { value } = e.target;
        setQuery(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(query)
        reset()
    }

    const reset = () => {
        setQuery('')
    }

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

export default SearchBar;