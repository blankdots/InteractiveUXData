var edit_projectTitle    = document.getElementById("projectTitle"),
  	edit_personaType     = document.getElementById("personaType"),
  	edit_firstName       = document.getElementById("firstName"),
  	edit_lastName        = document.getElementById("lastName"),
  	edit_birthyear       = document.getElementById("birthyear"),
  	edit_gender          = document.getElementById("gender"),
 	edit_location        = document.getElementById("location"),
  	edit_school          = document.getElementById("school"),
  	edit_workPlace       = document.getElementById("workPlace"),
  	edit_job             = document.getElementById("job"),
  	edit_techLevel       = document.getElementById("techLevel"),
  	edit_practicalGoals  = document.getElementById("practicalGoals"),
  	edit_businessGoals   = document.getElementById("businessGoals"),
  	edit_personalGoals   = document.getElementById("personalGoals"),
 	edit_frustrations    = document.getElementById("frustrations"),
  	edit_description     = document.getElementById("description"),
  	edit_mainPoints      = document.getElementById("mainPoints"),
  	edit_scenarios       = document.getElementById("scenarios"),
  	edit_references		 = document.getElementById("references"),
  	edit_other			 = document.getElementById("other"),
  	currentTime 		 = new Date(),
	year 				 = currentTime.getFullYear();


editprojectTitle = new Medium({
    element: edit_projectTitle,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editpersonaType = new Medium({
    element: edit_personaType,
    mode: Medium.inlineMode ,
    placeholder: '',
    attributes: null,
	tags: null
});

edit_personaType.addEventListener("focus", function () {
    var tempControls = document.getElementById("tempControls"),
        ul = document.createElement("ul"),
        list= ["Primary", "Secondary", "Negative", "Supplemental", "Served", "Customer"];
    
    tempControls.appendChild(ul);

    for (var i = 0;  i <= list.length-1; i++) {
        var li = document.createElement("li");
        ul.appendChild(li);
        li.textContent = list[i];
        li.id=list[i];
    };
    document.getElementById("Primary").onmousedown = function() {
            editpersonaType.focus();
            edit_personaType.textContent = "";
            editpersonaType.insertHtml("Primary");
            return false;
    };
    document.getElementById("Secondary").onmousedown = function() {
            editpersonaType.focus();
            edit_personaType.textContent = "";
            editpersonaType.insertHtml("Secondary");
            return false;
    };
    document.getElementById("Negative").onmousedown = function() {
            editpersonaType.focus();
            edit_personaType.textContent = "";
            editpersonaType.insertHtml("Negative");
            return false;
    };
    document.getElementById("Supplemental").onmousedown = function() {
            editpersonaType.focus();
            edit_personaType.textContent = "";
            editpersonaType.insertHtml("Supplemental");
            return false;
    };
    document.getElementById("Served").onmousedown = function() {
            editpersonaType.focus();
            edit_personaType.textContent = "";
            editpersonaType.insertHtml("Served");
            return false;
    };
    document.getElementById("Customer").onmousedown = function() {
            editpersonaType.focus();
            edit_personaType.textContent = "";
            editpersonaType.insertHtml("Customer");
            return false;
    };
}, false);

edit_personaType.addEventListener("blur", function () {
    var tempControls = document.getElementById("tempControls");
    while (tempControls.firstChild) {
            tempControls.removeChild(tempControls.firstChild);
          }
}, false);

/**/

editfirstName = new Medium({
    element: edit_firstName,
    mode: Medium.inlineMode ,
    placeholder: 'First Name',
    attributes: null,
	tags: null
});

editlastName = new Medium({
    element: edit_lastName,
    mode: Medium.inlineMode ,
    placeholder: 'Last Name',
    attributes: null,
	tags: null
});

editbirthyear = new Medium({
    element: edit_birthyear,
    mode: Medium.inlineMode ,
    placeholder: year,
    attributes: null,
	tags: null
});

editgender = new Medium({
    element: edit_gender,
    mode: Medium.inlineMode ,
    placeholder: 'Male/Female',
    attributes: null,
	tags: null
});

editlocation = new Medium({
    element: edit_location,
    mode: Medium.inlineMode ,
    placeholder: 'Location',
    attributes: null,
	tags: null
});

editschool = new Medium({
    element: edit_school,
    mode: Medium.inlineMode ,
    placeholder: 'School',
    attributes: null,
	tags: null
});

editworkPlace = new Medium({
    element: edit_workPlace,
    mode: Medium.inlineMode ,
    placeholder: 'Work place',
    attributes: null,
	tags: null
});

editjob = new Medium({
    element: edit_job,
    mode: Medium.inlineMode ,
    placeholder: 'Job',
    attributes: null,
	tags: null
});

edittechLevel = new Medium({
    element: edit_techLevel,
    mode: Medium.inlineMode ,
    placeholder: 'Technology Level',
    attributes: null,
	tags: null
});

editpracticalGoals = new Medium({
    element: edit_practicalGoals,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editbusinessGoals = new Medium({
    element: edit_businessGoals,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editpersonalGoals = new Medium({
    element: edit_personalGoals,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editfrustrations = new Medium({
    element: edit_frustrations,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editdescription = new Medium({
    element: edit_description,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editmainPoints = new Medium({
    element: edit_mainPoints,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editscenarios = new Medium({
    element: edit_scenarios,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editrefences = new Medium({
    element: edit_references,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});

editother = new Medium({
    element: edit_other,
    mode: Medium.inlineMode ,
    placeholder: 'Project Title',
    attributes: null,
	tags: null
});
