/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_GRAPHQL_HTTP: string;
	VITE_GRAPHQL_WS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
