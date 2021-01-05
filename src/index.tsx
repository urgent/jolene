import * as React from 'react';
import ReactDOM from 'react-dom';

import { BodyWidget } from './components/BodyWidget';
import { Application } from './Application';

export const App = () => {
	var app = new Application();
	return <BodyWidget app={app} />;
};

ReactDOM.render(
	<React.StrictMode>
	  <App />
	</React.StrictMode>,
	document.getElementById('root')
  );