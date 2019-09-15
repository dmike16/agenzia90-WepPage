// @flow

import * as React from 'react';
import TopAppBar, { TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarIcon } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import { Logo } from '../logo/logo';
import { hot } from 'react-hot-loader/root';
import i18n from '../i18n';
import ThemeSwitcher from '../theme-switcher/theme-switcher';
import AppContext, { ApplicationContext } from '../app.context';

class Header extends React.Component<{}> {
    static contextType = AppContext;
    render() {
        return (
            <>
                <TopAppBar fixed>
                    <TopAppBarRow>
                        <TopAppBarSection align='start'>
                            <Logo></Logo>
                            <TopAppBarTitle>
                                {i18n(this.context.locale).title}
                            </TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection align='end' role='toolbar'>
                            <TopAppBarIcon actionItem tabIndex={0}>
                                <MaterialIcon
                                    aria-label={i18n(this.context.locale).header.actions.cookie.ariaLabel}
                                    hasRipple
                                    icon='tune' title={i18n(this.context.locale).header.actions.cookie.label}>
                                </MaterialIcon>
                            </TopAppBarIcon>
                            <TopAppBarIcon actionItem tabIndex={0}>
                                <ThemeSwitcher />
                            </TopAppBarIcon>
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
            </>
        )
    }
}

export default hot(Header);
