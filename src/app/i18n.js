// @flow
function i18n(locale: string = 'it-IT'): any {
    const currentLocaleObjet = localeObject[locale];
    return {
        get title() {
            return currentLocaleObjet.title;
        },
        get header() {
            return currentLocaleObjet.header;
        },
        get themeSwitcher() {
            return currentLocaleObjet.header.actions.themeSwitcher;
        }
    }
}

const localeObject = {
    'it-IT': {
        title: 'Studio 90srls',
        header : {
            actions: {
                cookie: {
                    ariaLabel: "Opzioni cookie",
                    label: "Preferenze cookie"
                },
                themeSwitcher: {
                    label: "Cambio tema",
                    dark: {
                        ariaLabel: "Scuro",
                        label: "Scuro"
                    },
                    light: {
                        ariaLabel: "Chiaro",
                        label: "Chiaro"
                    }
                }
            }
        }
    }
};

export default i18n;