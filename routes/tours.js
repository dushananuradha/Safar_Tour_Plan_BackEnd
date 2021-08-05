const router = require("express").Router();
let Student = require("../models/Student.js");

//To insert data to DB - POST Method
router.route("/add").post((req, res) => {
	const name = req.body.name;
	const age = Number(req.body.age);
	const gender = req.body.gender;

	//To create a object of Student to initialise above properties
	const newStudent = new Student({
		name,
		age,
		gender,
	});

	//To pass newStudent to MonogoDB as a document via Student model
	newStudent
		.save()
		.then(() => {
			res.json("Student successfully added");
		})
		.catch((err) => {
			console.log(err);
		});
});

//To get data from DB - GET Method
router.route("/").get((req, res) => {
	Student.find().then((students) => {
		res.json(students).catch((err) => {
			console.log(err);
		});
	});
});

//To update a record - PUT Method (can be use POST as well)
router.route("/update/:id").put(async (req, res) => {
	let userId = req.params.id; //params --> Parameters of URL
	const { name, age, gender } = req.body; //Destructuring method

	//The object with data, needed to be updated
	const updateStudent = {
		name,
		age,
		gender,
	};
	const update = await Student.findByIdAndUpdate(userId, updateStudent)
		.then(() => {
			res.status(200).send({ status: "User updated" });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: "Error with updating data", error: err.message });
		});
});

//To delete a record - DELETE Method
router.route("/delete/:id").delete(async (req, res) => {
	let userId = req.params.id;

	await Student.findByIdAndDelete(userId)
		.then(() => {
			res.status(200).send({ status: "User deleted" });
		})
		.catch((err) => {
			console.log(err.message);
			res
				.status(500)
				.send({ status: "Error with delete user", error: err.message });
		});
});

//Get data of an user
router.route("/get/:id").get(async (req, res) => {
	let userId = req.params.id;
	const user = await Student.findById(userId)
		.then((student) => {
			res.status(200).send({ status: "User fetched", student });
		})
		.catch(() => {
			console.log(err.message);
			res
				.status(500)
				.send({ status: "Error with get user", error: err.message });
		});
});

module.exports = router;
