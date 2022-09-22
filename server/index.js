const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 3001;
const path = require("path");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const secretKey = "siwa";
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "truckrent",
});

// <================================ Costing inner join truck ============================>

app.get("/truckcost", (req, res) => {
  db.query(
    "SELECT * FROM calculed INNER JOIN truck ON calculed.brand_truck = truck.brand_truck",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// <================================ end of Costing inner join truck ============================>

// <================================ Login ============================>
app.post("/register", (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const position = req.body.position;
  const tel = req.body.tel;
  const address = req.body.address;
  const email = req.body.email;
  const confpassword = req.body.confpassword;

  if (password !== confpassword) {
    return res.status(400).send({
      status: 400,
      msg: "Password and Confrim Password do not match",
    });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        console.log(err);
      }
      if (hash) {
        db.query(
          "INSERT INTO account (userId , password) VALUES (?,?)",
          [userId, hash],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result) {
              res.send({ status: 200, msg: "Registeration Successfully" });
            }
          }
        );
      }
    });
  }

  db.query(
    "INSERT INTO account_info (userId, firstname, lastname, email, position, tel, address) VALUES (?,?,?,?,?,?,?)",
    [userId, firstName, lastName, email, position, tel, address],
    (err, result) => {
      console.log(err);
    }
  );
});

// <================================ END OF Login ============================>

// <======================== Upload Truck ======================>
const storage = multer.diskStorage({
  destination: path.join(__dirname, "truck"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

app.post("/imageupload", async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("avatar");
    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please Select an Image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/imageupload/:id", (req, res) => {
  const bookingId = req.params.id;
  if (bookingId) {
    res.sendFile(__dirname + "/truck/" + bookingId + ".png");
  } else {
    res.json({ status: 403, msg: "Something went wrong!" });
  }
});
// <======================== End Upload Truck ======================>

// <======================== Upload container ======================>
const storage1 = multer.diskStorage({
  destination: path.join(__dirname, "container"),
  filename: function (req, file, cb) {
    cb(null, "container" + file.originalname);
  },
});

app.post("/imageuploadcontainer", async (req, res) => {
  try {
    let upload = multer({ storage: storage1 }).single("avatar");
    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please Select an Image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/imageuploadcontainer/:id", (req, res) => {
  const bookingId = req.params.id;
  if (bookingId) {
    res.sendFile(__dirname + "/container/" + "container" + bookingId + ".png");
  } else {
    res.json({ status: 403, msg: "Something went wrong!" });
  }
});
// <======================== End Upload container ======================>

// <======================== costing ======================>

app.get("/calculed", (req, res) => {
  db.query("SELECT * FROM calculed ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/calculed", (req, res) => {
  const { brand_truck, cost_price, selling_price, oil_cost_price } = req.body;
  const sqlInsert =
    "INSERT INTO calculed (brand_truck, cost_price, selling_price, oil_cost_price ) VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [brand_truck, cost_price, selling_price, oil_cost_price],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("good");
      }
    }
  );
});

app.delete("/calculed/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM calculed WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("good");
    }
  });
});

app.get("/calculed/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM calculed where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/calculed/:id", (req, res) => {
  const { id } = req.params;
  const { brand_truck, cost_price, selling_price, oil_cost_price } = req.body;
  const sqlUpdate =
    "UPDATE calculed SET brand_truck = ?, cost_price = ?, selling_price = ?, oil_cost_price = ? WHERE id = ? ";
  db.query(
    sqlUpdate,
    [brand_truck, cost_price, selling_price, oil_cost_price, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// <======================== End costing ======================>

// <============================= WORKORDER ===============================>

app.get("/workorder", (req, res) => {
  db.query("SELECT * FROM workorder ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/workorder", (req, res) => {
  const {
    brand_truck,
    license_plate,
    Container_name,
    Container_type,
    date,
    date1,
    time,
  } = req.body;
  const sqlInsert =
    "INSERT INTO workorder (brand_truck, license_plate, Container_name, Container_type, date, date1, time) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [
      brand_truck,
      license_plate,
      Container_name,
      Container_type,
      date,
      date1,
      time,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("good");
      }
    }
  );
});

app.delete("/workorder/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM workorder WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("good");
    }
  });
});

