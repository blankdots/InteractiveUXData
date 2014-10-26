/*
  Persona IndexedDB store
*/
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

const DB_NAME     = 'personaDB';
const DB_STORE    = 'personaData';
const DB_VERSION  = 3; 


if (!window.indexedDB) {
    console.log('Your browser doesn\'t support a stable version of IndexedDB. Such and such feature will not be available.');
}

// Create/open database
var request = indexedDB.open(DB_NAME, DB_VERSION);

request.onsuccess = function (event) {
    console.log('Success creating/accessing IndexedDB database.');
    db = request.result;

    db.onerror = function (event) {
        console.log('Error creating/accessing IndexedDB database.');
    };  
}

request.onupgradeneeded = function (event) {
    var db = event.target.result;

    // Create an objectStore for this database
    var objectStore = db.createObjectStore(DB_STORE, { keyPath: "projectTitle"});
    objectStore.createIndex("personaType", "personaType", { unique: false });
    objectStore.createIndex("avatar", "avatar", { unique: false });
    objectStore.createIndex("firstName", "firstName", { unique: false });
    objectStore.createIndex("lastName", "lastName", { unique: false });
    objectStore.createIndex("birthyear", "birthyear", { unique: false });
    objectStore.createIndex("gender", "gender", { unique: false });
    objectStore.createIndex("location", "location", { unique: false });
    objectStore.createIndex("work", "work", { unique: false });
    objectStore.createIndex("job", "job", { unique: false });
    objectStore.createIndex("school", "school", { unique: false });
    objectStore.createIndex("techLevel", "techLevel", { unique: false });
    objectStore.createIndex("practicalGoals", "practicalGoals", { unique: false });
    objectStore.createIndex("personalGoals", "personalGoals", { unique: false });
    objectStore.createIndex("businessGoals", "businessGoals", { unique: false });
    objectStore.createIndex("frustrations", "frustrations", { unique: false });
    objectStore.createIndex("description", "description", { unique: false });
    objectStore.createIndex("mainPoints", "mainPoints", { unique: false });
    objectStore.createIndex("scenarios", "scenarios", { unique: false });
};

function addPersonasDB (projectTitle, personaType, firstName, lastName, birthyear, gender, location, workPlace, job, school, techLevel, practicalGoals, businessGoals, personalGoals, frustrations, description, mainPoints, scenarios, avatar) {
    console.log("persona arguments:", arguments);
    var obj = { 
      projectTitle: projectTitle, 
      personaType: personaType,
      firstName: firstName,
      lastName: lastName, 
      birthyear: birthyear,
      gender: gender,
      location: location,
      work: workPlace,
      job: job,
      school: school,
      techLevel: techLevel,
      practicalGoals: practicalGoals,
      personalGoals: personalGoals,
      businessGoals: businessGoals,
      frustrations: frustrations,
      description: description ,
      mainPoints: mainPoints,
      scenarios: scenarios
    };
     if (typeof avatar != 'undefined')
      obj.avatar = avatar;
    // open a read/write db transaction, ready for adding the data
    var transaction = db.transaction([DB_STORE], "readwrite");
    // Note: Older experimental implementations use the deprecated constant IDBTransaction.READ_WRITE instead of "readwrite".
    // In case you want to support such an implementation, you can write: 
    // var transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);
    // report on the success of opening the transaction
    transaction.oncomplete = function(event) {
       console.log('Transaction opened for task addition.');
    };

    transaction.onerror = function(event) {
     console.log('Transaction not opened due to error. Duplicate items not allowed.');
    };
    var objectStore = transaction.objectStore(DB_STORE);
    var req;
    try {
      req = objectStore.add(obj);
    } catch (e) {
      if (e.name == 'DataCloneError')
        displayActionFailure("This engine doesn't know how to clone a Blob, " + "use Firefox");
      throw e;
    }
    req.onsuccess = function (evt) {
      console.log("Insertion in DB successful");
      displayActionSuccess();
      //displayPubList(objectStore);
    };
    req.onerror = function() {
      console.error("Add operation error", this.error);
      displayActionFailure(this.error);
    };
}

function clearPersonasDB(store_name) {
  var transaction = db.transaction([DB_STORE], "readwrite"),
      objectStore = transaction.objectStore(DB_STORE),
      req         = objectStore.clear();

  req.onsuccess = function(evt) {
    displayActionSuccess("Store cleared");
    //displayPubList(objectStore);
  };
  req.onerror = function (evt) {
    console.error("clearObjectStore:", evt.target.errorCode);
    displayActionFailure(this.error);
  };
  while (document.getElementById('dbContent').firstChild) {
    document.getElementById('dbContent').removeChild(document.getElementById('dbContent').firstChild);
  }
}

