// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
	//# Initialising Sentry SDK to get logs online
	// Sentry.init({
	//   dsn: "https://3730ebe360c5440ca4c97640ab7cdd66@o1017046.ingest.sentry.io/5982605",
	//   // Alternatively, use `process.env.npm_package_version` for a dynamic release version
	//   // if your build tool supports it.
	//   // release: "my-project-name@2.3.12",
	//   integrations: [new Integrations.BrowserTracing()],
	//   // Set tracesSampleRate to 1.0 to capture 100%
	//   // of transactions for performance monitoring.
	//   // We recommend adjusting this value in production
	//   tracesSampleRate: 0,
	// });
}

function log(error) {
	console.error(error);

	//# Using Sentry's log service
	//   Sentry.captureException("Logging the error", error);
}

export default {
	init,
	log,
};

// from index.js
// Can also use with React Concurrent Mode
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
