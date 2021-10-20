export const notFoundError = (name, id) => {
    const message = `${name} with id of ${id} was not found`;

    let error = new Error(message);
    error.status = 404;
    return error;
};
