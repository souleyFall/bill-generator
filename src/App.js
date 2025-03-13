// App.js
import React from 'react';
import BillDetails from './components/BillDetails';
import ItemList from './components/ItemList';
import TotalAmount from './components/TotalAmount';
import { jsPDF } from 'jspdf';
import './styles/App.css';

function App() {
    const [items, setItems] = React.useState([]);

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const calculateTotalAmount = () => {
        return items.reduce(
            (total, item) =>
                total +
                item.quantity *
                item.price, 0);
    };

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        pdf.text('Facture', 20, 20);
        pdf.text(`item               quantité               prix`,20,30);
        items.forEach((item, index) => {
            pdf.text(
                `${item.item}               ${item.quantity}               ${item.price}`
            , 20, 40+index*10);
        });
        const totalAmount =
            calculateTotalAmount();
        pdf.text(
            `Total:      ${totalAmount.toFixed(2)} €`, 20, 40+items.length*10);
        pdf.save('facture.pdf');
    };

    return (
        <div className="App">
            <h1>Bill/Invoice Generator</h1>
            <BillDetails onAddItem={handleAddItem} />
            <ItemList items={items}
                onDeleteItem={handleDeleteItem} />
            <TotalAmount
                total={calculateTotalAmount()} />
            <button
                onClick={handleDownloadPDF}>Download PDF</button>
        </div>
    );
}

export default App;
