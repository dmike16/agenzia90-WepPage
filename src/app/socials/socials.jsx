// @flowtype
import * as React from 'react';
import i18n from '../i18n';
import AppContext, { ApplicationContext } from '../app.context';
import { hot } from 'react-hot-loader/root';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Socials extends React.Component<{}> {
    static contextType = AppContext;

    context: ApplicationContext;

    open(url: string){
        console.info('GO TO', url);
    }

    render() {
        const socials = i18n(this.context.locale).socials;
        const socialsBtn = [{ key: 'facebook', ariaLabel: socials.facebook.ariaLabel, url: 'facebook.it', icon: 'facebook' },
        { key: 'google', ariaLabel: socials.google.ariaLabel, url : 'google.it', icon: 'google' }]
            .map((btn) => {
                return (
                    <IconButton key={btn.key} aria-label={btn.ariaLabel} isLink onClick={() => this.open(btn.url)}>
                        <FontAwesomeIcon icon={['fab', btn.icon]}/>
                    </IconButton>
                );
            });
        return (
            <div>
                {socialsBtn}
            </div>
        );
    }
}

export default hot(Socials);
