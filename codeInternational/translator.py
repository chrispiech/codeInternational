
from google.cloud import translate_v2 as googleTranslate
import pickle
import os
import os.path
import sys
import json
import html
from constants import *
import translation_utils
sys.setrecursionlimit(10000)




caches = {}
forcedMaps = {}
client = None

def translate_with_forced(original, target_language, format = "html"):
	"""
	Translates, but first check "make_known_translations" form translation_utils
	"""
	if not SILENT: print(original)
	global forcedMaps
	if not target_language in forcedMaps:
		forcedMaps[target_language] = _loadForced(target_language)
	forced = forcedMaps[target_language]
	toTranslate = original

	# forced translations come first
	holderMap, toTranslate = replaceWithHolders(toTranslate, forced)

	# first, replace all the pre-translated identifiers
	toTranslate = translation_utils.make_known_translations(target_language, toTranslate)


	
	if not SILENT: print(" ~> " + toTranslate)
	toReturn = translate(toTranslate, target_language, "html")
	for holder in holderMap:
		value = holderMap[holder]
		toReturn = toReturn.replace(holder, value)
	toReturn = toReturn.replace('<span class="notranslate">', '')
	toReturn = toReturn.replace('</span>', '')
	if not SILENT: print(" => " + toReturn)
	if not SILENT: print("\n\n")
	return toReturn

def replaceWithHolders(toTranslate, forced):
	i = 0
	holderMap = {}
	for keyValue in forced:
		key, value = keyValue
		placeholder = str(SALT + i)
		# the holder value can't be something that will be
		# further replaced with other keys (eg run is in running)
		holder = '<span class="notranslate">'+placeholder+'</span>'
		holderMap[placeholder] = value
		toTranslate = toTranslate.replace(key, holder)
		i += 1
	return holderMap, toTranslate

'''
This is the method you should call anytime you want a translation.
It makes sure to cache all results.
'''
def translate(original, target_language, gtformat = "html"):
	global client
	global caches
	if client == None:
		client = googleTranslate.Client()
	if not target_language in caches:
		caches[target_language] = _loadCache(target_language)
	cache = caches[target_language]

	if original in cache:
		return html.unescape(cache[original])

	output = client.translate(original, 
		target_language=target_language, 
		source_language="en", 
		format_= gtformat)
	result = output["translatedText"]

	result  = html.unescape(result)

	
	cache[original] = result
	_saveCache(target_language, cache)
	return result

def _saveCache(target_language, cache):
	path = _getCachePath(target_language)
	pickle.dump(cache, open(path, 'wb'))

def _loadCache(target_language):
	path = _getCachePath(target_language)
	if os.path.isfile(path):
		return pickle.load(open(path, 'rb'))
	return {}

def _loadForced(target_language):
	path = _getForcedPath(target_language)
	if os.path.isfile(path):
		print(path)
		return json.load(open(path, 'r'))
	return {}

def _getForcedPath(target_language):
	return FORCED_ROOT + '/' + target_language + '.json'

def _getCachePath(target_language):
	return CACHE_ROOT + '/' + target_language + '.pkl'

