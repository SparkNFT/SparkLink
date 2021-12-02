import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import lng_en from './trans_en'
import lng_zh from './trans_zh'
i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		react: {
			useSuspense: false,
		},
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		resources:{
			en:{
				translation:lng_en
			},
			zh:{
				translation:lng_zh
			}
		}
	})

export default i18next
