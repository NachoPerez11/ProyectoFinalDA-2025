import { createContext, useContext, useRef, useState } from "react";

const SnackbarContext = createContext(null);

export const useSnackbar = () => useContext(SnackbarContext);
export default useSnackbar;

const defaultItem = {
    message: 'Sin mensaje',
    variant: '',
    timeout: '3500'
}

export const SnackbarProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const lastId = useRef(0);
        
    function hideItemById(id){
        //setItems(items.filter(item => item.id !== id));
        setItems(items => items.map(item => item.id !== id? 
            item:{
                ...item,
                className: ' hide'
            }))
    }

    function enqueue(message, variant){
        let item = {...defaultItem};
        if(typeof message === 'string'){
            item.message = message;
        }
        else{
            item = { ...message};
        }
        if( typeof variant === 'string'){
            item.variant = variant;
        }
        else if (typeof variant === 'object'){
            item = { ...item, ...variant};
        }

        lastId.current++;
        item.id = lastId.current;
        setItems(items => [...items, item]);

        setTimeout(() =>hideItemById(item.id), item.timeout);
        
        return item;
    }

    return <SnackbarContext.Provider value = {{enqueue}}>
        <ul className="snackbar-container">
            {items.map(item => <li key={item.id} 
                className={'snackbar-item' + (item.className || '') + ' ' + item.variant}
                onClick={() => hideItemById(item.id)}>{item.message}</li>)}
        </ul>
        { children }
    </SnackbarContext.Provider>;
}