
# NodeJS based backend API for generating RSS feeds
This project implements backend NodeJS-based API for 
blog feed generation

## Setting up the project locally
`` git clone https://github.com/thisisrajiraj/rssfeed ``

*** Pre-requisites: *** 
You need to have Node JS LTS installed

cd into the folder containing package.jso. Run:

`` npm install ``

## Running the project
To run the project, create a .env file in the root folder containing package.json.
Add to the file the following vaiables:

Setting name | Setting Value
------------ | -------------
FEED_TITLE| Title for your RSS feed
INDEX_URL| URL of a json file containing the feed index
ROOT_URL| Root URL of each feed item content
ENABLED_CONTENT| If the output XML should contain content tag
BLOG_URL| URL for your blog site

.env file format is described [here] (https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)

Index file in `INDEX_URL` should be served as a json in a HTTP location. The format 
is as in the following example:
```json
 [
    {
        "date": "September 6, 2018",
        "name": "foo",
        "title": "How to not foo"
    },
    {
        "date": "September 11, 2018",
        "name": "bar",
        "title": "How to not bar"
    }
 ]
 ```
 In this example, if `INDEX_URL` is "http://contoso.com/blogindex.json" and `POST_CONTENT_URL` 
 is "http://contoso.com/posts", then the following locations should be valid and reachable:

 * http://contoso.com/posts/bar
 * http://contoso.com/posts/foo
 * http://contoso.com/blogindex.json

## Running the app

`` npm start ``

This starts the app. You can browse to the Feed API on 
http://localhost:3000/Feed

## Deploying the project on a Windows machine in Azure
web.config that is checked in in key to getting a Node Express
server serving from a windows machine when deployed on Azure.

Happy development!