# Sample AWS Lambda function for Alexa
When your 7-year-old gets a mood ring on vacation and constantly asks what a certain color means, you make an Alexa skill for it.

## Concepts
* This is heavily based on the [Alexa Fact Skill Sample for Node](https://github.com/alexa/skill-sample-nodejs-fact).
* It demonstrates how to create a Lambda function for handling Alexa Skill requests.
* It also demonstrates using custom slot types to handle a finite set of known values

## Setup
To run this example skill you need to do a few things. 
1. Pull down the code and run `npm install` to install the Alexa SDK for Node.js.
2. Deploy the example code in AWS Lambda.
3. Configure the Alexa skill to use AWS Lambda.

### AWS Lambda Setup
1. Go to the AWS Console and click on the Lambda link. Note: ensure you are in us-east or you won't be able to use Alexa with Lambda.
2. Click on the Create a Lambda Function or Get Started Now button.
3. Select Blank Function under Blueprint on the next screen.
4. On the next screen, "Configure triggers", click the outlined box and select "Alexa Skills Kit" in the dropdown that appears. Click next.
5. Name the Lambda Function "moodRing" (or whatever you want). Add a description if you like.
6. Select the runtime as Node.js. As of this writing, Lambda supports Node 6.10.
7. Go to the the src directory, select all files and then create a zip file, make sure the zip file does not contain the src directory itself, otherwise Lambda function will not work.
8. Change Code entry type to "Upload a .ZIP file" and then upload the .zip file to the Lambda. No changes to the encryption helpers or Environment variables are needed for this skill.
9. Keep the Handler as index.handler. This refers to the function exported in the index.js file in the zip.
10. Select "Choose an existing role" for Role, and "service-role/lambda_basic_execution" for Existing Role.
11. No Tags are needed, and leave the Advanced settings as the defaults.
12. Click "Next" and review the settings then click "Create Function".
13. Click the "Actions" dropdown and select "Publish new version". Add a description that is meaningful to you, it's not used for any other purpose. Note: Only published versions can be used by your Alexa Skill.
14. Copy the ARN from the top right to be used later in the Alexa Skill Setup.
15. Click the "Actions" dropwdown again and select "Configure test event". For "Sample event template", scroll down to Alexa -> Alexa Start Session. I'm sure you can get more advanced here, but this basic step is necessary because subsequent uploads of your skill code will run a test, and it will fail if you leave the Hello World test as the default.

**Note:** Each time you upload a new ZIP of your code, you will need to publish a new version and copy the new ARN in the top right corner. A version number is incremented at the end of each ARN, like this: arn:aws:lambda:us-east-1:486600117452:function:testSkill:1

**Another important note**: You also need to go to the "Triggers" tab, select "Add trigger", click the gray box and select "Alexa Skills Kit" each time you publish a new version of your code. Not sure why that is not saved. 

**Pay it forward** If you find this process to be different or I've missed a step, feel free to send a pull request. This process is not at all intuitive, and there is a lot of old and conflicting information out there. Good luck!

### Alexa Skill Setup
1. Go to the [Alexa Console](https://developer.amazon.com/edw/home.html) and click Add a New Skill.
2. Set "Mood Ring" as the skill name and "mood ring" as the invocation name, this is what is used to activate your skill. For example you would say: "Alexa, Ask mood ring what red means."
3. Select the Lambda ARN for the skill Endpoint and paste the ARN copied from above. Click Next.
4. Copy the custom slot types from the customSlotTypes folder. Each file in the folder represents a new custom slot type. The name of the file is the name of the custom slot type, and the values in the file are the values for the custom slot.
5. Copy the Intent Schema from the included IntentSchema.json.
6. Copy the Sample Utterances from the included SampleUtterances.txt. Click Next.
7. [optional] go back to the skill Information tab and copy the appId. Paste the appId into the index.js file for the variable APP_ID,
   then update the lambda source zip file with this change and upload to lambda again, this step makes sure the lambda function only serves request from authorized source.
8. You are now able to start testing your sample skill! You should be able to go to the [Echo webpage](http://echo.amazon.com/#skills) and see your skill enabled.
9. In order to test it, try to say some of the Sample Utterances from the Examples section below.
10. Your skill is now saved and once you are finished testing you can continue to publish your skill.

## Examples
    User: "Alexa, ask mood ring what red means."
    Alexa: "You are excited and adventurous. Go get 'em, tiger."