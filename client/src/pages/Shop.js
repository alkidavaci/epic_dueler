import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const itemData = require('./itemData.json')



function shopList() {
    
    
    return (
        <>
                {itemData.map((item) => (
                    <ListGroup key={item.name} className="section field label" style={{ border: '5px solid rgba(1, 1, 1, 1)', borderRadius: '40px', fontSize: '25px', padding:'25px'}}>
                        <ListGroup.Item>
                            <Badge style={{ display: 'inline-block', borderRadius: '60px', boxShadow: ' 0 0 8px #999', padding: '0.5em 0.6em', margin:'10px' }}>{item.icon}</Badge>
                             Weapon Name: {item.name} <Button style={{ backgroundColor: 'orange', borderRadius: '40px', padding: '10px', paddingTop: '3px', paddingLeft:'20px', position: 'absolute', right: '160px', alignItems: 'center', width: 'fit-content', display: 'initial', fontSize: '33px' }} >Purchase:  {item.price}💎</Button></ListGroup.Item>
                        <ListGroup.Item>Item Type: {item.itemtype}</ListGroup.Item>
                        <ListGroup.Item>Description: {item.description}</ListGroup.Item>
                    </ListGroup>
                ))
            }
            </>
        );
    }
    
    
    export default shopList;
    
    
    // Having trouble accessing the amount of gold the character has 
    
    // import { useState } from 'react';
    // const [inventory, setInventory] = useState([]);
    
    // const addToInventory = (item) => {
        //     setInventory([...inventory, item]);
        // const charGold = require('../../../server/models/Character')
// onClick={() => {
//     if (item.price > charGold.gold) {
//         alert('You cannot afford that item!')
//     } else {
//         addToInventory(item);
//         alert('Item added successfully to you inventory')
//     }
// }}