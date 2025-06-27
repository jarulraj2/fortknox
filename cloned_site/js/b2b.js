/*********************************** Check operating system start ***********************************/
$.each($.browser, function (i) {
  $("body").addClass(i);
  return false;
});

// Get OS
const operatingSys = ["iphone", "ipad", "windows", "mac", "linux"];

const matchOS = navigator.appVersion
  .toLowerCase()
  .match(new RegExp(operatingSys.join("|")));
if (matchOS) {
  $("body").addClass(matchOS[0]);
}
/*********************************** Check operating system Start ***********************************/

/*********************************** Check Mobile device Start ***********************************/
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
/*********************************** Check Mobile device Ends ***********************************/
/*********************************** Banner Starts ***********************************/
$(".slick_wrapper").slick({
  autoplay: true,
  autoplaySpeed: 8000,
  arrows: false,
  centerMode: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 1,
        dots: true,
        autoplay: true,
        arrows: false,
      },
    },
  ],
});

/*********************************** Banner Ends ***********************************/
/*********************************** Talk to expert start ***********************************/
// if (isMobileDevice()) {
//   const mobile_sticky_button = document.getElementsByClassName('mobile_sticky_button');
//   document.addEventListener('scroll', inViewport)

//   function inViewport() {
//     const { top, bottom } = el.getBoundingClientRect();
//     mobile_sticky_button.addClass('hide');
//     console.log('true');
//   }
// }
/*********************************** Talk to expert Ends ***********************************/

/*********************************** Short Blog Slider Start ***********************************/
$(".short_blog_slider").slick({
  autoplay: false,
  autoplaySpeed: 5000,
  arrows: false,
  centerMode: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
});
/***********************************  Short Blog Slider Ends ***********************************/

/***********************************  Product Slider Start ***********************************/
$(".b2b-lib-carouselContainer").slick({
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  centerMode: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,

      settings: {
        //    adaptiveHeight: true,
        arrows: false,
      },
    },
  ],
});
/***********************************  Product Slider Ends ***********************************/

/*********************************** Insights Start ***********************************/
$(".insights_content").slick({
  pauseOnHover: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: false,
  arrows: true,
  autoplaySpeed: 8000,
  focusOnSelect: true,
  dots: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
});
/***********************************  Insights Ends ***********************************/

/*********************************** Insights slider Start ***********************************/
$(".insights_content_wslide").slick({
  pauseOnHover: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: false,
  arrows: true,
  autoplaySpeed: 8000,
  focusOnSelect: true,
  dots: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
});
/***********************************  Insights slider Ends ***********************************/
/***********************************  Remove p tag from h1 Starts  ***********************************/
jQuery(document).ready(function ($) {
  $(".banner_content_inside h1").find("p").contents().unwrap();
});

/***********************************  Remove p tag from h1 Ends ***********************************/

