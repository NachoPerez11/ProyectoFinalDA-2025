import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);
export default useModal;

export const ModalProvider = ({ children }) => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('Aviso');

    function open(content){
        if(typeof content === 'string')
            content = {content};
        setContent(content.content);
        setTitle(content.title || 'Aviso');
    }

    function close(){
        setContent('');
    }
    
    return <ModalContext.Provider value = {{open, close}}>
        {content && <div className="modal-background">
            <div className="modal-body">
                <div className="modal-head">
                    <div className="modal-title">
                        { title }
                    </div>
                </div> 
                <div className="modal-content">
                    { content }
                </div>    
                <div className="modal-foot">
                    <button onClick={() => setContent('')}>Cerrar</button>
                </div>
            </div>
        </div>}
        { children }
    </ModalContext.Provider>;
}