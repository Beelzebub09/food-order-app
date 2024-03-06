import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContex from '../store/CartContext.jsx';
import {currrencyFormatter} from '../util/formatting.js';
import Button from 'UI/Button.jsx';

export default function Cart() {
    const cartCtx = useContext(CartContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);


    return (
        <Modal className="cart">
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (<li key={item.id}>{item.name} - {item.quantity}</li>))}
            </ul>
            <p className="cart-total">{currrencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly>Close</Button>
                <Button>Go To Checkout</Button>
            </p>
        </Modal>
    );
}