import React from "react";
import Header from "../components/Utils/header";
import Footer from "../components/Utils/footer";
import Accordion from "../components/Utils/Accordion";
import AccordionBody from "../components/Utils/AccordionBody";
import { useEffect, useState } from "react";

export default function FAQs(props) {
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`/api/faqs`,{
            method: "get",
            credentials: "include",
        })
        .then(
            (res) => {
                if (res.ok) return res.json();
                else throw Error("Something went wrong!!!");
            }
        )
        .then(
            (data) => {
                setData(data);
            }
        )
        .catch((err)=>{
           
        })
    },[])

    return(
        <div>
            <div className="headings">
                <Header
                isAuthenticated={props.isAuthenticated}
                setIsAuthenticated={props.setIsAuthenticated}
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
                />
            </div>
            <div className="faqs">
                <div className="title">
                    <h3>Frequently Asked Questions</h3>
                </div>
                {data && 
                    data.map((item, index)=>{
                        return (
                        <Accordion title={item.Question}>
                            <AccordionBody 
                                description={item.Answer}
                            />
                        </Accordion>
                        )
                    })
                }
            </div>
                
            <Footer />
        </div>
    )
}