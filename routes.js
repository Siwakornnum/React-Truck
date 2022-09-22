exports.index = function (req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var brand = post.brand_truck;
    var piture = post.piture_truck;
    var type = post.truck_type;
    var model = post.model_code;
    var license = post.license_plate;
    var total = post.total_weight;

    if (!req.files) return res.status(400).send("No files were uploaded.");

    var file = req.files.uploaded_image;
    var img_name = file.name;

    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      file.mv("public/images/upload_images/" + file.name, function (err) {
        if (err) return res.status(500).send(err);
        var sql =
          "INSERT INTO `truck`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" +
          fname +
          "','" +
          lname +
          "','" +
          mob +
          "','" +
          name +
          "','" +
          pass +
          "','" +
          img_name +
          "')";

        var query = db.query(sql, function (err, result) {
          res.redirect("profile/" + result.insertId);
        });
      });
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render("index.ejs", { message: message });
    }
  } else {
    res.render("index");
  }
};
