import React from "react";
import "./index.css";
import { Row, Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

function Footer(){  
      return (
        <div className="fixed-bottom" id="myFooter">            
            <Row id="footerRow">            
                <Col className="text-left">      
                    <a href="https://www.stephanielake.io" target="_blank" rel="noopener noreferrer">www.stephanielake.io</a>   
                </Col>                  
                <Col className="text-right"> 
                    <a href={`mailto:stephanie.c.lake@gmail.com`} target="_top"><FontAwesomeIcon icon={faEnvelopeOpen} className="social"/></a> 
                    <a href="https://www.linkedin.com/in/stephanie-lake-43b89140/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="social"/></a>
                    <a href="https://github.com/sjconst" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="social"/></a> 
                </Col>
            </Row>                
        </div>
    )
};
export default Footer;