import styles from './ProductForm.module.scss';
import shortid from 'shortid';
import clsx from 'clsx';
import Button from '../Button/Button';

const ProductForm = ({ handleSubmit, currentSize, sizes, handleButtonClick, colors, currentColor, setCurrentColor }) => {

    // Preparing the class name
    const prepareColorClassName = color => {
        return styles['color' + color[0].toUpperCase() + color.substr(1).toLowerCase()];
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.sizes}>
                <h3 className={styles.optionLabel}>{currentSize}</h3>
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
            </div>
            <div className={styles.colors}>
                <h3 className={styles.optionLabel}>Colors</h3>
                <ul className={styles.choices}>
                    {colors.map(color =>
                        <li key={shortid.generate()} value={color}>
                            <button type="button"
                                className={clsx(prepareColorClassName(color), color === currentColor && styles.active)} value={color} onClick={e => setCurrentColor(e.target.value)} />
                        </li>
                    )}

                </ul>

            </div>
            <Button className={styles.button}>
                <span className="fa fa-shopping-cart" />
            </Button>
        </form>

    );
};

export default ProductForm;

