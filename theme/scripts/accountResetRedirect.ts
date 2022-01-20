// URL of members reset password page
const MEMBERS_RESET_PASSWORD_URL = "https://members.index-space.org/reset-password";
// A typical shopify password reset url is like this:
// https://index-space.org/account/reset/[id]/[token]
const SHOPIFY_RESET_PASSWORD_PATHNAME = "/account/reset";
const ID_PATHNAME_POSITION = 3;
const TOKEN_PATHNAME_POSITION = 4;

export default (function () {
  const AccountResetRedirect = {
    init() {
      if (window.location.pathname.includes(SHOPIFY_RESET_PASSWORD_PATHNAME)) {
        const pathList = window.location.pathname.split('/');
        const id = pathList[ID_PATHNAME_POSITION];
        const token = pathList[TOKEN_PATHNAME_POSITION];

        const redirectUrl = `${MEMBERS_RESET_PASSWORD_URL}?id=${id}&token=${token}`;
        window.location.replace(redirectUrl)
      }
    },
  };

  AccountResetRedirect.init();
})();
