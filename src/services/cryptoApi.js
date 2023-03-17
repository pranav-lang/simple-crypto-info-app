import axios from "axios"
import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const cryptoApiHeaders = {
     'X-RapidAPI-Key': '406f9a825cmsh20fa979f603e41dp1b4f6djsn3de233e33309',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com/'
const createRequest = (url) => ({url,headers:cryptoApiHeaders})
export const cryptoApi =  createApi({
    reducerPath : 'cryptoApi',
    baseQuery : fetchBaseQuery({baseUrl : baseUrl }),
    endpoints : (builder) => ({
        getCryptos : builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails : builder.query({
            query : (id) => createRequest(`/coin/${id}`)
        }),
        getCryptoHistory : builder.query({
            query : ({coinId,timePeriod}) => createRequest(`coin/${coinId}/history?timeperiod=${timePeriod}`)
        }),
    })
})

export  const  {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi
