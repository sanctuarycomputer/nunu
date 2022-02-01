// URL of members reset password page
const MEMBERS_RESET_PASSWORD_URL = "https://members.index-space.org";
// A typical shopify password reset url is like this:
// https://index-space.org/account/reset/[id]/[token]
const SHOPIFY_RESET_PASSWORD_PATHNAME = "/account/reset";

export default (function () {
  const AccountResetRedirect = {
    init() {
      if (window.location.pathname.includes(SHOPIFY_RESET_PASSWORD_PATHNAME)) {
        const redirectUrl = `${MEMBERS_RESET_PASSWORD_URL}${window.location.pathname}`;
        window.location.replace(redirectUrl)
      }
    },
  };

  AccountResetRedirect.init();
})();
