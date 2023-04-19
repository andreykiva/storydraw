import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const searchAPI = createApi({
	reducerPath: 'searchAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
	tagTypes: ['Search'],
	endpoints: (build) => ({
		fetchSearchResult: build.query({
			query: (searchString) => ({
				url: `/search`,
				params: {
					q: searchString,
				},
			}),
			providesTags: (result) => ['Search'],
		}),
		// createPost: build.mutation<IPost, IPost>({
		//     query: (post) => ({
		//         url: `/posts`,
		//         method: 'POST',
		//         body: post
		//     }),
		//     invalidatesTags: ['Post']
		// }),
		// updatePost: build.mutation<IPost, IPost>({
		//     query: (post) => ({
		//         url: `/posts/${post.id}`,
		//         method: 'PUT',
		//         body: post
		//     }),
		//     invalidatesTags: ['Post']
		// }),
		// deletePost: build.mutation<IPost, IPost>({
		//     query: (post) => ({
		//         url: `/posts/${post.id}`,
		//         method: 'DELETE',
		//     }),
		//     invalidatesTags: ['Post']
		// }),
	}),
});