app.get("/workorder/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM workorder where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/workorder/:id", (req, res) => {
  const { id } = req.params;
  const {
    brand_truck,
    license_plate,
    Container_name,
    Container_type,
    date,
    date1,
    time,
  } = req.body;
  const sqlUpdate =
    "UPDATE workorder SET brand_truck = ?, license_plate = ?, Container_name = ?, Container_type = ?, date = ?, date1 = ? ,time = ? WHERE id = ? ";
  db.query(
    sqlUpdate,
    [
      brand_truck,
      license_plate,
      Container_name,
      Container_type,
      date,
      date1,
      time,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// <============================= END OF WORKORDER ===============================>

// <============================= Container ===============================>
app.get("/container", (req, res) => {
  db.query("SELECT * FROM container ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/container", (req, res) => {
  const {
    Container_name,
    Container_image,
    Container_type,
    height,
    width,
    length,
    Payload,
  } = req.body;
  const sqlInsert =
    "INSERT INTO container (Container_name, Container_image, Container_type, height, width, length, Payload) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [
      Container_name,
      Container_image,
      Container_type,
      height,
      width,
      length,
      Payload,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("good");
      }
    }
  );
});

app.delete("/container/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM container WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("good");
    }
  });
});

app.get("/container/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM container WHERE id = ? ";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/container/:id", (req, res) => {
  const { id } = req.params;
  const {
    Container_name,
    Container_image,
    Container_type,
    height,
    width,
    length,
    Payload,
  } = req.body;
  const sqlUpdate =
    "UPDATE container SET Container_name = ?, Container_image = ?, Container_type = ?, height = ?, width = ?, length = ?, Payload = ? WHERE id = ? ";
  db.query(
    sqlUpdate,
    [
      Container_name,
      Container_image,
      Container_type,
      height,
      width,
      length,
      Payload,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// <============================= END OF Container ===============================>

// <============================= Truck Information ===============================>

app.get("/truck", (req, res) => {
  db.query("SELECT * FROM truck ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/truck", (req, res) => {
  const {
    brand_truck,
    piture_truck,
    truck_type,
    model_code,
    license_plate,
    total_weight,
  } = req.body;
  const sqlInsert =
    "INSERT INTO truck (brand_truck, piture_truck, truck_type, model_code, license_plate, total_weight) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [
      brand_truck,
      piture_truck,
      truck_type,
      model_code,
      license_plate,
      total_weight,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("good");
      }
    }
  );
});

app.delete("/truck/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM truck WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("good");
    }
  });
});

app.get("/truck/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM truck where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/truck/:id", (req, res) => {
  const { id } = req.params;
  const {
    brand_truck,
    piture_truck,
    truck_type,
    model_code,
    license_plate,
    total_weight,
  } = req.body;
  const sqlUpdate =
    "UPDATE truck SET brand_truck = ?, piture_truck = ?, truck_type = ?, model_code = ?, license_plate = ?, total_weight = ? WHERE id = ? ";
  db.query(
    sqlUpdate,
    [
      brand_truck,
      piture_truck,
      truck_type,
      model_code,
      license_plate,
      total_weight,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// <============================= END OF Truck Information ===============================>

// <============================= Company ===============================>
app.get("/company", (req, res) => {
  db.query("SELECT * FROM company", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/company", (req, res) => {
  const {
    company_name,
    subsidiary,
    website,
    year_of_establishment,
    telephone_number,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
  } = req.body;
  const sqlInsert =
    "INSERT INTO company (company_name, subsidiary, website, year_of_establishment, telephone_number, village_name, road, district, sub_district, province, zip_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [
      company_name,
      subsidiary,
      website,
      year_of_establishment,
      telephone_number,
      village_name,
      road,
      district,
      sub_district,
      province,
      zip_code,
      country,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("good");
      }
    }
  );
});

app.delete("/company/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM company WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("good");
    }
  });
});

