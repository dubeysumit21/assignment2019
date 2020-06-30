import Sun from '../../assets/sun.png';
import newMenu from '../../assets/newMenu.png';
import newUser from '../../assets/newUser.png';
import whiteCart from '../../assets/whiteCart.png';
import Rose from '../../assets/Rose.png';
import styles from './styles';

export default [
    { image: Rose, id: 1, styles: styles.footerImage, text: 'HOME', selected: false, },
    { image: newMenu, id: 2, styles: styles.footerImage, text: 'SAUNA', selected: true, },
    { image: Sun, id: 3, styles: styles.footerImage, text: 'ENHNACE', selected: false, },
    { image: newUser, id: 4, styles: styles.footerImage, text: 'SOCIAL', selected: false, },
    { image: whiteCart, id: 5, styles: styles.footerImage, text: 'SHOP', selected: false, },
];