function addPersonaToLocalStore (e) {
  console.log("add ...");
  var projectTitleContent    = document.getElementById("projectTitle").textContent,
      personaTypeContent     = document.getElementById("personaType").textContent,
      firstNameContent       = document.getElementById("firstName").textContent,
      lastNameContent        = document.getElementById("lastName").textContent,
      birthyearContent       = document.getElementById("birthyear").textContent,
      genderContent          = document.getElementById("gender").textContent,
      locationContent        = document.getElementById("location").textContent,
      schoolContent          = document.getElementById("location").textContent,
      workPlaceContent       = document.getElementById("workPlace").textContent,
      jobContent             = document.getElementById("job").textContent,
      techLevelContent       = document.getElementById("techLevel").textContent,
      practicalGoalsContent  = document.getElementById("practicalGoals").textContent,
      businessGoalsContent   = document.getElementById("businessGoals").textContent,
      personalGoalsContent   = document.getElementById("personalGoals").textContent,
      frustrationsContent    = document.getElementById("frustrations").textContent,
      descriptionContent     = document.getElementById("description").textContent,
      mainPointsContent      = document.getElementById("mainPoints").textContent,
      scenariosContent       = document.getElementById("scenarios").textContent,
      avatarContent          = imageData; // see personaAvatar.js for the meaning of imageData variable

  if (birthyear != '') {
    // Better use Number.isInteger if the engine has EcmaScript 6
    if (birthyear.isInteger)  {
      displayActionFailure("Invalid year.");
      return;
    }
    birthyear = Number(birthyear);
  } else {
    birthyear = null;
  }
  addPersonasDB(projectTitleContent, personaTypeContent,firstNameContent, lastNameContent, birthyearContent, genderContent, locationContent, workPlaceContent, jobContent, schoolContent, techLevelContent, practicalGoalsContent, businessGoalsContent, personalGoalsContent, frustrationsContent, descriptionContent, mainPointsContent, scenariosContent, avatarContent);

/*  if (document.getElementById("avatar").hasChildNodes()) {
    document.getElementById("avatar").removeChild(document.getElementById("avatar").firstChild);
  }
  NEED FUNCT to revert to basic template
  */

  e.preventDefault();
}

function displayPersonaDB() {
  console.log("displayPersonaStore");
  var transaction = db.transaction([DB_STORE], "readonly"),
      objectStore = transaction.objectStore(DB_STORE),
      req         = objectStore.count();
  while (document.getElementById('dbContent').firstChild) {
    document.getElementById('dbContent').removeChild(document.getElementById('dbContent').firstChild);
  }
  // Requests are executed in the order in which they were made against the
  // transaction, and their results are returned in the same order.
  // Thus the count text below will be displayed before the actual pub list
  // (not that it is algorithmically important in this case).
  req.onsuccess = function(evt) {
    console.log(evt.target.result);
  };
  req.onerror = function(evt) {
    console.error("display error", this.error);
    displayActionFailure(this.error);
  };

  var i = 0;
  req = objectStore.openCursor();
  req.onsuccess = function(evt) {
    var cursor = evt.target.result;

    // If the cursor is pointing at something, ask for the data
    if (cursor) {
      console.log("DisplayPersona cursor:", cursor);
      //console.log(cursor.value);
      req = objectStore.get(cursor.key);
      req.onsuccess = function (evt) {
        var value = evt.target.result;
        console.log(value);
        displayPersona(value.projectTitle, value.avatar);
      };

      // Move on to the next object in store
      cursor.continue();

      // This counter serves only to create distinct ids
      i++;
    } else {
      console.log("No more entries");
    }
  };
}

function displayPersona (projectTitle, avatar) {
  var dbContent = document.getElementById('dbContent'),
      article = document.createElement("article"),
      h3 = document.createElement("h3"),
      a = document.createElement("a"),
      img = document.createElement("img");

  dbContent.appendChild(article);
  article.appendChild(h3);
  article.appendChild(a);
  article.appendChild(img);
  h3.textContent = projectTitle;
  a.textContent = projectTitle;
  a.href = "#";
  a.id = projectTitle;
  if (avatar !== "") {
      img.src = avatar;
  }
  else {
    article.removeChild(img);
  }

  //a.addEventListener("keypress", retrievePersona(projectTitle), false);
  /*if (value.year != null)
      list_item.append(' - ' + value.year);

  if (value.hasOwnProperty('avatar') &&
      typeof value.avatar != 'undefined') {
  } else {
    list_item.append(" / No attached file");
  }*/
}

document.querySelector('#dbContent').addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'a') {
    retrievePersona(event.target.id);
  }
});

function retrievePersona (projectTitle) {
  var transaction = db.transaction([DB_STORE], "readonly"),
      objectStore = transaction.objectStore(DB_STORE),
      req         = objectStore.count(),
      img         = document.createElement("img");

  // Requests are executed in the order in which they were made against the
  // transaction, and their results are returned in the same order.
  // Thus the count text below will be displayed before the actual pub list
  // (not that it is algorithmically important in this case).
  req.onsuccess = function(evt) {
    console.log(evt.target.result);
  };
  req.onerror = function(evt) {
    console.error("retrieve error", this.error);
    displayActionFailure(this.error);
  };

  req = objectStore.openCursor();
  req.onsuccess = function(evt) {
    var cursor = evt.target.result;

    // If the cursor is pointing at something, ask for the data
    if (cursor) {
      console.log("retrive cursor:", cursor);
      //console.log(cursor.value);
      req = objectStore.get(projectTitle);
      req.onsuccess = function (evt) {
        var value = evt.target.result;
        console.log(value);
        document.getElementById("projectTitle").textContent = value.projectTitle + "ceva";
        console.log(value.avatar);
        if (value.avatar !== "") {
          avatar.removeChild(avatar.firstChild);
          avatar.appendChild(img);
          img.src = value.avatar;
        }
      };

      // Move on to the next object in store
 {

 }
    } else {
      console.log("No such entries");
    }
  };

}

function displayActionSuccess(msg) {
    msg = typeof msg != 'undefined' ? "Success: " + msg : "Success";
    console.log(msg);
}
function displayActionFailure(msg) {
  msg = typeof msg != 'undefined' ? "Failure: " + msg : "Failure";
  console.error(msg);
}
function resetActionStatus() {
  console.log("resetActionStatus ...");

  console.log("resetActionStatus DONE");
}
function addEventListeners() {
  console.log("addEventListeners");
}


var  addData       = document.getElementById('addButton'),
    clearData     = document.getElementById('clearButton'),
    displayData   = document.getElementById('displayButton');


addData.addEventListener("click", addPersonaToLocalStore, false);
clearData.addEventListener("click", clearPersonasDB, false);
displayData.addEventListener("click", displayPersonaDB, false);