import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Socials from '../socials/socials';

class Footer extends React.Component<{}> {
    render() {
        return (
        <footer>
            <h4>Bye Studio90srls</h4>
            <Socials/>
        </footer>);
    }
}

export default hot(Footer);
