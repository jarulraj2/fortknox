var BO = {
  wekit: true,
  Chrome: false,
  Safari: false,
  Firefox: false,
  Opera: false,
  IE: false,
  oldIE: false,
  newIE: false,
  iDevice: false,
  iPhone: false,
  iPad: false,
  android: false,
  name: 'unkonwn',
  version: '',
};
(function () {
  'use strict';
  var uaInfo = navigator.userAgent;

  BO.getUAInfo = function () {
    return uaInfo;
  };
  BO.init = function () {
    BO.detectBrowser();
    BO.detectDevice();
  };
  BO.detectBrowser = function () {
    var regF = /Firefox[\/\s](\d+\.\d+)/,
      regO = /Opera|OPR[\/\s](\d+\.\d+)/,
      regI = /MSIE[\/\s](\d+\.\d+)/,
      regC = /Chrome[\/\s](\d+\.\d+)/,
      regS = /Safari[\/\s](\d+\.\d+)/,
      regIn = /rv[\:\s](\d+\.\d+).*like Gecko/;
    BO.Firefox = regF.test(uaInfo);
    BO.Opera = regO.test(uaInfo);
    BO.Chrome = regC.test(uaInfo);
    BO.Safari = !BO.Chrome && regS.test(uaInfo);
    BO.newIE = regIn.test(uaInfo);
    BO.IE = BO.newIE || regI.test(uaInfo);
    BO.oldIE = BO.IE && !BO.newIE && Number(uaInfo.match(regI)[1]) < 9;
    var regSV = /Version\/(\d+.\d+.\d+)/;
    BO.Chrome && (BO.name = 'Chrome') && (BO.version = uaInfo.match(regC) && uaInfo.match(regC)[1]);
    BO.Firefox && (BO.name = 'Firefox') && (BO.version = uaInfo.match(regF) && uaInfo.match(regF)[1]);
    BO.Safari && (BO.name = 'Safari') && (BO.version = uaInfo.match(regSV) && uaInfo.match(regSV)[1]);
    BO.Opera && (BO.name = 'Opera') && (BO.version = uaInfo.match(regO) && uaInfo.match(regO)[1]);
    BO.IE && (BO.name = 'IE') && (BO.version = BO.newIE ? uaInfo.match(regIn) && uaInfo.match(regIn)[1] : (uaInfo.match(regI) && uaInfo.match(regI))[1]);
    BO.webkit = !(BO.Firefox || BO.Opera || BO.IE);
  };
  BO.detectDevice = function () {
    var ua = uaInfo.toLowerCase();
    BO.android = ua.indexOf('android') > -1;
    /iPad/i.test(uaInfo) && (BO.iPad = true) && (BO.iDevice = true);
    /iPhone|iPod/i.test(uaInfo) && (BO.iPhone = true) && (BO.iDevice = true);
  };
})();
!(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    global.observer = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  function Observer(initData) {
    this.data = null;
    this.oldData = null;
    this.subscribers = {};
    this.anonymous = [];
    if (typeof initData !== 'undefined') {
      this.publish(null, initData);
    }
  }
  Observer.prototype.subscribe = function (name, callback) {
    if (name === null) {
      this.anonymous.push(callback);
    } else {
      this.subscribers[name] = callback;
    }
    if (this.data !== null) {
      callback.call(this, this.data);
    }
    return this;
  };
  Observer.prototype.unsubscribe = function (name) {
    if (this.subscribers[name] !== undefined) {
      delete this.subscribers[name];
    }
    return this;
  };
  Observer.prototype.publish = function (name, data) {
    this.oldData = this.data;
    this.data = data;
    for (var key in this.subscribers) {
      if (name === null || name !== key) {
        this.subscribers[key].call(this, data);
      }
    }
    for (var i = 0; i < this.anonymous.length; i++) {
      this.anonymous[i].call(this, data);
    }
    return this;
  };
  Observer.prototype.getData = function () {
    return this.data;
  };
  Observer.prototype.getOldData = function () {
    return this.oldData;
  };
  var observers = {};
  var observer = function (observerName, init, initData) {
    var instance = observer.get(observerName);
    if (instance) {
      return instance;
    } else if (init) {
      return observer.init(observerName, initData);
    }
  };
  observer.get = function (observerName) {
    return observers[observerName];
  };
  observer.init = function (observerName, initData) {
    return (observers[observerName] = new Observer(initData));
  };
  observer.constructor = Observer;
  return observer;
});
$.fn.scrollUnique = function () {
  return $(this).each(function () {
    var eventType = 'mousewheel';
    if (document.mozHidden !== undefined) {
      eventType = 'DOMMouseScroll';
    }
    $(this).on(eventType, function (event) {
      var scrollTop = this.scrollTop,
        scrollHeight = this.scrollHeight,
        height = this.clientHeight;
      if ('wheelDeltaX' in event.originalEvent && event.originalEvent.wheelDeltaX !== 0) return;
      if ('deltaX' in event.originalEvent && event.originalEvent.deltaX !== 0) return;
      if ('axis' in event.originalEvent && event.originalEvent.axis === event.originalEvent.HORIZONTAL_AXIS) return;
      var delta = event.originalEvent.wheelDelta ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);
      delta = delta / 5;
      if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
        this.scrollTop = delta > 0 ? 0 : scrollHeight;
        event.preventDefault();
      }
    });
  });
};
(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})();
jQuery.extend(jQuery.easing, {
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },
});
window.$PrivacyUtil = window.$PrivacyUtil || {
  getCookie: function (e) {
    var t = document.cookie.match(new RegExp('(^| )' + e + '=([^;]*)(;|$)'));
    return null != t ? unescape(t[2]) : null;
  },
  setCookie: function (e, t, o) {
    var n, i;
    (n = new Date()).setDate(n.getDate() + o),
      (i = e + '=' + escape(t) + (null === o ? '' : ';expires=' + n.toGMTString()) + ';path=/;domain=.huaweicloud.com;'),
      (document.cookie = i);
  },
  delCookie: function (e) {
    var t = new Date();
    t.setTime(t.getTime() - 1),
      null != window.$PrivacyUtil.getCookie(e) && (document.cookie = e + '=;expires=' + t.toUTCString() + ';path=/;domain=.huaweicloud.com;');
  },
};
$(function () {
  var lang = $('html').attr('lang') || 'en-us';
  var site = $('html').attr('site') || 'hk';
  var siteName = site === 'hk' ? 'intl' : site.toLowerCase();
  var currLang = lang.toLowerCase();
  site = site.toLowerCase();
  var langName = lang.toLowerCase();
  var cookieModalVersion = '1.0.11';
  var euModalLangList = ['tr-tr', 'ja-jp', 'ar-mena'];
  function getCss(callback) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://portal.hc-cdn.com/cnpm-pep-global-cookies/' + cookieModalVersion + '/pc/index.css';
    link.onload = function () {
      typeof callback === 'function' && callback();
    };
    $('head').append(link);
  }
  function isLocalStorageWorks() {
    var test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  function getCookieDom(callback) {
    var cookieUrl =
      site === 'eu' && langName === 'en-us'
        ? 'https://www.huaweicloud.com/eu/common/cookies.html'
        : 'https://www.huaweicloud.com/' + siteName + '/' + langName + '/common/cookies.html';
    getCss(function () {
      $.ajax({
        url: cookieUrl,
        type: 'GET',
        success: function (data) {
          var modalContainer = $('#content').length ? $('#content') : $('#__nuxt');
          $(data).find('.pep-settingcookie-module').insertAfter(modalContainer);
          typeof callback === 'function' && callback();
        },
      });
    });
  }
  function initCookieModal() {
    $.getScript('https://portal.hc-cdn.com/cnpm-pep-global-cookies/' + cookieModalVersion + '/cookies.min.js', function () {
      var pepGlobalCookies = new PepGlobalCookies('body', { site: siteName });
      $('body').on('click', '#footer .footer-cookie-setting', function (e) {
        e.preventDefault();
        if ($('.pep-settingcookie-module').length === 0) {
          getCookieDom(function () {
            pepGlobalCookies.showPolicyCookieModal();
          });
        } else {
          pepGlobalCookies.showPolicyCookieModal();
        }
      });
      if (pepGlobalCookies.hidePolicyCookies()) {
        return;
      }
      getCookieDom(function () {
        pepGlobalCookies.init();
      });
    });
  }
  function formatUrlHost(url) {
    var isCN = location.host.endsWith('.huaweicloud.cn');
    if (isCN) {
      return url.replace('.huaweicloud.com', '.huaweicloud.cn');
    }
    return url;
  }
  if (siteName === 'eu' || (siteName === 'intl' && euModalLangList.indexOf(currLang) > -1)) {
    initCookieModal();
    return;
  }
  var floatTextObj = {
    'en-us': {
      information:
        'We use cookies on the site, including third party cookies, in order for the site to work properly and to analyse traffic,offer enhanced functionality, social media features,and personalies content and ads. <a href="https://www.huaweicloud.com/intl/en-us/declaration/sa_cookies.html" target="_blank" class="por-link">Learn more</a>',
      accept: 'ACCEPT COOKIES',
      settings: 'COOKIES SETTINGS',
    },
    'th-th': {
      information:
        'เว็บไซต์นี้ใช้คุกกี้<br/>เราใช้คุกกี้บนเว็บไซต์นี้ รวมถึงคุกกี้ของบุคคลที่สาม เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้องและเพื่อวิเคราะห์การเข้าชมเว็บไซต์ เพิ่มประสิทธิภาพการทำงาน ฟีเจอร์อื่น ๆ บนโซเชียลมีเดีย รวมถึงข้อมูลส่วนบุคคลและโฆษณาต่าง ๆ <a href="https://www.huaweicloud.com/intl/th-th/declaration/sa_cookies.html" target="_blank" class="por-link">เรียนรู้เพิ่มเติม</a>',
      accept: 'ยอมรับคุกกี้',
      settings: 'การตั้งค่าคุกกี้',
    },
    'id-id': {
      information:
        'Kami menggunakan kuki di situs ini, termasuk kuki pihak ketiga, agar situs dapat berfungsi dengan baik dan untuk menganalisis traffic, menawarkan peningkatan fungsi, fitur media sosial, serta konten dan iklan yang dipersonalisasi. <a href="https://www.huaweicloud.com/intl/id-id/declaration/sa_cookies.html" target="_blank" class="por-link">Pelajari selengkapnya</a>',
      accept: 'Terima kuki',
      settings: 'Pengaturan kuki',
    },
  };
  var modalObj = {
    'en-us': {
      titleObj: { title: 'Cookies Preference Center' },
      cookieUsedTitle: 'Cookies Used',
      activeStatus: { active: 'Active', inactive: 'Inactive' },
      footerObj: {
        btns: ['Accept Cookies', 'Save and Close'],
        tips: 'To reject all non-essential cookies you may also simply click “RESET” on any of the tabs',
      },
      defaultTabObj: {
        title: 'Your Privacy',
        description:
          'We use cookies on this website. To learn in detail about how we use cookies, please read our full Cookie Policy.<br/>Our cookies setting is by default "inactive" apart from the essential cookies. To keep the current setting, simply click "Save and Close" below. You can also click "Accept Cookies" to activate all non-essential cookie groups.<br/>To accept or deactivate cookies by category, simply click on the tabs to the left, then set your preference in the upper right corner and finally click "Save and Close" below.<br/>You can revisit and change your settings at any time. Such change will not affect the lawfulness of the processing activities based on the consent and prior to such change.',
      },
      essentialTabObj: {
        title: 'Essential Cookies',
        description:
          'These cookies are necessary for the website to function and cannot be switched off in our systems.They are usually only set in response to actions made by you which amount to a request for services,such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies,but some parts of the site will not then work. These cookies do not store any personally identifiable information.',
        active: 'Always Active',
        hasCookieUsed: true,
      },
      analysisTabObj: {
        title: 'Analytics Cookies',
        description:
          'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.They help us to know which pages are the most and least popular and see how visitors move around the site.All information these cookies collect is aggregated and therefore anonymous. However, the third parties providing these services, Google Analytics,will process your personal data in order to provide the aggregated data.',
        hasCookieUsed: true,
      },
      adTabObj: {
        title: 'Advertising Cookies',
        description:
          'These cookies are set by our advertising partners.They are used to build a profile of your interests and show relevant ads on other websites, and to also allow you to ‘Like’ and ‘Share’ our content on social media.They do not store directly personal information, but are based on uniquely identifying your browser and internet device.Additionally, the third parties setting these cookies may link your personal data with your browsing behaviour if you are logged into their services at the time.',
        hasCookieUsed: true,
      },
      moreTabObj: {
        title: 'More Information',
        description:
          '<a class="por-link" href="https://www.huaweicloud.com/intl/en-us/declaration/sa_cookies.html" target="_blank">https://www.huaweicloud.com/intl/en-us/declaration/sa_cookies.html</a>',
      },
      cookieUsedList: [
        'OneTrust Cookie Management Platform',
        'Huawei Self-Service Platform Cookies',
        'Huawei Knowlege Base',
        'Huawei NPS',
        'Google Tag Manager',
      ],
    },
    'th-th': {
      titleObj: { title: 'ศูนย์การตั้งค่าคุกกี้' },
      cookieUsedTitle: 'รายการคุกกี้ที่ใช้',
      activeStatus: { active: 'ทำงาน', inactive: 'ไม่ทำงาน' },
      footerObj: {
        btns: ['ยอมรับคุกกี้', 'บันทึกและปิด'],
        tips: 'To reject all non-essential cookies you may also simply click “RESET” on any of the tabs',
      },
      defaultTabObj: {
        title: 'ความเป็นส่วนตัวของคุณ',
        description:
          'เราใช้คุกกี้ในเว็บไซต์นี้ หากต้องการเรียนรู้รายละเอียดเกี่ยวกับวิธีที่เราใช้คุกกี้ โปรดอ่าน<a class="por-link" href="https://www.huaweicloud.com/intl/th-th/declaration/sa_cookies.html" target="_blank">นโยบายคุกกี้ฉบับเต็ม</a>ของเรา<br/>การตั้งค่าคุกกี้ของเราจะตั้งเป็น "ไม่ใช้งาน" ตามค่าเริ่มต้น นอกเหนือจากคุกกี้ที่จำเป็น หากต้องการคงการตั้งค่าปัจจุบันไว้ โปรดคลิก "บันทึกและปิด" ด้านล่าง คุณยังสามารถคลิก “ยอมรับคุกกี้” เพื่อเปิดใช้งานกลุ่มคุกกี้ที่ไม่จำเป็นทั้งหมด<br/>ในการยอมรับหรือปิดใช้งานคุกกี้ตามหมวดหมู่ โปรดคลิกที่แท็บด้านซ้าย จากนั้นตั้งค่ากำหนดของคุณที่มุมขวาบน และสุดท้าย คลิก "บันทึกและปิด" ด้านล่าง<br/>คุณสามารถกลับมาตรวจสอบและเปลี่ยนการตั้งค่าของคุณได้ทุกเมื่อ การเปลี่ยนแปลงดังกล่าวจะไม่กระทบต่อความถูกต้องตามกฎหมายของกิจกรรมที่กำลังดำเนินอยู่ตามความยินยอมและดำเนินการก่อนการเปลี่ยนแปลงดังกล่าว',
      },
      essentialTabObj: {
        title: 'คุกกี้ที่จำเป็น',
        description:
          'คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์และไม่สามารถปิดได้ในระบบของเรา มักได้รับการตั้งค่าเพื่อรองรับการใช้งานบางอย่างของคุณในบริการนั้น เช่น การตั้งค่าสิทธิส่วนบุคคล การเข้าสู่ระบบ หรือการกรอกแบบฟอร์ม คุณสามารถตั้งค่าเบราว์เซอร์ให้ปิดกั้นหรือแจ้งเตือนคุณเกี่ยวกับคุกกี้เหล่านี้ แต่หากไม่มีคุกกี้ บางส่วนของเว็บไซต์จะไม่ทำงาน คุกกี้เหล่านี้จะไม่จัดเก็บข้อมูลใด ๆ ที่สามารถระบุตัวบุคคล',
        active: 'ทำงานเสมอ',
        hasCookieUsed: true,
      },
      analysisTabObj: {
        title: 'คุกกี้เชิงวิเคราะห์',
        description:
          'คุกกี้เหล่านี้ช่วยให้เราสามารถนับการเข้าชมและแหล่งที่มาของปริมาณการใช้งาน เพื่อให้เราสามารถวัดและปรับปรุงประสิทธิภาพของเว็บไซต์ของเราได้ ซึ่งจะช่วยให้เราทราบว่าหน้าไหนที่ได้รับความนิยมมากที่สุด หรือน้อยที่สุด และดูว่าผู้เยี่ยมชมใช้งานเว็บไซต์อย่างไร คุกกี้เหล่านี้มีการรวบรวมข้อมูลโดยไม่ระบุชื่อ อย่างไรก็ตาม Google Analytics ซึ่งเป็นบุคคลที่สามที่ให้บริการเหล่านี้ มีการประมวลผลข้อมูลส่วนบุคคลเกี่ยวกับคุณเพื่อให้บริการข้อมูลโดยรวมแก่เรา',
        hasCookieUsed: true,
      },
      adTabObj: {
        title: 'คุกกี้การโฆษณา',
        description:
          "คุกกี้เหล่านี้ถูกกำหนดค่าโดยพาร์ทเนอร์ด้านโฆษณาของเรา ซึ่งจะใช้เพื่อสร้างโปรไฟล์ที่คุณสนใจและแสดงโฆษณาที่เกี่ยวข้องบนเว็บไซต์อื่น ๆ และยังช่วยให้คุณสามารถ 'ถูกใจ' หรือ 'แบ่งปัน' เนื้อหาของเราบนสื่อสังคม นอกจากนี้ บุคคลที่สามที่ตั้งค่าคุกกี้เหล่านี้อาจเชื่อมโยงข้อมูลส่วนบุคคลของคุณกับพฤติกรรมการท่องเว็บของคุณ หากคุณล็อกอินเข้าสู่บัญชีของพวกเขาขณะที่อยู่บนเว็บไซต์ของเรา",
        hasCookieUsed: true,
      },
      moreTabObj: {
        title: 'ข้อมูลเพิ่มเติม',
        description:
          '<a class="por-link" href="https://www.huaweicloud.com/intl/th-th/declaration/sa_cookies.html" target="_blank">https://www.huaweicloud.com/intl/th-th/declaration/sa_cookies.html</a>',
      },
      cookieUsedList: [
        'OneTrust Cookie Management Platform',
        'Huawei Self-Service Platform Cookies',
        'Huawei Knowlege Base',
        'Huawei NPS',
        'Google Tag Manager',
      ],
    },
    'id-id': {
      titleObj: { title: 'Pusat Preferensi Kuki' },
      cookieUsedTitle: 'Kuki yang digunakan',
      activeStatus: { active: 'Aktif', inactive: 'Tidak Aktif' },
      footerObj: {
        btns: ['Terima kuki', 'Simpan dan Tutup'],
        tips: 'To reject all non-essential cookies you may also simply click “RESET” on any of the tabs',
      },
      defaultTabObj: {
        title: 'Privasi Anda',
        description:
          'Kami menggunakan kuki di situs web ini. Untuk mempelajari secara mendetail cara kami menggunakan kuki, silakan baca <a class="por-link" href="https://www.huaweicloud.com/intl/id-id/declaration/sa_cookies.html" target="_blank">Kebijakan Kuki</a> kami selengkapnya.<br />Secara default/bawaan, pengaturan kuki kami adalah "Tidak Aktif", kecuali untuk kuki esensial. Untuk mempertahankan pengaturan saat ini, cukup klik "Simpan dan Tutup" di bawah. Anda juga dapat mengeklik "Terima kuki" untuk mengaktifkan semua grup kuki yang tidak esensial.<br />Untuk menerima atau menonaktifkan kuki menurut kategori, cukup klik tab di sebelah kiri, lalu atur preferensi Anda di sudut kanan atas, dan terakhir klik "Simpan dan Tutup" di bawah.<br />Anda dapat meninjau lagi dan mengubah pengaturan kapan pun.Perubahan tersebut tidak akan memengaruhi keabsahan aktivitas pemrosesan berdasarkan izin dan sebelum perubahan tersebut diberlakukan.',
      },
      essentialTabObj: {
        title: 'Kuki Penting',
        description:
          'Semua kuki ini diperlukan agar situs web dapat berfungsi dan tidak dapat dimatikan dalam sistem kami. Biasanya semua kuki ini hanya diatur sebagai tanggapan atas tindakan Anda yang merupakan permintaan layanan, seperti mengatur preferensi privasi, proses masuk, atau mengisi formulir. Anda dapat mengatur browser untuk memblokir atau memperingatkan Anda mengenai kuki ini, tetapi beberapa bagian situs tidak akan berfungsi karenanya. Kuki ini tidak menyimpan informasi identitas pribadi apa pun.',
        active: 'Selalu Aktif',
        hasCookieUsed: false,
      },
      analysisTabObj: {
        title: 'Kuki Analitik',
        description:
          'Semua kuki ini memungkinkan kami menghitung jumlah kunjungan dan sumber lalu lintas sehingga kami dapat mengukur dan meningkatkan kinerja situs kami. Kuki tersebut membantu kami mengetahui halaman mana yang paling populer dan paling tidak populer dan melihat bagaimana pengunjung menjelajahi situs. Semua informasi yang dikumpulkan kuki ini diagregatkan dan karena itu bersifat anonim. Akan tetapi, pihak ketiga yang menyediakan layanan ini, Google Analytics, akan memproses data pribadi Anda agar dapat menyediakan data agregat tersebut.',
        hasCookieUsed: false,
      },
      adTabObj: {
        title: 'Kuki Periklanan',
        description:
          "Semua kuki seperti ini diatur oleh mitra periklanan kami. Kuki tersebut digunakan untuk membuat profil tentang minat Anda dan menampilkan iklan yang relevan di situs web lainnya, dan juga agar Anda dapat 'Menyukai' dan 'Membagikan' konten kami di media sosial. Selain itu, pihak ketiga yang mengatur kuki ini dapat menautkan data pribadi Anda dengan perilaku penjelajahan Anda jika Anda masuk ke layanan mereka saat itu.",
        hasCookieUsed: false,
      },
      moreTabObj: {
        title: 'Informasi selengkapnya',
        description:
          '<a class="por-link" href="https://www.huaweicloud.com/intl/id-id/declaration/sa_cookies.html" target="_blank">https://www.huaweicloud.com/intl/id-id/declaration/sa_cookies.html</a>',
      },
      cookieUsedList: ['Kuki yang digunakan', 'Kuki Platform Layanan Mandiri Huawei', 'Basis Pengetahuan Huawei', 'NPS Huawei', 'Google Tag Manager'],
    },
  };
  if (!floatTextObj[currLang]) {
    currLang = 'en-us';
  }
  var modalData = modalObj[currLang] || modalObj['en-us'];
  var floatDialog = '<div class="float-cookie-dialog">';
  floatDialog += '<div class="cookie-information">';
  floatDialog += '    <div>';
  floatDialog += floatTextObj[currLang].information;
  floatDialog += '    </div>';
  floatDialog += '</div>';
  floatDialog += '<div class="cookie-btn-group">';
  floatDialog += '    <a class="por-btn por-btn-primary-light">' + floatTextObj[currLang].accept + '</a>';
  floatDialog += '    <a class="por-btn por-btn-light">' + floatTextObj[currLang].settings + '</a>';
  floatDialog += '</div>';
  floatDialog += '    </div>';
  var cookieModal = '<div class="por-modal" data-hide="modal" id="cookie-setting-modal">';
  cookieModal += '    <div class="por-modal-dialog">';
  cookieModal += '        <div class="por-modal-inner">';
  cookieModal += '            <div class="por-modal-head">';
  cookieModal += '                <div class="por-modal-title">' + modalData.titleObj.title + '</div>';
  cookieModal += '            </div>';
  cookieModal += '            <div class="por-modal-body">';
  cookieModal += '                <div class="por-modal-text">';
  cookieModal += '                    <div class="por-tab-container combination cf">';
  cookieModal += '                        <div class="por-tab por-scrollbar-s">';
  cookieModal += '                            <ul>';
  cookieModal += '                                <li class="active">';
  cookieModal += '                                    <a>';
  cookieModal += '                                        <div class="por-tab-text">' + modalData.defaultTabObj.title + '</div>';
  cookieModal += '                                    </a>';
  cookieModal += '                                </li>                                    ';
  cookieModal += '                                <li>';
  cookieModal += '                                    <a>';
  cookieModal += '                                        <div class="por-tab-text">' + modalData.essentialTabObj.title + '</div>';
  cookieModal += '                                    </a>';
  cookieModal += '                                </li>';
  cookieModal += '                                <li>';
  cookieModal += '                                    <a>';
  cookieModal += '                                        <div class="por-tab-text">' + modalData.analysisTabObj.title + '</div>';
  cookieModal += '                                    </a>';
  cookieModal += '                                </li>';
  cookieModal += '                                <li>';
  cookieModal += '                                    <a>';
  cookieModal += '                                        <div class="por-tab-text">' + modalData.adTabObj.title + '</div>';
  cookieModal += '                                    </a>';
  cookieModal += '                                </li>';
  cookieModal += '                                <li>';
  cookieModal += '                                    <a>';
  cookieModal += '                                        <div class="por-tab-text">' + modalData.moreTabObj.title + '</div>';
  cookieModal += '                                    </a>';
  cookieModal += '                                </li>';
  cookieModal += '                            </ul>';
  cookieModal += '                        </div>';
  cookieModal += '                        <div class="por-tab-wrapper">';
  cookieModal += '                            <div class="por-tab-content active">';
  cookieModal += '                                <div class="por-collapse-container">';
  cookieModal += '                                    <a class="por-collapse-trigger expended" data-toggle="por-collapse">';
  cookieModal += '                                        <div class="por-collapse-head-text">' + modalData.defaultTabObj.title + '</div>';
  cookieModal += '                                        <i class="por-icon por-icon-down"></i>';
  cookieModal += '                                    </a>';
  cookieModal += '                                    <div class="por-collapse show">';
  cookieModal += '                                        <div class="collapse-inner por-scrollbar-s">';
  cookieModal += '                                            <dl>';
  cookieModal += '                                                <dt class="por-text-title-t7">' + modalData.defaultTabObj.title + '</dt>';
  cookieModal += '                                                <dd>';
  cookieModal += '                                                ' + modalData.defaultTabObj.description;
  cookieModal += '                                                </dd>';
  cookieModal += '                                            </dl>';
  cookieModal += '                                        </div>                                            ';
  cookieModal += '                                    </div>';
  cookieModal += '                                </div>';
  cookieModal += '                                ';
  cookieModal += '                            </div>';
  cookieModal += '                            <div class="por-tab-content">';
  cookieModal += '                                <div class="por-collapse-container">';
  cookieModal += '                                    <a class="por-collapse-trigger" data-toggle="por-collapse">';
  cookieModal += '                                        <div class="por-collapse-head-text">' + modalData.essentialTabObj.title + '</div>';
  cookieModal += '                                        <i class="por-icon por-icon-down"></i>';
  cookieModal += '                                    </a>';
  cookieModal += '                                    <div class="por-collapse">';
  cookieModal += '                                        <div class="collapse-inner por-scrollbar-s">';
  cookieModal += '                                            <dl>';
  cookieModal +=
    '                                                <dt class="por-text-title-t7"><span class="plain-text">' +
    modalData.essentialTabObj.active +
    '</span>' +
    modalData.essentialTabObj.title +
    '</dt>';
  cookieModal += '                                                <dd>' + modalData.essentialTabObj.description;
  cookieModal += '                                                </dd>';
  cookieModal += '                                            </dl>';
  if (modalData.essentialTabObj.hasCookieUsed) {
    cookieModal += '                                            <dl classs="cookie-used">';
    cookieModal += '                                                <dt class="por-text-title-t7">' + modalData.cookieUsedTitle + '</dt>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">' + modalData.cookieUsedList[0] + ': </div> ';
    cookieModal += '                                                    cookies.js, OptanonConsent, OptanonAlertBoxClosed';
    cookieModal += '                                                </dd>                                                   ';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">Huawei:</div>';
    cookieModal += '                                                    JSESSIONID, CAS_THEME_NAME, VERSION_NO, ajaxUrl, scrollPercentage, HWSTORE-SESSION, ';
    cookieModal += '                                                    hwsso_uniportal, galleryConfigs, ';
    cookieModal += '                                                    20001_currentLanguage, 20017_currentLanguage,';
    cookieModal += '                                                    ae47714b02ca4de4bb1b101f320d3c89,';
    cookieModal += '                                                    RT, HWWAFSESID, awxxxx, qRCode, expiredTime, qrCodeCreateTime, cookieBannerOnOff, ';
    cookieModal += '                                                    cversion, HWWAFSESTIME, currentUrl, r-beta__sticky     ';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">' + modalData.cookieUsedList[1] + ':</div>';
    cookieModal += '                                                    JSESSIONID';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">' + modalData.cookieUsedList[2] + ':</div>';
    cookieModal += '                                                    consumer-tkbdownload-dg_ctkbfm_sticky, JSESSIONID';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">' + modalData.cookieUsedList[3] + ':</div>';
    cookieModal += '                                                    currentUrl, awxxxx<br/>';
    cookieModal += '                                                    Google Tag Manager:<br/>';
    cookieModal += '                                                    _dlt';
    cookieModal += '                                                </dd>';
    cookieModal += '                                            </dl>';
  }
  cookieModal += '                                        </div>                                            ';
  cookieModal += '                                    </div>';
  cookieModal += '                                </div>                                    ';
  cookieModal += '                            </div>';
  cookieModal += '                            <div class="por-tab-content">';
  cookieModal += '                                <div class="por-collapse-container">';
  cookieModal += '                                    <a class="por-collapse-trigger" data-toggle="por-collapse">';
  cookieModal += '                                        <div class="por-collapse-head-text">' + modalData.analysisTabObj.title + '</div>';
  cookieModal += '                                        <i class="por-icon por-icon-down"></i>';
  cookieModal += '                                    </a>';
  cookieModal += '                                    <div class="por-collapse">';
  cookieModal += '                                        <div class="collapse-inner por-scrollbar-s">';
  cookieModal += '                                            <dl>';
  cookieModal += '                                                <dt class="por-text-title-t7">';
  cookieModal += '                                                    <div class="status inactive">';
  cookieModal += '                                                        <div class="choose-zone">';
  cookieModal += '                                                            <div class="switch"></div>';
  cookieModal += '                                                            ' + modalData.activeStatus.inactive;
  cookieModal += '                                                        </div>';
  cookieModal += '                                                        <div class="choose-zone">';
  cookieModal += '                                                            <div class="switch"></div>';
  cookieModal += '                                                            ' + modalData.activeStatus.active;
  cookieModal += '                                                        </div>';
  cookieModal += '                                                    </div>';
  cookieModal += '                                                    ' + modalData.analysisTabObj.title;
  cookieModal += '                                                </dt>';
  cookieModal += '                                                <dd>' + modalData.analysisTabObj.description;
  cookieModal += '                                                </dd>';
  cookieModal += '                                            </dl>';
  if (modalData.analysisTabObj.hasCookieUsed) {
    cookieModal += '                                            <dl classs="cookie-used">';
    cookieModal += '                                                <dt class="por-text-title-t7">' + modalData.cookieUsedTitle + '</dt>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">Google Analytics: </div> ';
    cookieModal += '                                                    _gid, _gat_xxxxxxxxxxxxxxxxxxxxxxxxxx, _dc_gtm_UA-xxxxxxxx, _gat, _ga, ';
    cookieModal += '                                                    _gclxxxx, _gat_UA-nnnnnnn-nn, _gat_UA-, galleryConfigs, _gac_UA-7728030-19, ';
    cookieModal += '                                                    first_utm, last_utm, ';
    cookieModal += '                                                    _gac_UA-7728030-4 Analytics Data Element Cookies:<br/>';
    cookieModal += '                                                    starttime, scrollPercentage, prevScrollPercentage, ';
    cookieModal += '                                                    prevpagetime';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">Huawei DMP Analytics:</div> ';
    cookieModal += '                                                    _dmpa_ses_time, _dmpa_id, _dmpa_ses, eu-1nebula-collector_dmpa_open_sticky, ';
    cookieModal += '                                                    eu-1nebula-collector_api_sticky, _dmpa_ref, eu-1nebula-collector_dmpa_sticky';
    cookieModal += '                                                </dd>';
    cookieModal += '                                            </dl> ';
  }
  cookieModal += '                                        </div>                                            ';
  cookieModal += '                                    </div>';
  cookieModal += '                                </div>                                 ';
  cookieModal += '                            </div>';
  cookieModal += '                            <div class="por-tab-content">';
  cookieModal += '                                <div class="por-collapse-container">';
  cookieModal += '                                    <a class="por-collapse-trigger" data-toggle="por-collapse">';
  cookieModal += '                                        <div class="por-collapse-head-text">' + modalData.adTabObj.title + '</div>';
  cookieModal += '                                        <i class="por-icon por-icon-down"></i>';
  cookieModal += '                                    </a>';
  cookieModal += '                                    <div class="por-collapse">';
  cookieModal += '                                        <div class="collapse-inner por-scrollbar-s">';
  cookieModal += '                                            <dl>';
  cookieModal += '                                                <dt class="por-text-title-t7">';
  cookieModal += '                                                    <div class="status inactive">';
  cookieModal += '                                                        <div class="choose-zone">';
  cookieModal += '                                                            <div class="switch"></div>';
  cookieModal += '                                                            ' + modalData.activeStatus.inactive;
  cookieModal += '                                                        </div>';
  cookieModal += '                                                        <div class="choose-zone">';
  cookieModal += '                                                            <div class="switch"></div>';
  cookieModal += '                                                            ' + modalData.activeStatus.active;
  cookieModal += '                                                        </div>';
  cookieModal += '                                                    </div>';
  cookieModal += '                                                    ' + modalData.adTabObj.title;
  cookieModal += '                                                </dt>';
  cookieModal += '                                                <dd>' + modalData.adTabObj.description + '</dd>';
  cookieModal += '                                            </dl>';
  if (modalData.adTabObj.hasCookieUsed) {
    cookieModal += '                                            <dl classs="cookie-used">';
    cookieModal += '                                                <dt class="por-text-title-t7">' + modalData.cookieUsedTitle + '</dt>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">bs.serving-sys.com:</div> ';
    cookieModal += '                                                    OT_6075';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">doubleclick.net:</div> ';
    cookieModal += '                                                    test_cookie, IDE';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">twitter.com:</div> ';
    cookieModal += '                                                    personalization_id';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">serving-sys.com:</div> ';
    cookieModal += '                                                    eyeblaster, OT2, ActivityInfo2, u2, t1';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">ads.linkedin.com:</div> ';
    cookieModal += '                                                    lang';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">bing.com</div> ';
    cookieModal += '                                                    MUID, _uetsid, _uetvid';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">linkedin.com:</div> ';
    cookieModal += '                                                    lidc, bcookie, lissc, bscookie, UserMatchHistory, lang';
    cookieModal += '                                                </dd>';
    cookieModal += '                                                <dd class="por-text-caption-t1">';
    cookieModal += '                                                    <div class="color_text_primary_dark">youtube.com:</div> ';
    cookieModal += '                                                    YSC, VISITOR_INFO1_LIVE, GPS';
    cookieModal += '                                                </dd>';
    cookieModal += '                                            </dl>';
  }
  cookieModal += '                                        </div>                                        ';
  cookieModal += '                                    </div>';
  cookieModal += '                                </div>';
  cookieModal += '                                ';
  cookieModal += '                            </div>';
  cookieModal += '                            <div class="por-tab-content">';
  cookieModal += '                                <div class="por-collapse-container">';
  cookieModal += '                                    <a class="por-collapse-trigger" data-toggle="por-collapse">';
  cookieModal += '                                        <div class="por-collapse-head-text">' + modalData.moreTabObj.title + '</div>';
  cookieModal += '                                        <i class="por-icon por-icon-down"></i>';
  cookieModal += '                                    </a>';
  cookieModal += '                                    <div class="por-collapse">';
  cookieModal += '                                        <div class="collapse-inner por-scrollbar-s">';
  cookieModal += '                                            <dl>';
  cookieModal += '                                                <dt class="por-text-title-t7">' + modalData.moreTabObj.title + '</dt>';
  cookieModal += '                                                <dd style="font-size: 14px;">';
  cookieModal += '                                                ' + modalData.moreTabObj.description;
  cookieModal += '                                                </dd>';
  cookieModal += '                                            </dl>';
  cookieModal += '                                        </div>                                           ';
  cookieModal += '                                    </div>';
  cookieModal += '                                </div>';
  cookieModal += '                                ';
  cookieModal += '                            </div>';
  cookieModal += '                        </div>';
  cookieModal += '                    </div>';
  cookieModal += '                </div>';
  cookieModal += '            </div>';
  cookieModal += '            <div class="por-modal-footer">';
  cookieModal += '                <a class="por-btn por-btn-small por-btn-primary" data-hide="modal">' + modalObj[currLang].footerObj.btns[0] + '</a>';
  cookieModal += '                <a class="por-btn por-btn-small por-btn-dark" data-hide="modal">' + modalObj[currLang].footerObj.btns[1] + '</a>';
  cookieModal += '            </div>';
  cookieModal += '        </div>';
  cookieModal += '        <div class="por-modal-close" data-hide="modal">';
  cookieModal += '            <i class="u-icon u-icon-cancel"></i>';
  cookieModal += '        </div>';
  cookieModal += '    </div>';
  cookieModal += '</div>';
  if (location.href.indexOf('developer') != -1 || location.href.indexOf('edu') != -1 || location.href.indexOf('marketplace') != -1) {
    $('.privacy-popup').css('display', 'block');
  } else {
    var ipsearchUrl =
      window.location.href.indexOf('.huaweicloud.com/eu/') > -1
        ? 'https://portal.eu.huaweicloud.com/rest/cbc/cbcipsearchservice/v1/ipsearch/dataopenipv4'
        : 'https://portal-intl.huaweicloud.com/rest/portalappindustryservice/v1/ip/info';
    ipsearchUrl = formatUrlHost(ipsearchUrl);
    $.ajax({
      url: ipsearchUrl,
      method: 'GET',
      datatype: 'json',
      success: function success(rep) {
        if (rep && rep.country_code) {
          var countryLangMaps = { TH: 'th-th', ID: 'id-id' };
          if (isLocalStorageWorks()) {
            localStorage.setItem('countrycode', rep.country_code);
          }
          if (
            site == 'hk' &&
            Object.keys(countryLangMaps).indexOf(rep.country_code) > -1 &&
            (Object.values(countryLangMaps).indexOf(langName) > -1 || langName === 'en-us')
          ) {
            $('<dd><a class="footer-link reset-cookies">Cookie Settings</a></dd>').insertAfter($('.footer-nav-menus dl:nth-child(3) dd:last-child'));
            window.$PrivacyUtil.setCookie('essential', 'active', 2e4);
            var $settingCookieModule = $('<div class="pep-settingcookie-module"></div>');
            var modalContainer = $('#content').length ? $('#content') : $('#__nuxt');
            $settingCookieModule.insertAfter(modalContainer);
            $settingCookieModule.append(cookieModal);
            var currentCookieSetting = {
              Analytics: window.$PrivacyUtil.getCookie('Analytics'),
              Advertising: window.$PrivacyUtil.getCookie('Advertising'),
            };
            function saveAll() {
              window.$PrivacyUtil.setCookie('Analytics', 'active', 2e4);
              window.$PrivacyUtil.setCookie('Advertising', 'active', 2e4);
              if ($('.float-cookie-dialog').length) {
                $('.float-cookie-dialog').remove();
              }
            }
            function saveSelected() {
              $('#cookie-setting-modal').porModal('show');
              window.$PrivacyUtil.getCookie('Analytics') === 'active'
                ? $('#cookie-setting-modal .status').eq(0).removeClass('inactive').addClass('active')
                : $('#cookie-setting-modal .status').eq(0).removeClass('active').addClass('inactive');
              window.$PrivacyUtil.getCookie('Advertising') === 'active'
                ? $('#cookie-setting-modal .status').eq(1).removeClass('inactive').addClass('active')
                : $('#cookie-setting-modal .status').eq(1).removeClass('active').addClass('inactive');
              $('.por-modal-footer').on('click', '.por-btn', function (e) {
                var $target = $(e.target);
                switch ($target.index()) {
                  case 0:
                    saveAll();
                    break;
                  case 1:
                    $('#cookie-setting-modal .status').eq(0).is('.active')
                      ? window.$PrivacyUtil.setCookie('Analytics', 'active', 2e4)
                      : window.$PrivacyUtil.setCookie('Analytics', 'inactive', 2e4);
                    $('#cookie-setting-modal .status').eq(1).is('.active')
                      ? window.$PrivacyUtil.setCookie('Advertising', 'active', 2e4)
                      : window.$PrivacyUtil.setCookie('Advertising', 'inactive', 2e4);
                    break;
                }
                $('.float-cookie-dialog').remove();
              });
            }
            if (currentCookieSetting.Analytics == null && currentCookieSetting.Advertising == null) {
              $settingCookieModule.append(floatDialog);
              $('.cookie-btn-group').on('click', '.por-btn', function (e) {
                var $target = $(e.target);
                switch ($target.index()) {
                  case 0:
                    saveAll();
                    break;
                  case 1:
                    saveSelected();
                    break;
                }
              });
            }
            $('.reset-cookies').click(function () {
              saveSelected();
            });
            $('#cookie-setting-modal .por-collapse-trigger').on('click', function (e) {
              $(e.target)
                .closest('.por-tab-content')
                .siblings()
                .find('.por-collapse-trigger')
                .removeClass('expended')
                .end()
                .find('.por-collapse')
                .removeClass('show');
            });
            $('#cookie-setting-modal .status').click(function (e) {
              $(e.currentTarget).is('.inactive')
                ? $(e.currentTarget).removeClass('inactive').addClass('active')
                : $(e.currentTarget).removeClass('active').addClass('inactive');
            });
          } else {
            $('body').addClass('show-privacy-popup');
            $('.privacy-popup').css('display', 'block');
          }
        }
      },
    });
  }
});
$(function () {
  function getUaCookie(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + '=');
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(';', c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return decodeURI(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  }
  function shouldReport() {
    var protocal = window.location.protocol;
    var path = window.location.origin + window.location.pathname;
    path = path.replace(protocal, '');
    var reportSiteList = ['/en-us/', '/th-th/', '/id-id/'];
    var siteReg = new RegExp(reportSiteList.join('|'));
    if (!path.match(siteReg)) {
      return false;
    }
    var isHomePageReg = /\/\/www.huaweicloud.com\/intl\/(en-us|th-th|id-id)\/(($)|index.html)/;
    if (path.match(isHomePageReg)) {
      return true;
    }
    var reportChannelList = [
      '/product/',
      '/betaproduct/',
      '/solution/',
      '/pricing/',
      '/partners/',
      '/service/',
      '/api-bpconsole/',
      '/notice.',
      '/global/',
      '/securecenter/',
      '/cases.html',
      '/about/',
      '/news.html',
      '/contact-sales.html',
      '/declaration/',
      'activity.huaweicloud.com/',
      'support.huaweicloud.com/',
    ];
    var channelReg = new RegExp(reportChannelList.join('|'));
    if (path.match(channelReg)) {
      return true;
    }
    return false;
  }
  function getPageInfo(type) {
    var lang = $('html').attr('lang').toLowerCase();
    var category = '';
    if (window.location.host.match(/activity|support/)) {
      category = window.location.host.match(/activity|support/)[0];
    } else {
      var tmpPathName = window.location.pathname;
      tmpPathName = tmpPathName.replace(/\/intl\//, '').replace(new RegExp(lang + '/'), '');
      category = tmpPathName.indexOf('/') > -1 ? tmpPathName.split('/')[0] : tmpPathName.substring(0, tmpPathName.lastIndexOf('.'));
    }
    if (type === 'category') {
      return category;
    }
    if (type == 'pageName') {
      var pageName = '';
      var path = window.location.pathname + window.location.hash;
      if (path.indexOf('.html') > -1) {
        if (window.location.host.match(/activity|support/)) {
          var tmpPathName = path.replace(new RegExp('/intl/' + lang + '/'), '').replace(new RegExp('.html'), '');
          pageName = tmpPathName.split('/').join('_');
        } else {
          var pathArr = path.split(category);
          pageName = pathArr[pathArr.length - 1].replace(/\.html/, '');
          if (pageName.indexOf('/') > -1) {
            pageName = pageName.replace(/\//, '_');
          }
          if (pageName.startsWith('_')) {
            pageName = pageName.substring(1, pageName.length);
          }
        }
      }
      return pageName;
    }
    if (type === 'lang') {
      return lang;
    }
    if (type === 'userId') {
      return getUaCookie('ua') || getUaCookie('vk');
    }
    return '';
  }
  function getReportInfo(eventType) {
    var category = getPageInfo('category');
    var pageName = getPageInfo('pageName');
    if (eventType === 'register') {
      return {
        event: eventType,
        page_category1: '$page_category1',
        page_category2: category,
        page_name: pageName || category,
      };
    }
    if (eventType === 'page_view') {
      var lang = getPageInfo('lang');
      var userId = getPageInfo('userId');
      return {
        event: eventType,
        login_status: window.isLogin ? 'login' : 'logout',
        site_country_code: lang,
        page_category2: category,
        page_name: pageName || category,
        userId: userId,
      };
    }
    if (eventType === 'purchase_intent') {
      return { event: eventType, product_name: pageName || category, page_category2: category };
    }
    return { event: eventType, page_category2: category, page_name: pageName || category };
  }
  function reportTier(eventType) {
    if (window.recordTier) {
      var reportInfo = getReportInfo(eventType);
      window.recordTier.push(reportInfo);
    }
  }
  var needReport = shouldReport();
  if (needReport) {
    var path = window.location.pathname + window.location.hash;
    $(window).load(function () {
      reportTier('page_view');
    });
    $(document).on('click', '.header-tools-right', function (e) {
      var target = e.target;
      if (target.className.indexOf('js-login') > -1) {
        reportTier('account_login_start');
      }
      if (target.className.indexOf('js-register') > -1) {
        reportTier('account_register_start');
      }
    });
    $(document).on('click', 'a[href*="console-intl"]', function (e) {
      var category = getPageInfo('category');
      if (!['product'].includes(category)) {
        return;
      }
      reportTier('purchase_intent');
    });
    $(document).on('click', '.form-submit,#submitBtn', function (e) {
      if (path.indexOf('contact-sales') > -1) {
        reportTier('contact_form_submission_intent');
      } else {
        reportTier('support_form_submission_intent');
      }
    });
    var reportUrlList = ['/rest/cbc/cbccrmtelesalesservice/v1/openapi/lead/new', '/rest/cbc/cbccrmtelesalesservice/v1/lead/external_lead'];
    $(document)
      .ajaxSuccess(function (event, xhr, settings) {
        var isReport = reportUrlList.some(function (url) {
          return settings.url && settings.url.indexOf(url) > -1;
        });
        if (isReport) {
          if (path.indexOf('contact-sales') > -1) {
            reportTier('contact_form_submission_success');
          } else {
            reportTier('support_form_submission_success');
          }
        }
      })
      .ajaxError(function (event, jqxhr, settings, thrownError) {
        var isReport = reportUrlList.some(function (url) {
          return settings.url && settings.url.indexOf(url) > -1;
        });
        if (isReport) {
          if (path.indexOf('contact-sales') > -1) {
            reportTier('contact_form_submission_error');
          } else {
            reportTier('support_form_submission_error');
          }
        }
      });
  }
});
$(function () {
  if ($('html').attr('site') === 'eu') {
    function submit(data) {
      $.ajax({
        url: 'https://portal.eu.huaweicloud.com/feedback/ajaxsumbit',
        type: 'post',
        data: {
          ih: data.ih,
          ty: 'COOKIE_ACCEPT',
          ti: $.base64.encode('COOKIE_' + new Date().getTime(), true),
          url: 'https://' + location.host + location.pathname,
        },
        xhrFields: {
          withCredentials: true,
        },
      });
    }
    $('body').on('click', '.cookie-btn-group .decline,.por-modal-footer .reset', () => {
      submit({ ih: 11 });
    });
    $('body').on('click', '.cookie-btn-group .accept-all', () => {
      submit({ ih: 10 });
    });
    $('body').on('click', '.por-modal-footer .save', () => {
      if ($("[data-type='analysis']").find('.status').hasClass('active')) {
        submit({ ih: 10 });
      } else {
        submit({ ih: 11 });
      }
    });
  }
});
