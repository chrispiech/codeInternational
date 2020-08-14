# Runs the scripts to generate templates for a translated version of the reader
# Expects one argument: an ISO 639-1 code for the target language

# export GOOGLE_APPLICATION_CREDENTIALS="/Users/piech/Documents/Cloud/credentials/PiechLab-1970b602fedd.json"

# python3 translation/translate_java.py $1 templates/en/text/code/*.java

# Translate all the code twice so that identifiers are correctly translated in
# comments. Doing one pass and post-processing makes the number of dashes
# wrong if any changes were made from identifiers having been added

python3 codeInternational/translate_python.py es templates/python/en/text/code/*.py

python3 codeInternational/translate_templates.py es templates/python/en/pages/*.html
python3 codeInternational/translate_templates.py es templates/python/en/parts/*.html
python3 codeInternational/translate_templates.py es templates/python/en/programs/*.html
python3 codeInternational/translate_templates.py es templates/python/en/text/*.html

# we need to copy over the API json for the karel VM
cp api/python/es.json docs/karel/js/api/python/

# After several instances of not remembering to compile afterward: compile here
python3 compile.py -t
# Assumes local compilation; can be re-compiled for deployment version afterward