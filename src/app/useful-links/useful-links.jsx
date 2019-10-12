//@flowtype

import * as React from 'react';
import Button from '@material/react-button';

import { hot } from 'react-hot-loader/root';
import i18n from '../i18n';
import SpliceIcon from '../shared/splice-icon/splice-icon';

import utilsSplice from '../../assets/images/icon/partnship/friendLogo.png' 

class UsefulLinks extends React.Component<{}> {
    points = {
        sermetra: { x: '-8.6px', y: '-131px' },
        unasca: { x: '-9.9px', y: '-169.9px' },
        cna: { x: '-9.9px', y: '-206px' },
        motorizazzione: { x: '-6.6px', y: '-237px' }
    };

    render() {
        const utils = i18n().utils;
        return (
            <>
                {
                    Object.keys(utils).map((key) => {
                        const icon = <SpliceIcon img={utilsSplice} point={this.points[key]}/>;
                        return <Button key={key} dense href={utils[key].link} target="blank"
                    icon={icon}>
                    {utils[key].label}
                </Button>})
                }
            </>
        );
    }
}

export default hot(UsefulLinks);