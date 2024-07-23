import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { setupStore } from '@/app/store';
import '@/assets/reset.css';
import '@/index.scss';
import App from '@/App';
import client from './apolloClient';

const store = setupStore();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<App />
			</Provider>
		</ApolloProvider>
	</React.StrictMode>,
);
