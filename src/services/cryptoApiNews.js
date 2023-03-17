import axios from "axios"
import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '406f9a825cmsh20fa979f603e41dp1b4f6djsn3de233e33309',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/'

const createRequest = (url) => ({url,headers:cryptoNewsApiHeaders})
export const cryptoNewsApi = createApi({
    reducerPath : 'cryptoNewsApi',
    baseQuery : fetchBaseQuery({baseUrl : baseUrl}),
    endpoints : (builder) => ({
        getCryptoNews : builder.query({
            query : ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export  const  {
    useGetCryptoNewsQuery,
} = cryptoNewsApi
