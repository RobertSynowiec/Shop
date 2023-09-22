import styles from './ProductForm.module.scss';
import Button from '../Button/Button';
import OptionSize from '../OptionSize/OptionSize';
import OptionColor from '../OptionColor/OptionColor';

const ProductForm = ({ handleSubmit, currentSize, sizes, handleButtonClick, colors, currentColor, setCurrentColor }) => {


    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.sizes}>
                <h3 className={styles.optionLabel}>{currentSize}</h3>
                <OptionSize
                    handleButtonClick={handleButtonClick}
                    sizes={sizes}
                    currentSize={currentSize}
                />
            </div>
            <div className={styles.colors}>
                <h3 className={styles.optionLabel}>Colors</h3>
                <OptionColor
                    colors={colors}
                    currentColor={currentColor}
                    setCurrentColor={setCurrentColor}
                />

            </div>
            <Button className={styles.button}>
                <span className="fa fa-shopping-cart" />
            </Button>
        </form>

    );
};

export default ProductForm;

