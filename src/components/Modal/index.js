import React from 'react';
import './modal.scss';

function Modal({ show, children, onClick }) {
    return show && (
        <div className="modal" onClick={ onClick }>
            <div className="mask">
            </div>
            <div className="content">
                { children }
            </div>
        </div>
    )
}
export default Modal;