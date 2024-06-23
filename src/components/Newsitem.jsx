import React from 'react'

const Newsitem = ({ title, image, desc, source, author, published, dark }) => {

    const custdesc= "No news article is currently available to read here. To access the full article and stay updated with the latest news, please click on the 'Read more' link. Thank you for your understanding and patience as we strive to bring you the latest updates.";
    const truncateDesc = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    return (
        <>
            <div className={dark? "active item": "item"}>
                <h3 className={dark? "active": ""}>{title}</h3>
                <img src={image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3jhdlr9vMe9nEqiYaAwr4h-jMrmr_fhiqVw&s"} alt="" width={"90%"} />
                <p className={dark? "active desc": "desc"}>
                    {!desc || desc.length < 110 ? custdesc : truncateDesc(desc, 200)}
                </p>
                <div className="pub">
                <p className={dark? "active": ""} ><b>Author : </b >{author}</p>
                <p className={dark? "active": ""} ><b>Published at : </b >{published}</p>
                </div>
                <a href={source} target="_blank" >Read More</a>
            </div>
        </>
    )
}

export default Newsitem
