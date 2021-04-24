import React from 'react';
import { useParams } from 'react-router-dom';
import { IParams } from 'typings/params';
import NotFound from 'components/NotFound';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const generatePage = (pageName: string) => {
    // upper the first letter
    pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

    // get all pages
    const component = () => require(`pages/${pageName}`).default;

    try {
        return React.createElement(component());
    } catch(e) {
        return <NotFound />
    }
}

const MaintRouter = () => {
    const { page, id  } = useParams<IParams>();
    const { auth } = useSelector((state: RootState) => state);
    let pageName = "";

    // check id
    if(auth.token) {
        if(id) {
            pageName = `${page}/[id]`;
        }  
        pageName = `${page}`
    }
    
    pageName = `${page}`
    return generatePage(pageName)
}

export default MaintRouter;
