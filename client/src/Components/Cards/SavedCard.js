import React, {useState} from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import API from "../../Utils/API";
import "./index.css";

function SavedCard(props){   
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const unsaveArticle = e => {
        let id = e.target.dataset.id;
        let saved = false;              
        API.saveArticle(id,saved)
        .then(res => {
            console.log("unsaved");
            refreshPage();
        })
    }
    const refreshPage = () => {
        window.location.reload(false);
    }
    const getComments = e => {
        let id = e.target.dataset.id;
        console.log(id);
        API.getOneArticle(id)
        .then(response => {            
            let data = response.data.comment;    
            console.log(data)      
            setComments(data)
            handleShow();
        })
    };
    const saveComment = e => {
        e.preventDefault();
        const id = e.target.dataset.id;      
        handleClose();
        console.log(input);
        console.log(id);
        API.saveComment(id, input)
        .then(res => {
            console.log("comment saved"); 
            setInput("");           
        })
    };
    const handleInputChange = e => {
        e.persist();
        const newComment = e.target.value;        
        setInput(newComment)
    };
    const deleteComment = e => {
        const id = e.target.dataset.id;
        API.deleteComment(id)
        .then(res => {
            handleClose();
        })
    };
    return (      
        <Card key={props.id} >
            <Card.Body>
                <Card.Title><a href={props.URL}>{props.headline}</a></Card.Title>
                <Card.Text>{props.summary}</Card.Text>
            </Card.Body> 
            <Button className="myButton" data-id={props.id} data-saved={props.isSaved} onClick={unsaveArticle}>Delete from saved</Button>     
            <Button className="myButton" data-id={props.id} onClick={getComments}>Comments</Button>    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {comments.length ? (
                        <div>               
                            {comments.map(el => ( 
                                <div key={el._id}>                   
                                    <p id="myComment" key={el._id}>{el.body} <Button onClick={deleteComment} variant="secondary" size="sm" data-id={el._id}>Delete</Button></p>  
                                </div>
                            ))}
                        </div>
                    ) : (
                    <p>No Comments to Display</p>
                    )}
                    <Form.Control id="myForm" onChange={handleInputChange} value={input} type="text" placeholder="Enter new comment" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button data-id={props.id} variant="primary" onClick={saveComment}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>    
        </Card>
    )
}

export default SavedCard;