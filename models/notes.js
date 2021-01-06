const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
});

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);
