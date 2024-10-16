import { useState } from 'react';
import styles from './Create.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import Button from '@/components/ui/buttons/Button/Button';
import { useMutation } from '@apollo/client';
import { CREATE_STORY } from '@/graphql/stories/mutations';
// import DrawingCanvas from './DrawingCanvas/DrawingCanvas';

const Create = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg');

	const [createStory] = useMutation(CREATE_STORY, {
		onCompleted(data) {
			console.log(data);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createStory({
			variables: {
				createStoryInput: {
					title,
					description,
					drawing: {
						imageUrl,
					},
				},
			},
		});

		setTitle('');
		setDescription('');
		setImageUrl('');
	};

	return (
		<form className={styles.Create} onSubmit={handleSubmit}>
			<p>Title</p>
			<Input value={title} error="" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
			<p>Description</p>
			<Input value={description} error="" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
			<p>Image Url</p>
			<Input value={imageUrl} error="" placeholder="Image Url" onChange={(e) => setImageUrl(e.target.value)} />
			<Button type="submit" className={styles.CreateBtn}>
				Create
			</Button>
		</form>
		// <DrawingCanvas />
	);
};

export default Create;