app.get("/company/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM company where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/company/:id", (req, res) => {
  const { id } = req.params;
  const {
    company_name,
    subsidiary,
    website,
    year_of_establishment,
    telephone_number,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
  } = req.body;
  const sqlUpdate =
    "UPDATE company SET company_name = ?, subsidiary = ?, website = ?, year_of_establishment = ?, telephone_number = ?, village_name = ?, road = ?, district = ?, sub_district = ?, province = ?, zip_code = ?, country = ? WHERE id = ? ";
  db.query(
    sqlUpdate,
    [
      company_name,
      subsidiary,
      website,
      year_of_establishment,
      telephone_number,
      village_name,
      road,
      district,
      sub_district,
      province,
      zip_code,
      country,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// <============================= END OF Company ===============================>

// <=============================  Order ===============================>
// app.get("/ordercustomer", (req, res) => {
//   if (req.headers.authorization) {
//     let token = req.headers.authorization.split(" ")[1];
//     let decoded = jwt.verify(token, secretKey);
//     console.log(decoded.userId);
//     db.query(
//       "SELECT * FROM ordercustomer WHERE userId = ? ",
//       [decoded.userId],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(result);
//         }
//       }
//     );
//   }
// });

app.get("/ordercustomer", (req, res) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, secretKey);
    console.log(decoded.userId);
    db.query(
      "SELECT * FROM ordercustomer WHERE userId = ?",
      [decoded.userId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    db.query("SELECT * FROM ordercustomer ORDER BY id DESC ", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
});

app.post("/uploadpayment", (req, res) => {
  if (req.files === null) {
    res.status(400).json({ msg: "No file upload" });
  }
  const file = req.files.fileData;
  file.mv(`${__dirname}/upload/${file.name}.png`, (err) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "UPDATE ordercustomer SET payment = ? WHERE id = ?",
      ["paid", file.name],
      (err, result) => {
        if (result) {
          res.json({
            status: 200,
            fileName: file.name,
            filePath: `/upload/${file.name}.png`,
          });
        }
      }
    );
  });
});

app.get("/imgpayment/:id", (req, res) => {
  const bookingId = req.params.id;
  if (bookingId) {
    res.sendFile(__dirname + "/upload/" + bookingId + ".png");
  } else {
    res.json({ status: 403, msg: "Something went wrong!" });
  }
});

app.post("/ordercustomer", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, secretKey);
  const {
    firstName,
    quantity,
    payment,
    status,
    distance,
    price,
    date,
    time,
    tel,
    names,
    car_registration,
    container,
    container_type,
    transfer_receipt,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
    village_name1,
    road1,
    district1,
    sub_district1,
    province1,
    zip_code1,
    country1,
    oil_cost_price,
    selling_price,
    typetruck,
  } = req.body;
  const status1 = "Pending";
  const payment1 = "Due";
  let price1 = 0;
  let car_registration1;
  if (names === "ISUZU") {
    let total1 = distance * oil_cost_price[3].oil_cost_price;
    let total2 = quantity * total1;
    let total3 = selling_price[3].selling_price * quantity;
    price1 = total2 + total3;
    if (typetruck === "รถเทรลเลอร์พื้นเรียบ") {
      car_registration1 = "ทม 2347";
    } else if (typetruck === "พ่วง") {
      car_registration1 = "กฟ 5678";
    }
    price1 = total2 + total3;
  } else if (names === "HINO") {
    let total1 = distance * oil_cost_price[2].oil_cost_price;
    let total2 = quantity * total1;
    let total3 = selling_price[2].selling_price * quantity;
    price1 = total2 + total3;
    if (typetruck === "รถเทรลเลอร์พื้นเรียบ") {
      car_registration1 = "อป 6699";
    } else if (typetruck === "พ่วง") {
      car_registration1 = "ศษ 6542";
    }
  } else if (names === "SCANIA") {
    let total1 = distance * oil_cost_price[1].oil_cost_price;
    let total2 = quantity * total1;
    let total3 = selling_price[1].selling_price * quantity;
    price1 = total2 + total3;
    if (typetruck === "รถเทรลเลอร์พื้นเรียบ") {
      car_registration1 = "พท 4123";
    } else if (typetruck === "พ่วง") {
      car_registration1 = "สน 3652";
    }
  } else if (names === "VOLVO") {
    let total1 = distance * oil_cost_price[0].oil_cost_price;
    let total2 = quantity * total1;
    let total3 = selling_price[0].selling_price * quantity;
    price1 = total2 + total3;
    if (typetruck === "รถเทรลเลอร์พื้นเรียบ") {
      car_registration1 = "หป 7842";
    } else if (typetruck === "พ่วง") {
      car_registration1 = "มท 8521";
    }
  }

  const sqlInsert =
    "INSERT INTO ordercustomer (userId, firstName, quantity, payment, status, distance, price, date, time, tel, names, car_registration, container, container_type, transfer_receipt, village_name, road, district, sub_district, province, zip_code, country, village_name1, road1, district1, sub_district1, province1, zip_code1, country1, typetruck) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [
      decoded.userId,
      firstName,
      quantity,
      payment1,
      status1,
      distance,
      price1,
      date,
      time,
      tel,
      names,
      car_registration1,
      container,
      container_type,
      transfer_receipt,
      village_name,
      road,
      district,
      sub_district,
      province,
      zip_code,
      country,
      village_name1,
      road1,
      district1,
      sub_district1,
      province1,
      zip_code1,
      country1,
      typetruck,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("good");
      }
    }
  );
});

