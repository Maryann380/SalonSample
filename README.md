# SalonSampleNIGHTWATCH SETUP
#Step 1: Setting Installing the Environment

#Navigate into the Directory in which you want to run the test
###Navigate into that Directory in your terminal once inside the terminal type the following commands:
##$ sudo npm install -g nightwatch //this would download the nigh watch app globally
#$ sudo npm install selenium-standalone —save-dev //This commands installs selenium-standalone and also stores it in the packege.json file.

#STEP 2 : STARTING UP SELENIUM_STANDALONE SERVER

#Open a Terminal and follow this instructions:
	#a. sudo npm install selenium-standalone@latest -g
	#b. sudo selenium-standalone install
	#c. selenium-standalone start


#STEP3: SETTING UP NIGHTWATCH

#Go into the package.json file and edit it type this underneath the script section:
	#a. ”e2e-setup”: “node_modules/selenium-standalone/bin/selenium-standalone install”


#After this is done run:
	b : sudo npm run e2e-setup
	c:  In you directory create a new file call it “nightwatch.json”
	d. Follow the configuration code into the nightwatch.json file as stated in the link: http://nightwatchjs.org/gettingstarted	
#Step 4: Writing your first Code:
	a. Create a new folder in your directory call it ej_unit-test( Make sure the  src_folders points the the file in which you wish to test in this case it would be the new folder you created eg. "src_folders" : [“ej-unit-test"],).
	b. Inside the folder ej_unit-test create a new file call it anything you want. Paste this code inside it as an example to see if it works.
	
	module.exports = {
		  /*'Does not show the task list if there are no tasks'(client) {
		    client	
		      .url('http://localhost:9000/')
		      .pause(10000)
		    client.end();
		  },

	 3. $ sudo npm test.

