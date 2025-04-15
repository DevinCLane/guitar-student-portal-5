const formatSingleDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)} ${year}`;
};

const formatDate = (lessons) => {
    if (Array.isArray(lessons)) {
        lessons.forEach((lesson) => {
            lesson.formattedDate = formatSingleDate(lesson.date);
        });
        return lessons;
    } else {
        lessons.formattedDate = formatSingleDate(lessons.date);
        return lessons;
    }
};

module.exports = formatDate;