app.delete("/ordercustomer/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM ordercustomer WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("good");
    }
  });
});

app.get("/ordercustomer/:id", (req, res) => {
  const { id } = req.params;

  const sqlGet = "SELECT * FROM ordercustomer where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/ordercustomer/:id", (req, res) => {
  let price1 = 0;
  const { id } = req.params;
  const {
    firstName,
    quantity,
    payment,
    status,
    distance,
    price,
    date,
    time,
    tel,
    names,
    car_registration,
    container,
    container_type,
    transfer_receipt,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
    village_name1,
    road1,
    district1,
    sub_district1,
    province1,
    zip_code1,
    country1,
    typetruck,
    oil_cost_price,
    selling_price,
  } = req.body;
  let car_registration1;
  if (names === "ISUZU") {
    let total1 = distance * oil_cost_price[3].oil_cost_price;
    let total2 = quantity * total1;
    let total3 = selling_price[3].selling_price * quantity;
    price1 = total2 + total3;
    if (typetruck === "รถเทรลเลอร์พื้นเรียบ") {
      car_registration1 = "ทม 2347";
    } else if (typetruck === "พ่วง") {
      car_registration1 = "กฟ 5678";
    }
    price1 = total2 + total3;
  } else if (names === "HINO") {
    let total1 = distance * oil_cost_price[2].oil_cost_price;
    let total2 = quantity * total1;
    let total3 = selling_price[2].selling_price * quantity;
    price1 = total2 + total3;
    if (typetruck === "รถเทรลเลอร์พื้นเรียบ") {
      car_registration1 = "อป 6699";
    } else if (typetruck === "พ่วง") {
      car_registration1 = "ศษ 6542";
    }
  } else if (names === "SCANIA") {
    let total1 = distance * oil_cost_price[1].oil_cost_price;
    let total2 = quantity * total1;
    let total3 = selling_price[1].selling_price * quantity;
    price1 = total2 + total3;
    if (typetruck === "รถเทรลเลอร์พื้นเรียบ") {
      car_registration1 = "พท 4123";
    } else if (typetruck === "พ่วง") {
      car_registration1 = "สน 3652";
    }
  } else if (names === "VOLVO") {
    let total1 = distance * oil_cost_price[0].oil_cost_price;
    let total2 = quantity * total1;
    let total3 = selling_price[0].selling_price * quantity;
    price1 = total2 + total3;
    if (typetruck === "รถเทรลเลอร์พื้นเรียบ") {
      car_registration1 = "หป 7842";
    } else if (typetruck === "พ่วง") {
      car_registration1 = "มท 8521";
    }
  }
  console.log(price1);
  console.log(car_registration1);

  const sqlUpdate =
    "UPDATE ordercustomer SET firstName = ?, quantity = ?, payment = ?, status = ?, distance = ?, price = ?,  date = ?, time = ?, tel = ?, names = ?, car_registration = ?, container = ?, container_type = ?, transfer_receipt = ?, village_name = ?, road = ?, district = ?, sub_district = ?, province = ?, zip_code = ?, country = ?, village_name1 = ?, road1 = ?, district1 = ?, sub_district1 = ?, province1 = ?, zip_code1 = ?, country1 = ?, typetruck = ? WHERE id = ? ";
  db.query(
    sqlUpdate,
    [
      firstName,
      quantity,
      payment,
      status,
      distance,
      price1,
      date,
      time,
      tel,
      names,
      car_registration1,
      container,
      container_type,
      transfer_receipt,
      village_name,
      road,
      district,
      sub_district,
      province,
      zip_code,
      country,
      village_name1,
      road1,
      district1,
      sub_district1,
      province1,
      zip_code1,
      country1,
      typetruck,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// <============================= END OF Order ===============================>

// <============================= ACCIDENT ===============================>

app.get("/accident", (req, res) => {
  db.query("SELECT * FROM accident ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/accident", (req, res) => {
  const {
    Accident_Name,
    Accident_Details,
    Old_Car_Registration,
    New_Car_Registration,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
    date,
    time,
  } = req.body;
  const sqlInsert =
    "INSERT INTO accident (Accident_Name, Accident_Details, Old_Car_Registration, New_Car_Registration, village_name, road, district, sub_district, province, zip_code, country, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [
      Accident_Name,
      Accident_Details,
      Old_Car_Registration,
      New_Car_Registration,
      village_name,
      road,
      district,
      sub_district,
      province,
      zip_code,
      country,
      date,
      time,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("good");
      }
    }
  );
});

app.delete("/accident/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM accident WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("good");
    }
  });
});

