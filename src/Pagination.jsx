import React, { Fragment, useEffect, useState } from 'react'

const Pagination = () => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0)
    const [countPages, setcountPages] = useState(0)

    const isPagesInLocal = () => {
        const pages = localStorage.getItem('total-pages-q') || null;
        if (!pages) {
            return false
        }
        return true;
    }


    useEffect(() => {
        (async () => {
            const resp = await (await fetch(`https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=${offset}`)).json();
            if (!isPagesInLocal()) {
                const totalPages = Math.floor(resp.meta.count / 5)
                setcountPages(totalPages)
                localStorage.setItem('total-pages-q', totalPages)
            }
            setData(resp.data)
        })()
    }, [offset])

    const changePage=(offset)=>{
        setOffset(offset*5)
    }

    return (

        <Fragment>
            <h1><center>Series de Animes 🚀</center></h1>
            <center>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Images</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            data.length > 0 &&
                            data.map(item => (
                                <tr key={item.id}>
                                    <td >{item.attributes.titles.en}</td>
                                    <td ><img src={item.attributes.posterImage.medium}   alt="imagen" /></td>
                                </tr>

                            ))}
                    </tbody>
                </table>
            </center>
            <div className="pagination">
                {/* Puedes colocar un npm que mejore el diseño de la paginacion 👨‍💻 */}
                {
                    data.length > 0 &&
                    new Array(Number(localStorage.getItem('total-pages-q')) || countPages).fill().map((_, i) => i ).map((item, _i) =>
                    (
                        <span onClick={()=>changePage(_i)} key={_i} >{item+1}</span>
                    )
                    )}
            </div>
        </Fragment>
    )
}

export default Pagination
