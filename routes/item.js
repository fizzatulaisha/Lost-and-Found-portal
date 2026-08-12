const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const Item = require("../models/Item");
const upload = require("../config/multer");


// REPORT ITEM
router.post(
    "/report",
    upload.single("image"),
    async (req, res) => {
        try {
            const {
                status,
                itemName,
                category,
                date,
                loc,
                des,
                phone,
                note
            } = req.body;

            if (!req.file) {
                req.flash("error", "Please upload an image.");
                return res.redirect("/report");
            }

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "lost-and-found" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(req.file.buffer);
            });

            const item = new Item({
                status,
                itemName,
                category,
                date,
                loc,
                des,
                phone,
                note,
                image: result.secure_url,
                owner: req.session.userId
            });

            await item.save();

            req.flash(
                "success",
                "Item reported successfully!"
            );

            res.redirect("/browse");

        } catch (err) {
            console.log("REPORT ERROR:", err);

            req.flash(
                "error",
                "Unable to report item"
            );

            res.redirect("/report");
        }
    }
);


// EDIT PAGE
router.get("/:id/edit", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            req.flash("error", "Item not found");
            return res.redirect("/browse");
        }

        // Check ownership
        if (item.owner.toString() !== req.session.userId.toString()) {
            req.flash("error", "You can only edit your own items.");
            return res.redirect("/browse");
        }

        res.render("edit", { item });

    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong");
        res.redirect("/browse");
    }
});

router.put("/:id", async (req, res) => {
    try {

        console.log("UPDATE ID:", req.params.id);
        console.log("UPDATE DATA:", req.body);

        // Find the item first
        const item = await Item.findById(req.params.id);

        if (!item) {
            req.flash("error", "Item not found");
            return res.redirect("/browse");
        }

        // Check ownership
        if (item.owner.toString() !== req.session.userId.toString()) {
            req.flash("error", "You can only update your own items.");
            return res.redirect("/browse");
        }

        // Update the item
        await Item.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
                itemName: req.body.itemName,
                category: req.body.category,
                date: req.body.date,
                loc: req.body.loc,
                des: req.body.des,
                phone: req.body.phone,
                note: req.body.note
            },
            {
                new: true,
                runValidators: true
            }
        );

        req.flash("success", "Item updated successfully!");

        res.redirect("/browse");

    } catch (err) {

        console.log("UPDATE ERROR:");
        console.log(err);

        req.flash("error", "Unable to update item");

        res.redirect("/browse");
    }
});
// DELETE ITEM
router.delete("/:id", async (req, res) => {
    try {

        const item = await Item.findById(req.params.id);

        if (!item) {
            req.flash("error", "Item not found");
            return res.redirect("/browse");
        }

        // Check ownership
        if (item.owner.toString() !== req.session.userId.toString()) {
            req.flash("error", "You can only delete your own items.");
            return res.redirect("/browse");
        }

        await Item.findByIdAndDelete(req.params.id);

        req.flash("success", "Item deleted successfully!");

        res.redirect("/browse");

    } catch (err) {

        console.log(err);

        req.flash("error", "Unable to delete item");

        res.redirect("/browse");
    }
});

module.exports = router;