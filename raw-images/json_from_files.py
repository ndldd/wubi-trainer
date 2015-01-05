import os
import json

from collections import defaultdict

def  catalog():
    a = dict()

    a['files']= []
    a['group']=''

    return a

dic = defaultdict(catalog)

dirs = os.listdir('./xcf/export_sub');
os.chdir('./xcf/export_sub');



print(dirs)
for folder in dirs:
    os.chdir('./'+folder)
    for filename in os.listdir('.'):

        key = filename[0]
        dic[key]

        dic[key]['group'] = folder;
        dic[key]['files'].append(filename)

    os.chdir('..')


print(json.dumps(dic))

