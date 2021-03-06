export const editData = (data: any, id: string, post: any) => {
    const newData = data.map((item: any) =>
        item._id === id ? post : item
    );
    return newData;
}

export const deleteData = (
    data: any,
    id: any
) => {
    const newData = data.filter((item: any) => item._id !== id);
    return newData;
}