/***********************************  Features Starts  ***********************************/
if (isMobileDevice()) {
  jQuery(document).ready(function ($) {
    let sections = $(".feature_section");

    sections.each(function (index) {
      $(this).addClass("feature_section_" + index);
    });

    let showMore = false;
    let feature_list_0 = $(".feature_section_0 .feature_content");
    let feature_buttonTxt_0 = $(".feature_section_0 #toggleFeatureButton span");
    let feature_buttonClass_0 = $(".feature_section_0 #toggleFeatureButton");
    let feature_list_1 = $(".feature_section_1 .feature_content");
    let feature_buttonTxt_1 = $(".feature_section_1 #toggleFeatureButton span");
    let feature_buttonClass_1 = $(".feature_section_1 #toggleFeatureButton");

    // initail load
    feature_list_0
      .children(".feature_section_0 .feature_content li:gt(3)")
      .hide();
    feature_list_1
      .children(".feature_section_1 .feature_content li:gt(3)")
      .hide();

    // View More button
    feature_buttonClass_0.click(function () {
      showMore = !showMore;
      if (showMore) {
        feature_list_0
          .children(".feature_section_0 .feature_content li")
          .show();
        feature_buttonTxt_0.text("View Less");
        feature_buttonClass_0.addClass("activearrow");
      } else {
        feature_list_0
          .children(".feature_section_0 .feature_content li:gt(3)")
          .hide();
        feature_buttonTxt_0.text("View More");
        feature_buttonClass_0.removeClass("activearrow");
      }
    });
    // View More button
    feature_buttonClass_1.click(function () {
      showMore = !showMore;
      if (showMore) {
        feature_list_1
          .children(".feature_section_1 .feature_content li")
          .show();
        feature_buttonTxt_1.text("View Less");
        feature_buttonClass_1.addClass("activearrow");
      } else {
        feature_list_1
          .children(".feature_section_1 .feature_content li:gt(3)")
          .hide();
        feature_buttonTxt_1.text("View More");
        feature_buttonClass_1.removeClass("activearrow");
      }
    });
  });
}
/***********************************  Features Ends ***********************************/
/***********************************  Insights Starts  ***********************************/
if (isMobileDevice()) {
  jQuery(document).ready(function ($) {
    let showMore = false;
    let insight_list = $(".insights_cardlist");
    let insight_button = $("#insightsViewMoreBtn span");
    let insight_buttonClass = $("#insightsViewMoreBtn");

    // initail load
    insight_list.children(".insights_card:gt(1)").hide();

    // View More button
    insight_button.click(function () {
      showMore = !showMore;
      if (showMore) {
        insight_list.children(".insights_card").show();
        insight_button.text("View Less");
        insight_buttonClass.addClass("activearrow");
      } else {
        insight_list.children(".insights_card:gt(1)").hide();
        insight_button.text("View More");
        insight_buttonClass.removeClass("activearrow");
      }
    });
  });
}
/***********************************  Insights Ends ***********************************/
/*********************************** Logo Slider Start ***********************************/
/*$(".logoslider").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 6000,
  pauseOnHover: true,
  cssEase: "linear",
  dots: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
});
*/
/*$(".logoslider").on("mouseenter", function () {
  var $track = $(this).find(".slick-track");

  // Get current computed transform matrix
  var style = window.getComputedStyle($track[0]);
  var matrix = style.transform || style.webkitTransform || style.mozTransform;

  // Apply the current transform as inline style to freeze it
  $track.css({
    transition: "none",
    transform: matrix,
  });

  // Pause slick autoplay so it won't try to continue internally
  $(this).slick("slickPause");
});

$(".logoslider").on("mouseleave", function () {
  var $track = $(this).find(".slick-track");

  // Remove inline transition so it returns to normal slick behavior
  $track.css({
    transition: "", // Remove the inline style
    // transform will be handled by slick again
  });

  // Resume autoplay
  $(this).slick("slickPlay");
});*/



/***********************************  Logo Slider Ends ***********************************/

/*********************************** overview_slider_block_wb Start ***********************************/
$(".overview_slider_block_wb").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 0,
  speed: 4000,
  pauseOnHover: true,
  cssEase: "linear",
  dots: false,
  arrows: false,
  infinite: false,
});
/***********************************  overview_slider_block_wb Ends ***********************************/
/*********************************** Testimonials Start ***********************************/
$(".customer_stories_slider").slick({
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: true,
  autoplaySpeed: 8000,
  focusOnSelect: true,
  dots: false,
  arrowsClass: $(".news__arrows"),
  infinite: false,
  responsive: [
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
});
/***********************************  Testimonials Ends ***********************************/
/*********************************** Solutions Start ***********************************/

$(".overview_slider").slick({
  speed: 5000,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  pauseOnHover: false,
  pauseOnFocus: false,
  dots: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 1279,
      settings: {
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },

    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        cssEase: "linear",
      },
    },
  ],
});
$(document).ready(function () {
  $(".solution_section .solution-link").click(function () {
    var tabID = $(this).attr("data-tab");
    $(this).addClass("active").siblings().removeClass("active");
    $("#solutions-" + tabID)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $("html,body").animate(
      {scrollTop: $(".solution_section").offset().top},
      "slow"
    );
  });
  $(".solution_section .solutions li:first").addClass("active");
  $(".solution_section .solution-content:first").addClass("active");
});
/***********************************  Solutions Ends ***********************************/

