import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const NewNote = () => {
	const [form, setForm] = useState({ title: "", description: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const {
		query: { species },
	} = router;

	const createNote = async () => {
		try {
			const postNote = await fetch("http://localhost:3000/api/notes", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
		} catch (error) {
			console.log("Errooorrr");
		} finally {
			router.push("/");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("hello");
		createNote();
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
			<h1>Create a new note, {species}</h1>
			<form onSubmit={handleSubmit}>
				<input
					name="title"
					placeholder="Title"
					type="text"
					onChange={handleChange}
				/>
				<input
					name="description"
					placeholder="Description"
					type="text"
					onChange={handleChange}
				/>
				<button type="submit">create</button>
			</form>
		</>
	);
};

export default NewNote;
