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

// Create/open database
var request = indexedDB.open('personaDB', 1);

request.onsuccess = function (event) {
    console.log('Success creating/accessing IndexedDB database.');
    db = request.result;

    db.onerror = function (event) {
        console.log('Error creating/accessing IndexedDB database.');
    };
    
}

// For future use. Currently only in latest Firefox versions
request.onupgradeneeded = function (event) {
    var db = event.target.result;

    // Create an objectStore for this database
    var objectStore = db.createObjectStore("personaStore", { keyPath: "projectTitle"});
    objectStore.createIndex("personaType", "personaType", { unique: false });
    objectStore.createIndex("avatar", "avatar", { unique: false });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("age", "age", { unique: true });
    objectStore.createIndex("gender", "gender", { unique: false });
    objectStore.createIndex("location", "location", { unique: true });
    objectStore.createIndex("work", "work", { unique: false });
    objectStore.createIndex("school", "school", { unique: true });
    objectStore.createIndex("techLevel", "techLevel", { unique: false });
    objectStore.createIndex("practicalGoals", "practicalGoals", { unique: true });
    objectStore.createIndex("personalGoals", "personalGoals", { unique: true });
    objectStore.createIndex("businessGoals", "businessGoals", { unique: true });
    objectStore.createIndex("frustrations", "frustrations", { unique: true });
    objectStore.createIndex("description", "description", { unique: true });
    objectStore.createIndex("mainPoints", "mainPoints", { unique: true });
    objectStore.createIndex("scenarios", "scenarios", { unique: true });
};

function addPersonasDB (personaType, name, age) {
    console.log("persona arguments:", arguments);
    var obj = { projectTitle: name, personaType: personaType, name: name, age: age };
    // open a read/write db transaction, ready for adding the data
    var transaction = db.transaction(["personaStore"], "readwrite");
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
    var objectStore = transaction.objectStore("personaStore");
    var req;
    try {
      req = objectStore.add(obj);
    } catch (e) {
      if (e.name == 'DataCloneError')
        displayActionFailure("This engine doesn't know how to clone a Blob, " +
                             "use Firefox");
      throw e;
    }
    req.onsuccess = function (evt) {
      console.log("Insertion in DB successful");
      //displayActionSuccess();
      //displayPubList(objectStore);
    };
    req.onerror = function() {
      console.error("addPublication error", this.error);
      //displayActionFailure(this.error);
    };
    
}
var addData = document.getElementById("addButton");

addData.addEventListener("click", addToLocalStore, false);

function addToLocalStore (e) {
      console.log("add ...");
      var personaType = document.getElementById("personaType").textContent;
      var name = document.getElementById("name").textContent;
      var age = document.getElementById("age").textContent;
      console.log(personaType + ' ' + name + ' ' + age);
      /*if (year != '') {
        // Better use Number.isInteger if the engine has EcmaScript 6
        if (isNaN(year))  {
          displayActionFailure("Invalid year");
          return;
        }
        year = Number(year);
      } else {
        year = null;
      }
*/
      /*var file_input = $('#pub-file');
      var selected_file = file_input.get(0).files[0];
      console.log("selected_file:", selected_file);
      // Keeping a reference on how to reset the file input in the UI once we
      // have its value, but instead of doing that we rather use a "reset" type
      // input in the HTML form.
      //file_input.val(null);
      var file_url = $('#pub-file-url').val();
      if (selected_file) {
        addPublication(biblioid, title, year, selected_file);
      } else if (file_url) {
        addPublicationFromUrl(biblioid, title, year, file_url);
      } else {
        addPublication(biblioid, title, year);
      }*/
      addPersonasDB(personaType, name, age);
      e.preventDefault();
    }