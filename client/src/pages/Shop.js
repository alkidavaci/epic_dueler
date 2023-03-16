import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const itemData = require('./itemData.json')


function HorizontalResponsiveExample() {
    return (
        <>
            {itemData.map((item) => (
                <ListGroup key={item.name} className="section field label" style={{ border: '5px solid rgba(1, 1, 1, 1)', borderRadius: '40px', fontSize: '25px' }}>
                    <ListGroup.Item><Badge style={{ display: 'inline-block', borderRadius: '60px', boxShadow: ' 0 0 8px #999', padding: '0.5em 0.6em' }}>{item.icon}</Badge> Weapon Name: {item.name} <Badge style={{ backgroundColor: 'orange', borderRadius: '40px', padding: '7px', position: 'absolute', right: '160px', alignItems: 'center', width: 'fit-content', display: 'block' }}  >Price: {item.price}</Badge><Button variant="primary">Primary</Button></ListGroup.Item>
                    <ListGroup.Item>Item Type: {item.itemtype}</ListGroup.Item>
                    <ListGroup.Item>Description: {item.description}</ListGroup.Item>
                </ListGroup>
            ))
            }
        </>
    );
}

export default HorizontalResponsiveExample;