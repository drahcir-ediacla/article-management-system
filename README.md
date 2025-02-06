# ai-fe-exam
Archintel Developer Exam

## Specifications
- Develop a Writer/Editor Dashboard Site that has the ablity to create, edit, and publish an article related to a company. 
- Should implement web responsive front-end application using Vue.js.
- No using of pre-made template
- Able to demonstrate backend server (or a mockup server) connected to front-end app. Can use any programming language.
- Should implement a login function for both writer and editor users
- Adding of users will be done by the editor

## Scoring
- Implemented functionalities
- Implementation of HTML, CSS and Javascript 
- Implementation of Backend server or Mockup Server

## Must Have Output (IMPORTANT! Failure to provide one or more items means incomplete output)
 1. Live link - url of your deployed output. 
 2. Project files - (both front-end and back-end or mockup server) your source code, it could be uploaded in github or bitbucket (must be set to public in order to access) and must provide a readme file with instructions on how to run your output
 3. PROVIDE SAMPLE CREDENTIALS for both writer user and editor user logins. 

## Database 
* Company
    * id
    * logo (url)
    * name (text)
    * Status [Active,Inactive]
* User 
    * id
    * Firstname (text)
    * Lastname (text)
    * Type [Writer,Editor]
    * Status [Active,Inactive]
* Article
    * id
    * Image (url, url of the saved image file in the server, do not use blob data type) 
    * Title (text)
    * Link (url)
    * Date (Date)
    * Content (text)
    * Status [For Edit, Published]
    * Writer (User FK)
    * Editor (User FK)
    * Company (Company FK)

## Forms & Fields

* User
    * firstname - text field (required)
    * lastname - text field (required)
    * type - select field (required)
    * status select field (required)
    
* Company:
    * logo - text field (required)
    * name - text field (required)
    * status - select field (required)

* Article
    * related company - select field (required, options select from company)
    * image - insert image file (required, must implement uploading of image file)
    * title - text field (required)
    * Link -  text field (required, must be a valid URL)
    * Date - date picker (required, must default to current date)
    * Content - text editor or WYSIWYG editor (required) 


## User access & actions
* Writer User
    * Actions:
        * Create article (on create, must automatically set Article Status Field to "For Edit" and Writer to current user), 
        * Edit an unpublish article (can only edit articles where Status is "For Edit") 
    * Pages:
        * Writer's Dashboard
            * must show 2 list of articles: For Edit (Status is "For Edit") and Published (Status is "Published")
            * each article of both lists must display the following fields: Image, Title, Link, Date, Writer Name and Editor Name
        * All Media
            * show all articles being created in tabular display and must show the following columns: 
                actions (includes the edit action), image, title, link, writer, editor, status 
            * RESTRICT the writer to edit a published article (Status is "Published")
     
* Editor User
    * Actions: 
        * Edit and Publish articles 
            -In Edit Article Form, there must be 2 buttons "Save" and "Publish", 
            * where if clicked on Save, will update the record 
            * else if clicked on Publish, will update the record and also sets the Status to "Publish" and sets the Editor to current user
        * Ability to manage users (create and updating)
        * Ability to mange companies (create and updating)
    * Pages: 
        * Editor's Dashboard
            * must show 2 list of articles: For Publish (Status is "For Edit") and Published (Status is "Published")
            * Each item of both lists must display the following fields: Image (thumbnail), Title, Link, Date, Writer Name and Editor Name
        * All Media
            * show all articles being created in tabular display and must show the following columns: 
            actions (includes the edit action), image (thumbnail), title, link, writer, editor, status 

