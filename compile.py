#!/usr/bin/env python
# coding=utf8
from plugins.bottle.bottle import SimpleTemplate

import os
import sys
import time


TEMPLATES_DIR = 'templates'
PAGES_DIR = 'pages'
DOCS_ROOT = 'docs'
PROG_LANGUAGES = [
    'java',
    'python'
]

LANGUAGES = {
                'en':'English',
                'es':'Español',
                'de':'Deutsch',
                'sw':'Kiswahili',
                'zh':'普通话',
                'ms':'Melayu',
                'tr':'Türk',
                'cs':'Češky',
                'fr':'Français',
                'ar':'Arabe',
                'hi':'हिंदी',
                'he':'עברית',
                'pt':'Português',
                'ja':'日本人'
            }

class Compiler(object):

    # Function: Run
    # -------------
    # This function compiles all the html files (recursively)
    # from the templates dir into the current folder. Folder
    # hierarchy is preserved
    def run(self):
        print('compiling')
        print('---------')

        # first compile the root index.html
        fromPath = os.path.join(TEMPLATES_DIR, 'index.html')
        toPath = os.path.join(DOCS_ROOT, 'index.html')
        self.compileTemplate('index.html', fromPath, toPath, '', 'en')

        # first compile the root index.html
        fromPath = os.path.join(TEMPLATES_DIR, 'reader.html')
        toPath = os.path.join(DOCS_ROOT, 'reader.html')
        self.compileTemplate('reader.html', fromPath, toPath, '', 'en')

        for progLang in PROG_LANGUAGES:
            print('compiling for {} ({}):'.format(progLang, progLang))
            # then compile the landing page for java and python
            fromPath = os.path.join(TEMPLATES_DIR, progLang+'/index.html')
            toPath = os.path.join(DOCS_ROOT, progLang+'/index.html')
            self.compileTemplate('index.html', fromPath, toPath, progLang, 'en')
            for lang in LANGUAGES:
                print('  - compiling for {} ({}):'.format(lang, self.getLangName(lang)))
                webpageFilePaths = self.getWebpageFilePaths(progLang, lang)
                if len(webpageFilePaths) == 0:
                    print('  no templates found for {} ({})'.format(lang, self.getLangName(lang)))
                    continue

                # Create directory for final pages if this is the first time compiling for a language
                langPath = DOCS_ROOT + '/' + progLang + '/' + lang
                self.makePath(langPath)
                for webpage in webpageFilePaths:
                    fromPath = os.path.join(TEMPLATES_DIR, progLang, lang, PAGES_DIR, webpage)
                    toPath = os.path.join(langPath, webpage)
                    print('    - ' + fromPath)
                    self.compileTemplate(webpage, fromPath, toPath, progLang, lang)
                print('')
        

    #####################
    # Private Helpers
    #####################

    def compileTemplate(self, page, fromPath, toPath, progLang, lang):
        # print(toPath)
        # note: all pages are in language/page
        pathToRoot = '../../'
        templateText = open(fromPath).read()
        data = {
            'pathToRoot':pathToRoot,
            'lang':lang,
            'progLang':progLang,
            'langName':self.getLangName(lang),
            'page':page
        }
        try:
            compiledHtml = SimpleTemplate(templateText).render(data)
            self.makePath(toPath)
            fileName, fileExtension = os.path.splitext(fromPath)
            compiledHtml = compiledHtml.encode('utf8')
            open(toPath, 'wb').write(compiledHtml)
        except Exception as err:
            print('failed to compile: ', fromPath)
            print('error: {}'.format(err))


    def getLangName(self, lang):
        return LANGUAGES[lang]

    def makePath(self, path):
        dirPath = os.path.dirname(path)
        if dirPath == '': return
        if not os.path.exists(dirPath):
            os.makedirs(dirPath)
        
    def getPathToRoot(self, relativePath):
        return DOCS_ROOT
        # return self.getRelPathToRoot(relativePath)

    def getRelPathToRoot(self, relativePath):
        dirs = self.splitDirs(relativePath)
        depth = len(dirs) - 1
        pathToRoot = ''
        for i in range(depth, 0, -1):
            curr = dirs[i]
            pathToRoot += '../'
        print(relativePath, pathToRoot)
        return pathToRoot

    def splitDirs(self, filePath):
        if filePath == '': return []
        rootPath, last = os.path.split(filePath)
        rootDirs = self.splitDirs(rootPath)
        rootDirs.append(last)
        return rootDirs

    def isTemplateFile(self, fileName):
        extension = os.path.splitext(fileName)[1]
        return extension == '.html'

    def getWebpageFilePaths(self, progLang, lang):
        paths = []
        templateDirPath = os.path.join(TEMPLATES_DIR, progLang, lang, PAGES_DIR)
        if not os.path.exists(templateDirPath):
            return paths
        for fileName in os.listdir(templateDirPath):
            if self.isTemplateFile(fileName):
                paths.append(fileName)
        return paths


if __name__ == '__main__':
    Compiler().run()
