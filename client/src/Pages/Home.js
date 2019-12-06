import React, { useState, useEffect} from "react";
import "./index.css";
import { Container, CardColumns, Row } from "react-bootstrap";
import API from "../Utils/API";
import ArticleCard from "../Components/Cards/ArticleCard";

function Home(){
    const [articles, setArticles] = useState([]);       
    useEffect(() => {  
        API.scrapeArticles()
        .then(response => API.getArticles())
        .then(response => {
            let data = response.data;
            console.log(data[0].dateCreated); 
            const today = new Date();
            const day = today => {
              
              if()
            }
            const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
            console.log(date)
            setArticles(data);            
        })
    }, [])
    return (
        <div id="homeBackground">
        <Container id="homeContainer" >
          <Row>
            <h1>News Scraper</h1>
            <h4>Automatically grab the latest headlines. Build a list of saved articles. Comment and save notes as needed.</h4>  
            {articles.length ? (
              <CardColumns>                  
                {articles.map(el => (  
                  !el.saved &&
                    <ArticleCard key={el._id} id={el._id} summary={el.summary} headline={el.headline} isSaved={el.saved}/> 
                ))}
              </CardColumns>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Row>
        </Container>
        </div>
    )
};

export default Home;