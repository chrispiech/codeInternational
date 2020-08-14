This project includes both the codeInternational library as well as an example of its use: translation of an entire online text book (written in both Java and Python) into different human languages

Dependancies:
python -m pip install google-cloud-translate
python -m pip install lxml
python -m pip install bs4

You need to set up a google acount to run the tranlsation. Otherwise you will get an error like:
google.auth.exceptions.DefaultCredentialsError: Could not automatically determine credentials. Please set GOOGLE_APPLICATION_CREDENTIALS or explicitly create credentials and re-run the application. For more information, please see https://cloud.google.com/docs/authentication/getting-started
You will 
1. Download a private key for your google account and then write a line like the following
2. export GOOGLE_APPLICATION_CREDENTIALS="/Users/Chris/Documents/Keys/PiechLab-391cf5d56833.json"

Make sure to set up a file with forced translations and to set the constant with the corresponding file_path in constants.py