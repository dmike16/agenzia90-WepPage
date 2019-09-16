import * as React from 'react';
import MaterialIcon from '@material/react-material-icon';
import { Corner } from '@material/react-menu-surface';
import Menu, { MenuList, MenuListItem, MenuListItemText } from '@material/react-menu';
import { hot } from 'react-hot-loader/root';
import i18n from '../i18n';
import AppContext, { ApplicationContext, THEME_LIGHT, THEME_DARK } from '../app.context';

interface ThemeSwitcherState {
    open: Boolean;
    anchor: HTMLElement;
}

class ThemeSwitcher extends React.Component<{}, ThemeSwitcherState> {
    static contextType = AppContext;

    context: ApplicationContext;

    setAnchorEl = (el: HTMLElement) => {
        this.state.anchor || this.setState({ anchor: el });
    };

    setCloseState = () => {
        this.setState({ open: false });
    }

    setOpenState = () => {
        this.setState({ open: true });
    }

    constructor(props) {
        super(props);
        this.state = { open: false, anchor: null };
    }

    render() {
        const themeActions = i18n(this.context.locale).themeSwitcher;
        const themes = [{ key: THEME_LIGHT, label: themeActions.light.label }, { key: THEME_DARK, label: themeActions.dark.label }];

        return (
            <div className='mdc-menu-surface--anchor' ref={this.setAnchorEl}>
                <MaterialIcon className='mdc-top-app-bar__action-item'
                    aria-label="change theme"
                    hasRipple
                    title={themeActions.label}
                    icon='palette' onClick={this.setOpenState} ref={this.setAnchorEl}>
                </MaterialIcon>
                <Menu
                    open={this.state.open}
                    onClose={this.setCloseState}
                    onSelected={(idx) => this.context.switchTheme(themes[idx].key)}
                    anchorCorner={Corner.BOTTOM_LEFT} anchorElement={this.state.anchor}>
                    <MenuList>
                        {themes.map((th) => (
                            <MenuListItem key={th.key}>
                                <MenuListItemText primaryText={th.label} aria-label={th.label} />
                            </MenuListItem>
                        ))}
                    </MenuList>
                </Menu>
            </div>
        );
    }
}

export default hot(ThemeSwitcher);
