const fs = require("fs");
const electron = require("electron").remote;
const defaultLocation = electron.app.getPath("documents");

document.getElementById("itemSubmit").addEventListener("click", function() {
	if (document.getElementById("AddItem").value == "") {
		alert("Hey");
		console.log("Skriv forhelved noget i det input felt!");
	} else {
		addedTodo = document.getElementById("AddItem").value;

		createNote(addedTodo);
	}
});

function deleteTodo(todoName) {
	fs.exists(defaultLocation + "\\ToDoApp\\notes.json", function(exists) {
		console.log("file exists ? " + exists);
		if (exists == false) {
			createDefaultFile();
		}
	});
	fs.readFile(defaultLocation + "\\ToDoApp\\notes.json", function(err, data) {
		var json = JSON.parse(data);
		for (var i = 0; i < json.length; i++) {
			if (json[i].note == todoName) {
				json.splice(i, 1);
				break;
			}
		}
		fs.writeFile(
			defaultLocation + "\\ToDoApp\\notes.json",
			JSON.stringify(json),
			function(err) {
				if (err) throw err;
				console.log(`The todo ${todoName} was removed!`);
			}
		);
	});

	let win = electron.getCurrentWindow();

	win.reload();
}

function createNote(todo) {
	let newNote = {
		note: todo,
		completed: 0
	};

	fs.exists(defaultLocation + "\\ToDoApp\\notes.json", function(exists) {
		console.log("file exists ? " + exists);
		if (exists == false) {
			createDefaultFile();
		}
	});
	fs.readFile(defaultLocation + "\\ToDoApp\\notes.json", function(err, data) {
		var json = JSON.parse(data);
		json.push(newNote);
		fs.writeFile(
			defaultLocation + "\\ToDoApp\\notes.json",
			JSON.stringify(json),
			function(err) {
				if (err) throw err;
				console.log(`The todo ${todo} was created!`);
			}
		);
	});

	let win = electron.getCurrentWindow();

	win.reload();
}

function getTodos() {
	fs.exists(defaultLocation + "\\ToDoApp\\notes.json", function(exists) {
		console.log("file exists ? " + exists);
		if (exists == false) {
			createDefaultFile();
		}
	});
	fs.readFile(defaultLocation + "\\ToDoApp\\notes.json", function(err, data) {
		json = JSON.parse(data);
		console.log(json);

		var str = "<ul class='todos' id='todos'>";
		let todoCount = 0;

		for (var i = 0; i < json.length; i++) {
			var obj = json[i];
			if (json[i].completed === 0) {
				console.log(obj.note);

				str += `<li><span class="todoName" onclick="finishTodo('${obj.note}')">${obj.note}</span> <span class="todoDelete" onclick="deleteTodo('${obj.note}')">&times;</span></li>`;
				todoCount += 1;
			}
		}
		str += "</ul>";
		document.getElementById("todos").innerHTML = str;
		document.getElementById("todoCount").innerHTML = "(" + todoCount + ")";
	});
}

function getDoneTodos() {
	fs.exists(defaultLocation + "\\ToDoApp\\notes.json", function(exists) {
		console.log("file exists ? " + exists);
		if (exists == false) {
			createDefaultFile();
		}
	});
	fs.readFile(defaultLocation + "\\ToDoApp\\notes.json", function(err, data) {
		json = JSON.parse(data);
		console.log(json);

		var str = "<ul class='todos' id='donetodos'>";
		let doneCount = 0;

		for (var i = 0; i < json.length; i++) {
			var obj = json[i];
			if (json[i].completed === 1) {
				console.log(obj.note);
				str += `<li><span class="todoName">${obj.note}</span> <span class="todoDelete" onclick="deleteTodo('${obj.note}')">&times;</span></li>`;
				doneCount += 1;
			}
		}
		str += "</ul>";
		document.getElementById("doneTodos").innerHTML = str;
		document.getElementById("doneCount").innerHTML = "(" + doneCount + ")";
	});
}

function finishTodo(todoName) {
	fs.exists(defaultLocation + "\\ToDoApp\\notes.json", function(exists) {
		console.log("file exists ? " + exists);
		if (exists == false) {
			createDefaultFile();
		}
	});
	fs.readFile(defaultLocation + "\\ToDoApp\\notes.json", function(err, data) {
		var json = JSON.parse(data);
		for (var i = 0; i < json.length; i++) {
			if (json[i].note == todoName) {
				json[i].completed = 1;
				break;
			}
		}
		fs.writeFile(
			defaultLocation + "\\ToDoApp\\notes.json",
			JSON.stringify(json),
			function(err) {
				if (err) throw err;
				console.log(`The todo ${todoName} was finished!`);
			}
		);
	});

	let win = electron.getCurrentWindow();

	win.reload();
}

function createDefaultFile() {
	fs.mkdir(defaultLocation + "\\ToDoApp", { recursive: true }, err => {
		if (err) throw err;
	});
	fs.writeFile(defaultLocation + "\\ToDoApp\\notes.json", "[]", function(
		err
	) {
		if (err) throw err;
		console.log("Saved!");
	});
}

/* Execute the main functions */
getTodos();

getDoneTodos();