app.get("/accident/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM accident where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/accident/:id", (req, res) => {
  const { id } = req.params;
  const {
    Accident_Name,
    Accident_Details,
    Old_Car_Registration,
    New_Car_Registration,
    village_name,
    road,
    district,
    sub_district,
    province,
    zip_code,
    country,
    date,
    time,
  } = req.body;
  const sqlUpdate =
    "UPDATE accident SET Accident_Name = ?, Accident_Details = ?, Old_Car_Registration = ?, New_Car_Registration = ?, village_name = ?, road = ?, district = ?, sub_district = ?, province = ?, zip_code = ?, country = ?, date = ?, time = ? WHERE id = ? ";
  db.query(
    sqlUpdate,
    [
      Accident_Name,
      Accident_Details,
      Old_Car_Registration,
      New_Car_Registration,
      village_name,
      road,
      district,
      sub_district,
      province,
      zip_code,
      country,
      date,
      time,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// <============================= END OF ACCIDENT ===============================>

// <=============================  Customer ===============================>

app.get("/user", (req, res) => {
  db.query("SELECT * FROM user ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/user", (req, res) => {
  const { userId, position, tel, firstName, lastName, address, email } =
    req.body;
  const sqlInsert =
    "INSERT INTO user (userId,  position, tel, firstName, lastName, address, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [userId, position, tel, firstName, lastName, address, email],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("good");
      }
    }
  );
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM user WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("good");
    }
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM user where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { userId, position, tel, firstName, lastName, address, email } =
    req.body;
  const sqlUpdate =
    "UPDATE user SET userId = ?,  position = ?, tel = ?, firstName = ?, lastName = ?, address = ?, email = ? WHERE id = ? ";
  db.query(
    sqlUpdate,
    [userId, position, tel, firstName, lastName, address, email, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// <============================= END OF Customer ===============================>

// <============================= PORT 3001 ===============================>
app.listen("3001", () => {
  console.log("Server is running on port 3001");
});

// <============================= END OF PORT 3001 ===============================>
