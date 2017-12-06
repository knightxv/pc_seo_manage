'use strict';

exports.format = (timestrap) => {
    const date = new Date(timestrap)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
