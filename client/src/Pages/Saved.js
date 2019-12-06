import React, { useState, useEffect } from "react";
import API from "../Utils/API";
import { Container, CardColumns, Row } from "react-bootstrap";
import SavedCard from "../Components/Cards/SavedCard";
import { Link } from "react-router-dom";

function Saved(){
    const [savedArticles, setSavedArticles] = useState([]);       
    useEffect(() => {    
        API.getSaved()
        .then(response => {
            let data = response.data; 
            setSavedArticles(data)
        })
    }, [])
    return (
        <div id="saveBackground">
        <Container id="saveContainer" >
          <Row>
            <h1>Your Saved Articles</h1>              
            {savedArticles.length ? (
                <CardColumns>                  
                    {savedArticles.map(el => (
                        <SavedCard id={el._id} summary={el.summary} headline={el.headline} isSaved={el.saved}/>                  
                    ))}
                </CardColumns>
            ) : (
                <Container>
                    <h3>Oops, looks like you don't have any saved articles!</h3>
                    <h4><Link to="/">Browse Articles</Link></h4>
                </Container>  
            )}
          </Row>
        </Container>
        </div>
    )
}

export default Saved;