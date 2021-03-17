import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import translationEN from './en/translation.json';
import translationSRB from './srb/translation.json';

// the translations
const resources = {
	en: {
		translation: translationEN
	},
	srb: {
		translation: translationSRB
	}
};

i18n.use(reactI18nextModule) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'en',

		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false, // react already safes from xss
			prefix: '${',
			suffix: '}'
		}
	});

export default i18n;
