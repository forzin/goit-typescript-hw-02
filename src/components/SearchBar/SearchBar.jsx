import toast from 'react-hot-toast';
import styles from './SearchBar.module.css'

const notify = () => toast('You need to input some word!');

const SearchBar = ({ onSubmit }) => {

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const searchparam = form.elements.searchparam.value.trim();
    
      if (!searchparam) {
        notify();
        return;
      }

      onSubmit(searchparam);
      form.elements.searchparam.value = '';
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