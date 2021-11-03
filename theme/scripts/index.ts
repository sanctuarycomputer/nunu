import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import 'what-input'
import "zenscroll"

declare global {
  interface Window {
    Bugout: any;
  }
}

Sentry.init({
  dsn: "https://3ba2a9032f084077bdaad6b264ede016@o462346.ingest.sentry.io/5668673",
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

import "../styles/index.scss";
import "./productImagesSlider";
import "./productDescription";
import "./cart";
import "./activatable";
import "./cookieConsent";
import "./emailSubscribe";
import "./logo";
import "./pageTransition";
import "./fadeIn";
import "./magicMouse";
import "./patronSlider";