import React from "react";
import { Card, Button } from "react-bootstrap";
import API from "../../Utils/API";
import "./index.css";

function ArticleCard(props){
    const saveArticle = e => {
        let id = e.target.id;
        let saved = true;             
        API.saveArticle(id,saved)
        .then(res => {
            console.log("saved");
            refreshPage();
        })
    }    
    const refreshPage = () => {
        window.location.reload(false);
    }
    return (      
        <Card key={props.id} >
            <Card.Body>
                <Card.Title><a href={props.URL}>{props.headline}</a></Card.Title>
                <Card.Text>{props.summary}</Card.Text>
            </Card.Body> 
            <Button className="myButton" id={props.id} data-saved={props.isSaved} onClick={saveArticle}>Save Article</Button>             
        </Card>
    )
}

export default ArticleCard;