// URL of members reset password page
const MEMBERS_URL = "https://members.index-space.org";
// A typical shopify password reset url is like this:
// https://index-space.org/account/reset/[id]/[token]
const SHOPIFY_RESET_PASSWORD_PATHNAME = "/account/reset";
// A typical shopify account activate url is like this:
// https://index-space.org/account/activate/[id]/[token]
const SHOPIFY_ACCOUNT_ACTIVATE_PATHNAME = "/account/activate";

export default (function () {
  const AccountRedirect = {
    init() {
      if (window.location.pathname.includes(SHOPIFY_RESET_PASSWORD_PATHNAME)) {
        const redirectUrl = `${MEMBERS_URL}${window.location.pathname}`;
        window.location.replace(redirectUrl)
      }

      else if (window.location.pathname.includes(SHOPIFY_ACCOUNT_ACTIVATE_PATHNAME)) {
        const redirectUrl = `${MEMBERS_URL}${window.location.pathname}`;
        window.location.replace(redirectUrl)
      }
    },
  };

  AccountRedirect.init();
})();
