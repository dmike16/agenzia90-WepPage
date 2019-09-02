// @flow
function i18n(locale: string = 'it-IT'): any {
    const currentLocaleObjet = localeObject[locale];
    return {
        get title() {
            return currentLocaleObjet.title;
        }
    }
}

const localeObject = {
    'it-IT': {
        title: 'Studio 90srls'
    }
};

export default i18n;