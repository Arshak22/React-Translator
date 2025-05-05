import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaCopy, FaExchangeAlt } from 'react-icons/fa';
import Flag from 'react-world-flags';
import { REACT_APP_OPENAI_API_KEY } from '../../APIkey';
import './style.scss';

const languageOptions = [
  { code: 'af', name: 'Afrikaans', flag: 'ZA' },
  { code: 'sq', name: 'Albanian', flag: 'AL' },
  { code: 'am', name: 'Amharic', flag: 'ET' },
  { code: 'ar', name: 'Arabic', flag: 'SA' },
  { code: 'hy', name: 'Armenian', flag: 'AM' },
  { code: 'az', name: 'Azerbaijani', flag: 'AZ' },
  { code: 'eu', name: 'Basque', flag: 'ES' },
  { code: 'be', name: 'Belarusian', flag: 'BY' },
  { code: 'bn', name: 'Bengali', flag: 'BD' },
  { code: 'bs', name: 'Bosnian', flag: 'BA' },
  { code: 'bg', name: 'Bulgarian', flag: 'BG' },
  { code: 'ca', name: 'Catalan', flag: 'ES' },
  { code: 'ceb', name: 'Cebuano', flag: 'PH' },
  { code: 'ny', name: 'Chichewa', flag: 'MW' },
  { code: 'zh', name: 'Chinese', flag: 'CN' },
  { code: 'co', name: 'Corsican', flag: 'FR' },
  { code: 'hr', name: 'Croatian', flag: 'HR' },
  { code: 'cs', name: 'Czech', flag: 'CZ' },
  { code: 'da', name: 'Danish', flag: 'DK' },
  { code: 'nl', name: 'Dutch', flag: 'NL' },
  { code: 'en', name: 'English', flag: 'GB' },
  { code: 'eo', name: 'Esperanto', flag: 'PL' },
  { code: 'et', name: 'Estonian', flag: 'EE' },
  { code: 'tl', name: 'Filipino', flag: 'PH' },
  { code: 'fi', name: 'Finnish', flag: 'FI' },
  { code: 'fr', name: 'French', flag: 'FR' },
  { code: 'fy', name: 'Frisian', flag: 'NL' },
  { code: 'gl', name: 'Galician', flag: 'ES' },
  { code: 'ka', name: 'Georgian', flag: 'GE' },
  { code: 'de', name: 'German', flag: 'DE' },
  { code: 'el', name: 'Greek', flag: 'GR' },
  { code: 'gu', name: 'Gujarati', flag: 'IN' },
  { code: 'ht', name: 'Haitian Creole', flag: 'HT' },
  { code: 'ha', name: 'Hausa', flag: 'NG' },
  { code: 'haw', name: 'Hawaiian', flag: 'US' },
  { code: 'iw', name: 'Hebrew', flag: 'IL' },
  { code: 'hi', name: 'Hindi', flag: 'IN' },
  { code: 'hmn', name: 'Hmong', flag: 'CN' },
  { code: 'hu', name: 'Hungarian', flag: 'HU' },
  { code: 'is', name: 'Icelandic', flag: 'IS' },
  { code: 'ig', name: 'Igbo', flag: 'NG' },
  { code: 'id', name: 'Indonesian', flag: 'ID' },
  { code: 'ga', name: 'Irish', flag: 'IE' },
  { code: 'it', name: 'Italian', flag: 'IT' },
  { code: 'ja', name: 'Japanese', flag: 'JP' },
  { code: 'jw', name: 'Javanese', flag: 'ID' },
  { code: 'kn', name: 'Kannada', flag: 'IN' },
  { code: 'kk', name: 'Kazakh', flag: 'KZ' },
  { code: 'km', name: 'Khmer', flag: 'KH' },
  { code: 'ko', name: 'Korean', flag: 'KR' },
  { code: 'ku', name: 'Kurdish (Kurmanji)', flag: 'IQ' },
  { code: 'ky', name: 'Kyrgyz', flag: 'KG' },
  { code: 'lo', name: 'Lao', flag: 'LA' },
  { code: 'la', name: 'Latin', flag: 'VA' },
  { code: 'lv', name: 'Latvian', flag: 'LV' },
  { code: 'lt', name: 'Lithuanian', flag: 'LT' },
  { code: 'lb', name: 'Luxembourgish', flag: 'LU' },
  { code: 'mk', name: 'Macedonian', flag: 'MK' },
  { code: 'mg', name: 'Malagasy', flag: 'MG' },
  { code: 'ms', name: 'Malay', flag: 'MY' },
  { code: 'ml', name: 'Malayalam', flag: 'IN' },
  { code: 'mt', name: 'Maltese", flag: "MT' },
  { code: 'mi', name: 'Maori', flag: 'NZ' },
  { code: 'mr', name: 'Marathi', flag: 'IN' },
  { code: 'mn', name: 'Mongolian', flag: 'MN' },
  { code: 'my', name: 'Myanmar (Burmese)', flag: 'MM' },
  { code: 'ne', name: 'Nepali', flag: 'NP' },
  { code: 'no', name: 'Norwegian', flag: 'NO' },
  { code: 'ps', name: 'Pashto', flag: 'AF' },
  { code: 'fa', name: 'Persian', flag: 'IR' },
  { code: 'pl', name: 'Polish', flag: 'PL' },
  { code: 'pt', name: 'Portuguese', flag: 'PT' },
  { code: 'pa', name: 'Punjabi', flag: 'IN' },
  { code: 'ro', name: 'Romanian', flag: 'RO' },
  { code: 'ru', name: 'Russian', flag: 'RU' },
  { code: 'sm', name: 'Samoan', flag: 'WS' },
  { code: 'gd', name: 'Scots Gaelic', flag: 'GB' },
  { code: 'sr', name: 'Serbian', flag: 'RS' },
  { code: 'st', name: 'Sesotho', flag: 'LS' },
  { code: 'sn', name: 'Shona', flag: 'ZW' },
  { code: 'sd', name: 'Sindhi', flag: 'PK' },
  { code: 'si', name: 'Sinhala", flag: "LK' },
  { code: 'sk', name: 'Slovak', flag: 'SK' },
  { code: 'sl', name: 'Slovenian', flag: 'SI' },
  { code: 'so', name: 'Somali', flag: 'SO' },
  { code: 'es', name: 'Spanish', flag: 'ES' },
  { code: 'su', name: 'Sundanese', flag: 'ID' },
  { code: 'sw', name: 'Swahili', flag: 'KE' },
  { code: 'sv', name: 'Swedish', flag: 'SE' },
  { code: 'tg', name: 'Tajik', flag: 'TJ' },
  { code: 'ta', name: 'Tamil', flag: 'IN' },
  { code: 'te', name: 'Telugu', flag: 'IN' },
  { code: 'th', name: 'Thai', flag: 'TH' },
  { code: 'tr', name: 'Turkish', flag: 'TR' },
  { code: 'uk', name: 'Ukrainian', flag: 'UA' },
  { code: 'ur', name: 'Urdu', flag: 'PK' },
  { code: 'uz', name: 'Uzbek', flag: 'UZ' },
  { code: 'vi', name: 'Vietnamese', flag: 'VN' },
  { code: 'cy', name: 'Welsh', flag: 'GB' },
  { code: 'xh', name: 'Xhosa', flag: 'ZA' },
  { code: 'yi', name: 'Yiddish', flag: 'IL' },
  { code: 'yo', name: 'Yoruba', flag: 'NG' },
  { code: 'zu', name: 'Zulu', flag: 'ZA' },
];

