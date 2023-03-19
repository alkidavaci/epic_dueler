import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SHOP } from "../utils/gql/queries";
import { ADD_ACCOUNT, UPDATE_INVENTORY } from '../utils/gql/mutations';
import Auth from '../utils/Auth';
var itemData;



function Shop() {
    const { loading, data: data1, error} = useQuery(QUERY_SHOP);
    const [purchaseItem, { error: purchaseError, data: purchaseData }] = useMutation(UPDATE_INVENTORY);
    var data2;
    data1? itemData = data1.shop : data2 = loading;
    console.log(data2);
    console.log(itemData);
    // const itemData = JSON.stringify(shopData.shop)
    const handlePurchase = async (item) => {
        console.log(item);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }
        try {
            var action = 'buy';
            const { data } = await purchaseItem({
               variables: { itemId: item, action: action },
             });
        
        } catch (err) {
          console.error(JSON.parse(JSON.stringify(err)));
        }
      };
    return (
        <>
                {loading ? (
        <div>Loading...</div>
      ) : ( itemData.map((item) => (
                    <ListGroup key={item.name} className="section field label" style={{ border: '5px solid rgba(1, 1, 1, 1)', borderRadius: '40px', fontSize: '25px', padding:'25px'}}>
                        <ListGroup.Item>
                            <Badge style={{ display: 'inline-block', borderRadius: '60px', boxShadow: ' 0 0 8px #999', padding: '0.5em 0.6em', margin:'10px' }}>{item.icon}</Badge>
                             Weapon Name: {item.name} 
                             <Button onClick={() => handlePurchase(item._id)} style={{ backgroundColor: 'orange', borderRadius: '40px', padding: '10px', paddingTop: '3px', paddingLeft:'20px', position: 'absolute', right: '160px', alignItems: 'center', width: 'fit-content', display: 'initial', fontSize: '33px' }} >{item.price}💎</Button></ListGroup.Item>
                        <ListGroup.Item>Item Type: {item.itemtype}</ListGroup.Item>
                        <ListGroup.Item>Description: {item.description}</ListGroup.Item>
                    </ListGroup>
                )))
            }
            </>
        );
    }
    
    
    export default Shop;
    
    
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