import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/notes";

dbConnect();

export default async (req, res) => {
	const {
		query: { id },
		method,
	} = req;

	if (method === "GET") {
		try {
			const note = await Note.findById(id);
			if (!note) {
				return res.status(400).json({ success: false });
			}
			res.status(200).json({ success: true, data: note });
		} catch (error) {
			res.status(400).json({ success: false });
		}
	}

	if (method === "PUT") {
		try {
			const note = await Note.findByIdAndUpdate(id, req.body, {
				new: true,
				runValidators: true,
			});

			if (!note) {
				return res.status(400).json({ success: false });
			}
			res.status(200).json({ success: true, data: note });
		} catch (error) {
			res.status(400).json({ success: false });
		}
	}

	if (method === "DELETE") {
		try {
			const deletedNote = await Note.deleteOne({ _id: id });

			if (!deletedNote) {
				return res.status(400).json({ success: false });
			}
			res.status(200).json({ success: true, data: {} });
		} catch (error) {
			res.status(400).json({ success: false });
		}
	}
};
