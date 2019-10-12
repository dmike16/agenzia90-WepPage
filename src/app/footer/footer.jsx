import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Socials from '../socials/socials';
import i18n from '../i18n';
import Friendship from '../friendship/friendship';
import UsefulLinks from '../useful-links/useful-links';

class Footer extends React.Component<{}> {
    render() {
        const copyright = i18n().copyright;
        return (
            <footer>
                <div>
                    <UsefulLinks />
                </div>
                <div>
                    <Friendship />
                </div>
                <Socials />
                <div>
                    {copyright.prefix}
                    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                        {copyright.link}
                    </a>
                </div>
                <div>
                    <a href={copyright.webmaster.link}>
                        {copyright.webmaster.label}
                    </a>
                    <a href={copyright.license.link}>
                        {copyright.license.label}
                    </a>
                    <a href={copyright.sourceCode.link}>
                        {copyright.sourceCode.label}
                    </a>
                </div>
            </footer>);
    }
}

export default hot(Footer);
