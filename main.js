const open = require('./node_modules/open')
const dotenv = require('dotenv');
const { Client } = require ("@notionhq/client");
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { 
          title:[
            {
              "text": {
                "content": `${text}`
              }
            }
          ]
        }
      },
    })
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}

addItem(process.argv[2]);