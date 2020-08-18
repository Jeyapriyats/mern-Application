var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("abcd");

db.serialize(function () {
  db.run("CREATE TABLE jp(id Int16Array,dt TEXT)");
  var stmt = db.prepare("INSERT INTO jp values(?,?)");
  for (var i = 0; i < 10; i++) {
    var d = new Date();
    var n = d.toLocaleTimeString();
    stmt.run(i, n);
  }
  stmt.finalize();
  db.each("SELECT id,dt FROM jp", function (err, row) {
    console.log("User id: " + row.id, row.dt);
  });
});
db.close();
