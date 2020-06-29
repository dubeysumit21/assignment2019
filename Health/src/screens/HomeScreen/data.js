import detox from '../../assets/refresh.png';
import weight from '../../assets/random.png';
import relax from '../../assets/vision.png';
import pain from '../../assets/plus.png';
import anti from '../../assets/time.png';
import cardio from '../../assets/heart.png';
import custom from '../../assets/menu.png';

export default [
    { 
        text: 'DETOX', 
        image: detox, 
        id: 1, 
        selected: false, 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type: ['FAR'], 
        time: '37 Min',
    },
    { 
        text: 'WEIGHT LOSS', 
        image: weight, 
        id: 2, 
        selected: false, 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type: ['NEAR', 'MID', 'FAR'], 
        time: '30 Min', 
    },
    { 
        text: 'RELAXATION', 
        image: relax, id: 3, 
        selected: false, 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type: ['NEAR', 'MID' ],  
        time: '40 Min',
    },
    { 
        text: 'PAIN RELIEF', 
        image: pain, 
        id: 4, 
        selected: false, 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type: ['FAR'],  
        time: '45 Min',
    },
    { 
        text: 'ANTI AGEING', 
        image: anti, id: 5, 
        selected: false, 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type: ['NEAR', 'MID', 'FAR'],  
    },
    { 
        text: 'CARDIO', 
        image: cardio, 
        id: 6, 
        selected: false, 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type: ['NEAR', 'MID', 'FAR'],  
        time: '40 Min',
    },
    { 
        text: 'CUSTOM', 
        image: custom, 
        id: 7, 
        selected: false, 
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type: ['NEAR', 'FAR'], 
        time: '',
    },
];