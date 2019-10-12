// @flowtype
import * as React from 'react';

import { hot } from 'react-hot-loader/root';

function SpliceIcon(props: { img: string, point: { x: String; y: String }, size?: 'sm' }) {
    const size = props.size || 'sm';
    const dimensions= {
        sm: {width: '24px', height: '24px'}
    };
    return (
        <span style={{...dimensions[size], backgroundImage: `url(${props.img})`, backgroundPosition: `${props.point.x} ${props.point.y}`}}></span>
    );
}

export default hot(SpliceIcon);
