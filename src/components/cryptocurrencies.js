import React, { useState,useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card , Row , Col , Input } from "antd"
import  { useGetCryptosQuery } from "../services/cryptoApi"
function Cryptocurrencies({simplified}) {
  const count = simplified ? 10 : 100
  const {data : cryptosList , isFetching} = useGetCryptosQuery(count)
  const [cryptos,setCryptos] = useState(cryptosList?.data?.coins)
  const [searchTerm,setSearchTerm] = useState('')
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins)
    const filteredData = cryptosList?.data.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()) )
    setCryptos(filteredData)
  },[cryptosList , searchTerm])
  if(isFetching) return "Loading...."
  // console.log(cryptos)
  return (
    <>
      {!simplified && (
        <div className='search-crypto' >
        <Input placeholder='Search Crypto' onChange={(e) => setSearchTerm(e.target.value)} ></Input>
      </div>
      )}
      <Row gutter={[10,10]} className="crypto-card-container" >
        {
          cryptos?.map((currency,i) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={i}>
              <Link to={`/crypto/${currency.uuid}`} >
                <Card
                   title = {`${currency.rank} . ${currency.name}`}
                   extra = {<img className='crypto-image' src={`${currency.iconUrl}`} />}
                   hoverable
                   >
                    <p>Price : {millify(currency.price)}</p>
                    <p>Market Cap : {millify(currency.marketCap)}</p>
                    <p>Daily Change : {millify(currency.change)}</p>
                   </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Cryptocurrencies
