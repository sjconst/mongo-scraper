import React, { useState, useEffect} from "react";
import "./index.css";
import { Container, CardColumns, Row } from "react-bootstrap";
import API from "../Utils/API";
import ArticleCard from "../Components/Cards/ArticleCard";

function Home(){
    const [articles, setArticles] = useState([]);       
    useEffect(() => {  
        API.scrapeArticles()
        .then(response => {
          const today = new Date();
          const day = today => { 
          let newToday = today.getDate();        
            if(newToday < 10) {
              newToday = `0${newToday}`; 
            }
            return newToday;
          };
        const date = `${today.getFullYear()}-${today.getMonth()+1}-${day(today)}`;
        API.getArticlesByDate(date)
          .then(response => {
            let data = response.data;
            setArticles(data)
          })
        })       
    }, [])
    return (
        <div id="homeBackground">
        <Container id="homeContainer" >
          <Row className="transparent">           
              <h1>News Scraper</h1>
              <h4>Automatically grab the latest headlines. Build a list of saved articles. Comment and save notes as needed.</h4>              
            {articles.length ? (
              <CardColumns>                  
                {articles.map(el => (  
                  !el.saved &&
                    <ArticleCard key={el._id} id={el._id} summary={el.summary} headline={el.headline} isSaved={el.saved} URL={`https://www.nytimes.com${el.URL}`}/> 
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