#!/usr/bin/python3
from pandas import read_csv

import json

'''
 characters may appear several times in the wubi-codes (because there is more than one wubi-code
(e.g. shortcuts)


'''

a = read_csv('wubi-codes-utf-8.csv', sep=',')
# print(a[a['character'].str.len()==1])

b = read_csv('frequencies.csv', sep='\t')

col = ['index', 'character', 'individualfreq', 'cumFreq', 'pinyin', 'meaning']

b = read_csv('frequencies.csv', sep='\t', names=col)

print(b.head())

print(a.head())

c = a.merge(b)

print(c.head())
d = c.sort('individualfreq')
e = d[['character', 'wubi', 'individualfreq','meaning','pinyin']]

# print(e.tail(100))

dict = {}
liste = []

# file.write('{')
for index, row in e.iterrows():
    obj = {}
    # key = str(index)
    # char = str(row.character)
    # wubi = "wubiCode:" + str(row.wubi)
    # line = key + ' ' + char + ' ' + wubi + ' ' + '\n'



    liste.append(
        {"character": str(row.character),
         "wubiCode": [str(row.wubi)],
         "meaning": [str(row.meaning)],
         "pinyin": [str(row.pinyin)],
        }
    );

    # file.write(line);

    # file.write('}')
with open('dict.json', 'w') as file:
    pass
    json_string = json.dumps(liste)
    file.write(json_string)


