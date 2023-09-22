import styles from './OptionSize.module.scss';
import clsx from 'clsx';

const OptionSize = ({ sizes, handleButtonClick, currentSize }) => {

    return (
        <ul className={styles.choices}>

            {sizes.map((size, index) =>
                <li key={index} value={size}>
                    <button type="button"
                        className={clsx(size.name === currentSize && styles.active)} value={size.name}
                        //clicking the button, we pass the product index to the handleButtonClick function
                        onClick={() => handleButtonClick(index)} >
                        {size.name}
                    </button>
                </li>
            )}
        </ul>
    );
};

export default OptionSize;