const apiKey = REACT_APP_OPENAI_API_KEY;

const Translator = () => {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hy');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    console.log(loading);
    setSourceLang(targetLang);
    setTargetLang(temp);
    setInputText(translatedText);
    setTranslatedText('');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const translateText = useCallback(async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setTranslatedText('Translating...');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Translate the following text from ${sourceLang} to ${targetLang}: "${inputText}"`,
            },
          ],
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const rawResult = response.data.choices[0].message.content;
      const cleanedResult = rawResult.replace(/^"(.*)"$/, '$1');
      setTranslatedText(cleanedResult);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('An error occurred during translation.');
    } finally {
      setLoading(false);
    }
  }, [inputText, sourceLang, targetLang]);

  useEffect(() => {
    if (sourceLang === targetLang) {
      setTargetLang(sourceLang === 'en' ? 'hy' : 'en');
      return;
    }

    if (inputText.trim() === '') {
      setTranslatedText('');
      return;
    }

    const delayDebounce = setTimeout(() => {
      translateText();
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [inputText, sourceLang, targetLang, translateText]);

  return (
    <div className='translator'>
      <h1>Text Translator</h1>
      <div className='columns'>
        <div className='column'>
          <div className='lang-select'>
            <div className='flag'>
              <Flag
                code={languageOptions.find((l) => l.code === sourceLang).flag}
                style={{ width: '30px', height: '15px', borderRadius: '2px' }}
              />
            </div>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => {
              if (e.target.value.length <= 2000) setInputText(e.target.value);
            }}
            placeholder='Enter text...'
          />
          <div className='bottom-bar'>
            <span>{inputText.length} / 2000</span>
            <FaCopy
              className='icon'
              onClick={() => handleCopy(inputText)}
              title='Copy text'
            />
          </div>
        </div>

        <div className='swap-button'>
          <FaExchangeAlt onClick={handleSwapLanguages} />
        </div>

        <div className='column'>
          <div className='lang-select'>
            <div className='flag'>
              <Flag
                code={languageOptions.find((l) => l.code === targetLang).flag}
                style={{ width: '30px', height: '15px', borderRadius: '2px' }}
              />
            </div>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {languageOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={translatedText}
            readOnly
            placeholder='Translation will appear here...'
          />
          <div className='bottom-bar'>
            <span>{translatedText.length} characters</span>
            <FaCopy
              className='icon'
              onClick={() => handleCopy(translatedText)}
              title='Copy translation'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
