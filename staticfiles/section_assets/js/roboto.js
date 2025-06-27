(function() {  
  const styleElement = document.createElement('style');

  const hostName = window ? window.location.hostname : '';
  const isCN = hostName.includes('asus.com.cn') ? true : false;
  const fontsDomain = isCN ? "https://www.asus.com.cn/" : "https://dlcdnimgs.asus.com/";

  styleElement.textContent = `
    /* roboto-100 - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 100;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-100.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-100.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-100.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-100italic - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 100;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-100italic.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-100italic.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-100italic.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-300 - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 300;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-300.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-300.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-300.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-300italic - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 300;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-300italic.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-300italic.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-300italic.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-regular - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-regular.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-regular.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-regular.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-italic - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 400;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-italic.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-italic.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-italic.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-500 - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-500.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-500.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-500.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-500italic - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 500;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-500italic.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-500italic.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-500italic.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-700 - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-700.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-700.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-700.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-700italic - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 700;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-700italic.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-700italic.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-700italic.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-900 - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 900;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-900.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-900.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-900.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
    /* roboto-900italic - cyrillic_latin */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 900;
      font-display: swap;
      src: local(''),
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-900italic.woff2?hostname=${ hostName }') format('woff2'), /* Super Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-900italic.woff?hostname=${ hostName }') format('woff'), /* Modern Browsers */
          url('${ fontsDomain }vendor/public/fonts/roboto/roboto-v32-cyrillic_latin-900italic.ttf?hostname=${ hostName }') format('truetype'); /* Legacy iOS */
    }
  `;

  document.head.appendChild(styleElement);
})();