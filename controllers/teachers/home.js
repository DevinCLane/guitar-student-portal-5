module.exports = {
    getIndex: (req, res) => {
        res.render("teachers/index", {
            title: "Teacher Portal",
        });
    },
};
