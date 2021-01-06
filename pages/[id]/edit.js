import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditNote = ({ note }) => {
	const [form, setForm] = useState({
		title: note.title,
		description: note.description,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const updateNote = async () => {
		try {
			const updateNote = await fetch(
				`http://localhost:3000/api/notes/${router.query.id}`,
				{
					method: "PUT",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(form),
				}
			);
		} catch (error) {
			console.log("Errooorrr");
		} finally {
			router.push("/");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("hello");
		updateNote();
		setIsSubmitting(true);
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<h1>update new note!</h1>
			<form onSubmit={handleSubmit}>
				<input
					name="title"
					placeholder="Title"
					type="text"
					value={form.title}
					onChange={handleChange}
				/>
				<input
					name="description"
					placeholder="Description"
					type="text"
					value={form.description}
					onChange={handleChange}
				/>
				<button type="submit">update</button>
			</form>
		</>
	);
};

EditNote.getInitialProps = async ({ query: { id } }) => {
	const response = await fetch(`http://localhost:3000/api/notes/${id}`);
	const { data } = await response.json();

	return { note: data };
};

export default EditNote;
