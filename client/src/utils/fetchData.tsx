import axios from 'axios';

export const getDataAPI = async (url: string, token?: string) => await axios.get(`/api/${url}`, {
    headers: {
        Authorization: token
    }
});


export const postDataAPI = async (url: string, data?: any, token?: string) => await axios.post(`/api/${url}`,
    data,
    {
        headers: {
            Authorization: token
        }
    }
);


export const patchhDataAPI = async (url: string, data: any, token: string) => await axios.patch(`/api/${url}`,
    data,
    {
        headers: {
            Authorization: token
        }
    }
);



export const deleteDataAPI = async (url: string, token: string) => await axios.delete(`/api/${url}`,
    {
        headers: {
            Authorization: token
        }
    }
);
