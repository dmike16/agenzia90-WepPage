// @flow

import * as React from 'react';
import TopAppBar, { TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarIcon } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import { Logo } from '../logo/logo';
import {hot} from 'react-hot-loader/root';

class Header extends React.Component<{}> {
    render() {
        return (
            <>
                <TopAppBar fixed>
                    <TopAppBarRow>
                        <TopAppBarSection align='start'>
                            <Logo></Logo>
                            <TopAppBarTitle>
                                Studio 90srls
                            </TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection align='end' role='toolbar'>
                            <TopAppBarIcon actionItem tabIndex={0}>
                                <MaterialIcon
                                    aria-label="change theme"
                                    hasRipple
                                    icon='tune' >
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
