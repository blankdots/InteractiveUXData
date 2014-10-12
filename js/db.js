// IndexedDB
// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
    dbVersion = 1;

/* 
    Note: The recommended way to do this is assigning it to window.indexedDB,
    to avoid potential issues in the global scope when web browsers start 
    removing prefixes in their implementations.

    You can assign it to a variable, like var indexedDB… but then you have 
    to make sure that the code is contained within a function.
*/

if (!window.indexedDB) {
    console.log('Your browser doesn\'t support a stable version of IndexedDB. Such and such feature will not be available.');
}

const DB_NAME     = 'personaDB';
const DB_STORE    = 'personaStoreData';
const DB_VERSION  = 2; 

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
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("birthyear", "birthyear", { unique: false });
    objectStore.createIndex("gender", "gender", { unique: false });
    objectStore.createIndex("location", "location", { unique: false });
    objectStore.createIndex("work", "work", { unique: false });
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

function addPersonasDB (projectTitle, personaType, name, birthyear, gender, location, job, school, techLevel, practicalGoals, businessGoals, personalGoals, frustrations, description, mainPoints, scenarios, avatar) {
    console.log("persona arguments:", arguments);
    var obj = { 
      projectTitle: projectTitle, 
      personaType: personaType, 
      name: name, 
      birthyear: birthyear,
      gender: gender,
      location: location,
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
      console.error("add operation error", this.error);
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
}

var addData     = document.getElementById('addButton'),
    clearData   = document.getElementById('clearButton'),
    dbContent   = document.getElementById('dbContent'),
    displayData = document.getElementById('displayButton');

addData.addEventListener("click", addToLocalStoreFunct, false);
clearData.addEventListener("click", clearPersonasDB, false);
displayData.addEventListener("click", displayPersonaStore, false);

function addToLocalStoreFunct (e) {
  console.log("add ...");
  var projectTitle    = document.getElementById("projectTitle").textContent,
      personaType     = document.getElementById("personaType").textContent,
      name            = document.getElementById("name").textContent,
      birthyear       = document.getElementById("birthyear").textContent,
      gender          = document.getElementById("gender").textContent,
      location        = document.getElementById("location").textContent,
      school          = document.getElementById("location").textContent,
      job             = document.getElementById("job").textContent,
      techLevel       = document.getElementById("techLevel").textContent,
      practicalGoals  = document.getElementById("practicalGoals").textContent,
      businessGoals   = document.getElementById("businessGoals").textContent,
      personalGoals   = document.getElementById("personalGoals").textContent,
      frustrations    = document.getElementById("frustrations").textContent,
      description     = document.getElementById("description").textContent,
      mainPoints      = document.getElementById("mainPoints").textContent,
      scenarios       = document.getElementById("scenarios").textContent,
      avatar          = imageData; // see avatar.js for the meaning of imageData

  /*console.log(personaType + ' ' + name + ' ' + age);*/
  if (birthyear != '') {
    // Better use Number.isInteger if the engine has EcmaScript 6
    if (birthyear.isInteger)  {
      displayActionFailure("Invalid year");
      return;
    }
    birthyear = Number(birthyear);
  } else {
    birthyear = null;
  }
  addPersonasDB(projectTitle, personaType, name, birthyear, gender, location, job, school, techLevel, practicalGoals, businessGoals, personalGoals, frustrations, description, mainPoints, scenarios, avatar);
  e.preventDefault();
}

function displayPersonaStore() {
  console.log("displayPersonaStore");
  var transaction = db.transaction([DB_STORE], "readonly"),
      objectStore = transaction.objectStore(DB_STORE),
      req         = objectStore.count();

  /*if (typeof store == 'undefined')
    store = getObjectStore(DB_NAME, 'readonly');

  var req;
  req = store.count();*/
  // Requests are executed in the order in which they were made against the
  // transaction, and their results are returned in the same order.
  // Thus the count text below will be displayed before the actual pub list
  // (not that it is algorithmically important in this case).
  req.onsuccess = function(evt) {
    console.log(evt.target.result);
  };
  req.onerror = function(evt) {
    console.error("add error", this.error);
    displayActionFailure(this.error);
  };

  var i = 0;
  req = objectStore.openCursor();
  req.onsuccess = function(evt) {
    var cursor = evt.target.result;

    // If the cursor is pointing at something, ask for the data
    if (cursor) {
      console.log("displayPersona cursor:", cursor);
      console.log(cursor.value);

      // Move on to the next object in store
      cursor.continue();

      // This counter serves only to create distinct ids
      i++;
    } else {
      console.log("No more entries");
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