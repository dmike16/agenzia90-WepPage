// @flow

import * as React from 'react';
import TopAppBar, { TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarIcon } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import { Logo } from '../logo/logo';
import {hot} from 'react-hot-loader/root';
import i18n from '../i18n';

const headerI18n = i18n().header;

class Header extends React.Component<{}> {
    render() {
        return (
            <>
                <TopAppBar fixed>
                    <TopAppBarRow>
                        <TopAppBarSection align='start'>
                            <Logo></Logo>
                            <TopAppBarTitle>
                                {i18n().title}
                            </TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection align='end' role='toolbar'>
                            <TopAppBarIcon actionItem tabIndex={0}>
                                <MaterialIcon
                                    aria-label={headerI18n.actions.cookie.ariaLabel}
                                    hasRipple
                                    icon='tune' title={headerI18n.actions.cookie.label}>
                                </MaterialIcon>
                            </TopAppBarIcon>
                            <TopAppBarIcon actionItem tabIndex={0}>
                                <MaterialIcon
                                    aria-label="change theme"
                                    hasRipple
                                    icon='palette' >
                                </MaterialIcon>
                            </TopAppBarIcon>
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
            </>
        )
    }
}

export default hot(Header);
