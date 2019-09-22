// @flowtype

import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import MaterialIcon from '@material/react-material-icon';
import i18n from '../i18n';
import AppContext, { ApplicationContext } from '../app.context';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
} from '@material/react-dialog';

class CookiePolicy extends React.Component<{}, { open: Boolean }> {
    static contextType = AppContext;

    context: ApplicationContext;

    setOpenDialog = () => this.setState({ open: true })
    setCloseDialog = () => this.setState({open: false})

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    render() {
        return (
            <>
                <MaterialIcon className='mdc-top-app-bar__action-item'
                    aria-label={i18n(this.context.locale).header.actions.cookie.ariaLabel}
                    hasRipple onClick={this.setOpenDialog}
                    icon='tune' title={i18n(this.context.locale).header.actions.cookie.label}>
                </MaterialIcon>
                <Dialog open={this.state.open} onClose={this.setCloseDialog}>
                    <DialogTitle>My Dialog</DialogTitle>
                    <DialogContent>
                        <p>TODO cookie policy options</p>
                    </DialogContent>
                    <DialogFooter>
                        <DialogButton action='dismiss' isDefault>Dismiss</DialogButton>
                    </DialogFooter>
                </Dialog>
            </>
        );
    }
}

export default hot(CookiePolicy);
