const express = require('express')
const router = express.Router()
const admin = require('../model/Admin/RegisterSchema')
const studentData = require('../model/Admin/AddStudent')
const Event = require('../model/Admin/Event')
const bcrypt = require('bcrypt')
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

router.post('/register', async (req, res) => {
    const { userid, password } = req.body;
    let secpassword = await bcrypt.hash(password, 12);
    try {
        const newadmin = new admin({ userid, password: secpassword })
        const usr = await newadmin.save();
        return res.status(200).json({ success: true })

    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }

})

router.post('/login', async (req, res) => {
    let userid = req.body.userid;
    try {

        let adminData = await admin.findOne({ userid })

        if (!adminData) {
            return res.status(400).json("Invalid data")
        }

        else {
            const pwd = await bcrypt.compare(req.body.password, adminData.password)

            if (!pwd) {
                return res.status(400).json("Invalid Credential")
            }
            else {
                const authtoken = await adminData.generateAuthToken();
                return res.status(200).json({ success: true, authtoken })
            }

        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ success: false })
    }
})


router.post('/addstudent', async (req, res) => {
    const { name, department, from, to, email, phone, role, address, img } = req.body;
    try {
        const newitem = new studentData({ name, department, from, to, email, phone, role, address, img })
        const usr = await newitem.save();
        return res.status(200).json({ success: true })

    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})
router.patch('/forgotpassword/:userid', async (req, res) => {
    const userid = req.params.userid
    let k = req.body.key
    console.log(k)
    console.log(userid)
    try {
        const query = { userid: new Object(userid) }

        let key = "hello";
        if (key === k) {
            const updates = {
                $set: {
                    password: await bcrypt.hash(req.body.password, 12)
                }
            };
            const data = await admin.findOne({ userid });
            if (!data) {
                return res.status(404).json("user Does not exist");
            }
            else {
                const result = await admin.updateOne(query, updates);
                return res.status(200).json({ success: true });
            }
        } else {
            return res.status(400).json("Invalid");

        }
    } catch (err) {
        console.log(err);
        res.status(404).json({ success: false });
    }
});

router.get('/studentData', async (req, res) => {
    try {
        const results = await studentData.find({});
        res.send(results).status(200);
    } catch (err) {
        console.log(err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const query = { _id: new ObjectId(id) };
        const updates = {
            name: req.body.name,
            department: req.body.department,
            from: req.body.from,
            to: req.body.to,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            address: req.body.address,
            img: req.body.img,
        };

        const result = await studentData.findByIdAndUpdate(id, updates, { new: true });
        if (!result) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json({ success: true, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ObjectId');
        }
        const query = { _id: new ObjectId(id) };
        const collection = await mongoose.connection.db.collection("studentdatas");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);


    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})


router.post('/createevent', async (req, res) => {
    const { eventname, date, time, description, img } = req.body;
    try {
        const newevent = new Event({ eventname, date, time, description, img })
        const events = await newevent.save();
        return res.status(200).json({ success: true })

    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})

router.get('/events', async (req, res) => {
    try {
        const results = await Event.find({});
        res.send(results).status(200);
    } catch (err) {
        console.log(err)
    }
})

router.patch('/updatevent/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const query = { _id: new ObjectId(id) };
        const updates = {
            $set: {
                eventname: req.body.eventname,
                date: req.body.date,
                time: req.body.time,
                description: req.body.description,
            }
        }
        if (req.body.img !== undefined) {
            updates.$set.img = req.body.img;
        }

        const collection = await mongoose.connection.db.collection('events')
        const result = await collection.updateOne(query, updates)

        

        res.status(200).json({ success: true, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/event/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ObjectId');
        }
        const query = { _id: new ObjectId(id) };
        const collection = await mongoose.connection.db.collection("events");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);


    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})


module.exports = router;