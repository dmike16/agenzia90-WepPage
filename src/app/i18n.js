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
            return this.header.actions.themeSwitcher;
        },
        get footer() {
            return currentLocaleObjet.footer;
        },
        get socials() {
            return this.footer.socials;
        },
        get copyright() {
            return this.footer.copyright;
        },
        get friendship() {
            return this.footer.friendship;
        },
        get utils(){
            return this.footer.utils;
        }
    }
}

const localeObject = {
    'it-IT': {
        title: 'Studio 90srls',
        header: {
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
        },
        footer: {
            socials: {
                google: {
                    ariaLabel: "Pagina google"
                },
                facebook: {
                    ariaLabel: "Pagina facebook"
                }
            },
            copyright: {
                prefix: "Quest'opera è distribuita con ",
                link: "Licenza Creative Commons Attribuzione 4.0 Internazionale",
                webmaster: {
                    label: "WebMaster",
                    link: "mailto:dual-lab@yandex.com"
                },
                license: {
                    label: "About creative common",
                    link: "http://creativecommons.org/about"
                },
                sourceCode: {
                    label: "Source code",
                    link: "https://github.com/dmike16/studio90srls"
                }
            },
            friendship: {
                generali: {
                    label: "Generali",
                    link: "https://generali.it"
                },
                bali: {
                    label: "Bali-Print",
                    link: "https://bali-print.com"
                },
                motoMarconi: {
                    label: "Moto Centro Marconi",
                    link: "http://motocentromarconi.it"
                },
                youService: {
                    label: "You Service",
                    link: "https://youserviceweb.com"
                }
            },
            utils: {
                sermetra: {
                    label: "Sermetra",
                    link: "https://sermetra.it"
                },
                unasca: {
                    label: "Unasca",
                    link: "http://unasca.it"
                },
                cna: {
                    label: "C.N.A",
                    link: "https://cna.it"
                },
                motorizazzione: {
                    label: "Motorizzazione",
                    link : "http://motorizzazioneroma.it"
                }
            }
        }
    }
};

export default i18n;