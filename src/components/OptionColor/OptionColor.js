import styles from './OptionColor.module.scss';
import clsx from 'clsx';
import shortid from 'shortid';

const OptionColor = ({ colors, currentColor, setCurrentColor }) => {

    // Preparing the class name
    const prepareColorClassName = color => {
        return styles['color' + color[0].toUpperCase() + color.substr(1).toLowerCase()];
    }

    return (
        <ul className={styles.choices}>
            {colors.map(color =>
                <li key={shortid.generate()} value={color}>
                    <button type="button"
                        className={clsx(prepareColorClassName(color), color === currentColor && styles.active)} value={color} onClick={e => setCurrentColor(e.target.value)} />
                </li>
            )}

        </ul>
    );
};

export default OptionColor;