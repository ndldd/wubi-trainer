import csv
import json
# print(json.dumps(dic))

csv.reader('keyboard_map.csv')


key_codes = {}
with open('keyboard_map.csv', 'r') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in spamreader:
        # row = ['"'+x+'"' for x in row if x not in ' ']
        try:
            key_code, letter, group_id= row

            key_codes[key_code]={ 'letter': letter,  'groupId': group_id }


        except ValueError as e:
            pass

print(json.dumps(key_codes))
        # print (', '.join(row))
# with open('out.js','w') as out_file:
#     with open('keyboard_map.csv','r') as file:
#         for line in file:
#             if (line[0]!=','):
#
#                 print([x for x in line if x not in [',',' ','\n']] )
#                 out_file.write(line)