/***********************************  Overview Usecases Starts ***********************************/
$(document).ready(function () {
  $(".tab-link").click(function () {
    var tabID = $(this).attr("data-tab");
    $(this).addClass("active").siblings().removeClass("active");
    $("#tab-" + tabID)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  $(".tabs li:first").addClass("active");
  $(".content-wrapper .tab-content:first").addClass("active");
});
/***********************************  Overview Usecases Ends ***********************************/

/***********************************  Overview Old New Way Starts ***********************************/
$(document).ready(function () {
  $(".tab-link-old-new-way").click(function () {
    var tabID = $(this).attr("data-tab");
    $(this).addClass("active").siblings().removeClass("active");
    $("#tab-" + tabID)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  $(".tabs-old-new-way li:first").addClass("active");
  $(".tab-content-old-new-way:first").addClass("active");
});
/***********************************  Overview Old New Way Ends ***********************************/

/*******************************  header ****************************** */

const headerScreenBreakPoint = 1279;
var headerWindowSize = $(window).width() <= headerScreenBreakPoint;
const getHeaderData = JSON.parse(localStorage.getItem("HEADER_DATA"));

async function logHeaderData() {
  const response = await fetch(
    "https://assets.airtel.in/static-assets/cms/b2b/b2b-widgets/json/b2b-header-data-minified.json"
  );
  const responseData = await response.json();
  iniHeader(responseData);
}

logHeaderData();
function iniHeader(data) {
  headerCat(data);
  headerCatLinks(data);
  topHeaderLinks(data);
  navRightData(data);
  backHeaderData(data);
}

function backHeaderData() {
  let getBackData = JSON.parse(localStorage.getItem("HEADER_DATA"));
  let backTitleData = getBackData?.nav_header?.map(function (backData) {
    return `
        ${backData.title}             
      `;
  });
  $(".back_title1").append(backTitleData);
}

function subMenuItems(subdata) {
  return `
    <div class="sidebar_nav_wrapper">
      ${
        headerWindowSize
          ? `<div class="back_title"><i class="aeh-icon-chevron-left"></i> <span></span></div>`
          : ""
      }
      <div class="sidebar_nav_wrapper_scroller">
        <ul class="sub_nav_items">
          ${megaMenu(subdata?.listItems)}
        </ul>
      </div>
    </div>
  `;
}

function topHeaderLinks(getHeaderData) {
  const setTopData = getHeaderData.top_header.map((topLinkData) => {
    return `
      <li class="${
        topLinkData.isCurrent === true ? "active" : ""
      }"><a onclick="topNav()" href="${topLinkData.linkUrl}">${
      topLinkData.linkText
    }</a></li>
            `;
  });
  $(".top_nav_item").append(setTopData);
}

function navRightData(getHeaderData) {
  getHeaderData?.nav_right?.map((getNavRightData) => {
    let rightDataItems = getNavRightData?.otherNavigation?.map(
      (setRightNavData) => {
        return `
              <li>
                <a class="menu_text" onclick="userList()" target="${
                  !setRightNavData.tabTarget === true ? "_self" : "_blank"
                }" href=${setRightNavData.linkUrl} >
                  <span class="nav_text">${setRightNavData.linkText}</span>
                  ${
                    setRightNavData.tabTarget === true
                      ? `<i class="aeh-icon-direct-link"></i>`
                      : ""
                  }
                </a>
              </li>
              `;
      }
    );
    $(".account_list").append(rightDataItems);
  });

  $(".other_user").click(function (e) {
    $(this)
      .parent()
      .parent()
      .toggleClass("open_dropdown")
      .siblings()
      .removeClass("open_dropdown");
    $(".navlist li.subnav").removeClass("open_mega_nav");
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).click(function (event) {
    !$(event.target).closest(".other_user").length
      ? $("body").find(".navbar_right").removeClass("open_dropdown")
      : "";
  });
}

function headerCat(getHeaderData) {
  let navitationList = getHeaderData?.nav_header?.map(function (obj, index) {
    return `
      <li tabindex="-1" class="${
        headerWindowSize ? `${index == 0 ? "open_mega_nav" : ""}` : ""
      } ${obj.hasSubMenu === true ? "subnav" : ""} ${obj.megaMenu === true ? "mega_menu" : ""}" role="menuitem" aria-haspopup="${obj.hasSubMenu}">
        
        ${
          obj.hasSubMenu === true
            ? `<button class="menu_text" onclick="segmentsClickStream()" aria-expanded="false" >
            <span class="nav_text">${obj.title}</span> 
            ${
              obj.hasSubMenu === true
                ? '<span class="animated_arrow" aria-hidden="true"></span>'
                : ""
            } 
          </button>`
            : `<a class="menu_text" onclick="partners()" href='${obj.link}' role="menuitem" >
            <span class="nav_text">${obj.title}</span>
          </a>`
        }
        ${
          obj.hasSubMenu === true
            ? `<div class="mega_navigation" role="menu">
          <div class="megamenu">
            <div class="inset_menu_wrapper">
              <ul class="navigation_list">${headerCatLinks(obj)}</ul>
            </div>
          </div>
        </div> `
            : ""
        }
   
      </li>
    `;
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.menu_text[aria-haspopup="true"]').forEach(button => {
      button.addEventListener('click', () => {
        const submenuId = button.getAttribute('aria-controls');
        const submenu = document.getElementById(submenuId);
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        submenu.hidden = isExpanded;
      });
    });
  });

  // Update aria-expanded on button click
  $(".menu_text[aria-expanded]").click(function () {
    const isExpanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !isExpanded);
  });

  $(".navlist").append(navitationList);
  $(".drop_shadow").click(function () {
    $("body").removeClass("hidden_scroll");
  });

  $(".b2b_header").click(function () {
    $("body").removeClass("hidden_scroll");
  });
  $(".subnav > .menu_text").click(function () {
    $(".megamenu li").removeClass("focus");
    $(this).parent().find(".navigation_list li:first").addClass("focus");
  });

  $(document).on("click", function (a) {
    if ($(a.target).is(".mega_navigation") === false) {
      $(".megamenu li").removeClass("focus");
      a.stopPropagation();
    }
  });

  if (getHeaderData.nav_header[0].megaMenu === true) {
    // on clicke open megamenu

    let parentNavTarget = ".navlist li.subnav > .menu_text";
    $(parentNavTarget).click(function (e) {
      $(this)
        .parent()
        .toggleClass("open_mega_nav")
        .siblings()
        .removeClass("open_mega_nav");

      $(".navbar_right").removeClass("open_dropdown");
      e.stopPropagation();

      if ($(".open_mega_nav").is(":visible")) {
        $("body").addClass("hidden_scroll");
      } else {
        $("body").removeClass("hidden_scroll");
      }
    });

    $($(window).width() < 1279)
      ? `${$(document).click(function (event) {
          !$(event.target).closest(".navlist li.subnav").length
            ? $("body").find(".navlist li.subnav").removeClass("open_mega_nav")
            : "";
        })}`
      : "";

    $(".navlist > li.subnav .menu_text").click(function (e) {
      $(this).parent().toggleClass("focus").siblings().removeClass("focus");
      e.stopPropagation();
      e.preventDefault();
    });
    $(".navigation_list > li .menu_text").click(function (e) {
      e.currentTarget.nextElementSibling.children[0].children[1].innerHTML =
        e.currentTarget?.attributes?.parentdata?.value;
      $(this).parent().toggleClass("active").siblings().removeClass("active");
      e.stopPropagation();
      e.preventDefault();
    });

    $(".megamenu").on("click", function (event) {
      event.stopPropagation();
    });

    $(".back_title").click(function (e) {
      $(".navigation_list > li .menu_text")
        .parent()
        .toggleClass("active")
        .siblings()
        .removeClass("active");
      e.stopPropagation();
      e.preventDefault();
    });
  }
}

function headerCatLinks(dataValue) {
  const subMenuData = dataValue?.item
    ?.map(function (hdata) {
      const getSubmenuData = hdata.isActive === true ? "focus" : "";
      return `
      <li class="${getSubmenuData}" role="menuitem">
        ${
          hdata.linkUrl
            ? `<a class="sub_submenu" href="${hdata.linkUrl}" role="menuitem">
              <span class="nav_text">${hdata.heading}</span>
              ${
                hdata.subMenuItems ? `<span class="animated_arrow" aria-hidden="true"></span>` : ""
              }
            </a>`
            : `<button class="menu_text"  onclick="productClickStream()" parentData="${
                dataValue.title
              }" aria-expanded="false">
              <span class="nav_text">
                ${hdata.heading} ${
                hdata.badgeText
                  ? `<span class="new_badge">${hdata.badgeText}</span>`
                  : ""
              }
              </span>
              
              ${
                $(window).width() < headerScreenBreakPoint
                  ? `${
                      hdata.subMenuItems
                        ? `<span class="animated_arrow" aria-hidden="true"></span>`
                        : ""
                    }`
                  : ""
              }
              
          </button>`
        }
        ${hdata.subMenuItems ? subMenuItems(hdata.subMenuItems) : " "}
      </li>`;
    })
    .join("");
  return subMenuData || [];
}

function megaMenu(megaData) {
  const htmlTextmega = megaData?.subMenuText

    ?.map(function (mdata) {
      return `
        ${
          mdata.linkText
            ? `
          <li>
            <div class="menu_details">
              <a href="${mdata.linkUrl}" onclick="megaheaderList()">${
                mdata.linkText
              }</a>
              ${
                $(window).width() > headerScreenBreakPoint
                  ? `${mdata.linkInfo ? `<p>${mdata.linkInfo}</p>` : ""}`
                  : ""
              }
            </div>
          </li>
          `
            : ""
        }
      `;
    })
    .join("");

  return htmlTextmega || "";
}

$(document).ready(function () {
  if (headerWindowSize) {
    $(".inside_header > .hamburger").click(function (e) {
      $(".b2b_header").toggleClass("expended_navigation");
      $(".navbar_right").removeClass("open_dropdown");
      e.stopPropagation();
    });
    $(".other_user").click(function () {
      $(".b2b_header").removeClass("open_dropdown");
    });
    $(".navbar_right").click(function () {
      $(".b2b_header").removeClass("expended_navigation");
    });
    $(".other_user").click(function () {
      $(".b2b_header").removeClass("expended_navigation");
    });
  }
});
// for sticky
$(window).scroll(function () {
  let winTop = $(window).scrollTop();
  let getHeader = document.querySelector(".b2b_header");
  let getHeaderHeight = getHeader.clientHeight / 2;
  let getBanner = document.getElementById("banner_section");
  let getBannerHeight = getBanner.clientHeight;
  let totalTopScrollHeight = getBannerHeight + getHeaderHeight;
  winTop >= 1
    ? $("header").addClass("sticky")
    : $("header").removeClass("sticky");
  winTop >= totalTopScrollHeight
    ? $(".mobile_sticky_button").addClass("sticky")
    : $(".mobile_sticky_button").removeClass("sticky");
});
/*******************************  end header ****************************** */

/*******************************  footer ****************************** */

const getFooterData = JSON.parse(localStorage.getItem("FOOTER_DATA"));

async function logFooterData() {
  const response = await fetch(
    "https://assets.airtel.in/static-assets/cms/b2b/b2b-widgets/json/b2b-footer-data-minified.json"
  );
  const responseData = await response.json();
  iniFooter(responseData);
}

logFooterData();

function iniFooter(data) {
  footerBottomlinks(data);
  footerHeading(data);
  footerHeadingSegment(data);
  footerSociallinks(data);
  footerLoginSupport(data);
}

function footerHeading(getFooterData) {
  let footerHeadingData = getFooterData?.topFooter?.map(function (obj) {
    return `
      <div key="index" class="footer_col">
        ${
          obj?.title === undefined
            ? ""
            : `<div class="list_head">${obj?.title}${
                obj?.titleCategory ? `/` : ""
              }${
                obj?.titleCategory
                  ? `<span class="category_text">${obj?.titleCategory}</span>`
                  : ""
              }</div>`
        }
        ${
          obj?.title === undefined
            ? ""
            : `<ul class="list_items">${footerLinks(obj)} </ul>`
        }
      </div>
      `;
  });

  $(".footer_row").append(footerHeadingData);
}

function footerHeadingSegment(getFooterData) {
  // Dynamically check if 'dualItems' exists
  getFooterData.topFooter.forEach(function (obj1, index) {
    if (obj1?.dualItems) {
      let doualItems = obj1.dualItems?.map(function (item) {
        return `
          <div class="item_col">
            <div class="list_head">${item.title}</div>
            <ul class="list_items">
              ${footerLinksSegment(item)}
            </ul>
          </div>
        `;
      });

      // Append only when dualItems exists
      document.querySelectorAll('.footer_col')[index].innerHTML += doualItems.join('');
      document.querySelectorAll('.footer_col')[index].classList.add(`dual_items_${index}`);
    }
  });
}

function footerLinks(dataValue) {
  const footerLinksData = dataValue?.item
    ?.map(function (fdata) {
      return `<li><a onclick="footerNavClick()" href=${fdata.url}>${fdata.linkText}</a></li>`;
    })
    .join("");
  return footerLinksData;
}

function footerLinksSegment(dataValue1) {
  const footerSegmentData = dataValue1?.item
    ?.map(function (fdata) {
      return `<li><a onclick="footerNavClick()" href=${fdata.url}>${fdata.linkText}</a></li>`;
    })
    .join("");
  return footerSegmentData;
}

// social links
function footerSociallinks(getFooterData) {
  let socialData = getFooterData?.socialItems?.map(function (obj2) {
    return `
     <li>
       <a onclick="footerSocial()" href="${obj2.url}" target="_blank">
         <img width="28" height="28" src=${obj2.iconUrl} alt=${obj2.altText} />
       </a>
     </li>
   `;
  });

  $(".social_icon ul").append(socialData);
}

function footerBottomlinks(getFooterData) {
  let footerBottomData = getFooterData?.bottomFooter?.map(function (obj3) {
    return `
      <li><a onclick="footerNavBottomClick()" href="${obj3.url}" target="_blank">${obj3.linkText}</a></li>
    `;
  });

  $(".footer_links ul").append(footerBottomData);
}

function footerLoginSupport(getFooterData) {
  let footerLoginData = getFooterData?.footerLoginSupport?.map(function (
    itmeTitle
  ) {
    return `
      <div class="support_col">
        <div class="list_head">${itmeTitle.title}</div>
        <ul class="list_items">
          ${itmeTitle?.item
            ?.map((itemList) => {
              const {
                url,
                tabTarget,
                linkText,
                actionText,
                iconUrl,
                typeText,
                actionType,
              } = itemList;
              return `
              <li class="${actionText ? "contact_items" : ""}">
                ${
                  url
                    ? `<a onclick="footerNavClick()" href="${url}" target="${
                        tabTarget === "_blank" ? "_blank" : "_self"
                      }">${linkText}</a>`
                    : actionText
                    ? `<div class="reach_us">
                          <img width="20" height="20" src=${iconUrl} alt=${actionType}  />
                          <span>${typeText}</span> :
                          <a href="${actionType}" onclick="footerReachUs()" target=${
                        typeText === "Whatsapp" ? "_" : ""
                      }>${actionText}</a>
                    </div>`
                    : ""
                }
              </li>
            `;
            })
            .join("")}
        </ul>
      </div>
    `;
  });

  $(".support_row").append(footerLoginData);
}


/*******************************  end footer ****************************** */

/*******************************  sticky ****************************** */
if ($(window).width() <= 768) {
  const talkHeight = $(".b2b_contact_section_TEST").outerHeight();

  $(window).scroll(function () {
    if ($(this).scrollTop() >= $(".tab-wrapper").offset().top - 56) {
      $(".tab-wrapper").css(
        "box-shadow",
        "6px 10px 50px 0px rgba(1, 49, 101, 0.10)"
      );
    } else {
      $(".tab-wrapper").css("box-shadow", "none");
    }
  });
}

/*********scroll nudge************/

document.addEventListener("DOMContentLoaded", function () {
  let getScrollSuggestion = document.getElementById("scrollSuggestion");

  if (getScrollSuggestion) {
    let suggestionTimer;
    let isBottomVisible = false;
    let inTime = 15000;
    let outTime = 12000;

    setTimeout(() => {
      showScrollSuggestion();
    }, inTime);

    function showScrollSuggestion() {
      getScrollSuggestion.classList.add("active");
      setTimeout(hideScrollSuggestion, outTime);
    }

    function hideScrollSuggestion() {
      getScrollSuggestion.classList.remove("active");
    }

    function isBottomVisibleInViewport() {
      let contentHeight =
        document.getElementById("content_scroller").offsetHeight;
      let windowHeight = window.innerHeight;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      return contentHeight <= windowHeight + scrollTop;
    }

    function handleScroll() {
      clearTimeout(suggestionTimer);
      hideScrollSuggestion();

      suggestionTimer = setTimeout(function () {
        if (!isBottomVisible && !isBottomVisibleInViewport()) {
          showScrollSuggestion();
        }
      }, inTime);
    }

    let initialScrollPosition = 0;
    window.addEventListener("scroll", function () {
      if (document.body.getBoundingClientRect().top < initialScrollPosition) {
        handleScroll();
      } else {
        clearTimeout(suggestionTimer);

        hideScrollSuggestion();
        suggestionTimer = setTimeout(function () {
          if (isBottomVisible && isBottomVisibleInViewport()) {
            hideScrollSuggestion();
          }
        }, 0);
      }

      initialScrollPosition = document.body.getBoundingClientRect().top;
    });

    isBottomVisible = isBottomVisibleInViewport();
  }
});

/*********end scroll nudge************/

/********* detect campaign ************/

!function(){
	
	const campaignHeaderDetector = document.querySelector('.b2b_header_campaign');
	
	const contactFormSection = document.getElementById('ill-lead-form')
	
	const withoutCampaignFooter = document.querySelector('.top_footer');
	
	if (campaignHeaderDetector) {


		setTimeout(() => {
			
			const getContactSectionButton = document.querySelector('.b2b_contact_section .contact_left button');

			getContactSectionButton ? getContactSectionButton.className = getContactSectionButton.className.replace('btn Click-here', 'scroll_to_button') : '';

			const getMobileContactButton = document.querySelector('.mobile_expert_button #lead-form-wp');
			getMobileContactButton ? getMobileContactButton.className = getMobileContactButton.className.replace('Click-here', 'scroll_to_button') : '';

			const getCustomModalForm = document.querySelectorAll('.custom-model-main');
			getCustomModalForm && getCustomModalForm.forEach(customModal =>{
				customModal.remove();
			})
			
			const scrollToButtons = document.querySelectorAll('.scroll_to_button')
			scrollToButtons.forEach(scorllButton => {
				scorllButton.onclick = () => contactFormSection.scrollIntoView({ behavior: 'smooth' })
			});
		});

		withoutCampaignFooter && withoutCampaignFooter.remove();
	}
}();

/********* end detect campaigne ************/

const getMultipleH1Tags = document.getElementsByTagName('h1');

Array.from(getMultipleH1Tags).forEach((h1Tag, index) => {

  if (index > 0) {
    const h2Tag = document.createElement('h2');

    Array.from(h1Tag.attributes).forEach((attr) => {
      h2Tag.setAttribute(attr.name, attr.value);
    });

    h2Tag.innerHTML = h1Tag.innerHTML;
	  // h2Tag.className = h1Tag.className;
    h1Tag.parentNode.replaceChild(h2Tag, h1Tag);
  }
})

///////

// Restrict tabbing to modal when it's open

document.addEventListener('keydown', function(event) {
  const openModal = document.querySelector('.custom-model-main.model-open');
  
  if (openModal) {
    const focusableElements = 'button, input, textarea, select, a, [tabindex]:not([tabindex="-1"])';
    const focusableContent = Array.from(openModal.querySelectorAll(focusableElements))
      .filter(el => !el.disabled && el.tabIndex !== -1);
    
    if (focusableContent.length === 0) return;

    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (event.key === 'Tab') {
      const isFocusInsideModal = openModal.contains(document.activeElement);
      
      if (!isFocusInsideModal) {
        event.preventDefault();
        firstFocusableElement.focus();
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }
});

//  Focus first element when modal opens (using MutationObserver)
document.querySelectorAll('.custom-model-main').forEach(modal => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && modal.classList.contains('model-open')) {
        const focusableElements = 'button, input, textarea, select, a, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = modal.querySelector(focusableElements);
        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }
    });
  });
  
  observer.observe(modal, { attributes: true });
});
