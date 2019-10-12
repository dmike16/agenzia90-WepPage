// @flowtype
import * as React from 'react';
import Button from '@material/react-button';

import { hot } from 'react-hot-loader/root';
import i18n from '../i18n';
import SpliceIcon from '../shared/splice-icon/splice-icon';

import friendsSplice from '../../assets/images/icon/partnship/friendLogo.png';

class Friendship extends React.Component<{}> {
    points = {
        generali: { x: '-1.3px', y: '-30px' },
        bali: { x: '-4.6px', y: '-60px' },
        motoMarconi: { x: '-1.2px', y: '-94px' },
        youService: { x: '-1.3px', y: '4px' }
    };

    render() {
        const friends = i18n().friendship;
        return (
            <>
                {
                    Object.keys(friends).map((key) => {
                        const icon = <SpliceIcon img={friendsSplice} point={this.points[key]}/>;
                        return <Button key={key} href={friends[key].link} target="blank"
                    icon={icon}>
                    {friends[key].label}
                </Button>})
                }
            </>
        );
    }
}

export default hot(Friendship);
