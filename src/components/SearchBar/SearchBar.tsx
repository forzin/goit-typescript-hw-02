import React, {FormEvent } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css'

const notify = () => toast('You need to input some word!');

interface OnSubmitProps {
  onSubmit: (searchparam: string) => void;
}

const SearchBar: React.FC<OnSubmitProps> = ({ onSubmit }) => {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget;
      const searchInput = form.elements.namedItem("searchparam") as HTMLInputElement;
    
      if (!searchInput) {
        notify();
        return;
      }

      const searchparam = searchInput.value.trim();

      if (!searchparam) {
        notify(); 
        return;
      }

      onSubmit(searchparam);
      searchInput.value = '';
    }
  
   return (
    <header>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.inputBar}
            name="searchparam"
            type="text"
            placeholder="Search images and photos"
          />
          <button className={styles.btnSubmit} type="submit">Search</button>
        </form>
    </header>
   )
}

export default SearchBar;