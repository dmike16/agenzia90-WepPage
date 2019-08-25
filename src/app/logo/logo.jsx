import * as React from 'react';

import logo1x from '../../assets/images/icon/logo@1x.png';
import logo2x from '../../assets/images/icon/logo@2x.png';

export function Logo() {
    return (<img src={logo1x} srcSet={logo2x + ' 2x'} alt="Logo agenzia"/>);
}