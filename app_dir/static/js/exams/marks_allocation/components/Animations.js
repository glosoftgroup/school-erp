import {Motion, spring} from 'react-motion';

const animations = [
        {
          name: 'slideIn',
          defaultStyle: { translateX: 1200 },
          style: (config) => ({ translateX: spring(0, config)}),
          render: (value) => ({
                transform: `translateX(${value.translateX}px)`})
        },
        {
          name: 'slideOut',
          defaultStyle: { translateX: 0 },
          style: (config) => ({ translateX: spring(-1200, config)}),
          render: (value) => ({
                transform: `translateX(${value.translateX}px)`})
        },
        {
          name: 'flipX',
          defaultStyle: { rotateX: 200 },
          style: (config) => ({ rotateX: spring(0, config)}),
          render: (value) => ({ transform: `rotateX(${value.rotateX}deg)` })
        },
        {
          name: 'flipY',
          defaultStyle: { rotateY: 200 },
          style: (config) => ({ rotateY: spring(0, config)}),
          render: (value) => ({ transform: `rotateY(${value.rotateY}deg)` })
        },
        {
          name: 'zoomIn',
          defaultStyle: { scale: 0 },
          style: (config) => ({ scale: spring(1, config)}),
          render: (value) => ({ transform: `scale3d(${value.scale},${value.scale},${value.scale})` })
        },

        {
          name: 'zoomOut',
          defaultStyle: { scale: 1 },
          style: (config) => ({ scale: spring(0, config)}),
          render: (value) => ({ transform: `scale3d(${value.scale},${value.scale},${value.scale})`, opacity: value.scale })
        },
        {
          name: 'fadeIn',
          defaultStyle: { opacity: 0 },
          style: (config) => ({ opacity: spring(1, config)}),
          render: (value) => ({ opacity: value.opacity })
        }
];

export default animations;
