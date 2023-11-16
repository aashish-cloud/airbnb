require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const download = require("image-downloader");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const app = express();
const multer = require("multer");
const fs = require("fs");
const Booking = require("./models/Booking");
const upload = multer({ dest: "uploads/" });
const JWT_SECRET = "cHavboicNiwcnwoIdnWcow";
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("nope");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    bcrypt.compare(password, user.password, function (err, isValid) {
      if (err) throw err;
      if (isValid) {
        jwt.sign(
          { email: user.email, id: user._id },
          JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token)
              .json({ name: user.name, email: user.email, id: user._id });
          }
        );
      } else {
        res.json({ msg: "incorrect password" });
      }
    });
  } else {
    res.status(404).json({ msg: "no such user" });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 8, async (err, hash) => {
    if (err) throw err;
    try {
      const result = await User.create({
        name,
        email,
        password: hash,
      });

      res.json(result);
    } catch (error) {
      console.log(error.message);
    }
  });
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token)
    jwt.verify(token, JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, id: _id });
    });
  else res.json(null);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-link", (req, res) => {
  const { link } = req.body;
  const filename = `IMG${Date.now()}.jpg`;
  options = {
    url: link,
    dest: __dirname + "/uploads/" + filename,
  };

  download
    .image(options)
    .then(() => {
      res.json(filename);
    })
    .catch((err) => console.error(err));
});

app.post("/upload", upload.array("photos", 12), (req, res) => {
  const uploadedPhotos = [];
  const photos = req.files;
  for (let i = 0; i < photos.length; i++) {
    const { filename, originalname, path } = photos[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    // fs.rename(path, newPath, (err) => {
    //     if (err) throw err
    //     uploadedPhotos.push(filename + "." + ext)
    // })

    fs.renameSync(path, newPath);
    uploadedPhotos.push(filename + "." + ext);
  }

  res.json(uploadedPhotos);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: user.id,
      ...req.body,
    });

    res.json(placeDoc);
  });
});

app.get("/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, user) => {
    if (err) throw err;
    const allPlaces = await Place.find({ owner: user.id });
    res.json(allPlaces);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places/:id", async (req, res) => {
  const updatedPlace = req.body;
  console.log(updatedPlace)
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, user) => {
    if (err) throw err;
    const place = await Place.findById(id);
    if (place.owner.toString() === user.id) {
      await place.set({ ...updatedPlace });
      await place.save();
    }
    res.json();
  });
});

app.get('/view', async (req, res) => {
  res.json(await Place.find())
})

app.post('/bookings' , (req, res) => {
  const {place, guests, checkIn, checkOut, price} = req.body;
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, user) => {
    if (err) throw err;
    const doc = await Booking.create({place, guests, checkIn, checkOut, price, user: user.id})
    res.json(doc);
  });
})

app.get('/bookings' , (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, user) => {
    if (err) throw err;
    res.json(await Booking.find({user: user.id}).populate('place'));
  });
})

app.listen(4000);
