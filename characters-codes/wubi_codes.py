from pandas import read_csv
'''
 characters may appear several times in the wubi-codes (because there is more than one wubi-code
(e.g. shortcuts)


'''

a= read_csv('wubi-codes-utf-8.csv',sep=',')
#print(a[a['character'].str.len()==1])

b=read_csv('frequencies.csv',sep='\t')


col=['index', 'character','individualfreq','cumFreq', 'pinyin','meaning']

b=read_csv('frequencies.csv', sep='\t' ,names=col)

print(b.head())

print(a.head())


c=a.merge(b)

print (c.head())
d=c.sort('individualfreq')
e=d[['character','wubi', 'individualfreq']]

print(e.tail(100))





