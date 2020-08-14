# InternationalKarel

To translate any html file containing Javascript code (enclosed with \<code\> tags), do the following:

```python translate_html.py [FILE_PATH] [TARGET_LNG_1] [TARGET_LNG_2] [TARGET_LNG_3] ...```

You can add however many target languages you want. However, they must be supported by the Google Cloud Translate API. Each language should be formatted in the corresponding ISO-639-1 code in string form. (See https://cloud.google.com/translate/docs/languages for more details.)
