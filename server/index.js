const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/search", (req, res) => {
	console.log(req);
	res.json({
		data: [
			{
				id: 1,
				name: "First",
			},
			{
				id: 2,
				name: "Second",
			},
			{
				id: 3,
				name: "Third",
			},
		],
	});
});

app.listen(5000, () => {
	console.log("Сервер запущен на порту 5000");
});
