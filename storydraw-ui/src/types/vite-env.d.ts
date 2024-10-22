/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
	VITE_GRAPHQL_HTTP: string;
	VITE_GRAPHQL_WS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
